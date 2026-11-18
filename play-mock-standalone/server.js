// Zero-dependency static server for the Play page mock-mode build. Uses only Node's built-in
// modules on purpose — this folder is meant to be unzipped on any machine and run immediately with
// `npm start` / `npm run dev`, with no `npm install`, no network access, and no auth of any kind.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT) || 4173;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.map': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.mp4': 'video/mp4',
};

const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'));

const server = http.createServer((req, res) => {
    const requestPath = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.normalize(path.join(DIST_DIR, requestPath));

    // Guard against path traversal outside dist/
    if (!filePath.startsWith(DIST_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    // Byte-range support so <video> can stream/seek/loop the mp4 without loading it all at once.
    const stat = fs.statSync(filePath, { throwIfNoEntry: false });
    if (stat?.isFile() && path.extname(filePath).toLowerCase() === '.mp4') {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
        let start = 0;
        let end = stat.size - 1;
        if (range) {
            if (range[1] === '' && range[2] !== '') {
                // suffix range: last N bytes
                start = Math.max(stat.size - Number(range[2]), 0);
            } else {
                if (range[1] !== '') start = Number(range[1]);
                if (range[2] !== '') end = Math.min(Number(range[2]), end);
            }
        }
        if (start > end || start >= stat.size) {
            res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
            res.end();
            return;
        }
        const headers = {
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
        };
        if (range) headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
        res.writeHead(range ? 206 : 200, headers);
        fs.createReadStream(filePath, { start, end }).pipe(res);
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err || fs.statSync(filePath, { throwIfNoEntry: false })?.isDirectory()) {
            // Not a real static asset — this is a client-side route (e.g. /play). Serve the SPA
            // shell so react-router can take over and render it.
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
            res.end(indexHtml);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\nCloud Games Play page (mock mode) running at:\n`);
    console.log(`  http://localhost:${PORT}/play\n`);
    console.log('No backend, VPN, or auth required — this is a static, pre-built mock-mode bundle.');
    console.log('Press Ctrl+C to stop.\n');
});
