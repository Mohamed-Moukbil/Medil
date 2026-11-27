import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] || process.cwd());
const PORT = Number(process.argv[3] || 8000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.map': 'application/json; charset=utf-8',
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = path.join(ROOT, decodeURIComponent(url.pathname));
  // SPA fallback: if the path isn't a real file, serve index.html.
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const candidate = path.join(filePath, 'index.html');
    if (fs.existsSync(candidate)) filePath = candidate;
    else filePath = path.join(ROOT, 'index.html');
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`MEDIL dev server: http://127.0.0.1:${PORT} (SPA fallback enabled)`);
});