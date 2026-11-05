/* Shared chrome copy, one-language pass, advanced-params fold, and inline errors. */
(function () {
  var CHROME = {
    zh: {heroTitle:"免费在线图片工具",heroSubtitle:"所有工具都是在本地处理，图片不会上传。",searchTools:"搜索工具",advanced:"调整参数",sponsorText:"赞助与合作请通过爱发电联系",sponsorCta:"发电支持",sisterSite:"软件工具",homeSponsorLead:"觉得好用？",homeSponsorCta:"请我来包辣条",homeSister:"toolc·精选软件工具",blogLabel:"使用指南",nameWhitebg:"去白底",nameCompress:"图片压缩",nameConvert:"格式转换",nameCrop:"裁剪缩放",nameId:"证件照换底",nameWm:"加水印",nameBg:"换背景色",nameSplice:"图片拼接",namePdf:"图片转 PDF",nameFilter:"滤镜调色",descWhitebg:"把白色背景变成透明 PNG",descCompress:"缩小 PNG、JPG、WebP，尽量保住画质",descConvert:"PNG、JPG、WebP、BMP 互转",descCrop:"裁切一块，或改成指定尺寸",descId:"蓝底、白底、红底证件照",descWm:"加文字或图片水印",descBg:"给透明图铺纯色或渐变",descSplice:"把多张图拼成一张",descPdf:"把多张图合成一个 PDF",descFilter:"亮度、对比度、饱和度和预设滤镜",nameBatch:"批量处理",descBatch:"一次压缩或转换多张图，打包 ZIP",nameQr:"免费生成二维码",descQr:"输入链接或文字，本地生成二维码 PNG",linkQrUrl:"链接转二维码",linkQrText:"文字生成二维码",nameRound:"圆角阴影",descRound:"给图片加圆角或阴影，导出 PNG",linkRound:"圆角阴影",linkRoundCorner:"图片加圆角",linkRoundShadow:"图片加阴影",relatedTools:"更多图片工具",moreTools:"更多图片工具",relatedTitle:"更多图片工具",swatchWhite:"白色",swatchBlue:"蓝色",swatchRed:"红色",swatchLight:"浅蓝",swatchBlack:"黑色",swatchGreen:"绿色",swatchYellow:"黄色",errType:"这个文件不是支持的图片格式。请换一张 PNG、JPG 或 WebP。",errLoad:"图片加载失败，可能是格式不支持或文件已损坏。",errWm:"水印图片加载失败，请换一张 PNG 或 JPG。",errCrop:"请先在图片上拖拽，选出要保留的区域。",blog1Tag:"去白底",blog1Title:"怎样去掉图片的白底",blog1Desc:"商品图、签名和 Logo 如何只去掉白色背景，并导出透明 PNG。",blog2Tag:"商品图",blog2Title:"商品图白底怎么处理",blog2Desc:"淘宝、拼多多、京东主图去白底，导出透明 PNG。",blog3Tag:"证件照",blog3Title:"在线做证件照换底",blog3Desc:"蓝底、白底、红底证件照的换底步骤。",heicTip:"暂不支持 HEIC，请先转成 JPG 或 PNG",spliceMin:"请至少添加 2 张图片"},
    en: {heroTitle:"Free online image tools",heroSubtitle:"All tools run locally. Images are not uploaded.",searchTools:"Search tools",advanced:"Adjust settings",sponsorText:"For sponsorship and cooperation, contact us on Afdian",sponsorCta:"support the project",sisterSite:"More tools",homeSponsorLead:"Like it?",homeSponsorCta:"Buy me a snack",homeSister:"toolc · Selected tools",blogLabel:"Guides",nameWhitebg:"Remove white background",nameCompress:"Compress",nameConvert:"Convert format",nameCrop:"Crop and resize",nameId:"ID photo background",nameWm:"Watermark",nameBg:"Change background color",nameSplice:"Stitch images",namePdf:"Image to PDF",nameFilter:"Filters",descWhitebg:"Turn a white background into a transparent PNG",descCompress:"Shrink PNG, JPG, and WebP while keeping detail",descConvert:"Convert between PNG, JPG, WebP, and BMP",descCrop:"Crop a region or resize to exact dimensions",descId:"Blue, white, or red ID-photo backgrounds",descWm:"Add a text or image watermark",descBg:"Fill a transparent image with a solid color or gradient",descSplice:"Join several images into one",descPdf:"Combine images into one PDF",descFilter:"Brightness, contrast, saturation, and presets",nameBatch:"Batch",descBatch:"Compress or convert many images, then download a ZIP",nameQr:"Free QR code",descQr:"Turn a link or text into a QR code PNG, on this device",linkQrUrl:"Link to QR code",linkQrText:"Text to QR code",nameRound:"Rounded corners",descRound:"Round the corners or add a shadow, then export a PNG",linkRound:"Rounded corners",linkRoundCorner:"Round image corners",linkRoundShadow:"Add an image shadow",relatedTools:"More image tools",moreTools:"More image tools",relatedTitle:"More image tools",swatchWhite:"White",swatchBlue:"Blue",swatchRed:"Red",swatchLight:"Light blue",swatchBlack:"Black",swatchGreen:"Green",swatchYellow:"Yellow",errType:"That file is not a supported image. Use PNG, JPG, or WebP.",errLoad:"Could not load the image. The format may be unsupported or the file is damaged.",errWm:"Could not load the watermark image. Try a PNG or JPG.",errCrop:"Drag on the image to choose the area you want to keep.",blog1Tag:"White background",blog1Title:"How to remove a white background",blog1Desc:"Turn product photos, signatures, and logos into transparent PNGs.",blog2Tag:"Compress",blog2Title:"Compress a PNG under 100KB",blog2Desc:"How the free options differ, and how to compress locally in the browser.",blog3Tag:"ID photo",blog3Title:"Change an ID photo background online",blog3Desc:"Blue, white, and red backgrounds, and how this differs from removing white.",heicTip:"HEIC isn’t supported yet — convert to JPG or PNG first",spliceMin:"Add at least 2 images"},
    ja: {heroTitle:"無料のオンライン画像ツール",heroSubtitle:"すべてのツールは端末内で処理します。画像はアップロードされません。",searchTools:"ツールを検索",advanced:"設定を調整",sponsorText:"スポンサーと協力のご連絡は愛発電（Afdian）へ",sponsorCta:"プロジェクトを支援",sisterSite:"その他のツール",homeSponsorLead:"気に入った？",homeSponsorCta:"おやつをごちそうして",homeSister:"toolc·おすすめツール",blogLabel:"ガイド",nameWhitebg:"白背景を透明に",nameCompress:"画像圧縮",nameConvert:"形式変換",nameCrop:"切り抜き・サイズ変更",nameId:"証明写真の背景",nameWm:"透かし",nameBg:"背景色の変更",nameSplice:"画像結合",namePdf:"画像をPDF",nameFilter:"フィルター",descWhitebg:"白い背景を透明PNGにします",descCompress:"PNG / JPG / WebPを画質を保って縮小",descConvert:"PNG / JPG / WebP / BMPを相互変換",descCrop:"範囲を切り抜くか、指定サイズに変更",descId:"青・白・赤の証明写真背景",descWm:"文字または画像の透かしを追加",descBg:"透明画像に単色またはグラデーションを敷く",descSplice:"複数の画像を1枚に結合",descPdf:"複数の画像を1つのPDFに",descFilter:"明るさ、コントラスト、彩度とプリセット",nameBatch:"一括処理",descBatch:"複数画像を圧縮または変換し、ZIPでまとめて保存",nameQr:"QRコードを無料作成",descQr:"リンクや文字から、端末内でQRコードPNGを作る",linkQrUrl:"リンクをQRコードに",linkQrText:"文字からQRコード",nameRound:"角丸と影",descRound:"画像に角丸や影を付けて PNG で保存",linkRound:"角丸と影",linkRoundCorner:"画像に角丸",linkRoundShadow:"画像に影",relatedTools:"ほかの画像ツール",moreTools:"ほかの画像ツール",relatedTitle:"ほかの画像ツール",swatchWhite:"白",swatchBlue:"青",swatchRed:"赤",swatchLight:"薄い青",swatchBlack:"黒",swatchGreen:"緑",swatchYellow:"黄",errType:"対応していないファイルです。PNG、JPG、WebPを選んでください。",errLoad:"画像を読み込めませんでした。形式が未対応か、ファイルが破損しています。",errWm:"透かし画像を読み込めませんでした。PNGかJPGを試してください。",errCrop:"残したい範囲を、画像上でドラッグして選んでください。",blog1Tag:"白背景",blog1Title:"白い背景を消す方法",blog1Desc:"商品画像や署名、ロゴを透明PNGにする手順です。",blog2Tag:"圧縮",blog2Title:"PNGを100KB以下に圧縮",blog2Desc:"無料の方法の違いと、ブラウザ内で圧縮する方法です。",blog3Tag:"証明写真",blog3Title:"証明写真の背景をオンラインで変更",blog3Desc:"青・白・赤の違いと、白背景の透過との違いです。",heicTip:"HEIC はまだ非対応です。先に JPG または PNG に変換してください",spliceMin:"画像を2枚以上追加してください"},
    ko: {heroTitle:"무료 온라인 이미지 도구",heroSubtitle:"모든 도구는 기기에서 처리합니다. 이미지는 업로드되지 않습니다.",searchTools:"도구 검색",advanced:"설정 조정",sponsorText:"후원과 협력 문의는 Afdian으로 연락해 주세요",sponsorCta:"프로젝트 후원",sisterSite:"다른 도구",homeSponsorLead:"마음에 드나요?",homeSponsorCta:"간식 사 주세요",homeSister:"toolc · 추천 도구",blogLabel:"가이드",nameWhitebg:"흰 배경 제거",nameCompress:"이미지 압축",nameConvert:"형식 변환",nameCrop:"자르기·크기 조절",nameId:"증명사진 배경",nameWm:"워터마크",nameBg:"배경색 변경",nameSplice:"이미지 잇기",namePdf:"이미지를 PDF로",nameFilter:"필터",descWhitebg:"흰 배경을 투명 PNG로 바꿉니다",descCompress:"PNG, JPG, WebP를 화질을 지키며 줄입니다",descConvert:"PNG, JPG, WebP, BMP를 서로 변환",descCrop:"영역을 자르거나 지정 크기로 바꿉니다",descId:"파랑, 흰색, 빨강 증명사진 배경",descWm:"글자 또는 이미지 워터마크",descBg:"투명 이미지에 단색이나 그라데이션",descSplice:"여러 이미지를 하나로 잇습니다",descPdf:"여러 이미지를 PDF 하나로",descFilter:"밝기, 대비, 채도와 프리셋",nameBatch:"일괄 처리",descBatch:"여러 이미지를 압축하거나 변환한 뒤 ZIP으로 받기",nameQr:"무료 QR 코드",descQr:"링크나 글을 이 기기에서 QR 코드 PNG로",linkQrUrl:"링크를 QR로",linkQrText:"글자로 QR 만들기",nameRound:"모서리와 그림자",descRound:"이미지에 둥근 모서리 또는 그림자를 넣고 PNG로 저장",linkRound:"모서리와 그림자",linkRoundCorner:"이미지 모서리 둥글게",linkRoundShadow:"이미지에 그림자",relatedTools:"다른 이미지 도구",moreTools:"다른 이미지 도구",relatedTitle:"다른 이미지 도구",swatchWhite:"흰색",swatchBlue:"파랑",swatchRed:"빨강",swatchLight:"연한 파랑",swatchBlack:"검정",swatchGreen:"초록",swatchYellow:"노랑",errType:"지원하지 않는 파일입니다. PNG, JPG 또는 WebP를 사용하세요.",errLoad:"이미지를 열 수 없습니다. 형식이 맞지 않거나 파일이 손상되었습니다.",errWm:"워터마크 이미지를 열 수 없습니다. PNG 또는 JPG를 사용해 보세요.",errCrop:"남길 영역을 이미지 위에서 드래그하세요.",blog1Tag:"흰 배경",blog1Title:"흰 배경을 지우는 방법",blog1Desc:"상품 사진, 서명, 로고를 투명 PNG로 만드는 방법입니다.",blog2Tag:"압축",blog2Title:"PNG를 100KB 이하로 압축",blog2Desc:"무료 방법의 차이와 브라우저에서 압축하는 방법입니다.",blog3Tag:"증명사진",blog3Title:"온라인으로 증명사진 배경 바꾸기",blog3Desc:"파랑, 흰색, 빨강 배경과 흰 배경 제거의 차이입니다.",heicTip:"HEIC는 아직 지원하지 않습니다. 먼저 JPG 또는 PNG로 변환하세요",spliceMin:"이미지를 2장 이상 추가하세요"},
    es: {heroTitle:"Herramientas de imagen gratis",heroSubtitle:"Todas las herramientas se procesan en local. Las imágenes no se suben.",searchTools:"Buscar herramientas",advanced:"Ajustar opciones",sponsorText:"Para patrocinio y colaboración, contáctanos en Afdian",sponsorCta:"apoya el proyecto",sisterSite:"Otras herramientas",homeSponsorLead:"¿Te gusta?",homeSponsorCta:"Invítame un snack",homeSister:"toolc · Herramientas destacadas",blogLabel:"Guías",nameWhitebg:"Quitar fondo blanco",nameCompress:"Comprimir",nameConvert:"Convertir formato",nameCrop:"Recortar y redimensionar",nameId:"Fondo de foto de carnet",nameWm:"Marca de agua",nameBg:"Cambiar color de fondo",nameSplice:"Unir imágenes",namePdf:"Imagen a PDF",nameFilter:"Filtros",descWhitebg:"Convierte el fondo blanco en un PNG transparente",descCompress:"Reduce PNG, JPG y WebP conservando detalle",descConvert:"Convierte entre PNG, JPG, WebP y BMP",descCrop:"Recorta una zona o cambia a un tamaño exacto",descId:"Fondos azul, blanco o rojo para foto de carnet",descWm:"Añade una marca de texto o imagen",descBg:"Rellena una imagen transparente con color o degradado",descSplice:"Une varias imágenes en una",descPdf:"Combina imágenes en un PDF",descFilter:"Brillo, contraste, saturación y ajustes",nameBatch:"Por lotes",descBatch:"Comprime o convierte varias imágenes y descarga un ZIP",nameQr:"Código QR gratis",descQr:"Convierte un enlace o texto en un PNG de código QR",linkQrUrl:"Enlace a código QR",linkQrText:"Texto a código QR",nameRound:"Esquinas y sombra",descRound:"Redondea esquinas o añade sombra y exporta un PNG",linkRound:"Esquinas y sombra",linkRoundCorner:"Redondear esquinas",linkRoundShadow:"Añadir sombra",relatedTools:"Más herramientas",moreTools:"Más herramientas",relatedTitle:"Más herramientas",swatchWhite:"Blanco",swatchBlue:"Azul",swatchRed:"Rojo",swatchLight:"Azul claro",swatchBlack:"Negro",swatchGreen:"Verde",swatchYellow:"Amarillo",errType:"Ese archivo no es una imagen compatible. Usa PNG, JPG o WebP.",errLoad:"No se pudo abrir la imagen. El formato no es compatible o el archivo está dañado.",errWm:"No se pudo abrir la marca de agua. Prueba con PNG o JPG.",errCrop:"Arrastra sobre la imagen para elegir la zona que quieres conservar.",blog1Tag:"Fondo blanco",blog1Title:"Cómo quitar un fondo blanco",blog1Desc:"Pasa fotos de producto, firmas y logos a PNG transparente.",blog2Tag:"Comprimir",blog2Title:"Comprimir un PNG por debajo de 100KB",blog2Desc:"En qué se diferencian las opciones gratis y cómo comprimir en el navegador.",blog3Tag:"Foto de carnet",blog3Title:"Cambiar el fondo de una foto de carnet",blog3Desc:"Fondos azul, blanco y rojo, y en qué se diferencia de quitar el blanco.",heicTip:"HEIC aún no es compatible — conviértelo primero a JPG o PNG",spliceMin:"Añade al menos 2 imágenes"},
    fr: {heroTitle:"Outils image gratuits",heroSubtitle:"Tous les outils sont traités en local. Les images ne sont pas envoyées.",searchTools:"Rechercher un outil",advanced:"Régler les options",sponsorText:"Pour le parrainage et les collaborations, contactez-nous sur Afdian",sponsorCta:"soutenez le projet",sisterSite:"Plus d'outils",homeSponsorLead:"Ça vous plaît ?",homeSponsorCta:"Offrez-moi un snack",homeSister:"toolc · Outils sélectionnés",blogLabel:"Guides",nameWhitebg:"Retirer le fond blanc",nameCompress:"Compresser",nameConvert:"Convertir le format",nameCrop:"Rogner et redimensionner",nameId:"Fond de photo d'identité",nameWm:"Filigrane",nameBg:"Changer la couleur de fond",nameSplice:"Assembler des images",namePdf:"Image en PDF",nameFilter:"Filtres",descWhitebg:"Transforme un fond blanc en PNG transparent",descCompress:"Réduit PNG, JPG et WebP en gardant le détail",descConvert:"Convertit entre PNG, JPG, WebP et BMP",descCrop:"Rogner une zone ou viser une taille précise",descId:"Fonds bleu, blanc ou rouge pour photo d'identité",descWm:"Ajouter un filigrane texte ou image",descBg:"Remplir une image transparente d'une couleur ou d'un dégradé",descSplice:"Réunir plusieurs images en une",descPdf:"Combiner des images dans un PDF",descFilter:"Luminosité, contraste, saturation et préréglages",nameBatch:"Par lot",descBatch:"Compresser ou convertir plusieurs images, puis un ZIP",nameQr:"QR code gratuit",descQr:"Transforme un lien ou un texte en PNG de QR code",linkQrUrl:"Lien vers QR code",linkQrText:"Texte en QR code",nameRound:"Coins et ombre",descRound:"Arrondir les coins ou ajouter une ombre, puis un PNG",linkRound:"Coins et ombre",linkRoundCorner:"Arrondir les coins",linkRoundShadow:"Ajouter une ombre",relatedTools:"Autres outils",moreTools:"Autres outils",relatedTitle:"Autres outils",swatchWhite:"Blanc",swatchBlue:"Bleu",swatchRed:"Rouge",swatchLight:"Bleu clair",swatchBlack:"Noir",swatchGreen:"Vert",swatchYellow:"Jaune",errType:"Ce fichier n'est pas une image prise en charge. Utilisez PNG, JPG ou WebP.",errLoad:"Impossible d'ouvrir l'image. Format non pris en charge ou fichier endommagé.",errWm:"Impossible d'ouvrir le filigrane. Essayez un PNG ou un JPG.",errCrop:"Faites glisser sur l'image pour choisir la zone à garder.",blog1Tag:"Fond blanc",blog1Title:"Comment retirer un fond blanc",blog1Desc:"Passer photos produit, signatures et logos en PNG transparent.",blog2Tag:"Compresser",blog2Title:"Compresser un PNG sous 100 Ko",blog2Desc:"Les différences entre options gratuites, et la compression dans le navigateur.",blog3Tag:"Photo d'identité",blog3Title:"Changer le fond d'une photo d'identité",blog3Desc:"Fonds bleu, blanc et rouge, et la différence avec le retrait du blanc.",heicTip:"HEIC n’est pas encore pris en charge — convertissez d’abord en JPG ou PNG",spliceMin:"Ajoutez au moins 2 images"},
    de: {heroTitle:"Kostenlose Online-Bildwerkzeuge",heroSubtitle:"Alle Werkzeuge arbeiten lokal. Bilder werden nicht hochgeladen.",searchTools:"Werkzeuge suchen",advanced:"Einstellungen anpassen",sponsorText:"Für Sponsoring und Kooperation bitte über Afdian Kontakt aufnehmen",sponsorCta:"unterstützen Sie das Projekt",sisterSite:"Weitere Tools",homeSponsorLead:"Gefällt’s?",homeSponsorCta:"Spendier mir einen Snack",homeSister:"toolc · Ausgewählte Tools",blogLabel:"Anleitungen",nameWhitebg:"Weißen Hintergrund entfernen",nameCompress:"Komprimieren",nameConvert:"Format umwandeln",nameCrop:"Zuschneiden und skalieren",nameId:"Ausweisfoto-Hintergrund",nameWm:"Wasserzeichen",nameBg:"Hintergrundfarbe ändern",nameSplice:"Bilder zusammenfügen",namePdf:"Bild zu PDF",nameFilter:"Filter",descWhitebg:"Macht einen weißen Hintergrund zu einem transparenten PNG",descCompress:"PNG, JPG und WebP verkleinern und Details behalten",descConvert:"Zwischen PNG, JPG, WebP und BMP wandeln",descCrop:"Einen Bereich ausschneiden oder auf ein Maß skalieren",descId:"Blaue, weiße oder rote Ausweisfoto-Hintergründe",descWm:"Text- oder Bildwasserzeichen setzen",descBg:"Ein transparentes Bild mit Farbe oder Verlauf füllen",descSplice:"Mehrere Bilder zu einem verbinden",descPdf:"Bilder in ein PDF legen",descFilter:"Helligkeit, Kontrast, Sättigung und Vorgaben",nameBatch:"Stapel",descBatch:"Mehrere Bilder komprimieren oder umwandeln und als ZIP laden",nameQr:"Kostenloser QR-Code",descQr:"Aus Link oder Text lokal einen QR-Code als PNG",linkQrUrl:"Link als QR-Code",linkQrText:"Text als QR-Code",nameRound:"Ecken und Schatten",descRound:"Ecken abrunden oder Schatten setzen und als PNG speichern",linkRound:"Ecken und Schatten",linkRoundCorner:"Ecken abrunden",linkRoundShadow:"Schatten hinzufügen",relatedTools:"Weitere Werkzeuge",moreTools:"Weitere Werkzeuge",relatedTitle:"Weitere Werkzeuge",swatchWhite:"Weiß",swatchBlue:"Blau",swatchRed:"Rot",swatchLight:"Hellblau",swatchBlack:"Schwarz",swatchGreen:"Grün",swatchYellow:"Gelb",errType:"Diese Datei ist kein unterstütztes Bild. Bitte PNG, JPG oder WebP verwenden.",errLoad:"Bild konnte nicht geladen werden. Format nicht unterstützt oder Datei beschädigt.",errWm:"Wasserzeichenbild konnte nicht geladen werden. Bitte PNG oder JPG versuchen.",errCrop:"Ziehen Sie auf dem Bild, um den Bereich zu wählen, der bleiben soll.",blog1Tag:"Weißer Hintergrund",blog1Title:"Weißen Hintergrund entfernen",blog1Desc:"Produktfotos, Unterschriften und Logos als transparentes PNG.",blog2Tag:"Komprimieren",blog2Title:"PNG unter 100 KB komprimieren",blog2Desc:"Unterschiede der kostenlosen Wege und lokales Komprimieren im Browser.",blog3Tag:"Ausweisfoto",blog3Title:"Ausweisfoto-Hintergrund online ändern",blog3Desc:"Blau, Weiß und Rot, und der Unterschied zum Entfernen von Weiß.",heicTip:"HEIC wird noch nicht unterstützt — bitte zuerst in JPG oder PNG umwandeln",spliceMin:"Mindestens 2 Bilder hinzufügen"},
    ru: {heroTitle:"Бесплатные онлайн-инструменты для изображений",heroSubtitle:"Все инструменты работают локально. Изображения не загружаются.",searchTools:"Найти инструмент",advanced:"Настроить параметры",sponsorText:"По вопросам спонсорства и сотрудничества пишите через Afdian",sponsorCta:"поддержите проект",sisterSite:"Ещё инструменты",homeSponsorLead:"Нравится?",homeSponsorCta:"Угостите снеком",homeSister:"toolc · Избранные инструменты",blogLabel:"Руководства",nameWhitebg:"Убрать белый фон",nameCompress:"Сжать",nameConvert:"Конвертировать формат",nameCrop:"Обрезать и масштабировать",nameId:"Фон фото на документы",nameWm:"Водяной знак",nameBg:"Изменить цвет фона",nameSplice:"Склеить изображения",namePdf:"Изображение в PDF",nameFilter:"Фильтры",descWhitebg:"Превращает белый фон в прозрачный PNG",descCompress:"Уменьшает PNG, JPG и WebP, сохраняя детали",descConvert:"Конвертация между PNG, JPG, WebP и BMP",descCrop:"Обрезать область или задать точный размер",descId:"Синий, белый или красный фон для документов",descWm:"Добавить текстовый или графический знак",descBg:"Залить прозрачное изображение цветом или градиентом",descSplice:"Собрать несколько изображений в одно",descPdf:"Объединить изображения в один PDF",descFilter:"Яркость, контраст, насыщенность и пресеты",nameBatch:"Пакетно",descBatch:"Сжать или конвертировать несколько изображений и скачать ZIP",nameQr:"Бесплатный QR-код",descQr:"Ссылка или текст в QR-код PNG, на этом устройстве",linkQrUrl:"Ссылка в QR-код",linkQrText:"Текст в QR-код",nameRound:"Скругление и тень",descRound:"Скруглить углы или добавить тень и сохранить PNG",linkRound:"Скругление и тень",linkRoundCorner:"Скруглить углы",linkRoundShadow:"Добавить тень",relatedTools:"Другие инструменты",moreTools:"Другие инструменты",relatedTitle:"Другие инструменты",swatchWhite:"Белый",swatchBlue:"Синий",swatchRed:"Красный",swatchLight:"Голубой",swatchBlack:"Чёрный",swatchGreen:"Зелёный",swatchYellow:"Жёлтый",errType:"Этот файл не является поддерживаемым изображением. Используйте PNG, JPG или WebP.",errLoad:"Не удалось открыть изображение. Формат не поддерживается или файл повреждён.",errWm:"Не удалось открыть изображение водяного знака. Попробуйте PNG или JPG.",errCrop:"Проведите по изображению, чтобы выбрать область, которую нужно оставить.",blog1Tag:"Белый фон",blog1Title:"Как убрать белый фон",blog1Desc:"Как сделать прозрачный PNG из товара, подписи или логотипа.",blog2Tag:"Сжатие",blog2Title:"Сжать PNG меньше 100 КБ",blog2Desc:"Чем отличаются бесплатные способы и как сжать локально в браузере.",blog3Tag:"Фото на документы",blog3Title:"Сменить фон фото на документы онлайн",blog3Desc:"Синий, белый и красный фон и отличие от удаления белого.",heicTip:"HEIC пока не поддерживается — сначала конвертируйте в JPG или PNG",spliceMin:"Добавьте минимум 2 изображения"},
    pt: {heroTitle:"Ferramentas de imagem grátis",heroSubtitle:"Todas as ferramentas são processadas localmente. As imagens não são enviadas.",searchTools:"Buscar ferramentas",advanced:"Ajustar opções",sponsorText:"Para patrocínio e parcerias, fale conosco no Afdian",sponsorCta:"apoie o projeto",sisterSite:"Outras ferramentas",homeSponsorLead:"Gostou?",homeSponsorCta:"Pague-me um snack",homeSister:"toolc · Ferramentas em destaque",blogLabel:"Guias",nameWhitebg:"Remover fundo branco",nameCompress:"Comprimir",nameConvert:"Converter formato",nameCrop:"Recortar e redimensionar",nameId:"Fundo de foto de documento",nameWm:"Marca d'água",nameBg:"Mudar cor de fundo",nameSplice:"Juntar imagens",namePdf:"Imagem para PDF",nameFilter:"Filtros",descWhitebg:"Transforma o fundo branco num PNG transparente",descCompress:"Reduz PNG, JPG e WebP mantendo o detalhe",descConvert:"Converte entre PNG, JPG, WebP e BMP",descCrop:"Recorta uma área ou muda para um tamanho exato",descId:"Fundos azul, branco ou vermelho para documento",descWm:"Adiciona marca de texto ou imagem",descBg:"Preenche uma imagem transparente com cor ou gradiente",descSplice:"Junta várias imagens numa",descPdf:"Combina imagens num PDF",descFilter:"Brilho, contraste, saturação e predefinições",nameBatch:"Em lote",descBatch:"Comprime ou converte várias imagens e baixa um ZIP",nameQr:"QR code grátis",descQr:"Transforma um link ou texto num PNG de QR code",linkQrUrl:"Link para QR code",linkQrText:"Texto para QR code",nameRound:"Cantos e sombra",descRound:"Arredonde os cantos ou adicione sombra e exporte um PNG",linkRound:"Cantos e sombra",linkRoundCorner:"Arredondar cantos",linkRoundShadow:"Adicionar sombra",relatedTools:"Mais ferramentas",moreTools:"Mais ferramentas",relatedTitle:"Mais ferramentas",swatchWhite:"Branco",swatchBlue:"Azul",swatchRed:"Vermelho",swatchLight:"Azul-claro",swatchBlack:"Preto",swatchGreen:"Verde",swatchYellow:"Amarelo",errType:"Esse ficheiro não é uma imagem suportada. Use PNG, JPG ou WebP.",errLoad:"Não foi possível abrir a imagem. Formato não suportado ou ficheiro danificado.",errWm:"Não foi possível abrir a marca d'água. Tente PNG ou JPG.",errCrop:"Arraste sobre a imagem para escolher a área a manter.",blog1Tag:"Fundo branco",blog1Title:"Como remover um fundo branco",blog1Desc:"Fotos de produto, assinaturas e logos em PNG transparente.",blog2Tag:"Comprimir",blog2Title:"Comprimir um PNG abaixo de 100KB",blog2Desc:"Diferenças entre opções grátis e como comprimir no navegador.",blog3Tag:"Foto de documento",blog3Title:"Mudar o fundo de uma foto de documento",blog3Desc:"Fundos azul, branco e vermelho, e a diferença para remover o branco.",heicTip:"HEIC ainda não é suportado — converta primeiro para JPG ou PNG",spliceMin:"Adicione pelo menos 2 imagens"},
    ar: {heroTitle:"أدوات صور مجانية عبر الإنترنت",heroSubtitle:"تُعالَج كل الأدوات محلياً. لا يتم رفع الصور.",searchTools:"ابحث عن أداة",advanced:"ضبط الإعدادات",sponsorText:"للرعاية والتعاون، تواصل معنا عبر Afdian",sponsorCta:"ادعم المشروع",sisterSite:"أدوات أخرى",homeSponsorLead:"أعجبك؟",homeSponsorCta:"ادعمني بوجبة خفيفة",homeSister:"toolc · أدوات مختارة",blogLabel:"أدلة",nameWhitebg:"إزالة الخلفية البيضاء",nameCompress:"ضغط الصور",nameConvert:"تحويل الصيغة",nameCrop:"قص وتغيير الحجم",nameId:"خلفية صورة الهوية",nameWm:"علامة مائية",nameBg:"تغيير لون الخلفية",nameSplice:"دمج الصور",namePdf:"صورة إلى PDF",nameFilter:"فلاتر",descWhitebg:"يحوّل الخلفية البيضاء إلى PNG شفاف",descCompress:"يصغّر PNG وJPG وWebP مع إبقاء التفاصيل",descConvert:"التحويل بين PNG وJPG وWebP وBMP",descCrop:"قص منطقة أو ضبط قياس محدد",descId:"خلفيات زرقاء أو بيضاء أو حمراء لصور الهوية",descWm:"إضافة علامة نصية أو صورية",descBg:"ملء صورة شفافة بلون أو تدرج",descSplice:"جمع عدة صور في صورة واحدة",descPdf:"جمع الصور في ملف PDF واحد",descFilter:"السطوع والتباين والتشبع والإعدادات الجاهزة",nameBatch:"دفعة",descBatch:"ضغط أو تحويل عدة صور ثم تنزيل ملف ZIP",nameQr:"رمز QR مجاني",descQr:"حوّل رابطاً أو نصاً إلى PNG لرمز QR على هذا الجهاز",linkQrUrl:"رابط إلى رمز QR",linkQrText:"نص إلى رمز QR",nameRound:"زوايا وظل",descRound:"تدوير الزوايا أو إضافة ظل ثم تصدير PNG",linkRound:"زوايا وظل",linkRoundCorner:"تدوير زوايا الصورة",linkRoundShadow:"إضافة ظل للصورة",relatedTools:"المزيد من الأدوات",moreTools:"المزيد من الأدوات",relatedTitle:"المزيد من الأدوات",swatchWhite:"أبيض",swatchBlue:"أزرق",swatchRed:"أحمر",swatchLight:"أزرق فاتح",swatchBlack:"أسود",swatchGreen:"أخضر",swatchYellow:"أصفر",errType:"هذا الملف ليس صورة مدعومة. استخدم PNG أو JPG أو WebP.",errLoad:"تعذر فتح الصورة. قد تكون الصيغة غير مدعومة أو الملف تالفاً.",errWm:"تعذر فتح صورة العلامة المائية. جرّب PNG أو JPG.",errCrop:"اسحب على الصورة لتحديد المنطقة التي تريد الإبقاء عليها.",blog1Tag:"خلفية بيضاء",blog1Title:"كيف تزيل خلفية بيضاء",blog1Desc:"تحويل صور المنتجات والتواقيع والشعارات إلى PNG شفاف.",blog2Tag:"ضغط",blog2Title:"ضغط PNG إلى أقل من 100 كيلوبايت",blog2Desc:"الفرق بين الطرق المجانية وكيف تضغط الصورة داخل المتصفح.",blog3Tag:"صورة هوية",blog3Title:"تغيير خلفية صورة الهوية عبر الإنترنت",blog3Desc:"الخلفية الزرقاء والبيضاء والحمراء، والفرق عن إزالة الأبيض.",heicTip:"HEIC غير مدعوم بعد — حوّله أولاً إلى JPG أو PNG",spliceMin:"أضف صورتين على الأقل"},
    vi: {heroTitle:"Công cụ ảnh trực tuyến miễn phí",heroSubtitle:"Mọi công cụ đều xử lý tại máy. Ảnh không được tải lên.",searchTools:"Tìm công cụ",advanced:"Chỉnh thông số",sponsorText:"Tài trợ và hợp tác xin liên hệ qua Afdian",sponsorCta:"ủng hộ dự án",sisterSite:"Thêm công cụ",homeSponsorLead:"Thấy ổn?",homeSponsorCta:"Mời tôi gói snack",homeSister:"toolc · Công cụ chọn lọc",blogLabel:"Hướng dẫn",nameWhitebg:"Xóa nền trắng",nameCompress:"Nén ảnh",nameConvert:"Chuyển định dạng",nameCrop:"Cắt và đổi kích thước",nameId:"Nền ảnh thẻ",nameWm:"Đóng dấu ảnh",nameBg:"Đổi màu nền",nameSplice:"Ghép ảnh",namePdf:"Ảnh sang PDF",nameFilter:"Bộ lọc",descWhitebg:"Đổi nền trắng thành PNG trong suốt",descCompress:"Thu nhỏ PNG, JPG, WebP mà vẫn giữ chi tiết",descConvert:"Chuyển qua lại PNG, JPG, WebP, BMP",descCrop:"Cắt một vùng hoặc đổi đúng kích thước",descId:"Nền xanh, trắng hoặc đỏ cho ảnh thẻ",descWm:"Thêm dấu chữ hoặc hình",descBg:"Phủ màu hoặc chuyển sắc lên ảnh trong suốt",descSplice:"Ghép nhiều ảnh thành một",descPdf:"Gộp ảnh thành một PDF",descFilter:"Độ sáng, tương phản, bão hòa và mẫu sẵn",nameBatch:"Hàng loạt",descBatch:"Nén hoặc chuyển nhiều ảnh, rồi tải một file ZIP",nameQr:"Tạo mã QR miễn phí",descQr:"Đổi liên kết hoặc chữ thành PNG mã QR, ngay trên máy",linkQrUrl:"Liên kết thành mã QR",linkQrText:"Chữ thành mã QR",nameRound:"Bo góc và đổ bóng",descRound:"Bo góc hoặc thêm bóng cho ảnh, rồi xuất PNG",linkRound:"Bo góc và đổ bóng",linkRoundCorner:"Bo góc ảnh",linkRoundShadow:"Thêm bóng cho ảnh",relatedTools:"Công cụ khác",moreTools:"Công cụ khác",relatedTitle:"Công cụ khác",swatchWhite:"Trắng",swatchBlue:"Xanh dương",swatchRed:"Đỏ",swatchLight:"Xanh nhạt",swatchBlack:"Đen",swatchGreen:"Xanh lá",swatchYellow:"Vàng",errType:"Tệp này không phải ảnh được hỗ trợ. Hãy dùng PNG, JPG hoặc WebP.",errLoad:"Không mở được ảnh. Định dạng không hỗ trợ hoặc tệp đã hỏng.",errWm:"Không mở được ảnh dấu. Hãy thử PNG hoặc JPG.",errCrop:"Kéo trên ảnh để chọn vùng cần giữ lại.",blog1Tag:"Nền trắng",blog1Title:"Cách xóa nền trắng",blog1Desc:"Đưa ảnh sản phẩm, chữ ký và logo thành PNG trong suốt.",blog2Tag:"Nén",blog2Title:"Nén PNG xuống dưới 100KB",blog2Desc:"Khác biệt giữa các cách miễn phí và cách nén ngay trong trình duyệt.",blog3Tag:"Ảnh thẻ",blog3Title:"Đổi nền ảnh thẻ trực tuyến",blog3Desc:"Nền xanh, trắng, đỏ, và khác gì với xóa nền trắng.",heicTip:"Chưa hỗ trợ HEIC — hãy chuyển sang JPG hoặc PNG trước",spliceMin:"Hãy thêm ít nhất 2 ảnh"},
    id: {heroTitle:"Alat gambar online gratis",heroSubtitle:"Semua alat diproses secara lokal. Gambar tidak diunggah.",searchTools:"Cari alat",advanced:"Sesuaikan pengaturan",sponsorText:"Untuk sponsor dan kerja sama, hubungi lewat Afdian",sponsorCta:"dukung proyek",sisterSite:"Alat lain",homeSponsorLead:"Suka?",homeSponsorCta:"Traktir saya camilan",homeSister:"toolc · Alat pilihan",blogLabel:"Panduan",nameWhitebg:"Hapus latar putih",nameCompress:"Kompres",nameConvert:"Konversi format",nameCrop:"Pangkas dan ubah ukuran",nameId:"Latar foto identitas",nameWm:"Tanda air",nameBg:"Ubah warna latar",nameSplice:"Gabung gambar",namePdf:"Gambar ke PDF",nameFilter:"Filter",descWhitebg:"Mengubah latar putih menjadi PNG transparan",descCompress:"Perkecil PNG, JPG, dan WebP sambil menjaga detail",descConvert:"Konversi antara PNG, JPG, WebP, dan BMP",descCrop:"Pangkas area atau ubah ke ukuran pasti",descId:"Latar biru, putih, atau merah untuk foto identitas",descWm:"Tambah tanda air teks atau gambar",descBg:"Isi gambar transparan dengan warna atau gradien",descSplice:"Gabungkan beberapa gambar menjadi satu",descPdf:"Satukan gambar ke dalam satu PDF",descFilter:"Kecerahan, kontras, saturasi, dan preset",nameBatch:"Batch",descBatch:"Kompres atau konversi banyak gambar, lalu unduh ZIP",nameQr:"QR code gratis",descQr:"Ubah tautan atau teks menjadi PNG QR di perangkat ini",linkQrUrl:"Tautan ke QR code",linkQrText:"Teks menjadi QR code",nameRound:"Sudut dan bayangan",descRound:"Bulatkan sudut atau tambah bayangan, lalu ekspor PNG",linkRound:"Sudut dan bayangan",linkRoundCorner:"Bulatkan sudut gambar",linkRoundShadow:"Tambah bayangan",relatedTools:"Alat gambar lain",moreTools:"Alat gambar lain",relatedTitle:"Alat gambar lain",swatchWhite:"Putih",swatchBlue:"Biru",swatchRed:"Merah",swatchLight:"Biru muda",swatchBlack:"Hitam",swatchGreen:"Hijau",swatchYellow:"Kuning",errType:"Berkas ini bukan gambar yang didukung. Gunakan PNG, JPG, atau WebP.",errLoad:"Gambar tidak bisa dibuka. Format tidak didukung atau berkas rusak.",errWm:"Gambar tanda air tidak bisa dibuka. Coba PNG atau JPG.",errCrop:"Seret pada gambar untuk memilih area yang ingin disimpan.",blog1Tag:"Latar putih",blog1Title:"Cara menghapus latar putih",blog1Desc:"Mengubah foto produk, tanda tangan, dan logo menjadi PNG transparan.",blog2Tag:"Kompres",blog2Title:"Kompres PNG di bawah 100KB",blog2Desc:"Perbedaan cara gratis dan cara mengompres di browser.",blog3Tag:"Foto identitas",blog3Title:"Ganti latar foto identitas secara online",blog3Desc:"Latar biru, putih, dan merah, serta bedanya dengan menghapus putih.",heicTip:"HEIC belum didukung — ubah dulu ke JPG atau PNG",spliceMin:"Tambahkan minimal 2 gambar"},
    th: {heroTitle:"เครื่องมือรูปภาพออนไลน์ฟรี",heroSubtitle:"เครื่องมือทั้งหมดประมวลผลในเครื่อง รูปภาพจะไม่ถูกอัปโหลด",searchTools:"ค้นหาเครื่องมือ",advanced:"ปรับค่า",sponsorText:"การสนับสนุนและความร่วมมือ โปรดติดต่อผ่าน Afdian",sponsorCta:"สนับสนุนโปรเจกต์",sisterSite:"เครื่องมือเพิ่ม",homeSponsorLead:"ถูกใจไหม?",homeSponsorCta:"เลี้ยงขนมให้หน่อย",homeSister:"toolc·เครื่องมือคัดสรร",blogLabel:"คู่มือ",nameWhitebg:"เอาพื้นขาวออก",nameCompress:"บีบอัดรูป",nameConvert:"แปลงรูปแบบ",nameCrop:"ตัดและปรับขนาด",nameId:"พื้นหลังรูปติดบัตร",nameWm:"ลายน้ำ",nameBg:"เปลี่ยนสีพื้นหลัง",nameSplice:"ต่อรูป",namePdf:"รูปเป็น PDF",nameFilter:"ฟิลเตอร์",descWhitebg:"เปลี่ยนพื้นขาวเป็น PNG โปร่งใส",descCompress:"ย่อ PNG, JPG, WebP โดยยังคงรายละเอียด",descConvert:"แปลงระหว่าง PNG, JPG, WebP และ BMP",descCrop:"ตัดบางส่วน หรือปรับเป็นขนาดที่ต้องการ",descId:"พื้นฟ้า ขาว หรือแดงสำหรับรูปติดบัตร",descWm:"ใส่ลายน้ำตัวอักษรหรือรูป",descBg:"เติมสีพื้นหรือไล่สีให้รูปโปร่งใส",descSplice:"ต่อหลายรูปเป็นรูปเดียว",descPdf:"รวมหลายรูปเป็น PDF เดียว",descFilter:"ความสว่าง คอนทราสต์ ความอิ่มตัว และค่าสำเร็จรูป",nameBatch:"หลายรูป",descBatch:"บีบอัดหรือแปลงหลายรูป แล้วดาวน์โหลดเป็น ZIP",nameQr:"สร้าง QR ฟรี",descQr:"เปลี่ยนลิงก์หรือข้อความเป็น PNG ของ QR บนเครื่อง",linkQrUrl:"ลิงก์เป็น QR",linkQrText:"ข้อความเป็น QR",nameRound:"มุมมนและเงา",descRound:"ทำให้มุมมนหรือใส่เงา แล้วส่งออก PNG",linkRound:"มุมมนและเงา",linkRoundCorner:"ทำให้มุมรูปมน",linkRoundShadow:"ใส่เงาให้รูป",relatedTools:"เครื่องมืออื่น",moreTools:"เครื่องมืออื่น",relatedTitle:"เครื่องมืออื่น",swatchWhite:"ขาว",swatchBlue:"น้ำเงิน",swatchRed:"แดง",swatchLight:"ฟ้าอ่อน",swatchBlack:"ดำ",swatchGreen:"เขียว",swatchYellow:"เหลือง",errType:"ไฟล์นี้ไม่ใช่รูปที่รองรับ โปรดใช้ PNG, JPG หรือ WebP",errLoad:"เปิดรูปไม่ได้ อาจเป็นรูปแบบที่ไม่รองรับหรือไฟล์เสีย",errWm:"เปิดรูปลายน้ำไม่ได้ ลองใช้ PNG หรือ JPG",errCrop:"ลากบนรูปเพื่อเลือกบริเวณที่ต้องการเก็บไว้",blog1Tag:"พื้นขาว",blog1Title:"วิธีเอาพื้นขาวออก",blog1Desc:"เปลี่ยนรูปสินค้า ลายเซ็น และโลโก้เป็น PNG โปร่งใส",blog2Tag:"บีบอัด",blog2Title:"บีบอัด PNG ให้ต่ำกว่า 100KB",blog2Desc:"วิธีฟรีแต่ละแบบต่างกันอย่างไร และบีบอัดในเบราว์เซอร์ได้อย่างไร",blog3Tag:"รูปติดบัตร",blog3Title:"เปลี่ยนพื้นหลังรูปติดบัตรออนไลน์",blog3Desc:"พื้นฟ้า ขาว และแดง ต่างจากการเอาพื้นขาวออกอย่างไร",heicTip:"ยังไม่รองรับ HEIC — โปรดแปลงเป็น JPG หรือ PNG ก่อน",spliceMin:"โปรดเพิ่มรูปอย่างน้อย 2 รูป"}
  };

  var SPONSOR = {
    zh: {wallTitle:"赞助者",wallLead:"这里会放赞助者名单。",wallEmpty:"名单还空着。",wallCta:"去爱发电",sizePackLabel:"证件照尺寸",size1:"1寸",size2:"2寸",sizeSmall2:"小二寸",sizeResume:"简历照",sizePackHint:"295×413、413×579、413×531。再点取消。",presetClear:"清透",presetWarmtone:"暖调",presetCooltone:"冷调",presetMono:"黑白",presetSoftlight:"柔光",presetShopsharp:"锐化电商"},
    en: {wallTitle:"Sponsors",wallLead:"Sponsor names will go here.",wallEmpty:"The list is empty.",wallCta:"Support on Afdian",sizePackLabel:"ID photo sizes",size1:"1 inch",size2:"2 inch",sizeSmall2:"Small 2 inch",sizeResume:"Resume",sizePackHint:"295×413, 413×579, 413×531. Click again to cancel.",presetClear:"Clear",presetWarmtone:"Warm tone",presetCooltone:"Cool tone",presetMono:"Black and white",presetSoftlight:"Soft light",presetShopsharp:"Product sharpen"},
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
    toolFilter:"nameFilter", toolFilter2:"nameFilter", cardFilterTitle:"nameFilter", rcFilter:"nameFilter", gridFilter:"nameFilter", relatedFilter:"nameFilter",
    toolBatch:"nameBatch", cardBatchTitle:"nameBatch", rcBatch:"nameBatch", gridBatch:"nameBatch", relatedBatch:"nameBatch",
    toolQr:"nameQr", cardQrTitle:"nameQr", rcQr:"nameQr", gridQr:"nameQr", relatedQr:"nameQr",
    toolRound:"nameRound", cardRoundTitle:"nameRound", rcRound:"nameRound", gridRound:"nameRound", relatedRound:"nameRound"
  };
  var DESC_KEYS = {
    cardWhitebgDesc:"descWhitebg", cardCompressDesc:"descCompress", cardConvertDesc:"descConvert", cardCropDesc:"descCrop",
    cardIdphotoDesc:"descId", cardWatermarkDesc:"descWm", cardBgcolorDesc:"descBg", cardSpliceDesc:"descSplice",
    cardPdfDesc:"descPdf", cardFilterDesc:"descFilter", cardBatchDesc:"descBatch", cardQrDesc:"descQr", cardRoundDesc:"descRound"
  };
  var DIRECT = ["heroTitle","heroSubtitle","advanced","sponsorText","sponsorCta","sisterSite","homeSponsorLead","homeSponsorCta","homeSister","blogLabel","relatedTools","moreTools","relatedTitle","blog1Tag","blog1Title","blog1Desc","blog2Tag","blog2Title","blog2Desc","blog3Tag","blog3Title","blog3Desc","swatchWhite","swatchBlue","swatchRed","swatchLight","swatchBlack","swatchGreen","swatchYellow","heicTip","spliceMin","linkQrUrl","linkQrText","linkRound","linkRoundCorner","linkRoundShadow"];

  /* Page guides: Simplified Chinese and English only. Any other language uses English. */
  var GUIDE_HEAD = {
    zh: { g_fitTitle: "适合这些情况", g_howTitle: "怎么用", g_whyTitle: "为什么用 imagec", g_faqTitle: "常见问题" },
    en: { g_fitTitle: "Good for", g_howTitle: "How to use", g_whyTitle: "Why imagec", g_faqTitle: "FAQ" }
  };
  var GUIDE = {
    compress: {
      zh: {
        g_fit1: "网页、博客配图太大，先压再上传。",
        g_fit2: "微信、邮件发图受限，在本机压缩后再发。",
        g_fit3: "想尽量保画质、减小体积，再上传网页或发送。",
        g_how1: "选择、拖入或粘贴图片。",
        g_how2: "选压缩等级（轻度到极致），按需再调质量与宽度。",
        g_how3: "对照预览后下载。",
        g_why1: "对照预览看体积与画质再下载。",
        g_why2: "多级预设，可调质量，并可预览。",
        g_why3: "免费；多级预设，也可细调质量与宽度。",
        g_q1: "在线图片压缩会上传我的图吗？",
        g_a1: "不会。压缩在浏览器本地完成。",
        g_q2: "压缩后画质会差很多吗？",
        g_a2: "多数用「标准」变化不大；要更小再用「强力/极致」，以预览为准。",
        g_q3: "可以只缩小宽度、少动质量吗？",
        g_a3: "可以。用宽度缩放；预览里看体积变化。"
      },
      en: {
        g_fit1: "Web or blog images that are too large — compress them before you upload.",
        g_fit2: "Chat or email size limits — compress on this device, then send.",
        g_fit3: "Shrink file size while keeping quality before you upload or send.",
        g_how1: "Choose, drop, or paste an image.",
        g_how2: "Pick a level from Light to Extreme, then adjust quality or width if you need to.",
        g_how3: "Compare the preview, then download.",
        g_why1: "Compare size and quality in the preview before you download.",
        g_why2: "Presets, adjustable quality, and a live preview.",
        g_why3: "Free; presets plus optional quality and width controls.",
        g_q1: "Does compression upload my image?",
        g_a1: "No. It stays in your browser.",
        g_q2: "Will quality drop a lot?",
        g_a2: "Standard is usually mild; use Strong/Extreme for smaller files and check the preview.",
        g_q3: "Can I shrink width and leave quality alone?",
        g_a3: "Yes. Use width scaling and watch the size in the preview."
      }
    },
    whitebg: {
      zh: {
        g_fit1: "商品图去白底，导出透明 PNG。",
        g_fit2: "签名、印章或 Logo 要透明底。",
        g_fit3: "扫描件、证件类白底素材要透明底再合成。",
        g_how1: "选择、拖入或粘贴图片。",
        g_how2: "调白色阈值和边缘柔化；按需处理浅灰底，或只去除外侧白底。",
        g_how3: "预览后导出透明 PNG。",
        g_why1: "白底转透明 PNG，适合商品图与 Logo。",
        g_why2: "阈值和边缘可以调整。",
        g_why3: "免费、无水印，导出透明 PNG。",
        g_q1: "图片会上传到服务器吗？",
        g_a1: "不会。去白底在浏览器本地完成。",
        g_q2: "导出是什么格式？",
        g_a2: "透明 PNG。",
        g_q3: "边缘还有白边怎么办？",
        g_a3: "略增白色阈值或加大边缘柔化；只要清外边时可勾选「仅去除外侧白底」。"
      },
      en: {
        g_fit1: "Product shots — remove the white and export a transparent PNG.",
        g_fit2: "Signatures, stamps, and logos that need a transparent background.",
        g_fit3: "Scanned or ID-style white-bg assets need a transparent plate before compositing.",
        g_how1: "Choose, drop, or paste an image.",
        g_how2: "Adjust the white threshold and edge softness. Use light-gray removal, or clear only the outer white, if you need to.",
        g_how3: "Preview, then export a transparent PNG.",
        g_why1: "White-to-transparent PNG for product shots and logos.",
        g_why2: "Threshold and edge softness are adjustable.",
        g_why3: "Free, with no watermark. The file is a transparent PNG.",
        g_q1: "Is my image uploaded?",
        g_a1: "No. Removing the white background stays in your browser.",
        g_q2: "What do I export?",
        g_a2: "A transparent PNG.",
        g_q3: "A white fringe is still left. What should I do?",
        g_a3: "Raise the threshold or soften the edge. To clear only the outer white, turn on outside-only removal."
      }
    },
    qr: {
      zh: {
        g_fit1: "海报或名片上放一个可扫的链接码。",
        g_fit2: "Wi-Fi、表单或短链，方便当面扫。",
        g_fit3: "打印用固定尺寸、可调颜色的 PNG。",
        g_how1: "输入链接或文字。",
        g_how2: "设置纠错、边距、颜色和尺寸。",
        g_how3: "下载 PNG。",
        g_why1: "链接或文字一键成码，导出清晰 PNG。",
        g_why2: "纠错、边距、颜色和尺寸可调。",
        g_why3: "免费，导出 PNG。",
        g_q1: "我输入的内容会上传吗？",
        g_a1: "不会。二维码在浏览器本地绘制。",
        g_q2: "纠错等级怎么选？",
        g_a2: "屏幕展示用 M；印刷或容易遮挡时用 Q 或 H。",
        g_q3: "生成二维码收费吗？",
        g_a3: "不收费，可直接下载 PNG。"
      },
      en: {
        g_fit1: "A scannable link code for a poster or a card.",
        g_fit2: "Wi-Fi, a form, or a short link to scan in person.",
        g_fit3: "A print PNG with a fixed size and custom colors.",
        g_how1: "Enter a link or some text.",
        g_how2: "Set error correction, margin, colors, and size.",
        g_how3: "Download the PNG.",
        g_why1: "Turn a link or text into a sharp PNG QR.",
        g_why2: "Error correction, margin, colors, and size are adjustable.",
        g_why3: "Free PNG.",
        g_q1: "Is what I type uploaded?",
        g_a1: "No. The QR code is drawn in your browser.",
        g_q2: "Which error-correction level should I use?",
        g_a2: "Use M on a screen. Use Q or H for print, or when the code may be covered.",
        g_q3: "Is this free?",
        g_a3: "Yes. Download the PNG at no charge."
      }
    },
    round: {
      zh: {
        g_fit1: "头像或截图做成圆角卡片。",
        g_fit2: "海报需要轻微投影。",
        g_fit3: "商品详情统一圆角。",
        g_how1: "选择、拖入或粘贴图片。",
        g_how2: "调圆角；需要时打开阴影。",
        g_how3: "预览后下载 PNG。",
        g_why1: "圆角与阴影同一页调完，导出 PNG。",
        g_why2: "效果可以边看边调。",
        g_why3: "轻量，只改圆角或阴影即可。",
        g_q1: "加圆角后还能保留透明吗？",
        g_a1: "可以。导出 PNG 会保留透明区域。",
        g_q2: "图片会上传吗？",
        g_a2: "不会。圆角和阴影都在浏览器本地计算。",
        g_q3: "只想要圆角、不要阴影？",
        g_a3: "关掉阴影即可。"
      },
      en: {
        g_fit1: "Avatars or screenshots as rounded cards.",
        g_fit2: "A light shadow on a poster.",
        g_fit3: "The same corner radius on product images.",
        g_how1: "Choose, drop, or paste an image.",
        g_how2: "Set the corner radius, and turn a shadow on if you want one.",
        g_how3: "Preview, then download the PNG.",
        g_why1: "Round corners and shadow on one page; export PNG.",
        g_why2: "The preview follows the controls.",
        g_why3: "Lightweight when you only need corners or a shadow.",
        g_q1: "Does rounding keep transparency?",
        g_a1: "Yes. The PNG export keeps transparent areas.",
        g_q2: "Is the image uploaded?",
        g_a2: "No. Corners and shadow are calculated in your browser.",
        g_q3: "I only want rounded corners, not a shadow.",
        g_a3: "Turn the shadow off."
      }
    },
    batch: {
      zh: {
        g_fit1: "多张图统一压小。",
        g_fit2: "批量转成同一种格式。",
        g_fit3: "打包成 ZIP，失败的可以重试。",
        g_how1: "一次拖入多张图片。",
        g_how2: "选择压缩或转换，并设置质量或格式。",
        g_how3: "单张下载或打包 ZIP；失败的可以重试。",
        g_why1: "压缩与转换同一页完成，可打包 ZIP。",
        g_why2: "失败可以重试，也可以打包 ZIP。",
        g_why3: "单张精细调整请用 /compress。",
        g_q1: "批量处理会上传图片吗？",
        g_a1: "不会。多张图都在浏览器本地处理。",
        g_q2: "一次能处理多少张？",
        g_a2: "受这台设备的内存限制。",
        g_q3: "和 /compress 怎么选？",
        g_a3: "单张用 /compress；多张、要 ZIP 用本页。"
      },
      en: {
        g_fit1: "Shrink many photos to a similar size.",
        g_fit2: "Convert a batch to one format.",
        g_fit3: "Download a ZIP, and retry any file that fails.",
        g_how1: "Drop in several images.",
        g_how2: "Choose compress or convert, then set quality or the format.",
        g_how3: "Download files one by one, or as a ZIP. Retry any that fail.",
        g_why1: "Compress or convert on one page; download a ZIP.",
        g_why2: "You can retry a failure and download a ZIP.",
        g_why3: "For one image with finer control, use /compress.",
        g_q1: "Are the images uploaded?",
        g_a1: "No. Every file is processed in your browser.",
        g_q2: "How many images can I add?",
        g_a2: "As many as memory on this device allows.",
        g_q3: "When should I use /compress instead?",
        g_a3: "Use /compress for one image. Use this page for many images and a ZIP."
      }
    },
    convert: {
      zh: {
        g_fit1: "在 PNG、WebP、JPG 之间互转。",
        g_fit2: "透明 PNG 要交给只收 JPG 的系统（透明处会填白）。",
        g_fit3: "对比体积，并调节质量。",
        g_how1: "选择、拖入或粘贴图片。",
        g_how2: "选择目标格式；JPG 或 WebP 可调质量。",
        g_how3: "看过体积预览后下载。",
        g_why1: "转换前后可看体积对比，再下载。",
        g_why2: "目标格式可选；JPG / WebP 可调质量。",
        g_why3: "免费。JPG 无透明（透明区填白）；要透明请选 PNG。",
        g_q1: "图片格式转换会上传我的图吗？",
        g_a1: "不会。转换在浏览器本地完成。",
        g_q2: "转换后体积会变吗？",
        g_a2: "多数会变；看页内体积对比，JPG/WebP 可调质量。",
        g_q3: "转成 JPG 后透明怎么没了？",
        g_a3: "JPG 不支持透明，透明区域会填成白色。要保留透明请用 PNG。"
      },
      en: {
        g_fit1: "Switch between PNG, WebP, and JPG.",
        g_fit2: "Hand a transparent PNG to a system that only accepts JPG (transparent areas fill white).",
        g_fit3: "Compare file size and adjust quality.",
        g_how1: "Choose, drop, or paste an image.",
        g_how2: "Pick the target format. For JPG or WebP, set the quality.",
        g_how3: "Check the size preview, then download.",
        g_why1: "Compare size before and after, then download.",
        g_why2: "Pick a target format; tune quality for JPG / WebP.",
        g_why3: "Free. JPG has no alpha (fills white); keep PNG for transparency.",
        g_q1: "Is my image uploaded?",
        g_a1: "No. Conversion stays in your browser.",
        g_q2: "Does file size change?",
        g_a2: "Often yes; use the on-page size compare and quality for JPG/WebP.",
        g_q3: "Why did transparency disappear in the JPG?",
        g_a3: "JPG has no transparency, so those areas fill white. Use PNG to keep it."
      }
    },
    crop: {
      zh: {
        g_fit1: "拖选，只要画面里的一块。",
        g_fit2: "封面或头像要固定像素。",
        g_fit3: "用 16:9 预设做封面。",
        g_how1: "上传或粘贴图片。",
        g_how2: "裁剪时拖选区域，或缩放时输入宽高（可锁定比例，也可用预设）。",
        g_how3: "预览后下载。",
        g_why1: "裁剪与缩放同一页完成。",
        g_why2: "可以拖选、输入数值，也可以用预设。",
        g_why3: "免费。去白底请用 /whitebg。",
        g_q1: "裁剪缩放会上传图片吗？",
        g_a1: "不会。选区和缩放都在浏览器本地处理。",
        g_q2: "裁剪和缩放有什么区别？",
        g_a2: "裁剪切掉多余部分；缩放改变尺寸。",
        g_q3: "怎样避免拉变形？",
        g_a3: "锁定宽高比。"
      },
      en: {
        g_fit1: "Drag a selection when you only need one part of the picture.",
        g_fit2: "A cover or avatar at an exact pixel size.",
        g_fit3: "A 16:9 preset for a cover.",
        g_how1: "Upload or paste an image.",
        g_how2: "Crop by dragging a selection, or resize by entering width and height. You can lock the ratio or use a preset.",
        g_how3: "Preview, then download.",
        g_why1: "Crop and scale on one page.",
        g_why2: "Drag a selection, type a size, or use a preset.",
        g_why3: "Free. To remove a white background, use /whitebg.",
        g_q1: "Is the image uploaded?",
        g_a1: "No. The selection and the resize stay in your browser.",
        g_q2: "What is the difference between crop and resize?",
        g_a2: "Crop cuts away the extra. Resize changes the dimensions.",
        g_q3: "How do I avoid stretching the image?",
        g_a3: "Lock the aspect ratio."
      }
    },
    idphoto: {
      zh: {
        g_fit1: "蓝底改白底，用于简历或报名。",
        g_fit2: "红底或浅蓝底，用于材料打印。",
        g_fit3: "报名或打印前，统一证件照底色。",
        g_how1: "上传或粘贴证件照（建议纯色底）。",
        g_how2: "选预设颜色或自定义颜色，并调容差与柔化。",
        g_how3: "预览后下载。",
        g_why1: "预设底色 + 自定义色，容差与柔化可调。",
        g_why2: "免费无水印；面向纯色证件底，不是通用 AI 抠图。",
        g_why3: "按页内尺寸预设导出（以控件为准）。",
        g_q1: "证件照会上传到服务器吗？",
        g_a1: "不会。换底色在浏览器本地完成。",
        g_q2: "能换哪些颜色？",
        g_a2: "白、蓝、红、浅蓝，以及自定义颜色。",
        g_q3: "边缘还有残留怎么办？",
        g_a3: "增加容差或加大边缘柔化。"
      },
      en: {
        g_fit1: "Change a blue background to white for a resume or an application.",
        g_fit2: "Red or light-blue backgrounds for printed forms.",
        g_fit3: "Unify ID-photo background color before forms or print.",
        g_how1: "Upload or paste an ID photo (solid backgrounds work best).",
        g_how2: "Pick a preset color or a custom one, then adjust tolerance and softness.",
        g_how3: "Preview, then download.",
        g_why1: "Preset or custom colors, with tolerance and edge soften.",
        g_why2: "Free, no watermark; for near-solid ID backgrounds—not general AI cutout.",
        g_why3: "Export with on-page size presets (per controls).",
        g_q1: "Is the ID photo uploaded?",
        g_a1: "No. The background change stays in your browser.",
        g_q2: "Which colors can I use?",
        g_a2: "White, blue, red, light blue, and a custom color.",
        g_q3: "Color is still left along the edge. What should I do?",
        g_a3: "Raise the tolerance or soften the edge."
      }
    }
  };

  function pageId() {
    var parts = (location.pathname || "").split("/");
    var last = "";
    for (var i = parts.length - 1; i >= 0; i--) {
      if (parts[i]) { last = parts[i]; break; }
    }
    return last.replace(/\.html$/i, "") || "index";
  }
  function guideLang() {
    var htmlCode = (document.documentElement.lang || "").toLowerCase().slice(0, 2);
    if (htmlCode === "zh") return "zh";
    if (htmlCode) return "en";
    return currentLang() === "zh" ? "zh" : "en";
  }
  function guideStrings() {
    var page = GUIDE[pageId()];
    if (!page) return null;
    var lang = guideLang();
    var head = GUIDE_HEAD[lang];
    var body = page[lang];
    var out = {};
    var key;
    for (key in head) if (Object.prototype.hasOwnProperty.call(head, key)) out[key] = head[key];
    for (key in body) if (Object.prototype.hasOwnProperty.call(body, key)) out[key] = body[key];
    return out;
  }
  var FEEDBACK_TEXT = {
    zh: {
      feedback: "反馈 & 建议",
      fb_suggest: "建议",
      fb_bug: "问题",
      fb_other: "其他",
      fb_type: "类型",
      fb_content: "反馈内容",
      fb_content_ph: "说说你遇到的问题，或想改进的地方…",
      fb_required: "必填",
      fb_contactLabel: "联系方式",
      fb_optional: "选填 · 邮箱或微信",
      fb_contact_ph: "方便我们回复你时填写",
      fb_send: "发送",
      fb_sending: "发送中…",
      fb_cancel: "取消",
      fb_need: "请先填写反馈内容",
      fb_fail: "发送失败，请稍后再试",
      fb_note: "提交后我们会在后台查看，无需 GitHub",
      fb_ok_title: "已收到",
      fb_ok_body: "感谢反馈。我们会在后台查看，有需要时再联系你。",
      fb_close: "关闭"
    },
    en: {
      feedback: "Feedback & suggestions",
      fb_suggest: "Suggestion",
      fb_bug: "Bug",
      fb_other: "Other",
      fb_type: "Type",
      fb_content: "Feedback",
      fb_content_ph: "Tell us what went wrong, or what you'd like improved…",
      fb_required: "Required",
      fb_contactLabel: "Contact",
      fb_optional: "Optional · email or WeChat",
      fb_contact_ph: "Add this if you'd like a reply",
      fb_send: "Send",
      fb_sending: "Sending…",
      fb_cancel: "Cancel",
      fb_need: "Write your feedback first",
      fb_fail: "Couldn't send. Please try again.",
      fb_note: "We'll read this in the background. No GitHub account needed.",
      fb_ok_title: "Received",
      fb_ok_body: "Thanks for the feedback. We'll review it, and contact you if we need to.",
      fb_close: "Close"
    }
  };
  var feedbackType = "suggest";
  var feedbackLastFocus = null;
  var feedbackBound = false;
  var feedbackSending = false;
  var feedbackSuccessAt = 0;

  function feedbackPack() {
    return guideLang() === "zh" ? FEEDBACK_TEXT.zh : FEEDBACK_TEXT.en;
  }
  function feedbackLabel(type) {
    var pack = feedbackPack();
    if (type === "bug") return pack.fb_bug;
    if (type === "other") return pack.fb_other;
    return pack.fb_suggest;
  }
  function feedbackPayload(message, contact) {
    var page = "/";
    try { page = (location && location.pathname) || "/"; } catch (e) {}
    return {
      type: feedbackType,
      message: message,
      contact: contact || "",
      page: page,
      lang: currentLang(),
      userAgent: (navigator && navigator.userAgent) || ""
    };
  }
  function setFeedbackType(type) {
    feedbackType = type === "bug" || type === "other" ? type : "suggest";
    var modal = document.getElementById("feedbackModal");
    if (!modal) return;
    var buttons = modal.querySelectorAll("[data-feedback-type]");
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute("data-feedback-type") === feedbackType;
      buttons[i].classList.toggle("is-on", on);
      buttons[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }
  function clearFeedbackError() {
    var error = document.getElementById("feedbackError");
    var field = document.getElementById("feedbackContent");
    if (field) {
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    }
    if (!error) return;
    error.hidden = true;
    error.setAttribute("data-i18n", "fb_need");
    error.textContent = feedbackPack().fb_need;
  }
  function showFeedbackError(key) {
    var error = document.getElementById("feedbackError");
    var field = document.getElementById("feedbackContent");
    var text = feedbackPack()[key] || "";
    if (error) {
      error.setAttribute("data-i18n", key);
      error.textContent = text;
      error.hidden = false;
    }
    if (key === "fb_need" && field) {
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", "feedbackError");
      field.focus();
    }
  }
  function setSendBusy(busy) {
    var send = document.getElementById("feedbackSend");
    if (!send) return;
    var key = busy ? "fb_sending" : "fb_send";
    send.disabled = !!busy;
    send.setAttribute("data-i18n", key);
    send.textContent = feedbackPack()[key] || "";
  }
  function showFeedbackSuccess() {
    feedbackSuccessAt = Date.now();
    var form = document.getElementById("feedbackForm");
    var success = document.getElementById("feedbackSuccess");
    var card = document.querySelector("#feedbackModal .feedbackCard");
    if (form) form.hidden = true;
    if (success) success.hidden = false;
    if (card) card.setAttribute("aria-labelledby", "feedbackSuccessTitle");
    var closeBtn = document.getElementById("feedbackSuccessClose");
    if (closeBtn) closeBtn.focus();
  }
  function resetFeedbackForm() {
    feedbackSending = false;
    setFeedbackType("suggest");
    var field = document.getElementById("feedbackContent");
    var contactEl = document.getElementById("feedbackContact");
    var form = document.getElementById("feedbackForm");
    var success = document.getElementById("feedbackSuccess");
    var card = document.querySelector("#feedbackModal .feedbackCard");
    if (field) field.value = "";
    if (contactEl) contactEl.value = "";
    clearFeedbackError();
    setSendBusy(false);
    if (form) form.hidden = false;
    if (success) success.hidden = true;
    if (card) card.setAttribute("aria-labelledby", "feedbackTitle");
  }
  function openFeedback() {
    var modal = document.getElementById("feedbackModal");
    if (!modal) return;
    feedbackLastFocus = document.activeElement;
    var success = document.getElementById("feedbackSuccess");
    if (success && !success.hidden) resetFeedbackForm();
    clearFeedbackError();
    var form = document.getElementById("feedbackForm");
    if (form) form.hidden = false;
    modal.hidden = false;
    document.body.classList.add("feedback-open");
    var field = document.getElementById("feedbackContent");
    if (field) field.focus();
  }
  function closeFeedback() {
    var modal = document.getElementById("feedbackModal");
    if (!modal || modal.hidden) return;
    var success = document.getElementById("feedbackSuccess");
    var fromSuccess = !!(success && !success.hidden);
    modal.hidden = true;
    document.body.classList.remove("feedback-open");
    if (fromSuccess) resetFeedbackForm();
    if (feedbackLastFocus && feedbackLastFocus.focus) feedbackLastFocus.focus();
  }
  function deliverFeedback(payload, done) {
    // TODO: Wire fetch once a destination is chosen (API, form service, or inbox).
    // POST JSON payload { type, message, contact, page, lang, userAgent }.
    // On failure call done(error) so the card can show fb_fail.
    // Temporary local no-op: succeed in place. Do not window.open GitHub Issues.
    void payload;
    done(null);
  }
  function sendFeedback() {
    if (feedbackSending) return;
    var field = document.getElementById("feedbackContent");
    var contactEl = document.getElementById("feedbackContact");
    var content = field ? field.value.replace(/\r\n/g, "\n").trim() : "";
    var contact = contactEl ? contactEl.value.trim() : "";
    if (!content) {
      showFeedbackError("fb_need");
      return;
    }
    clearFeedbackError();
    var payload = feedbackPayload(content, contact);
    feedbackSending = true;
    setSendBusy(true);
    deliverFeedback(payload, function (err) {
      feedbackSending = false;
      setSendBusy(false);
      if (err) {
        showFeedbackError("fb_fail");
        return;
      }
      var modal = document.getElementById("feedbackModal");
      if (!modal || modal.hidden) {
        resetFeedbackForm();
        return;
      }
      showFeedbackSuccess();
    });
  }
  function bindFeedback() {
    if (feedbackBound) return;
    feedbackBound = true;
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      if (target.closest(".feedbackOpen")) {
        event.preventDefault();
        openFeedback();
        return;
      }
      if (target.closest("[data-feedback-type]")) {
        setFeedbackType(target.closest("[data-feedback-type]").getAttribute("data-feedback-type"));
        return;
      }
      if (target.closest("#feedbackSend")) {
        event.preventDefault();
        sendFeedback();
        return;
      }
      if (target.closest("[data-feedback-close]")) {
        event.preventDefault();
        var closer = target.closest("[data-feedback-close]");
        // A double-click on Send can land on the backdrop once the card shrinks into the success state.
        if (closer.classList.contains("feedbackBackdrop") && Date.now() - feedbackSuccessAt < 400) return;
        closeFeedback();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeFeedback();
    });
    document.addEventListener("input", function (event) {
      if (!event.target || event.target.id !== "feedbackContent") return;
      if (!(event.target.value || "").trim()) return;
      event.target.removeAttribute("aria-invalid");
      event.target.removeAttribute("aria-describedby");
      var error = document.getElementById("feedbackError");
      if (error) error.hidden = true;
    });
  }
  function feedbackCloseButton() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "feedbackClose";
    button.setAttribute("data-feedback-close", "");
    button.setAttribute("data-chrome-aria", "fb_close");
    button.setAttribute("aria-label", feedbackPack().fb_close);
    button.title = feedbackPack().fb_close;
    button.textContent = "\u00d7";
    return button;
  }
  function feedbackCheckIcon() {
    var wrap = document.createElement("div");
    wrap.className = "feedbackSuccessIcon";
    wrap.setAttribute("aria-hidden", "true");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M5 12.5l4.2 4.2L19 7");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2.2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    wrap.appendChild(svg);
    return wrap;
  }
  function ensureFeedbackLink() {
    var footers = document.querySelectorAll(".siteFooter");
    if (!footers.length) {
      var created = document.createElement("footer");
      created.className = "siteFooter";
      document.body.appendChild(created);
      footers = [created];
    }
    Array.prototype.forEach.call(footers, function (footer) {
      if (footer.querySelector(".feedbackOpen")) return;
      var line = document.createElement("p");
      line.className = "feedbackLine";
      var link = document.createElement("button");
      link.type = "button";
      link.className = "feedbackOpen";
      link.setAttribute("data-i18n", "feedback");
      link.setAttribute("aria-haspopup", "dialog");
      link.textContent = "反馈 & 建议";
      line.appendChild(link);
      var icp = footer.querySelector("#icp");
      if (icp) footer.insertBefore(line, icp);
      else footer.appendChild(line);
    });
    if (!document.getElementById("feedbackModal")) {
      var pack = feedbackPack();
      var hintLabel = function (forId, labelKey, hintKey, hintClass) {
        var label = document.createElement("label");
        label.className = "feedbackLabel";
        label.htmlFor = forId;
        var name = document.createElement("span");
        name.setAttribute("data-i18n", labelKey);
        name.textContent = pack[labelKey];
        var hint = document.createElement("span");
        hint.className = hintClass;
        hint.setAttribute("data-i18n", hintKey);
        hint.textContent = pack[hintKey];
        label.appendChild(name);
        label.appendChild(hint);
        return label;
      };
      var modal = document.createElement("div");
      modal.id = "feedbackModal";
      modal.className = "feedbackModal";
      modal.hidden = true;
      var backdrop = document.createElement("div");
      backdrop.className = "feedbackBackdrop";
      backdrop.setAttribute("data-feedback-close", "");
      var card = document.createElement("div");
      card.className = "feedbackCard";
      card.setAttribute("role", "dialog");
      card.setAttribute("aria-modal", "true");
      card.setAttribute("aria-labelledby", "feedbackTitle");
      var form = document.createElement("div");
      form.id = "feedbackForm";
      var title = document.createElement("h2");
      title.id = "feedbackTitle";
      title.setAttribute("data-i18n", "feedback");
      title.textContent = pack.feedback;
      var head = document.createElement("div");
      head.className = "feedbackHead";
      head.appendChild(title);
      head.appendChild(feedbackCloseButton());
      var typeField = document.createElement("div");
      typeField.className = "feedbackField";
      var typeLabel = document.createElement("div");
      typeLabel.className = "feedbackLabel";
      typeLabel.id = "fbTypeLabel";
      typeLabel.setAttribute("data-i18n", "fb_type");
      typeLabel.textContent = pack.fb_type;
      var types = document.createElement("div");
      types.className = "feedbackTypes";
      types.setAttribute("role", "group");
      types.setAttribute("aria-labelledby", "fbTypeLabel");
      ["suggest", "bug", "other"].forEach(function (type) {
        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("data-feedback-type", type);
        button.setAttribute("data-i18n", type === "bug" ? "fb_bug" : type === "other" ? "fb_other" : "fb_suggest");
        button.textContent = feedbackLabel(type);
        types.appendChild(button);
      });
      typeField.appendChild(typeLabel);
      typeField.appendChild(types);
      var content = document.createElement("textarea");
      content.id = "feedbackContent";
      content.rows = 5;
      content.setAttribute("data-i18n-ph", "fb_content_ph");
      content.setAttribute("placeholder", pack.fb_content_ph);
      var error = document.createElement("p");
      error.id = "feedbackError";
      error.className = "feedbackError";
      error.hidden = true;
      error.setAttribute("role", "alert");
      error.setAttribute("data-i18n", "fb_need");
      error.textContent = pack.fb_need;
      var contentField = document.createElement("div");
      contentField.className = "feedbackField";
      contentField.appendChild(hintLabel("feedbackContent", "fb_content", "fb_required", "req"));
      contentField.appendChild(content);
      contentField.appendChild(error);
      var contact = document.createElement("input");
      contact.id = "feedbackContact";
      contact.type = "text";
      contact.setAttribute("data-i18n-ph", "fb_contact_ph");
      contact.setAttribute("placeholder", pack.fb_contact_ph);
      contact.autocomplete = "on";
      var contactField = document.createElement("div");
      contactField.className = "feedbackField";
      contactField.appendChild(hintLabel("feedbackContact", "fb_contactLabel", "fb_optional", "opt"));
      contactField.appendChild(contact);
      var actions = document.createElement("div");
      actions.className = "feedbackActions";
      var cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "secondary";
      cancel.setAttribute("data-feedback-close", "");
      cancel.setAttribute("data-i18n", "fb_cancel");
      cancel.textContent = pack.fb_cancel;
      var send = document.createElement("button");
      send.type = "button";
      send.className = "primary";
      send.id = "feedbackSend";
      send.setAttribute("data-i18n", "fb_send");
      send.textContent = pack.fb_send;
      actions.appendChild(cancel);
      actions.appendChild(send);
      var note = document.createElement("p");
      note.className = "feedbackNote";
      note.setAttribute("data-i18n", "fb_note");
      note.textContent = pack.fb_note;
      form.appendChild(head);
      form.appendChild(typeField);
      form.appendChild(contentField);
      form.appendChild(contactField);
      form.appendChild(actions);
      form.appendChild(note);
      var success = document.createElement("div");
      success.id = "feedbackSuccess";
      success.hidden = true;
      var successHead = document.createElement("div");
      successHead.className = "feedbackHead feedbackHeadEnd";
      successHead.appendChild(feedbackCloseButton());
      var successBody = document.createElement("div");
      successBody.className = "feedbackSuccess";
      var successTitle = document.createElement("h2");
      successTitle.id = "feedbackSuccessTitle";
      successTitle.setAttribute("data-i18n", "fb_ok_title");
      successTitle.textContent = pack.fb_ok_title;
      var successText = document.createElement("p");
      successText.setAttribute("data-i18n", "fb_ok_body");
      successText.textContent = pack.fb_ok_body;
      var successActions = document.createElement("div");
      successActions.className = "feedbackActions";
      var successClose = document.createElement("button");
      successClose.type = "button";
      successClose.className = "primary";
      successClose.id = "feedbackSuccessClose";
      successClose.setAttribute("data-feedback-close", "");
      successClose.setAttribute("data-i18n", "fb_close");
      successClose.textContent = pack.fb_close;
      successActions.appendChild(successClose);
      successBody.appendChild(feedbackCheckIcon());
      successBody.appendChild(successTitle);
      successBody.appendChild(successText);
      successBody.appendChild(successActions);
      success.appendChild(successHead);
      success.appendChild(successBody);
      card.appendChild(form);
      card.appendChild(success);
      modal.appendChild(backdrop);
      modal.appendChild(card);
      document.body.appendChild(modal);
      setFeedbackType(feedbackType);
    }
    bindFeedback();
  }
  function syncFaqJsonLd() {
    var root = document.querySelector("#guide .seoFaq");
    if (!root) return;
    var entities = [];
    var child = root.firstElementChild;
    while (child) {
      if (child.tagName === "DIV") {
        var q = child.querySelector("dt");
        var a = child.querySelector("dd");
        var name = q ? (q.textContent || "").replace(/\s+/g, " ").trim() : "";
        var text = a ? (a.textContent || "").replace(/\s+/g, " ").trim() : "";
        if (name && text) {
          entities.push({ "@type": "Question", name: name, acceptedAnswer: { "@type": "Answer", text: text } });
        }
      }
      child = child.nextElementSibling;
    }
    if (!entities.length) return;
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var s = 0; s < scripts.length; s++) {
      var data;
      try { data = JSON.parse(scripts[s].textContent); } catch (e) { continue; }
      if (!data || data["@type"] !== "FAQPage") continue;
      data.mainEntity = entities;
      scripts[s].textContent = JSON.stringify(data);
    }
  }

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
    if (key === "feedback" || (key && key.indexOf("fb_") === 0)) {
      var feedback = feedbackPack();
      if (feedback && feedback[key] != null) return feedback[key];
    }
    if (key && key.indexOf("g_") === 0) {
      var guide = guideStrings();
      if (!guide || guide[key] == null) return null;
      return guide[key];
    }
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
  function ensureSisterLink() {
    var label = (CHROME.zh && CHROME.zh.sisterSite) || "软件工具";
    document.querySelectorAll(".quietLinks").forEach(function (container) {
      if (container.querySelector('a[data-i18n="sisterSite"]')) return;
      container.appendChild(document.createTextNode(" "));
      var sep = document.createElement("span");
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "·";
      container.appendChild(sep);
      container.appendChild(document.createTextNode(" "));
      var link = document.createElement("a");
      link.href = "https://toolc.xin";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("data-i18n", "sisterSite");
      link.textContent = label;
      container.appendChild(link);
    });
  }
  function applyCopy() {
    syncBlogCards();
    ensureSisterLink();
    ensureFeedbackLink();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = textFor(el.getAttribute("data-i18n"));
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var value = textFor(el.getAttribute("data-i18n-ph"));
      if (value != null) el.setAttribute("placeholder", value);
    });
    document.querySelectorAll("[data-chrome-aria]").forEach(function (el) {
      var value = textFor(el.getAttribute("data-chrome-aria")) || pack()[el.getAttribute("data-chrome-aria")];
      if (!value) return;
      el.setAttribute("aria-label", value);
      if (el.classList.contains("feedbackClose")) el.title = value;
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
    syncFaqJsonLd();
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
    if (el.classList.contains("pin")) return;
    if (el.classList.contains("actions")) return;
      if (el.classList.contains("thumbList")) return;
      if (el.id === "file" || el.matches("input[type=file]")) return;
      if (el.classList.contains("hint") && controls.querySelector(".thumbList")) return;
      details.appendChild(el);
    });
    if (details.children.length < 2) return;
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
    if (window.imagecToolCards) window.imagecToolCards.mountAll();
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
