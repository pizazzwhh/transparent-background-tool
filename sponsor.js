/* Sponsor pack v1. localStorage key: imagec.sponsorPack.
   Only IMAGEC-COFFEE-01 … IMAGEC-COFFEE-05 record the pack.
   IMAGEC-LATIAO codes do not. Clearing storage removes it. */
(function () {
  var KEY = "imagec.sponsorPack";
  var CODES = {
    "IMAGEC-COFFEE-01": 1,
    "IMAGEC-COFFEE-02": 1,
    "IMAGEC-COFFEE-03": 1,
    "IMAGEC-COFFEE-04": 1,
    "IMAGEC-COFFEE-05": 1
  };
  var LANGS = [
    {code:"zh",name:"中文",dir:"ltr"},
    {code:"en",name:"English",dir:"ltr"},
    {code:"ja",name:"日本語",dir:"ltr"},
    {code:"ko",name:"한국어",dir:"ltr"},
    {code:"es",name:"Español",dir:"ltr"},
    {code:"fr",name:"Français",dir:"ltr"},
    {code:"de",name:"Deutsch",dir:"ltr"},
    {code:"ru",name:"Русский",dir:"ltr"},
    {code:"pt",name:"Português",dir:"ltr"},
    {code:"ar",name:"العربية",dir:"rtl"},
    {code:"vi",name:"Tiếng Việt",dir:"ltr"},
    {code:"id",name:"Bahasa Indonesia",dir:"ltr"},
    {code:"th",name:"ไทย",dir:"ltr"}
  ];
  var LANG_SET = {};
  LANGS.forEach(function (item) { LANG_SET[item.code] = item; });

  function normalize(value) {
    return String(value == null ? "" : value).replace(/[\s\u00a0\u200b]/g, "").toUpperCase();
  }

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.unlocked !== true || !CODES[data.code]) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function isUnlocked() {
    return !!read();
  }

  function redeem(input) {
    var code = normalize(input);
    if (!code) return { ok: false, reason: "empty" };
    if (code.indexOf("IMAGEC-LATIAO") === 0) return { ok: false, reason: "latiao" };
    if (!CODES[code]) return { ok: false, reason: "invalid" };
    var data = { unlocked: true, pack: "sponsor", code: code };
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      if (localStorage.getItem(KEY) !== JSON.stringify(data)) return { ok: false, reason: "storage" };
    } catch (e) {
      return { ok: false, reason: "storage" };
    }
    return { ok: true, code: code };
  }

  function detectLang() {
    try {
      var param = new URL(location.href).searchParams.get("lang");
      if (param && LANG_SET[param]) return param;
    } catch (e) {}
    try {
      var saved = localStorage.getItem("language");
      if (saved && LANG_SET[saved]) return saved;
    } catch (e2) {}
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").toLowerCase().slice(0, 2);
      if (code === "zh") return "zh";
      if (LANG_SET[code]) return code;
    }
    return "en";
  }

  function applyLang(code) {
    var item = LANG_SET[code] || LANG_SET.en;
    try { localStorage.setItem("language", item.code); } catch (e) {}
    document.documentElement.lang = item.code === "zh" ? "zh-CN" : item.code;
    document.documentElement.dir = item.dir;
  }

  function bootLang() {
    var sel = document.getElementById("langSelect");
    if (!sel) return;
    var lang = detectLang();
    applyLang(lang);
    if (!sel.options.length) {
      LANGS.forEach(function (item) {
        var opt = document.createElement("option");
        opt.value = item.code;
        opt.textContent = item.name;
        sel.appendChild(opt);
      });
    }
    sel.value = lang;
    sel.addEventListener("change", function () {
      applyLang(sel.value);
      if (window.imagecApplyChrome) window.imagecApplyChrome();
      if (typeof window.imagecSponsorOnLang === "function") window.imagecSponsorOnLang();
    });
  }

  window.imagecSponsor = {
    KEY: KEY,
    isUnlocked: isUnlocked,
    redeem: redeem,
    read: read,
    bootLang: bootLang
  };
})();
