const fs = require('fs');
const path = require('path');

// 👉 Целевая ссылка
const TARGET_URL = "https://cjhehaf.offrslinks.com/s/717d0995aeb32";  // ← замени на свою

// 👉 Количество редиректов
const COUNT = 1000;

// 👉 Папка, куда положим все редиректы
const OUTPUT_DIR = path.join(__dirname, 'pages');

// 👉 Создаём папку, если не существует
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// 👉 Генерация HTML с задержкой, защитой от ботов и рандомизацией
for (let i = 0; i < COUNT; i++) {
  const uid = Math.random().toString(36).substring(2, 10); // случайный ID
  const fileName = `${uid}.html`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  const delay = 500 + Math.floor(Math.random() * 500); // 1–2 сек

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <script>
      const isBot = /bot|crawl|spider|facebookexternal|preview|scanner/i.test(navigator.userAgent);
      const referrer = document.referrer;
      if (!isBot && referrer !== "") {
        setTimeout(() => {
          window.location.href = "${TARGET_URL}";
        }, ${delay});
      }
    </script>
  </head>
  <body>
    <noscript><meta http-equiv="refresh" content="0;url=${TARGET_URL}"></noscript>
    <p>Redirecting...</p>
  </body>
</html>
`;

  fs.writeFileSync(filePath, html, 'utf8');
}

console.log("✅ 1000 редиректов созданы в папке 'pages'");