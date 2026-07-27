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
const LOG_LIMIT = 500;

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

function getStatsFromLog() {
  const ek = new EdgeKV({ namespace: NS });
  const today = todayStr();

  return ek.get(LOG_KEY).then(function(raw) {
    var log = [];
    if (raw) { try { log = JSON.parse(raw); } catch (e) { log = []; } }
    if (!Array.isArray(log)) log = [];

    return Promise.all([
      ek.get("last_visit"),
      ek.get("uv_" + today + "_today")
    ]).then(function(results) {
      var lastVisit = results[0];
      var uvTodayKey = results[1];

      var uvs = [];
      var uvsToday = [];
      var byDate = {};
      var brMap = {};
      var osMap = {};
      var devMap = {};
      var langMap = {};
      var pathMap = {};
      var refMap = {};

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
        pv: log.length,
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
      result.countries = [];

      result.recent = [];
      for (var ri = 0; ri < Math.min(50, log.length); ri++) {
        var e2 = log[ri];
        var ref2 = "(direct)";
        if (e2.ref) {
          try { ref2 = new URL(e2.ref).hostname; } catch (err) { ref2 = "(other)"; }
        }
        result.recent.push({
          ts: e2.ts, path: e2.path, ref: ref2,
          br: e2.br, dev: e2.dev, os: e2.os, ua: e2.ua || ""
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
  async fetch(request) {
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
          lastVisit: lastVisit
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
        const ek = new EdgeKV({ namespace: NS });
        const ua = request.headers.get("user-agent") || "";

        if (new RegExp("bot|crawl|spider|slurp|bingbot|googlebot|yandex|baidu|duckduckbot|semrush|ahref|facebookexternalhit|twitterbot|linkedinbot|telegrambot|discordbot|applebot|ia_archiver|preview|checker|monitor|headless", "i").test(ua)) {
          return new Response("ok", { headers: { "cache-control": "no-store" } });
        }

        const now = new Date().toISOString();
        const today = now.slice(0, 10);
        var path = url.searchParams.get("p") || url.pathname;
        try { path = decodeURIComponent(path); } catch(e) {}
        path = (path === "/" || path === "") ? "/" : path.split("?")[0].split("#")[0].slice(0, 48);
        var ref = (request.headers.get("referer") || "").slice(0, 128);
        var uaInfo = parseUA(ua);
        var langRaw = (request.headers.get("accept-language") || "").split(",")[0];
        var lang = langRaw.startsWith("zh") ? "zh" : langRaw.startsWith("en") ? "en" : "other";

        const cookies = request.headers.get("cookie") || "";
        var sid = null;
        var isNew = true;
        var sm = cookies.match(/(?:^|;)\\s*__sid__=([^;]+)/);
        if (sm) { sid = decodeURIComponent(sm[1]); isNew = false; }
        if (!sid) {
          sid = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        }

        const raw = await ek.get(LOG_KEY);
        var log = [];
        if (raw) { try { log = JSON.parse(raw); } catch (e) { log = []; } }
        if (!Array.isArray(log)) log = [];

        log.unshift({
          ts: now,
          sid: sid,
          path: path,
          ref: ref,
          br: uaInfo.br,
          os: uaInfo.os,
          dev: uaInfo.dev,
          lang: lang,
          ua: ua.slice(0, 200)
        });
        if (log.length > LOG_LIMIT) log = log.slice(0, LOG_LIMIT);

        await ek.put(LOG_KEY, JSON.stringify(log));
        await ek.put("last_visit", now);
        if (isNew) {
          await ek.put("uv_" + today + "_" + sid.slice(0, 8), "1");
        }

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
    const assetPath = "assets" + pathname;
    let response;
    try {
      const content = await __ESA_ASSETS_GET__(assetPath);
      if (content) {
        const ext = pathname.split(".").pop().toLowerCase();
        const contentType = mimeTypes[ext] || "application/octet-stream";
        response = new Response(content, { headers: { "content-type": contentType } });
      } else {
        response = new Response("Not Found", { status: 404 });
      }
    } catch (e) {
      response = new Response("Not Found", { status: 404 });
    }

    return response;
  },
};
