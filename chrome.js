/* Shared chrome copy, one-language pass, advanced-params fold, and inline errors. */
(function () {
  var CHROME = {
    zh: {heroTitle:"免费在线图片工具",heroSubtitle:"所有工具都是在本地处理，图片不会上传。",searchTools:"搜索工具",advanced:"调整参数",adText:"广告合作",adCta:"联系招商",sponsorText:"这些工具免费。如果帮到你，可以",sponsorCta:"发电支持",blogLabel:"使用指南",nameWhitebg:"去白底",nameCompress:"图片压缩",nameConvert:"格式转换",nameCrop:"裁剪缩放",nameId:"证件照换底",nameWm:"加水印",nameBg:"换背景色",nameSplice:"图片拼接",namePdf:"图片转 PDF",nameFilter:"滤镜调色",descWhitebg:"把白色背景变成透明 PNG",descCompress:"缩小 PNG、JPG、WebP，尽量保住画质",descConvert:"PNG、JPG、WebP、BMP 互转",descCrop:"裁切一块，或改成指定尺寸",descId:"蓝底、白底、红底证件照",descWm:"加文字或图片水印",descBg:"给透明图铺纯色或渐变",descSplice:"把多张图拼成一张",descPdf:"把多张图合成一个 PDF",descFilter:"亮度、对比度、饱和度和预设滤镜",relatedTools:"更多图片工具",moreTools:"更多图片工具",relatedTitle:"更多图片工具",swatchWhite:"白色",swatchBlue:"蓝色",swatchRed:"红色",swatchLight:"浅蓝",swatchBlack:"黑色",swatchGreen:"绿色",swatchYellow:"黄色",errType:"这个文件不是支持的图片格式。请换一张 PNG、JPG 或 WebP。",errLoad:"图片加载失败，可能是格式不支持或文件已损坏。",errWm:"水印图片加载失败，请换一张 PNG 或 JPG。",errCrop:"请先在图片上拖拽，选出要保留的区域。",blog1Tag:"去白底",blog1Title:"怎样去掉图片的白底",blog1Desc:"商品图、签名和 Logo 如何只去掉白色背景，并导出透明 PNG。",blog2Tag:"商品图",blog2Title:"商品图白底怎么处理",blog2Desc:"淘宝、拼多多、京东主图去白底，导出透明 PNG。",blog3Tag:"证件照",blog3Title:"在线做证件照换底",blog3Desc:"蓝底、白底、红底证件照的换底步骤。"},
    en: {heroTitle:"Free online image tools",heroSubtitle:"All tools run locally. Images are not uploaded.",searchTools:"Search tools",advanced:"Adjust settings",adText:"Advertising",adCta:"Contact us",sponsorText:"These tools are free. If they helped,",sponsorCta:"support the project",blogLabel:"Guides",nameWhitebg:"Remove white background",nameCompress:"Compress",nameConvert:"Convert format",nameCrop:"Crop and resize",nameId:"ID photo background",nameWm:"Watermark",nameBg:"Change background color",nameSplice:"Stitch images",namePdf:"Image to PDF",nameFilter:"Filters",descWhitebg:"Turn a white background into a transparent PNG",descCompress:"Shrink PNG, JPG, and WebP while keeping detail",descConvert:"Convert between PNG, JPG, WebP, and BMP",descCrop:"Crop a region or resize to exact dimensions",descId:"Blue, white, or red ID-photo backgrounds",descWm:"Add a text or image watermark",descBg:"Fill a transparent image with a solid color or gradient",descSplice:"Join several images into one",descPdf:"Combine images into one PDF",descFilter:"Brightness, contrast, saturation, and presets",relatedTools:"More image tools",moreTools:"More image tools",relatedTitle:"More image tools",swatchWhite:"White",swatchBlue:"Blue",swatchRed:"Red",swatchLight:"Light blue",swatchBlack:"Black",swatchGreen:"Green",swatchYellow:"Yellow",errType:"That file is not a supported image. Use PNG, JPG, or WebP.",errLoad:"Could not load the image. The format may be unsupported or the file is damaged.",errWm:"Could not load the watermark image. Try a PNG or JPG.",errCrop:"Drag on the image to choose the area you want to keep.",blog1Tag:"White background",blog1Title:"How to remove a white background",blog1Desc:"Turn product photos, signatures, and logos into transparent PNGs.",blog2Tag:"Compress",blog2Title:"Compress a PNG under 100KB",blog2Desc:"How the free options differ, and how to compress locally in the browser.",blog3Tag:"ID photo",blog3Title:"Change an ID photo background online",blog3Desc:"Blue, white, and red backgrounds, and how this differs from removing white."},
    ja: {heroTitle:"無料のオンライン画像ツール",heroSubtitle:"すべてのツールは端末内で処理します。画像はアップロードされません。",searchTools:"ツールを検索",advanced:"設定を調整",adText:"広告",adCta:"お問い合わせ",sponsorText:"ツールは無料です。役に立ったら",sponsorCta:"プロジェクトを支援",blogLabel:"ガイド",nameWhitebg:"白背景を透明に",nameCompress:"画像圧縮",nameConvert:"形式変換",nameCrop:"切り抜き・サイズ変更",nameId:"証明写真の背景",nameWm:"透かし",nameBg:"背景色の変更",nameSplice:"画像結合",namePdf:"画像をPDF",nameFilter:"フィルター",descWhitebg:"白い背景を透明PNGにします",descCompress:"PNG / JPG / WebPを画質を保って縮小",descConvert:"PNG / JPG / WebP / BMPを相互変換",descCrop:"範囲を切り抜くか、指定サイズに変更",descId:"青・白・赤の証明写真背景",descWm:"文字または画像の透かしを追加",descBg:"透明画像に単色またはグラデーションを敷く",descSplice:"複数の画像を1枚に結合",descPdf:"複数の画像を1つのPDFに",descFilter:"明るさ、コントラスト、彩度とプリセット",relatedTools:"ほかの画像ツール",moreTools:"ほかの画像ツール",relatedTitle:"ほかの画像ツール",swatchWhite:"白",swatchBlue:"青",swatchRed:"赤",swatchLight:"薄い青",swatchBlack:"黒",swatchGreen:"緑",swatchYellow:"黄",errType:"対応していないファイルです。PNG、JPG、WebPを選んでください。",errLoad:"画像を読み込めませんでした。形式が未対応か、ファイルが破損しています。",errWm:"透かし画像を読み込めませんでした。PNGかJPGを試してください。",errCrop:"残したい範囲を、画像上でドラッグして選んでください。",blog1Tag:"白背景",blog1Title:"白い背景を消す方法",blog1Desc:"商品画像や署名、ロゴを透明PNGにする手順です。",blog2Tag:"圧縮",blog2Title:"PNGを100KB以下に圧縮",blog2Desc:"無料の方法の違いと、ブラウザ内で圧縮する方法です。",blog3Tag:"証明写真",blog3Title:"証明写真の背景をオンラインで変更",blog3Desc:"青・白・赤の違いと、白背景の透過との違いです。"},
    ko: {heroTitle:"무료 온라인 이미지 도구",heroSubtitle:"모든 도구는 기기에서 처리합니다. 이미지는 업로드되지 않습니다.",searchTools:"도구 검색",advanced:"설정 조정",adText:"광고",adCta:"문의",sponsorText:"도구는 무료입니다. 도움이 되었다면",sponsorCta:"프로젝트 후원",blogLabel:"가이드",nameWhitebg:"흰 배경 제거",nameCompress:"이미지 압축",nameConvert:"형식 변환",nameCrop:"자르기·크기 조절",nameId:"증명사진 배경",nameWm:"워터마크",nameBg:"배경색 변경",nameSplice:"이미지 잇기",namePdf:"이미지를 PDF로",nameFilter:"필터",descWhitebg:"흰 배경을 투명 PNG로 바꿉니다",descCompress:"PNG, JPG, WebP를 화질을 지키며 줄입니다",descConvert:"PNG, JPG, WebP, BMP를 서로 변환",descCrop:"영역을 자르거나 지정 크기로 바꿉니다",descId:"파랑, 흰색, 빨강 증명사진 배경",descWm:"글자 또는 이미지 워터마크",descBg:"투명 이미지에 단색이나 그라데이션",descSplice:"여러 이미지를 하나로 잇습니다",descPdf:"여러 이미지를 PDF 하나로",descFilter:"밝기, 대비, 채도와 프리셋",relatedTools:"다른 이미지 도구",moreTools:"다른 이미지 도구",relatedTitle:"다른 이미지 도구",swatchWhite:"흰색",swatchBlue:"파랑",swatchRed:"빨강",swatchLight:"연한 파랑",swatchBlack:"검정",swatchGreen:"초록",swatchYellow:"노랑",errType:"지원하지 않는 파일입니다. PNG, JPG 또는 WebP를 사용하세요.",errLoad:"이미지를 열 수 없습니다. 형식이 맞지 않거나 파일이 손상되었습니다.",errWm:"워터마크 이미지를 열 수 없습니다. PNG 또는 JPG를 사용해 보세요.",errCrop:"남길 영역을 이미지 위에서 드래그하세요.",blog1Tag:"흰 배경",blog1Title:"흰 배경을 지우는 방법",blog1Desc:"상품 사진, 서명, 로고를 투명 PNG로 만드는 방법입니다.",blog2Tag:"압축",blog2Title:"PNG를 100KB 이하로 압축",blog2Desc:"무료 방법의 차이와 브라우저에서 압축하는 방법입니다.",blog3Tag:"증명사진",blog3Title:"온라인으로 증명사진 배경 바꾸기",blog3Desc:"파랑, 흰색, 빨강 배경과 흰 배경 제거의 차이입니다."},
    es: {heroTitle:"Herramientas de imagen gratis",heroSubtitle:"Todas las herramientas se procesan en local. Las imágenes no se suben.",searchTools:"Buscar herramientas",advanced:"Ajustar opciones",adText:"Publicidad",adCta:"Contacto",sponsorText:"Las herramientas son gratis. Si te ayudaron,",sponsorCta:"apoya el proyecto",blogLabel:"Guías",nameWhitebg:"Quitar fondo blanco",nameCompress:"Comprimir",nameConvert:"Convertir formato",nameCrop:"Recortar y redimensionar",nameId:"Fondo de foto de carnet",nameWm:"Marca de agua",nameBg:"Cambiar color de fondo",nameSplice:"Unir imágenes",namePdf:"Imagen a PDF",nameFilter:"Filtros",descWhitebg:"Convierte el fondo blanco en un PNG transparente",descCompress:"Reduce PNG, JPG y WebP conservando detalle",descConvert:"Convierte entre PNG, JPG, WebP y BMP",descCrop:"Recorta una zona o cambia a un tamaño exacto",descId:"Fondos azul, blanco o rojo para foto de carnet",descWm:"Añade una marca de texto o imagen",descBg:"Rellena una imagen transparente con color o degradado",descSplice:"Une varias imágenes en una",descPdf:"Combina imágenes en un PDF",descFilter:"Brillo, contraste, saturación y ajustes",relatedTools:"Más herramientas",moreTools:"Más herramientas",relatedTitle:"Más herramientas",swatchWhite:"Blanco",swatchBlue:"Azul",swatchRed:"Rojo",swatchLight:"Azul claro",swatchBlack:"Negro",swatchGreen:"Verde",swatchYellow:"Amarillo",errType:"Ese archivo no es una imagen compatible. Usa PNG, JPG o WebP.",errLoad:"No se pudo abrir la imagen. El formato no es compatible o el archivo está dañado.",errWm:"No se pudo abrir la marca de agua. Prueba con PNG o JPG.",errCrop:"Arrastra sobre la imagen para elegir la zona que quieres conservar.",blog1Tag:"Fondo blanco",blog1Title:"Cómo quitar un fondo blanco",blog1Desc:"Pasa fotos de producto, firmas y logos a PNG transparente.",blog2Tag:"Comprimir",blog2Title:"Comprimir un PNG por debajo de 100KB",blog2Desc:"En qué se diferencian las opciones gratis y cómo comprimir en el navegador.",blog3Tag:"Foto de carnet",blog3Title:"Cambiar el fondo de una foto de carnet",blog3Desc:"Fondos azul, blanco y rojo, y en qué se diferencia de quitar el blanco."},
    fr: {heroTitle:"Outils image gratuits",heroSubtitle:"Tous les outils sont traités en local. Les images ne sont pas envoyées.",searchTools:"Rechercher un outil",advanced:"Régler les options",adText:"Publicité",adCta:"Contact",sponsorText:"Les outils sont gratuits. S'ils vous ont aidé,",sponsorCta:"soutenez le projet",blogLabel:"Guides",nameWhitebg:"Retirer le fond blanc",nameCompress:"Compresser",nameConvert:"Convertir le format",nameCrop:"Rogner et redimensionner",nameId:"Fond de photo d'identité",nameWm:"Filigrane",nameBg:"Changer la couleur de fond",nameSplice:"Assembler des images",namePdf:"Image en PDF",nameFilter:"Filtres",descWhitebg:"Transforme un fond blanc en PNG transparent",descCompress:"Réduit PNG, JPG et WebP en gardant le détail",descConvert:"Convertit entre PNG, JPG, WebP et BMP",descCrop:"Rogner une zone ou viser une taille précise",descId:"Fonds bleu, blanc ou rouge pour photo d'identité",descWm:"Ajouter un filigrane texte ou image",descBg:"Remplir une image transparente d'une couleur ou d'un dégradé",descSplice:"Réunir plusieurs images en une",descPdf:"Combiner des images dans un PDF",descFilter:"Luminosité, contraste, saturation et préréglages",relatedTools:"Autres outils",moreTools:"Autres outils",relatedTitle:"Autres outils",swatchWhite:"Blanc",swatchBlue:"Bleu",swatchRed:"Rouge",swatchLight:"Bleu clair",swatchBlack:"Noir",swatchGreen:"Vert",swatchYellow:"Jaune",errType:"Ce fichier n'est pas une image prise en charge. Utilisez PNG, JPG ou WebP.",errLoad:"Impossible d'ouvrir l'image. Format non pris en charge ou fichier endommagé.",errWm:"Impossible d'ouvrir le filigrane. Essayez un PNG ou un JPG.",errCrop:"Faites glisser sur l'image pour choisir la zone à garder.",blog1Tag:"Fond blanc",blog1Title:"Comment retirer un fond blanc",blog1Desc:"Passer photos produit, signatures et logos en PNG transparent.",blog2Tag:"Compresser",blog2Title:"Compresser un PNG sous 100 Ko",blog2Desc:"Les différences entre options gratuites, et la compression dans le navigateur.",blog3Tag:"Photo d'identité",blog3Title:"Changer le fond d'une photo d'identité",blog3Desc:"Fonds bleu, blanc et rouge, et la différence avec le retrait du blanc."},
    de: {heroTitle:"Kostenlose Online-Bildwerkzeuge",heroSubtitle:"Alle Werkzeuge arbeiten lokal. Bilder werden nicht hochgeladen.",searchTools:"Werkzeuge suchen",advanced:"Einstellungen anpassen",adText:"Werbung",adCta:"Kontakt",sponsorText:"Die Werkzeuge sind kostenlos. Wenn sie geholfen haben,",sponsorCta:"unterstützen Sie das Projekt",blogLabel:"Anleitungen",nameWhitebg:"Weißen Hintergrund entfernen",nameCompress:"Komprimieren",nameConvert:"Format umwandeln",nameCrop:"Zuschneiden und skalieren",nameId:"Ausweisfoto-Hintergrund",nameWm:"Wasserzeichen",nameBg:"Hintergrundfarbe ändern",nameSplice:"Bilder zusammenfügen",namePdf:"Bild zu PDF",nameFilter:"Filter",descWhitebg:"Macht einen weißen Hintergrund zu einem transparenten PNG",descCompress:"PNG, JPG und WebP verkleinern und Details behalten",descConvert:"Zwischen PNG, JPG, WebP und BMP wandeln",descCrop:"Einen Bereich ausschneiden oder auf ein Maß skalieren",descId:"Blaue, weiße oder rote Ausweisfoto-Hintergründe",descWm:"Text- oder Bildwasserzeichen setzen",descBg:"Ein transparentes Bild mit Farbe oder Verlauf füllen",descSplice:"Mehrere Bilder zu einem verbinden",descPdf:"Bilder in ein PDF legen",descFilter:"Helligkeit, Kontrast, Sättigung und Vorgaben",relatedTools:"Weitere Werkzeuge",moreTools:"Weitere Werkzeuge",relatedTitle:"Weitere Werkzeuge",swatchWhite:"Weiß",swatchBlue:"Blau",swatchRed:"Rot",swatchLight:"Hellblau",swatchBlack:"Schwarz",swatchGreen:"Grün",swatchYellow:"Gelb",errType:"Diese Datei ist kein unterstütztes Bild. Bitte PNG, JPG oder WebP verwenden.",errLoad:"Bild konnte nicht geladen werden. Format nicht unterstützt oder Datei beschädigt.",errWm:"Wasserzeichenbild konnte nicht geladen werden. Bitte PNG oder JPG versuchen.",errCrop:"Ziehen Sie auf dem Bild, um den Bereich zu wählen, der bleiben soll.",blog1Tag:"Weißer Hintergrund",blog1Title:"Weißen Hintergrund entfernen",blog1Desc:"Produktfotos, Unterschriften und Logos als transparentes PNG.",blog2Tag:"Komprimieren",blog2Title:"PNG unter 100 KB komprimieren",blog2Desc:"Unterschiede der kostenlosen Wege und lokales Komprimieren im Browser.",blog3Tag:"Ausweisfoto",blog3Title:"Ausweisfoto-Hintergrund online ändern",blog3Desc:"Blau, Weiß und Rot, und der Unterschied zum Entfernen von Weiß."},
    ru: {heroTitle:"Бесплатные онлайн-инструменты для изображений",heroSubtitle:"Все инструменты работают локально. Изображения не загружаются.",searchTools:"Найти инструмент",advanced:"Настроить параметры",adText:"Реклама",adCta:"Связаться",sponsorText:"Инструменты бесплатны. Если они помогли,",sponsorCta:"поддержите проект",blogLabel:"Руководства",nameWhitebg:"Убрать белый фон",nameCompress:"Сжать",nameConvert:"Конвертировать формат",nameCrop:"Обрезать и масштабировать",nameId:"Фон фото на документы",nameWm:"Водяной знак",nameBg:"Изменить цвет фона",nameSplice:"Склеить изображения",namePdf:"Изображение в PDF",nameFilter:"Фильтры",descWhitebg:"Превращает белый фон в прозрачный PNG",descCompress:"Уменьшает PNG, JPG и WebP, сохраняя детали",descConvert:"Конвертация между PNG, JPG, WebP и BMP",descCrop:"Обрезать область или задать точный размер",descId:"Синий, белый или красный фон для документов",descWm:"Добавить текстовый или графический знак",descBg:"Залить прозрачное изображение цветом или градиентом",descSplice:"Собрать несколько изображений в одно",descPdf:"Объединить изображения в один PDF",descFilter:"Яркость, контраст, насыщенность и пресеты",relatedTools:"Другие инструменты",moreTools:"Другие инструменты",relatedTitle:"Другие инструменты",swatchWhite:"Белый",swatchBlue:"Синий",swatchRed:"Красный",swatchLight:"Голубой",swatchBlack:"Чёрный",swatchGreen:"Зелёный",swatchYellow:"Жёлтый",errType:"Этот файл не является поддерживаемым изображением. Используйте PNG, JPG или WebP.",errLoad:"Не удалось открыть изображение. Формат не поддерживается или файл повреждён.",errWm:"Не удалось открыть изображение водяного знака. Попробуйте PNG или JPG.",errCrop:"Проведите по изображению, чтобы выбрать область, которую нужно оставить.",blog1Tag:"Белый фон",blog1Title:"Как убрать белый фон",blog1Desc:"Как сделать прозрачный PNG из товара, подписи или логотипа.",blog2Tag:"Сжатие",blog2Title:"Сжать PNG меньше 100 КБ",blog2Desc:"Чем отличаются бесплатные способы и как сжать локально в браузере.",blog3Tag:"Фото на документы",blog3Title:"Сменить фон фото на документы онлайн",blog3Desc:"Синий, белый и красный фон и отличие от удаления белого."},
    pt: {heroTitle:"Ferramentas de imagem grátis",heroSubtitle:"Todas as ferramentas são processadas localmente. As imagens não são enviadas.",searchTools:"Buscar ferramentas",advanced:"Ajustar opções",adText:"Publicidade",adCta:"Contacto",sponsorText:"As ferramentas são grátis. Se ajudaram,",sponsorCta:"apoie o projeto",blogLabel:"Guias",nameWhitebg:"Remover fundo branco",nameCompress:"Comprimir",nameConvert:"Converter formato",nameCrop:"Recortar e redimensionar",nameId:"Fundo de foto de documento",nameWm:"Marca d'água",nameBg:"Mudar cor de fundo",nameSplice:"Juntar imagens",namePdf:"Imagem para PDF",nameFilter:"Filtros",descWhitebg:"Transforma o fundo branco num PNG transparente",descCompress:"Reduz PNG, JPG e WebP mantendo o detalhe",descConvert:"Converte entre PNG, JPG, WebP e BMP",descCrop:"Recorta uma área ou muda para um tamanho exato",descId:"Fundos azul, branco ou vermelho para documento",descWm:"Adiciona marca de texto ou imagem",descBg:"Preenche uma imagem transparente com cor ou gradiente",descSplice:"Junta várias imagens numa",descPdf:"Combina imagens num PDF",descFilter:"Brilho, contraste, saturação e predefinições",relatedTools:"Mais ferramentas",moreTools:"Mais ferramentas",relatedTitle:"Mais ferramentas",swatchWhite:"Branco",swatchBlue:"Azul",swatchRed:"Vermelho",swatchLight:"Azul-claro",swatchBlack:"Preto",swatchGreen:"Verde",swatchYellow:"Amarelo",errType:"Esse ficheiro não é uma imagem suportada. Use PNG, JPG ou WebP.",errLoad:"Não foi possível abrir a imagem. Formato não suportado ou ficheiro danificado.",errWm:"Não foi possível abrir a marca d'água. Tente PNG ou JPG.",errCrop:"Arraste sobre a imagem para escolher a área a manter.",blog1Tag:"Fundo branco",blog1Title:"Como remover um fundo branco",blog1Desc:"Fotos de produto, assinaturas e logos em PNG transparente.",blog2Tag:"Comprimir",blog2Title:"Comprimir um PNG abaixo de 100KB",blog2Desc:"Diferenças entre opções grátis e como comprimir no navegador.",blog3Tag:"Foto de documento",blog3Title:"Mudar o fundo de uma foto de documento",blog3Desc:"Fundos azul, branco e vermelho, e a diferença para remover o branco."},
    ar: {heroTitle:"أدوات صور مجانية عبر الإنترنت",heroSubtitle:"تُعالَج كل الأدوات محلياً. لا يتم رفع الصور.",searchTools:"ابحث عن أداة",advanced:"ضبط الإعدادات",adText:"إعلان",adCta:"تواصل معنا",sponsorText:"الأدوات مجانية. إذا أفادتك",sponsorCta:"ادعم المشروع",blogLabel:"أدلة",nameWhitebg:"إزالة الخلفية البيضاء",nameCompress:"ضغط الصور",nameConvert:"تحويل الصيغة",nameCrop:"قص وتغيير الحجم",nameId:"خلفية صورة الهوية",nameWm:"علامة مائية",nameBg:"تغيير لون الخلفية",nameSplice:"دمج الصور",namePdf:"صورة إلى PDF",nameFilter:"فلاتر",descWhitebg:"يحوّل الخلفية البيضاء إلى PNG شفاف",descCompress:"يصغّر PNG وJPG وWebP مع إبقاء التفاصيل",descConvert:"التحويل بين PNG وJPG وWebP وBMP",descCrop:"قص منطقة أو ضبط قياس محدد",descId:"خلفيات زرقاء أو بيضاء أو حمراء لصور الهوية",descWm:"إضافة علامة نصية أو صورية",descBg:"ملء صورة شفافة بلون أو تدرج",descSplice:"جمع عدة صور في صورة واحدة",descPdf:"جمع الصور في ملف PDF واحد",descFilter:"السطوع والتباين والتشبع والإعدادات الجاهزة",relatedTools:"المزيد من الأدوات",moreTools:"المزيد من الأدوات",relatedTitle:"المزيد من الأدوات",swatchWhite:"أبيض",swatchBlue:"أزرق",swatchRed:"أحمر",swatchLight:"أزرق فاتح",swatchBlack:"أسود",swatchGreen:"أخضر",swatchYellow:"أصفر",errType:"هذا الملف ليس صورة مدعومة. استخدم PNG أو JPG أو WebP.",errLoad:"تعذر فتح الصورة. قد تكون الصيغة غير مدعومة أو الملف تالفاً.",errWm:"تعذر فتح صورة العلامة المائية. جرّب PNG أو JPG.",errCrop:"اسحب على الصورة لتحديد المنطقة التي تريد الإبقاء عليها.",blog1Tag:"خلفية بيضاء",blog1Title:"كيف تزيل خلفية بيضاء",blog1Desc:"تحويل صور المنتجات والتواقيع والشعارات إلى PNG شفاف.",blog2Tag:"ضغط",blog2Title:"ضغط PNG إلى أقل من 100 كيلوبايت",blog2Desc:"الفرق بين الطرق المجانية وكيف تضغط الصورة داخل المتصفح.",blog3Tag:"صورة هوية",blog3Title:"تغيير خلفية صورة الهوية عبر الإنترنت",blog3Desc:"الخلفية الزرقاء والبيضاء والحمراء، والفرق عن إزالة الأبيض."},
    vi: {heroTitle:"Công cụ ảnh trực tuyến miễn phí",heroSubtitle:"Mọi công cụ đều xử lý tại máy. Ảnh không được tải lên.",searchTools:"Tìm công cụ",advanced:"Chỉnh thông số",adText:"Quảng cáo",adCta:"Liên hệ",sponsorText:"Công cụ miễn phí. Nếu chúng hữu ích,",sponsorCta:"ủng hộ dự án",blogLabel:"Hướng dẫn",nameWhitebg:"Xóa nền trắng",nameCompress:"Nén ảnh",nameConvert:"Chuyển định dạng",nameCrop:"Cắt và đổi kích thước",nameId:"Nền ảnh thẻ",nameWm:"Đóng dấu ảnh",nameBg:"Đổi màu nền",nameSplice:"Ghép ảnh",namePdf:"Ảnh sang PDF",nameFilter:"Bộ lọc",descWhitebg:"Đổi nền trắng thành PNG trong suốt",descCompress:"Thu nhỏ PNG, JPG, WebP mà vẫn giữ chi tiết",descConvert:"Chuyển qua lại PNG, JPG, WebP, BMP",descCrop:"Cắt một vùng hoặc đổi đúng kích thước",descId:"Nền xanh, trắng hoặc đỏ cho ảnh thẻ",descWm:"Thêm dấu chữ hoặc hình",descBg:"Phủ màu hoặc chuyển sắc lên ảnh trong suốt",descSplice:"Ghép nhiều ảnh thành một",descPdf:"Gộp ảnh thành một PDF",descFilter:"Độ sáng, tương phản, bão hòa và mẫu sẵn",relatedTools:"Công cụ khác",moreTools:"Công cụ khác",relatedTitle:"Công cụ khác",swatchWhite:"Trắng",swatchBlue:"Xanh dương",swatchRed:"Đỏ",swatchLight:"Xanh nhạt",swatchBlack:"Đen",swatchGreen:"Xanh lá",swatchYellow:"Vàng",errType:"Tệp này không phải ảnh được hỗ trợ. Hãy dùng PNG, JPG hoặc WebP.",errLoad:"Không mở được ảnh. Định dạng không hỗ trợ hoặc tệp đã hỏng.",errWm:"Không mở được ảnh dấu. Hãy thử PNG hoặc JPG.",errCrop:"Kéo trên ảnh để chọn vùng cần giữ lại.",blog1Tag:"Nền trắng",blog1Title:"Cách xóa nền trắng",blog1Desc:"Đưa ảnh sản phẩm, chữ ký và logo thành PNG trong suốt.",blog2Tag:"Nén",blog2Title:"Nén PNG xuống dưới 100KB",blog2Desc:"Khác biệt giữa các cách miễn phí và cách nén ngay trong trình duyệt.",blog3Tag:"Ảnh thẻ",blog3Title:"Đổi nền ảnh thẻ trực tuyến",blog3Desc:"Nền xanh, trắng, đỏ, và khác gì với xóa nền trắng."},
    id: {heroTitle:"Alat gambar online gratis",heroSubtitle:"Semua alat diproses secara lokal. Gambar tidak diunggah.",searchTools:"Cari alat",advanced:"Sesuaikan pengaturan",adText:"Iklan",adCta:"Hubungi kami",sponsorText:"Alat ini gratis. Jika membantu,",sponsorCta:"dukung proyek",blogLabel:"Panduan",nameWhitebg:"Hapus latar putih",nameCompress:"Kompres",nameConvert:"Konversi format",nameCrop:"Pangkas dan ubah ukuran",nameId:"Latar foto identitas",nameWm:"Tanda air",nameBg:"Ubah warna latar",nameSplice:"Gabung gambar",namePdf:"Gambar ke PDF",nameFilter:"Filter",descWhitebg:"Mengubah latar putih menjadi PNG transparan",descCompress:"Perkecil PNG, JPG, dan WebP sambil menjaga detail",descConvert:"Konversi antara PNG, JPG, WebP, dan BMP",descCrop:"Pangkas area atau ubah ke ukuran pasti",descId:"Latar biru, putih, atau merah untuk foto identitas",descWm:"Tambah tanda air teks atau gambar",descBg:"Isi gambar transparan dengan warna atau gradien",descSplice:"Gabungkan beberapa gambar menjadi satu",descPdf:"Satukan gambar ke dalam satu PDF",descFilter:"Kecerahan, kontras, saturasi, dan preset",relatedTools:"Alat gambar lain",moreTools:"Alat gambar lain",relatedTitle:"Alat gambar lain",swatchWhite:"Putih",swatchBlue:"Biru",swatchRed:"Merah",swatchLight:"Biru muda",swatchBlack:"Hitam",swatchGreen:"Hijau",swatchYellow:"Kuning",errType:"Berkas ini bukan gambar yang didukung. Gunakan PNG, JPG, atau WebP.",errLoad:"Gambar tidak bisa dibuka. Format tidak didukung atau berkas rusak.",errWm:"Gambar tanda air tidak bisa dibuka. Coba PNG atau JPG.",errCrop:"Seret pada gambar untuk memilih area yang ingin disimpan.",blog1Tag:"Latar putih",blog1Title:"Cara menghapus latar putih",blog1Desc:"Mengubah foto produk, tanda tangan, dan logo menjadi PNG transparan.",blog2Tag:"Kompres",blog2Title:"Kompres PNG di bawah 100KB",blog2Desc:"Perbedaan cara gratis dan cara mengompres di browser.",blog3Tag:"Foto identitas",blog3Title:"Ganti latar foto identitas secara online",blog3Desc:"Latar biru, putih, dan merah, serta bedanya dengan menghapus putih."},
    th: {heroTitle:"เครื่องมือรูปภาพออนไลน์ฟรี",heroSubtitle:"เครื่องมือทั้งหมดประมวลผลในเครื่อง รูปภาพจะไม่ถูกอัปโหลด",searchTools:"ค้นหาเครื่องมือ",advanced:"ปรับค่า",adText:"โฆษณา",adCta:"ติดต่อ",sponsorText:"เครื่องมือนี้ฟรี ถ้ามีประโยชน์",sponsorCta:"สนับสนุนโปรเจกต์",blogLabel:"คู่มือ",nameWhitebg:"เอาพื้นขาวออก",nameCompress:"บีบอัดรูป",nameConvert:"แปลงรูปแบบ",nameCrop:"ตัดและปรับขนาด",nameId:"พื้นหลังรูปติดบัตร",nameWm:"ลายน้ำ",nameBg:"เปลี่ยนสีพื้นหลัง",nameSplice:"ต่อรูป",namePdf:"รูปเป็น PDF",nameFilter:"ฟิลเตอร์",descWhitebg:"เปลี่ยนพื้นขาวเป็น PNG โปร่งใส",descCompress:"ย่อ PNG, JPG, WebP โดยยังคงรายละเอียด",descConvert:"แปลงระหว่าง PNG, JPG, WebP และ BMP",descCrop:"ตัดบางส่วน หรือปรับเป็นขนาดที่ต้องการ",descId:"พื้นฟ้า ขาว หรือแดงสำหรับรูปติดบัตร",descWm:"ใส่ลายน้ำตัวอักษรหรือรูป",descBg:"เติมสีพื้นหรือไล่สีให้รูปโปร่งใส",descSplice:"ต่อหลายรูปเป็นรูปเดียว",descPdf:"รวมหลายรูปเป็น PDF เดียว",descFilter:"ความสว่าง คอนทราสต์ ความอิ่มตัว และค่าสำเร็จรูป",relatedTools:"เครื่องมืออื่น",moreTools:"เครื่องมืออื่น",relatedTitle:"เครื่องมืออื่น",swatchWhite:"ขาว",swatchBlue:"น้ำเงิน",swatchRed:"แดง",swatchLight:"ฟ้าอ่อน",swatchBlack:"ดำ",swatchGreen:"เขียว",swatchYellow:"เหลือง",errType:"ไฟล์นี้ไม่ใช่รูปที่รองรับ โปรดใช้ PNG, JPG หรือ WebP",errLoad:"เปิดรูปไม่ได้ อาจเป็นรูปแบบที่ไม่รองรับหรือไฟล์เสีย",errWm:"เปิดรูปลายน้ำไม่ได้ ลองใช้ PNG หรือ JPG",errCrop:"ลากบนรูปเพื่อเลือกบริเวณที่ต้องการเก็บไว้",blog1Tag:"พื้นขาว",blog1Title:"วิธีเอาพื้นขาวออก",blog1Desc:"เปลี่ยนรูปสินค้า ลายเซ็น และโลโก้เป็น PNG โปร่งใส",blog2Tag:"บีบอัด",blog2Title:"บีบอัด PNG ให้ต่ำกว่า 100KB",blog2Desc:"วิธีฟรีแต่ละแบบต่างกันอย่างไร และบีบอัดในเบราว์เซอร์ได้อย่างไร",blog3Tag:"รูปติดบัตร",blog3Title:"เปลี่ยนพื้นหลังรูปติดบัตรออนไลน์",blog3Desc:"พื้นฟ้า ขาว และแดง ต่างจากการเอาพื้นขาวออกอย่างไร"}
  };

  var SPONSOR = {
    zh: {sponsorRedeem:"赞助兑换",sponsorPageTitle:"赞助兑换",sponsorPageLead:"图片工具仍然免费，不需要兑换码。这里只把赞助包记在这台设备上。",sponsorCodeLabel:"兑换码",sponsorSubmit:"兑换",sponsorBecome:"成为赞助者",sponsorSuccess:"已记下赞助包。刷新后仍然有效。清除本机存储后会消失。",sponsorSuccessDetail:"证件照换底会出现尺寸预设，滤镜调色会出现 6 个额外预设。",sponsorErrEmpty:"请输入兑换码。",sponsorErrInvalid:"兑换码不正确。",sponsorErrLatiao:"这个兑换码不能兑换赞助包。赞助包只接受 IMAGEC-COFFEE 兑换码。",sponsorErrStorage:"无法记在这台设备上。请允许浏览器的本地存储后再试。",wallTitle:"赞助者",wallLead:"这里会放赞助者名单。",wallEmpty:"名单还空着。",wallCta:"去爱发电",sizePackLabel:"证件照尺寸",size1:"1寸",size2:"2寸",sizeSmall2:"小二寸",sizeResume:"简历照",sizePackHint:"1寸和简历照 295×413，2寸 413×579，小二寸 413×531。按 300 dpi 常用规格居中裁切。再点一次已选尺寸可回到原来的导出大小。",presetClear:"清透",presetWarmtone:"暖调",presetCooltone:"冷调",presetMono:"黑白",presetSoftlight:"柔光",presetShopsharp:"锐化电商"},
    en: {sponsorRedeem:"Redeem sponsor code",sponsorPageTitle:"Redeem a sponsor code",sponsorPageLead:"The image tools stay free, with no code. This page only saves the sponsor pack on this device.",sponsorCodeLabel:"Code",sponsorSubmit:"Redeem",sponsorBecome:"Become a sponsor",sponsorSuccess:"Sponsor pack saved on this device. It stays after refresh. Clearing site data removes it.",sponsorSuccessDetail:"ID photo background gains size presets. Filters gain 6 extra presets.",sponsorErrEmpty:"Enter a code.",sponsorErrInvalid:"That code is not valid.",sponsorErrLatiao:"That code does not redeem the sponsor pack. Only IMAGEC-COFFEE codes do.",sponsorErrStorage:"Could not save on this device. Allow local storage and try again.",wallTitle:"Sponsors",wallLead:"Sponsor names will go here.",wallEmpty:"The list is empty.",wallCta:"Support on Afdian",sizePackLabel:"ID photo sizes",size1:"1 inch",size2:"2 inch",sizeSmall2:"Small 2 inch",sizeResume:"Resume",sizePackHint:"1 inch and resume are 295×413, 2 inch is 413×579, small 2 inch is 413×531, at 300 dpi. The photo is center-cropped. Click the selected size again to keep the original export size.",presetClear:"Clear",presetWarmtone:"Warm tone",presetCooltone:"Cool tone",presetMono:"Black and white",presetSoftlight:"Soft light",presetShopsharp:"Product sharpen"},
    ja: {sponsorRedeem:"支援コード"},
    ko: {sponsorRedeem:"후원 코드"},
    es: {sponsorRedeem:"Canjear código"},
    fr: {sponsorRedeem:"Code de soutien"},
    de: {sponsorRedeem:"Code einlösen"},
    ru: {sponsorRedeem:"Код поддержки"},
    pt: {sponsorRedeem:"Resgatar código"},
    ar: {sponsorRedeem:"استرداد الرمز"},
    vi: {sponsorRedeem:"Đổi mã tài trợ"},
    id: {sponsorRedeem:"Tukar kode"},
    th: {sponsorRedeem:"ใช้รหัสสนับสนุน"}
  };

  var NAME_KEYS = {
    toolWhitebg:"nameWhitebg", cardWhitebgTitle:"nameWhitebg",
    toolCompress:"nameCompress", toolCompress2:"nameCompress", cardCompressTitle:"nameCompress", rcCompress:"nameCompress", gridCompress:"nameCompress", relatedCompress:"nameCompress",
    toolConvert:"nameConvert", toolConvert2:"nameConvert", cardConvertTitle:"nameConvert", rcConvert:"nameConvert", gridConvert:"nameConvert", relatedConvert:"nameConvert",
    toolCrop:"nameCrop", toolCrop2:"nameCrop", cardCropTitle:"nameCrop", rcCrop:"nameCrop", gridCrop:"nameCrop", relatedCrop:"nameCrop",
    toolIdphoto:"nameId", toolIdphoto2:"nameId", cardIdphotoTitle:"nameId", rcIdphoto:"nameId", gridIdphoto:"nameId", relatedIdphoto:"nameId",
    toolWatermark:"nameWm", toolWatermark2:"nameWm", cardWatermarkTitle:"nameWm", rcWatermark:"nameWm", gridWatermark:"nameWm", relatedWatermark:"nameWm",
    toolBgcolor:"nameBg", toolBgcolor2:"nameBg", cardBgcolorTitle:"nameBg", rcBgcolor:"nameBg", gridBgcolor:"nameBg", relatedBgcolor:"nameBg",
    toolSplice:"nameSplice", toolSplice2:"nameSplice", cardSpliceTitle:"nameSplice", rcSplice:"nameSplice", gridSplice:"nameSplice", relatedSplice:"nameSplice",
    toolImg2pdf:"namePdf", toolImg2pdf2:"namePdf", cardPdfTitle:"namePdf", rcImg2pdf:"namePdf", gridImg2pdf:"namePdf", relatedImg2pdf:"namePdf",
    toolFilter:"nameFilter", toolFilter2:"nameFilter", cardFilterTitle:"nameFilter", rcFilter:"nameFilter", gridFilter:"nameFilter", relatedFilter:"nameFilter"
  };
  var DESC_KEYS = {
    cardWhitebgDesc:"descWhitebg", cardCompressDesc:"descCompress", cardConvertDesc:"descConvert", cardCropDesc:"descCrop",
    cardIdphotoDesc:"descId", cardWatermarkDesc:"descWm", cardBgcolorDesc:"descBg", cardSpliceDesc:"descSplice",
    cardPdfDesc:"descPdf", cardFilterDesc:"descFilter"
  };
  var DIRECT = ["heroTitle","heroSubtitle","advanced","adText","adCta","sponsorText","sponsorCta","blogLabel","relatedTools","moreTools","relatedTitle","blog1Tag","blog1Title","blog1Desc","blog2Tag","blog2Title","blog2Desc","blog3Tag","blog3Title","blog3Desc","swatchWhite","swatchBlue","swatchRed","swatchLight","swatchBlack","swatchGreen","swatchYellow"];

  function currentLang() {
    var saved = "";
    try { saved = localStorage.getItem("language") || ""; } catch (e) {}
    var html = (document.documentElement.lang || "").toLowerCase();
    var code = (saved || html || "zh").slice(0, 2);
    if (code === "zh") return "zh";
    return CHROME[code] ? code : "en";
  }
  function pack() { return CHROME[currentLang()] || CHROME.en; }

  function textFor(key) {
    if ((key === "heroTitle" || key === "heroSubtitle") && !document.body.classList.contains("home")) return null;
    var p = pack();
    if (NAME_KEYS[key]) return p[NAME_KEYS[key]];
    if (DESC_KEYS[key]) return p[DESC_KEYS[key]];
    if (DIRECT.indexOf(key) !== -1) return p[key];
    var extra = SPONSOR[currentLang()] || {};
    if (extra[key] != null) return extra[key];
    if (SPONSOR.en && Object.prototype.hasOwnProperty.call(SPONSOR.en, key)) return SPONSOR.en[key];
    return null;
  }

  var LANG_MENU = {zh:"语言",en:"Language",ja:"言語",ko:"언어",es:"Idioma",fr:"Langue",de:"Sprache",ru:"Язык",pt:"Idioma",ar:"اللغة",vi:"Ngôn ngữ",id:"Bahasa",th:"ภาษา"};
  function syncBlogCards() {
    var blogHrefs = currentLang() === "zh"
      ? ["/blog/white-to-transparent-guide.html", "/blog/ecommerce-white-background.html"]
      : ["/blog/remove-white-background-guide.html", "/blog/compress-png-to-100kb.html", "/blog/id-photo-maker-online.html"];
    var blogGrid = document.querySelector(".blogGrid");
    if (blogGrid && blogHrefs.length === 3 && blogGrid.querySelectorAll(".blogCard").length < 3) {
      var seed = blogGrid.querySelector(".blogCard");
      if (seed) {
        var extra = seed.cloneNode(true);
        extra.querySelectorAll("[data-i18n]").forEach(function (el) {
          var key = el.getAttribute("data-i18n") || "";
          if (key.indexOf("blog1") === 0) el.setAttribute("data-i18n", key.replace("blog1", "blog3"));
        });
        blogGrid.appendChild(extra);
      }
    }
    document.querySelectorAll(".blogCard").forEach(function (card, i) {
      if (blogHrefs[i]) {
        card.hidden = false;
        card.setAttribute("href", blogHrefs[i]);
      } else {
        card.remove();
      }
    });
  }
  function ensureRedeemLinks() {
    var label = (SPONSOR.zh && SPONSOR.zh.sponsorRedeem) || "赞助兑换";
    document.querySelectorAll(".quietLinks, .adLine").forEach(function (container) {
      if (container.querySelector('a[data-i18n="sponsorRedeem"]')) return;
      container.appendChild(document.createTextNode(" "));
      var sep = document.createElement("span");
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "·";
      container.appendChild(sep);
      container.appendChild(document.createTextNode(" "));
      var link = document.createElement("a");
      link.href = "/sponsor.html";
      link.setAttribute("data-i18n", "sponsorRedeem");
      link.textContent = label;
      container.appendChild(link);
    });
  }
  function applyCopy() {
    syncBlogCards();
    ensureRedeemLinks();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = textFor(el.getAttribute("data-i18n"));
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-chrome-aria]").forEach(function (el) {
      var value = textFor(el.getAttribute("data-chrome-aria")) || pack()[el.getAttribute("data-chrome-aria")];
      if (value) el.setAttribute("aria-label", value);
    });
    var summary = document.querySelector(".advanced > summary");
    if (summary) summary.textContent = pack().advanced;
    var langSelect = document.getElementById("langSelect");
    if (langSelect) langSelect.setAttribute("aria-label", LANG_MENU[currentLang()] || LANG_MENU.en);
    var icp = document.getElementById("icp");
    if (icp) icp.hidden = currentLang() !== "zh";
    var titleKey = document.body && document.body.getAttribute("data-title-i18n");
    if (titleKey) {
      var titleValue = textFor(titleKey);
      if (titleValue) document.title = titleValue + " | imagec";
    }
  }

  function showBanner(message) {
    var el = document.getElementById("formError");
    if (!el) {
      el = document.createElement("div");
      el.id = "formError";
      el.className = "noticeBanner";
      el.setAttribute("role", "alert");
      document.body.insertBefore(el, document.body.firstChild);
    }
    el.hidden = false;
    el.textContent = message;
  }
  function clearBanner() {
    var el = document.getElementById("formError");
    if (el) el.hidden = true;
  }
  function fileLooksLikeImage(file) {
    return !!(file && file.type && file.type.indexOf("image/") === 0);
  }
  window.imagecAlert = function (key) {
    var p = pack();
    showBanner(p[key] || String(key));
  };
  var nativeAlert = window.alert;
  window.alert = function (message) { showBanner(String(message)); };

  function foldTool(controls) {
    if (!controls || controls.dataset.folded) return;
    controls.dataset.folded = "1";
    var details = document.createElement("details");
    details.className = "advanced";
    var summary = document.createElement("summary");
    summary.setAttribute("data-i18n", "advanced");
    summary.textContent = pack().advanced;
    details.appendChild(summary);
    Array.prototype.slice.call(controls.children).forEach(function (el) {
      if (el.classList.contains("drop")) return;
      if (el.classList.contains("actions")) return;
      if (el.classList.contains("thumbList")) return;
      if (el.id === "file" || el.matches("input[type=file]")) return;
      if (el.classList.contains("hint") && controls.querySelector(".thumbList")) return;
      details.appendChild(el);
    });
    controls.appendChild(details);
  }

  function foldStudio(controls) {
    if (!controls || controls.dataset.folded) return;
    controls.dataset.folded = "1";
    var details = document.createElement("details");
    details.className = "advanced";
    var summary = document.createElement("summary");
    summary.setAttribute("data-i18n", "advanced");
    summary.textContent = pack().advanced;
    details.appendChild(summary);
    controls.querySelectorAll(".controlGroup").forEach(function (group) {
      if (group.closest("#imageConfig, #gradientConfig")) return;
      if (group.querySelector(".presetColors, .tabRow, input[type=text], .formatBtns")) return;
      if (group.querySelector("input[type=range], .grid9")) details.appendChild(group);
    });
    ["#imageConfig", "#gradientConfig"].forEach(function (sel) {
      var el = controls.querySelector(sel);
      if (el) details.appendChild(el);
    });
    controls.querySelectorAll(".checkboxRow").forEach(function (el) { details.appendChild(el); });
    if (details.children.length < 2) return;
    var btnRow = controls.querySelector(".btnRow");
    if (btnRow) btnRow.insertAdjacentElement("beforebegin", details);
    else controls.appendChild(details);
    var typeTabs = document.getElementById("typeTabs");
    if (typeTabs) typeTabs.addEventListener("click", function (event) {
      if (event.target.closest("[data-type='image']")) details.open = true;
    });
    var bgTabs = document.getElementById("bgTypeTabs");
    if (bgTabs) bgTabs.addEventListener("click", function (event) {
      if (event.target.closest("[data-type='gradient']")) details.open = true;
    });
  }

  function syncFile() {
    var has = false;
    var empty = document.getElementById("empty");
    var work = document.getElementById("workarea");
    if (work && work.style.display && work.style.display !== "none") has = true;
    if (empty && empty.style.display === "none") has = true;
    document.body.classList.toggle("has-file", has);
  }

  function boot() {
    document.querySelectorAll("body.tool .controls").forEach(foldTool);
    document.querySelectorAll("body.studio .workarea .controls").forEach(foldStudio);
    document.querySelectorAll(".empty").forEach(function (el) { el.setAttribute("role", "status"); });
    document.querySelectorAll(".presetColors button").forEach(function (btn) {
      var map = {"#FFFFFF":"swatchWhite","#438EDB":"swatchBlue","#D9001B":"swatchRed","#B4D4FF":"swatchLight","#000000":"swatchBlack","#E74C3C":"swatchRed","#3498DB":"swatchBlue","#27AE60":"swatchGreen","#F1C40F":"swatchYellow"};
      var key = map[(btn.getAttribute("data-color") || "").toUpperCase()];
      if (key) btn.setAttribute("data-chrome-aria", key);
    });
    applyCopy();
    syncFile();
    /* Reveal only after the fold and shared copy (sponsor link included). */
    if (document.body.classList.contains("tool") || document.body.classList.contains("studio")) {
      document.body.classList.add("tool-ready");
    }
    var root = document.body;
    if (root && window.MutationObserver) {
      new MutationObserver(syncFile).observe(root, { attributes: true, subtree: true, attributeFilter: ["style", "class"] });
    }
    var sel = document.getElementById("langSelect");
    if (sel) sel.addEventListener("change", function () { setTimeout(applyCopy, 0); });
    document.addEventListener("change", function (event) {
      var input = event.target;
      if (!input || input.type !== "file" || !input.files || !input.files.length) return;
      for (var i = 0; i < input.files.length; i++) if (fileLooksLikeImage(input.files[i])) { clearBanner(); return; }
    }, true);
    document.addEventListener("drop", function (event) {
      var files = event.dataTransfer && event.dataTransfer.files;
      if (!files) return;
      for (var i = 0; i < files.length; i++) if (fileLooksLikeImage(files[i])) { clearBanner(); return; }
    }, true);
    document.addEventListener("paste", function (event) {
      var items = event.clipboardData && event.clipboardData.items;
      if (!items) return;
      for (var i = 0; i < items.length; i++) if (fileLooksLikeImage(items[i])) { clearBanner(); return; }
    }, true);
  }

  /* This script sits at the end of the body, so fold before the next paint. */
  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot);
  window.imagecApplyChrome = applyCopy;
  void nativeAlert;
})();
