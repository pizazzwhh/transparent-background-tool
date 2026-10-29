#!/usr/bin/env node
/**
 * Live smoke gate for imagec.xin.
 *
 *   node scripts/smoke-live.mjs
 *   BASE_URL=http://127.0.0.1:8080 node scripts/smoke-live.mjs
 *
 * BASE_URL defaults to https://imagec.xin. No npm dependencies.
 * Prints PASS/FAIL per check and exits non-zero if any check fails.
 *
 * Tool routes linked from the fetched HTML must be extensionless
 * (/compress, not /compress.html). External URLs are ignored. Known
 * non-tool documents that still ship as .html are allowed:
 * /sponsor.html, /stats.html, /index.html, and /blog/*.html.
 * Extension links that only appear inside .heroLinks are the remaining
 * legacy cross-links; the same /compress.html href anywhere else fails.
 */

const DEFAULT_ORIGIN = "https://imagec.xin";

const PAGES = [
  { path: "/" },
  { path: "/whitebg", tool: true },
  { path: "/compress", tool: true },
  { path: "/qr", tool: true },
  { path: "/round", tool: true },
  { path: "/batch", tool: true },
  { path: "/sponsors", sponsors: true },
];

const TOOL_SLUGS = new Set([
  "whitebg",
  "compress",
  "convert",
  "batch",
  "qr",
  "round",
  "crop",
  "idphoto",
  "watermark",
  "bgcolor",
  "splice",
  "img2pdf",
  "filter",
]);

const LEGACY_HTML_PATHS = new Set(["/sponsor.html", "/stats.html", "/index.html"]);

const SPONSORS_PHRASE = "免费在线图片工具";

function originFromEnv() {
  const raw = (process.env.BASE_URL || DEFAULT_ORIGIN).trim().replace(/\/+$/, "");
  const url = new URL(raw);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`BASE_URL must be http(s): ${raw}`);
  }
  return url.origin;
}

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function norm(value) {
  return decodeEntities(String(value).replace(/<[^>]+>/g, ""))
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag, name) {
  const re = new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`, "i");
  const match = tag.match(re);
  if (!match) return null;
  return decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
}

function hasHiddenAttr(tag) {
  return /\shidden(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*))?(?=\s|\/?>)/i.test(tag)
    && !/\shidden\s*=\s*["']false["']/i.test(tag);
}

function tagConcealed(tag) {
  if (hasHiddenAttr(tag)) return true;
  if (/\saria-hidden\s*=\s*["']true["']/i.test(tag)) return true;
  const style = attr(tag, "style") || "";
  if (/display\s*:\s*none/i.test(style) || /visibility\s*:\s*hidden/i.test(style)) return true;
  const cls = attr(tag, "class") || "";
  return cls.split(/\s+/).includes("sr-only");
}

function headerValue(response, name) {
  return response.headers.get(name) || "(absent)";
}

function visibleH1(html) {
  const re = /<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi;
  let match;
  while ((match = re.exec(html))) {
    const tag = `<h1${match[1]}>`;
    if (tagConcealed(tag)) continue;
    const text = norm(match[2]);
    if (text) return text;
  }
  return null;
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const rel = (attr(tag, "rel") || "").toLowerCase().split(/\s+/);
    if (!rel.includes("canonical")) continue;
    return attr(tag, "href");
  }
  return null;
}

function cleanPathname(pathname) {
  let path = pathname || "/";
  try {
    path = decodeURIComponent(path);
  } catch {
    /* keep the raw pathname */
  }
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}

function hasGuide(html) {
  return /<[^>]+\bid\s*=\s*["']guide["'][^>]*>/i.test(html);
}

function faqQuestionsFromHtml(html) {
  const questions = [];
  const re = /<dl\b([^>]*)>([\s\S]*?)<\/dl>/gi;
  let match;
  while ((match = re.exec(html))) {
    const open = `<dl${match[1]}>`;
    const cls = attr(open, "class") || "";
    if (!cls.split(/\s+/).includes("seoFaq")) continue;
    if (tagConcealed(open)) continue;
    const dtRe = /<dt\b([^>]*)>([\s\S]*?)<\/dt>/gi;
    let dt;
    while ((dt = dtRe.exec(match[2]))) {
      const dtTag = `<dt${dt[1]}>`;
      if (tagConcealed(dtTag)) continue;
      const text = norm(dt[2]);
      if (text) questions.push(text);
    }
  }
  return questions;
}

function collectFaq(node, out) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) collectFaq(item, out);
    return;
  }
  const types = node["@type"];
  const typeList = Array.isArray(types) ? types : types ? [types] : [];
  if (typeList.includes("FAQPage")) {
    const main = node.mainEntity || [];
    const entities = Array.isArray(main) ? main : [main];
    for (const question of entities) {
      if (!question || typeof question !== "object") continue;
      const qTypes = question["@type"];
      const qList = Array.isArray(qTypes) ? qTypes : qTypes ? [qTypes] : [];
      if (qList.length && !qList.includes("Question")) continue;
      if (typeof question.name === "string" && question.name.trim()) out.push(norm(question.name));
    }
  }
  if (node["@graph"]) collectFaq(node["@graph"], out);
}

function faqQuestionsFromJsonLd(html) {
  const questions = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    const type = (attr(`<script${match[1]}>`, "type") || "").toLowerCase();
    if (type !== "application/ld+json") continue;
    let data;
    try {
      data = JSON.parse(match[2].trim());
    } catch (error) {
      throw new Error(`JSON-LD is not valid JSON (${error.message})`);
    }
    collectFaq(data, questions);
  }
  return questions;
}

function faqMismatch(visible, jsonLd) {
  if (visible.length !== jsonLd.length) {
    return `visible ${visible.length}, JSON-LD ${jsonLd.length}`;
  }
  for (let i = 0; i < visible.length; i++) {
    if (visible[i] !== jsonLd[i]) return `question ${i + 1} differs`;
  }
  return null;
}

function sponsorsLinkOk(html, pageUrl, originHost) {
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  const found = [];
  let match;
  while ((match = re.exec(html))) {
    const text = norm(match[2]);
    if (!text.includes(SPONSORS_PHRASE)) continue;
    const href = attr(`<a${match[1]}>`, "href");
    found.push(href || "(no href)");
    if (!href) continue;
    let url;
    try {
      url = new URL(href, pageUrl);
    } catch {
      continue;
    }
    if (url.hostname === originHost && cleanPathname(url.pathname) === "/") return { ok: true, href };
  }
  return { ok: false, found };
}

function htmlWithoutEmbedded(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function toolHtmlPath(raw, pageUrl, originHost) {
  if (!raw || raw.startsWith("#") || /^(mailto|tel|javascript|data):/i.test(raw)) return null;
  let url;
  try {
    url = new URL(raw, pageUrl);
  } catch {
    return null;
  }
  if (url.hostname !== originHost) return null;
  const pathname = cleanPathname(url.pathname);
  if (pathname.startsWith("/blog/")) return null;
  if (LEGACY_HTML_PATHS.has(pathname)) return null;
  const match = pathname.match(/^\/([A-Za-z0-9-]+)\.html$/);
  if (!match || !TOOL_SLUGS.has(match[1].toLowerCase())) return null;
  return pathname;
}

function heroLinkRanges(html) {
  const ranges = [];
  const openRe = /<([a-z0-9]+)\b[^>]*\bclass\s*=\s*["'][^"']*\bheroLinks\b[^"']*["'][^>]*>/gi;
  let match;
  while ((match = openRe.exec(html))) {
    const rest = html.slice(match.index + match[0].length);
    const close = rest.search(new RegExp(`</${match[1]}\\s*>`, "i"));
    if (close === -1) continue;
    ranges.push([match.index, match.index + match[0].length + close]);
  }
  return ranges;
}

function insideRange(index, ranges) {
  return ranges.some(([start, end]) => index >= start && index < end);
}

function badToolHrefs(html, pageUrl, originHost) {
  const stripped = htmlWithoutEmbedded(html);
  const legacy = heroLinkRanges(stripped);
  const bad = new Set();
  const re = /\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>]+))/gi;
  let match;
  while ((match = re.exec(stripped))) {
    if (insideRange(match.index, legacy)) continue;
    const raw = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "").trim();
    const problem = toolHtmlPath(raw, pageUrl, originHost);
    if (problem) bad.add(problem);
  }
  return [...bad];
}

function pageUrl(origin, path) {
  return origin + (path.startsWith("/") ? path : `/${path}`);
}

async function checkPage(origin, page) {
  const url = pageUrl(origin, page.path);
  const host = new URL(origin).hostname;
  console.log(url);
  let response;
  try {
    response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(25000),
      headers: {
        accept: "text/html",
        // The gzip variant from ESA omits ETag. Ask for the identity body so
        // Age / Last-Modified / ETag are the headers a cache debug run prints.
        "accept-encoding": "identity",
        "user-agent": "imagec-smoke/1.0",
      },
    });
  } catch (error) {
    console.log(`  FAIL  request — ${error.message}`);
    return false;
  }

  console.log(`  Age: ${headerValue(response, "age")}`);
  console.log(`  Last-Modified: ${headerValue(response, "last-modified")}`);
  console.log(`  ETag: ${headerValue(response, "etag")}`);

  let ok = true;
  const mark = (pass, label, detail = "") => {
    const suffix = detail ? ` — ${detail}` : "";
    console.log(`  ${pass ? "PASS" : "FAIL"}  ${label}${suffix}`);
    if (!pass) ok = false;
  };

  const location = response.headers.get("location");
  mark(response.status === 200, "HTTP 200", location ? `status ${response.status} → ${location}` : `status ${response.status}`);
  if (response.status !== 200) return false;

  const html = await response.text();
  const title = norm((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1]);
  mark(Boolean(title), "title", title || "missing");

  const h1 = visibleH1(html);
  mark(Boolean(h1), "visible h1", h1 || "missing");

  const canonical = canonicalHref(html);
  if (!canonical) {
    mark(false, "canonical", "missing");
  } else {
    let canonicalUrl;
    try {
      canonicalUrl = new URL(canonical, url);
    } catch {
      canonicalUrl = null;
    }
    const pathname = canonicalUrl ? cleanPathname(canonicalUrl.pathname) : canonical;
    const clean = Boolean(canonicalUrl) && !pathname.toLowerCase().endsWith(".html");
    mark(clean, "canonical", clean ? canonicalUrl.href : `${canonical} uses .html`);
  }

  if (page.tool) {
    mark(hasGuide(html), "#guide", hasGuide(html) ? "present" : "missing");
    let visible = [];
    let jsonLd = [];
    let faqError = null;
    try {
      visible = faqQuestionsFromHtml(html);
      jsonLd = faqQuestionsFromJsonLd(html);
    } catch (error) {
      faqError = error.message;
    }
    if (faqError) {
      mark(false, "FAQ", faqError);
    } else {
      const mismatch = faqMismatch(visible, jsonLd);
      const countLabel = visible.length === 1 ? "1 question matches" : `${visible.length} questions match`;
      mark(!mismatch, "FAQ", mismatch || `${countLabel} FAQPage JSON-LD`);
    }
  }

  if (page.sponsors) {
    const link = sponsorsLinkOk(html, url, host);
    mark(
      link.ok,
      `「${SPONSORS_PHRASE}」→ /`,
      link.ok ? link.href : `found ${link.found.join(", ") || "no matching anchor"}`,
    );
  }

  const bad = badToolHrefs(html, url, host);
  mark(bad.length === 0, "tool hrefs", bad.length ? bad.join(", ") : "no same-site tool .html links");
  return ok;
}

async function main() {
  const origin = originFromEnv();
  console.log(`BASE_URL ${origin}`);
  let failed = 0;
  for (const page of PAGES) {
    const ok = await checkPage(origin, page);
    if (!ok) failed += 1;
    console.log("");
  }
  const total = PAGES.length;
  console.log(failed ? `${failed}/${total} pages FAIL` : `${total}/${total} pages PASS`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
