/* Canonical tool cards. Home and every related-tools grid render from here. */
(function () {
  var SVG_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">';
  var TOOLS = [
    {file:"whitebg.html", keywords:"背景 去白 透明 png 白底 remove white background", titleKey:"cardWhitebgTitle", title:"去白底", descKey:"cardWhitebgDesc", desc:"把白色背景变成透明 PNG", svg:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 15.5 11 12l2 2 2.5-3L18 15.5"/>'},
    {file:"compress.html", keywords:"压缩 减小 体积 png jpg webp compress", titleKey:"cardCompressTitle", title:"图片压缩", descKey:"cardCompressDesc", desc:"缩小 PNG、JPG、WebP，尽量保住画质", svg:'<path d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4M7 12h10"/>'},
    {file:"convert.html", keywords:"转换 格式 png jpg webp bmp convert", titleKey:"cardConvertTitle", title:"格式转换", descKey:"cardConvertDesc", desc:"PNG、JPG、WebP、BMP 互转", svg:'<path d="M4 7h11l-2.5-2.5M20 17H9l2.5 2.5"/><path d="M15 4.5 17.5 7 15 9.5M9 14.5 6.5 17 9 19.5"/>'},
    {file:"crop.html", keywords:"裁剪 缩放 尺寸 crop resize", titleKey:"cardCropTitle", title:"裁剪缩放", descKey:"cardCropDesc", desc:"裁切一块，或改成指定尺寸", svg:'<path d="M7 3v12a2 2 0 0 0 2 2h12"/><path d="M3 7h12a2 2 0 0 1 2 2v12"/>'},
    {file:"idphoto.html", keywords:"证件照 蓝底 白底 红底 id photo", titleKey:"cardIdphotoTitle", title:"证件照换底", descKey:"cardIdphotoDesc", desc:"蓝底、白底、红底证件照", svg:'<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="10" cy="11" r="2"/><path d="M7 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14 10h3M14 13h3"/>'},
    {file:"watermark.html", keywords:"水印 watermark", titleKey:"cardWatermarkTitle", title:"加水印", descKey:"cardWatermarkDesc", desc:"加文字或图片水印", svg:'<path d="M5 19 19 5"/><path d="M8 6h.01M6 8h.01M16 16h.01M18 18h.01"/>'},
    {file:"bgcolor.html", keywords:"背景色 透明 png 纯色 渐变 background color", titleKey:"cardBgcolorTitle", title:"换背景色", descKey:"cardBgcolorDesc", desc:"给透明图铺纯色或渐变", svg:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>'},
    {file:"splice.html", keywords:"拼接 长图 stitch", titleKey:"cardSpliceTitle", title:"图片拼接", descKey:"cardSpliceDesc", desc:"把多张图拼成一张", svg:'<rect x="3" y="5" width="7" height="14" rx="1.5"/><rect x="14" y="5" width="7" height="14" rx="1.5"/>'},
    {file:"img2pdf.html", keywords:"pdf 转pdf", titleKey:"cardPdfTitle", title:"图片转 PDF", descKey:"cardPdfDesc", desc:"把多张图合成一个 PDF", svg:'<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8 15h8M8 18h5"/>'},
    {file:"filter.html", keywords:"滤镜 亮度 对比度 饱和度 filter", titleKey:"cardFilterTitle", title:"滤镜调色", descKey:"cardFilterDesc", desc:"亮度、对比度、饱和度和预设滤镜", svg:'<path d="M4 7h16M7 12h10M10 17h4"/>'}
  ];

  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  function cardHtml(tool) {
    return '<a href="/' + tool.file + '" class="toolCard" data-keywords="' + esc(tool.keywords) + '">' +
      '<span class="tc-icon">' + SVG_OPEN + tool.svg + '</svg></span>' +
      '<span class="tc-body"><strong data-i18n="' + tool.titleKey + '">' + esc(tool.title) + '</strong>' +
      '<span class="tc-desc" data-i18n="' + tool.descKey + '">' + esc(tool.desc) + '</span></span></a>';
  }

  function pageFile() {
    var path = (location.pathname || "/").split("/").pop() || "";
    if (!path || path === "index.html") return "";
    if (path.indexOf(".") === -1) path += ".html";
    return path.toLowerCase();
  }

  function mount(root, excludeFile) {
    if (!root) return;
    var html = "";
    for (var i = 0; i < TOOLS.length; i++) {
      if (excludeFile && TOOLS[i].file === excludeFile) continue;
      html += cardHtml(TOOLS[i]);
    }
    root.innerHTML = html;
    root.setAttribute("data-cards-source", "tool-cards");
  }

  function mountAll() {
    var home = document.getElementById("toolsGrid");
    if (home && document.body.classList.contains("home")) mount(home, "");
    var current = pageFile();
    var grids = document.querySelectorAll("[data-tool-cards]");
    for (var i = 0; i < grids.length; i++) {
      if (grids[i] === home) continue;
      mount(grids[i], current);
    }
  }

  window.imagecToolCards = {tools: TOOLS, mountAll: mountAll};
})();
