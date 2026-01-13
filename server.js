const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.json': 'application/json',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);

    // Clean up URL and default to index.html
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', (err, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404 || '<h1>404 Not Found</h1>', 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', '====================================');
    console.log('\x1b[32m%s\x1b[0m', `🚀 Server is running at http://localhost:${PORT}`);
    console.log('\x1b[36m%s\x1b[0m', '====================================');
    console.log('Press Ctrl+C to stop the server.');
});
