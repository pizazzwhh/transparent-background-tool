#!/usr/bin/env node
/**
 * Submit imagec.xin URLs to IndexNow after a production deploy.
 *
 * Bing, Yandex, and other IndexNow partners share https://api.indexnow.org/indexnow.
 * Run this only after the key file is live at https://imagec.xin/{key}.txt
 * (robots.txt allows it). The key is public by design; do not commit other secrets.
 *
 *   node scripts/indexnow-submit.mjs
 *   node scripts/indexnow-submit.mjs --dry-run
 *   node scripts/indexnow-submit.mjs https://imagec.xin/ https://imagec.xin/compress /whitebg
 *
 * With no URL arguments, every <loc> in sitemap.xml is submitted. A trailing
 * .html is removed so the list matches the live 307 clean paths
 * (/compress.html → https://imagec.xin/compress). Pass --key to use another
 * repo-root {key}.txt (older key files may already be hosted). The default
 * key file is KEY_FILE below; its body must be exactly the key.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "imagec.xin";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FILE = "94a6c1480ecc4341998e31c267438424.txt";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const urls = [];
  let dryRun = false;
  let keyOpt = null;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--key") {
      keyOpt = argv[++i];
      if (!keyOpt) throw new Error("--key requires a value");
    } else if (arg.startsWith("--key=")) {
      keyOpt = arg.slice("--key=".length);
    } else if (arg === "--help" || arg === "-h") {
      console.log("Usage: node scripts/indexnow-submit.mjs [--dry-run] [--key <key>] [url...]");
      process.exit(0);
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      urls.push(arg);
    }
  }
  return { dryRun, keyOpt, urls };
}

function readKey(keyOpt) {
  const name = keyOpt ? (keyOpt.endsWith(".txt") ? keyOpt : `${keyOpt}.txt`) : KEY_FILE;
  const base = path.basename(name);
  const file = path.join(root, base);
  if (!fs.existsSync(file)) {
    throw new Error(`IndexNow key file not found: ${base}`);
  }
  const key = fs.readFileSync(file, "utf8").trim();
  const stem = path.basename(file, ".txt");
  if (key !== stem) {
    throw new Error(`Key file ${base} body does not match its filename`);
  }
  if (!/^[a-f0-9-]{8,128}$/i.test(key)) {
    throw new Error(`Key file ${base} is not an IndexNow key`);
  }
  return { key, file: base };
}

function toCleanUrl(raw) {
  let value = String(raw).trim();
  if (!value) return null;
  if (value.startsWith("/")) value = ORIGIN + value;
  else if (!/^https?:\/\//i.test(value)) value = `${ORIGIN}/${value.replace(/^\/+/, "")}`;

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid URL: ${raw}`);
  }
  if (url.protocol !== "https:" || url.hostname !== HOST) {
    throw new Error(`URL must be https://${HOST}/...: ${raw}`);
  }

  let pathname = url.pathname;
  if (pathname.endsWith("/index.html")) pathname = pathname.slice(0, -"/index.html".length) || "/";
  else if (pathname.endsWith(".html")) pathname = pathname.slice(0, -".html".length);
  if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  if (!pathname) pathname = "/";
  url.pathname = pathname;
  url.hash = "";
  return url.toString();
}

function urlsFromSitemap() {
  const xml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1]);
  if (!locs.length) throw new Error("No <loc> URLs in sitemap.xml");
  return locs;
}

function unique(list) {
  const out = [];
  const seen = new Set();
  for (const item of list) {
    const clean = toCleanUrl(item);
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    out.push(clean);
  }
  return out;
}

async function main() {
  const { dryRun, keyOpt, urls: cliUrls } = parseArgs(process.argv.slice(2));
  const { key, file } = readKey(keyOpt);
  const urlList = unique(cliUrls.length ? cliUrls : urlsFromSitemap());
  if (!urlList.length || urlList.length > 10000) {
    throw new Error(`IndexNow accepts 1 to 10000 URLs (got ${urlList.length})`);
  }

  const body = {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${file}`,
    urlList,
  };

  console.log(`Key file: ${file}`);
  console.log(`keyLocation: ${body.keyLocation}`);
  console.log(`URLs (${urlList.length}):`);
  for (const url of urlList) console.log(`  ${url}`);

  if (dryRun) {
    console.log("Dry run: not submitted.");
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  console.log(`HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ""}`);
  if (text) console.log(text);
  if (!response.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
