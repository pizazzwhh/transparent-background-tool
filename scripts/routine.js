// imagec routine — ESA edge function with stats tracking + multi-path assets
const NS = "stats_counter";

const mimeTypes = {
  html: "text/html; charset=utf-8",
  htm: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  webp: "image/webp",
  txt: "text/plain; charset=utf-8",
  xml: "application/xml; charset=utf-8",
};

const LOG_KEY = "visits_log";
const LOG_LIMIT = 2000;
const PV_TOTAL_KEY = "pv_total";

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function parseUA(ua) {
  var br = "other", os = "other", dev = "desktop";
  if (new RegExp("Edg/").test(ua)) br = "edge";
  else if (new RegExp("OPR/").test(ua) || new RegExp("Opera").test(ua)) br = "opera";
  else if (new RegExp("Chrome/").test(ua)) br = "chrome";
  else if (new RegExp("Firefox/").test(ua)) br = "firefox";
  else if (new RegExp("Safari/").test(ua)) br = "safari";
  if (new RegExp("Windows").test(ua)) os = "windows";
  else if (new RegExp("Mac OS X").test(ua)) os = "mac";
  else if (new RegExp("Android").test(ua)) os = "android";
  else if (new RegExp("iPhone|iPad|iPod").test(ua)) os = "ios";
  if (new RegExp("iPad").test(ua)) dev = "tablet";
  else if (new RegExp("Mobi|Android|iPhone").test(ua)) dev = "mobile";
  return { br: br, os: os, dev: dev };
}

// CLI and in-house probes that the older bot|crawl pattern does not catch.
var BOT_UA = new RegExp("bot|crawl|spider|slurp|bingbot|googlebot|yandex|baidu|duckduckbot|semrush|ahref|facebookexternalhit|twitterbot|linkedinbot|telegrambot|discordbot|applebot|ia_archiver|preview|checker|monitor|headless|curl(?:/|\\b)|wget(?:/|\\b)|python-requests|go-http-client|imagec-deploy-check|imagec-qa|imagec-smoke", "i");

function isBotUA(ua) {
  return BOT_UA.test(ua || "");
}

// ISO 3166-1 alpha-2. UK is not a code; stats.html labels GB.
function normalizeCountry(raw) {
  if (raw == null) return "";
  var code = String(raw).trim().toUpperCase();
  if (code === "UK") code = "GB";
  if (!/^[A-Z]{2}$/.test(code)) return "";
  // XX = unrecognized (ESA). T1/A1/A2 = anonymous/proxy placeholders used by some CDNs.
  if (code === "XX" || code === "T1" || code === "A1" || code === "A2") return "";
  return code;
}

// Country for this runtime: export default { async fetch(request) }.
// Live ESA edge functions expose geo on request.info (same fields as the older
// addEventListener event.info sample). ip_country_id is the ISO code ("CN");
// ip_country_en is an English name ("China") and is not used as the label.
// ali-ip-country is only injected on origin requests after Managed Transforms →
// "Add visitor location headers" (lowercase alpha-2, e.g. cn). It is read as a
// fallback when the function request actually carries it. cf-ipcountry /
// cloudfront-viewer-country cover a CDN sitting in front.
function countryFromInfo(info) {
  if (!info || typeof info !== "object") return "";
  var code = normalizeCountry(info.ip_country_id || info.ip_country);
  if (code) return code;
  var region = String(info.ip_region_id || "").trim().toUpperCase();
  var m = region.match(/^([A-Z]{2})-/);
  return m ? normalizeCountry(m[1]) : "";
}

function readCountry(request, context) {
  var candidates = [];
  try { candidates.push(countryFromInfo(request && request.info)); } catch (e) {}
  try { candidates.push(countryFromInfo(context && context.info)); } catch (e2) {}
  try {
    if (typeof event !== "undefined" && event) candidates.push(countryFromInfo(event.info));
  } catch (e3) {}
  try {
    var h = request && request.headers;
    if (h && h.get) {
      candidates.push(h.get("ali-ip-country"));
      candidates.push(h.get("cf-ipcountry"));
      candidates.push(h.get("cloudfront-viewer-country"));
      candidates.push(h.get("x-country-code"));
    }
  } catch (e4) {}
  for (var i = 0; i < candidates.length; i++) {
    var code = normalizeCountry(candidates[i]);
    if (code) return code;
  }
  return "";
}

// Beacon path from ?p=. Missing, blank, non-path, or /__track__ is not a page view.
function normalizeTrackPath(url) {
  var raw = url.searchParams.get("p");
  if (raw == null) return "";
  raw = String(raw).trim();
  if (!raw) return "";
  try { raw = decodeURIComponent(raw); } catch (e) {}
  raw = String(raw).replace(/[\u0000-\u001f\u007f]/g, "").trim();
  if (!raw) return "";
  var path = raw.split("#")[0].split("?")[0].trim();
  if (!path || path.charAt(0) !== "/") return "";
  if (path === "/__track__" || path === "/__track__/") return "";
  if (path === "/") return "/";
  return path.slice(0, 48);
}

function trackQuiet() {
  return new Response("ok", { headers: { "cache-control": "no-store" } });
}

function getStatsFromLog() {
  const ek = new EdgeKV({ namespace: NS });
  const today = todayStr();

  return ek.get(LOG_KEY).then(function(raw) {
    var log = [];
    if (raw) { try { log = JSON.parse(raw); } catch (e) { log = []; } }
    if (!Array.isArray(log)) log = [];

    return Promise.all([
      ek.get("last_visit"),
      ek.get(PV_TOTAL_KEY)
    ]).then(function(results) {
      var lastVisit = results[0];
      var pvTotal = parseInt(results[1] || "0", 10) || 0;

      var uvs = [];
      var uvsToday = [];
      var byDate = {};
      var brMap = {};
      var osMap = {};
      var devMap = {};
      var langMap = {};
      var pathMap = {};
      var refMap = {};
      var ctryMap = {};

      for (var i = 0; i < log.length; i++) {
        var e = log[i];
        var ds = (e.ts || "").slice(0, 10);
        if (!byDate[ds]) byDate[ds] = { pv: 0, uvs: [] };
        byDate[ds].pv++;
        if (e.sid) {
          if (byDate[ds].uvs.indexOf(e.sid) === -1) byDate[ds].uvs.push(e.sid);
        }
        if (e.sid && uvs.indexOf(e.sid) === -1) uvs.push(e.sid);
        if (ds === today && e.sid && uvsToday.indexOf(e.sid) === -1) uvsToday.push(e.sid);

        if (e.br) brMap[e.br] = (brMap[e.br] || 0) + 1;
        if (e.os) osMap[e.os] = (osMap[e.os] || 0) + 1;
        if (e.dev) devMap[e.dev] = (devMap[e.dev] || 0) + 1;
        if (e.lang) langMap[e.lang] = (langMap[e.lang] || 0) + 1;
        if (e.ctry) ctryMap[e.ctry] = (ctryMap[e.ctry] || 0) + 1;

        var p = e.path || "/";
        pathMap[p] = (pathMap[p] || 0) + 1;

        var r = "(direct)";
        if (e.ref) {
          try { r = new URL(e.ref).hostname; } catch (err) { r = "(other)"; }
        }
        refMap[r] = (refMap[r] || 0) + 1;
      }

      var result = {};
      result.today = today;
      result.lastVisit = lastVisit;
      result.summary = {
        pv: Math.max(pvTotal, log.length),
        uv: uvs.length,
        pvToday: byDate[today] ? byDate[today].pv : 0,
        uvToday: uvsToday.length,
        dailyAvg: 0
      };

      var now = new Date();
      var sum = 0;
      result.daily = [];
      for (var j = 13; j >= 0; j--) {
        var d = new Date(now.getTime() - j * 86400000);
        var ds2 = d.toISOString().slice(0, 10);
        var pv2 = byDate[ds2] ? byDate[ds2].pv : 0;
        var uv2 = byDate[ds2] ? byDate[ds2].uvs.length : 0;
        sum += pv2;
        result.daily.push({ date: ds2, pv: pv2, uv: uv2 });
      }
      result.summary.dailyAvg = Math.round(sum / 14);

      function toTop(map, limit) {
        var keys = Object.keys(map);
        var items = [];
        for (var k = 0; k < keys.length; k++) {
          items.push({ name: keys[k], count: map[keys[k]] });
        }
        items.sort(function(a, b) { return b.count - a.count; });
        return items.slice(0, limit);
      }

      result.browsers = toTop(brMap, 6);
      result.os = toTop(osMap, 6);
      result.devices = toTop(devMap, 6);
      result.languages = toTop(langMap, 6);
      result.countries = toTop(ctryMap, 10);

      result.recent = [];
      for (var ri = 0; ri < Math.min(50, log.length); ri++) {
        var e2 = log[ri];
        var ref2 = "(direct)";
        if (e2.ref) {
          try { ref2 = new URL(e2.ref).hostname; } catch (err) { ref2 = "(other)"; }
        }
        result.recent.push({
          ts: e2.ts, path: e2.path, ref: ref2,
          br: e2.br, dev: e2.dev, os: e2.os, ua: e2.ua || "",
          ctry: e2.ctry || ""
        });
      }

      result.topPaths = toTop(pathMap, 10);
      result.topReferrers = toTop(refMap, 10);

      var hourMap = {};
      var sessionMap = {};
      for (var hi = 0; hi < log.length; hi++) {
        var entry = log[hi];
        if (entry.ts) {
          try {
            var hr = new Date(entry.ts).getUTCHours();
            var hk = hr;
            hourMap[hk] = (hourMap[hk] || 0) + 1;
          } catch(e) {}
        }
        if (entry.sid) {
          sessionMap[entry.sid] = (sessionMap[entry.sid] || 0) + 1;
        }
      }
      result.hourly = [];
      for (var h = 0; h < 24; h++) {
        result.hourly.push({ hour: h, pv: hourMap[h] || 0 });
      }

      var totalSessions = Object.keys(sessionMap).length;
      var totalPages = log.length;
      result.sessions = {
        total: totalSessions,
        avgDepth: totalSessions > 0 ? (totalPages / totalSessions).toFixed(1) : "0.0"
      };

      return result;
    });
  });
}

export default {
  async fetch(request, context) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname === "/__stats__") {
      try {
        const stats = await getStatsFromLog();
        return new Response(JSON.stringify(stats), {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: String(e) }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
    }

    if (pathname === "/__ping__") {
      try {
        const ek = new EdgeKV({ namespace: NS });
        const testKey = "ping_test_" + Date.now();
        await ek.put(testKey, "ok");
        const testVal = await ek.get(testKey);
        const lastVisit = await ek.get("last_visit");
        return new Response(JSON.stringify({
          ok: true,
          testVal: testVal,
          lastVisit: lastVisit,
          ctry: readCountry(request, context)
        }), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      } catch (e) {
        return new Response("Error: " + String(e).slice(0, 200), {
          status: 500,
          headers: { "content-type": "text/plain" },
        });
      }
    }

    if (pathname === "/__track__") {
      try {
        const ua = request.headers.get("user-agent") || "";
        if (isBotUA(ua)) return trackQuiet();

        var path = normalizeTrackPath(url);
        if (!path) return trackQuiet();

        const ek = new EdgeKV({ namespace: NS });

        const now = new Date().toISOString();
        var ref = (request.headers.get("referer") || "").slice(0, 128);
        var uaInfo = parseUA(ua);
        var langRaw = (request.headers.get("accept-language") || "").split(",")[0];
        var lang = langRaw.startsWith("zh") ? "zh" : langRaw.startsWith("en") ? "en" : "other";
        var ctry = readCountry(request, context);

        const cookies = request.headers.get("cookie") || "";
        var sid = null;
        var isNew = true;
        var sm = cookies.match(/(?:^|;)\s*__sid__=([^;]+)/);
        if (sm) { sid = decodeURIComponent(sm[1]); isNew = false; }
        if (!sid) {
          sid = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        }

        const raw = await ek.get(LOG_KEY);
        var log = [];
        if (raw) { try { log = JSON.parse(raw); } catch (e) { log = []; } }
        if (!Array.isArray(log)) log = [];

        var entry = {
          ts: now,
          sid: sid,
          path: path,
          ref: ref,
          br: uaInfo.br,
          os: uaInfo.os,
          dev: uaInfo.dev,
          lang: lang,
          ua: ua.slice(0, 200)
        };
        if (ctry) entry.ctry = ctry;
        log.unshift(entry);
        if (log.length > LOG_LIMIT) log = log.slice(0, LOG_LIMIT);

        var pvTotalStr = await ek.get(PV_TOTAL_KEY);
        var pvTotalNum = parseInt(pvTotalStr || "0", 10) || 0;
        pvTotalNum++;

        await ek.put(LOG_KEY, JSON.stringify(log));
        await ek.put(PV_TOTAL_KEY, String(pvTotalNum));
        await ek.put("last_visit", now);

        const response = new Response("ok", {
          headers: {
            "content-type": "text/plain",
            "cache-control": "no-store, no-cache, must-revalidate",
            "Set-Cookie": "__sid__=" + encodeURIComponent(sid) + "; Path=/; Max-Age=2592000; SameSite=Lax",
          },
        });
        return response;
      } catch (e) {
        return new Response("err:" + String(e).slice(0, 100), {
          headers: { "cache-control": "no-store" },
        });
      }
    }

    if (pathname === "/" || pathname === "") pathname = "/index.html";
    // Extensionless tool URLs (/batch, /qr, /round, /compress, …) serve the matching .html file.
    else if (pathname.length > 1 && pathname.indexOf("/__") !== 0 && !/\.[a-zA-Z0-9]+$/.test(pathname)) {
      pathname = pathname.replace(/\/+$/, "") + ".html";
    }
    let response;
    const ext = pathname.split(".").pop().toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    // Try multiple asset path patterns (ESA may use different base paths)
    const pathsToTry = [
      "assets" + pathname,
      pathname.slice(1),
      pathname,
    ];

    for (const tryPath of pathsToTry) {
      try {
        const content = await __ESA_ASSETS_GET__(tryPath);
        if (content) {
          response = new Response(content, { headers: { "content-type": contentType } });
          return response;
        }
      } catch (e) {}
    }

    response = new Response("Not Found", { status: 404 });
    return response;
  },
};
