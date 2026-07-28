// 主动向Bing IndexNow API提交URL
import https from 'https';

const KEY = '14b64bc84c834057a1d7a7e55d3a4c2b';
const KEY_LOCATION = 'https://imagec.xin/14b64bc84c834057a1d7a7e55d3a4c2b.txt';
const HOST = 'imagec.xin';

// 推送所有语言版本的URL + 工具页面
const urls = [
  'https://imagec.xin/',
  'https://imagec.xin/?lang=zh',
  'https://imagec.xin/?lang=en',
  'https://imagec.xin/?lang=ja',
  'https://imagec.xin/?lang=ko',
  'https://imagec.xin/?lang=es',
  'https://imagec.xin/?lang=fr',
  'https://imagec.xin/?lang=de',
  'https://imagec.xin/?lang=ru',
  'https://imagec.xin/?lang=pt',
  'https://imagec.xin/?lang=ar',
  'https://imagec.xin/?lang=vi',
  'https://imagec.xin/?lang=id',
  'https://imagec.xin/?lang=th',
  'https://imagec.xin/sitemap.xml',
  'https://imagec.xin/robots.txt',
  'https://imagec.xin/whitebg.html',
  'https://imagec.xin/compress.html',
  'https://imagec.xin/convert.html',
  'https://imagec.xin/crop.html',
  'https://imagec.xin/idphoto.html',
  'https://imagec.xin/watermark.html',
  'https://imagec.xin/bgcolor.html',
  'https://imagec.xin/splice.html',
  'https://imagec.xin/img2pdf.html',
  'https://imagec.xin/filter.html',
  'https://imagec.xin/blog/white-to-transparent-guide.html',
  'https://imagec.xin/blog/remove-white-background-guide.html',
  'https://imagec.xin/blog/ecommerce-white-background.html',
  'https://imagec.xin/blog/ecommerce-white-background-guide.html',
];

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
});

const endpoints = [
  { name: 'Bing', host: 'api.indexnow.org', path: '/IndexNow' },
  { name: 'Yandex', host: 'yandex.com', path: '/indexnow' },
];

for (const ep of endpoints) {
  const result = await new Promise((resolve) => {
    const req = https.request({
      hostname: ep.host,
      path: ep.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Host': ep.host,
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 15000,
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', e => resolve({ error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ error: 'timeout' }); });
    req.write(body);
    req.end();
  });
  console.log(`${ep.name}:`, result);
}

// 也用GET方式推送一次主URL（Bing支持GET）
const getResult = await new Promise((resolve) => {
  const url = `https://www.bing.com/indexnow?url=https://imagec.xin/&key=${KEY}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => resolve({ status: res.statusCode, body: data }));
  }).on('error', e => resolve({ error: e.message }));
});
console.log('Bing GET:', getResult);
