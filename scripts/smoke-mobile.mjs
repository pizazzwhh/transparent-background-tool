#!/usr/bin/env node
/**
 * Mobile first-screen gate for imagec.xin.
 *
 *   npx playwright install chromium
 *   node scripts/smoke-mobile.mjs
 *
 * Viewport is 375×812. BASE_URL defaults to https://imagec.xin.
 * On failure, a viewport screenshot is written to artifacts/mobile-smoke/.
 *
 * Selectors come from the live pages:
 *   home     #searchInput, #toolsGrid, first a.toolCard
 *   upload   .workspace, label#drop (button.primary stays hidden until a file)
 *   qr       .workspace, #text, button.primary
 * Related cards are a.toolCard, mounted by tool-cards.js.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ORIGIN = "https://imagec.xin";
const VIEWPORT = { width: 375, height: 812 };
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const screenshotDir = path.join(root, "artifacts", "mobile-smoke");

const PAGES = [
  { path: "/", name: "home", workspace: "#toolsGrid", action: "#searchInput", cta: "a.toolCard" },
  { path: "/whitebg", name: "whitebg", workspace: ".workspace", action: "#drop", cta: "button.primary" },
  { path: "/compress", name: "compress", workspace: ".workspace", action: "#drop", cta: "button.primary" },
  { path: "/qr", name: "qr", workspace: ".workspace", action: "#text", cta: "button.primary" },
  { path: "/round", name: "round", workspace: ".workspace", action: "#drop", cta: "button.primary" },
  { path: "/batch", name: "batch", workspace: ".workspace", action: "#drop", cta: "button.primary" },
];

const TOOL_HREF = /^\/(?:whitebg|compress|convert|batch|qr|round|crop|idphoto|watermark|bgcolor|splice|img2pdf|filter)$/;

function originFromEnv() {
  const raw = (process.env.BASE_URL || DEFAULT_ORIGIN).trim().replace(/\/+$/, "");
  const url = new URL(raw);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`BASE_URL must be http(s): ${raw}`);
  }
  return url.origin;
}

function pageUrl(origin, pagePath) {
  return origin + (pagePath.startsWith("/") ? pagePath : `/${pagePath}`);
}

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    console.error("FAIL  playwright — install it with: npm install");
    console.error("Then install the browser: npx playwright install chromium");
    console.error("Linux images missing system libraries: npx playwright install --with-deps chromium");
    process.exit(1);
  }
}

function cardProblem(href, origin) {
  if (!href) return "empty href";
  let url;
  try {
    url = new URL(href, origin);
  } catch {
    return href;
  }
  if (url.origin !== origin) return href;
  let pathname = url.pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  if (/\.html$/i.test(pathname) || !TOOL_HREF.test(pathname)) return href;
  return null;
}

async function inspect(page, spec) {
  return page.evaluate(({ workspace, action, cta }) => {
    function describe(selector) {
      if (!selector) return null;
      const el = document.querySelector(selector);
      if (!el) return { found: false, selector };
      const vh = window.innerHeight;
      let painted = true;
      for (let node = el; node; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden") painted = false;
        if (Number.parseFloat(style.opacity) < 0.9) painted = false;
        if (node.hasAttribute("hidden")) painted = false;
      }
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) painted = false;
      const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const inFirstScreen = painted && rect.top < vh - 24 && visibleHeight >= Math.min(40, rect.height);
      return {
        found: true,
        selector,
        painted,
        inFirstScreen,
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height),
      };
    }

    const guide = document.querySelector("#guide");
    const guideRect = guide ? guide.getBoundingClientRect() : null;
    return {
      workspace: describe(workspace),
      action: describe(action),
      cta: describe(cta),
      guideTop: guideRect ? Math.round(guideRect.top) : null,
      cards: [...document.querySelectorAll("a.toolCard")].map((anchor) => anchor.getAttribute("href") || ""),
    };
  }, spec);
}

function placementOk(box) {
  return Boolean(box && box.found && box.painted && box.inFirstScreen);
}

function placementDetail(box) {
  if (!box || !box.found) return "missing";
  if (!box.painted) return `${box.selector} not visible`;
  if (!box.inFirstScreen) return `${box.selector} top ${box.top}px is below the first screen`;
  return `${box.selector} top ${box.top}px`;
}

async function checkPage(page, origin, spec) {
  const url = pageUrl(origin, spec.path);
  console.log(url);
  let ok = true;
  const mark = (pass, label, detail = "") => {
    const suffix = detail ? ` — ${detail}` : "";
    console.log(`  ${pass ? "PASS" : "FAIL"}  ${label}${suffix}`);
    if (!pass) ok = false;
  };

  try {
    const response = await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const httpOk = Boolean(response) && response.status() === 200;
    mark(httpOk, "HTTP 200", response ? `status ${response.status()}` : "no response");
    if (httpOk) {
      if (spec.path !== "/") await page.waitForSelector("body.tool-ready", { timeout: 10000 });
      await page.waitForSelector("a.toolCard", { timeout: 10000 });
      await page.waitForFunction((selector) => {
        const el = document.querySelector(selector);
        if (!el) return false;
        for (let node = el; node; node = node.parentElement) {
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden") return false;
          if (Number.parseFloat(style.opacity) < 0.9) return false;
        }
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }, spec.action, { timeout: 10000 });

      const report = await inspect(page, spec);
      mark(placementOk(report.workspace), "workspace in first screen", placementDetail(report.workspace));
      mark(placementOk(report.action), "main input in first screen", placementDetail(report.action));

      const ctaPainted = Boolean(report.cta && report.cta.found && report.cta.painted);
      if (ctaPainted) {
        mark(placementOk(report.cta), "primary action in first screen", placementDetail(report.cta));
      } else if (report.cta && report.cta.found && !report.cta.painted) {
        mark(placementOk(report.action), "primary action in first screen", `${placementDetail(report.action)} (download stays hidden until a file)`);
      } else {
        mark(false, "primary action in first screen", placementDetail(report.cta));
      }

      const anchor = ctaPainted ? report.cta : report.action;
      if (report.guideTop != null) {
        if (!anchor || !anchor.found) {
          mark(false, "#guide below primary action", "primary action missing");
        } else {
          const below = report.guideTop >= anchor.bottom;
          mark(
            below,
            "#guide below primary action",
            below
              ? `guide top ${report.guideTop}px, action bottom ${anchor.bottom}px`
              : `guide top ${report.guideTop}px overlaps or precedes ${anchor.selector}`,
          );
        }
      }

      const cards = report.cards || [];
      const bad = [...new Set(cards.map((href) => cardProblem(href, origin)).filter(Boolean))];
      mark(cards.length > 0 && bad.length === 0, "tool card hrefs", cards.length === 0 ? "no a.toolCard" : bad.join(", ") || `${cards.length} clean paths`);
    }
  } catch (error) {
    mark(false, "page", error.message.split("\n")[0]);
  }

  if (!ok) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    const file = path.join(screenshotDir, `${spec.name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  screenshot ${path.relative(root, file)}`);
  }
  return ok;
}

async function main() {
  const origin = originFromEnv();
  const { chromium } = await loadPlaywright();
  console.log(`BASE_URL ${origin}`);
  console.log(`viewport ${VIEWPORT.width}×${VIEWPORT.height}`);

  const browser = await chromium.launch({ headless: true });
  let failed = 0;
  try {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      locale: "zh-CN",
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
    });
    for (const spec of PAGES) {
      const page = await context.newPage();
      try {
        const ok = await checkPage(page, origin, spec);
        if (!ok) failed += 1;
      } finally {
        await page.close();
      }
      console.log("");
    }
  } finally {
    await browser.close();
  }

  const total = PAGES.length;
  console.log(failed ? `${failed}/${total} pages FAIL` : `${total}/${total} pages PASS`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
