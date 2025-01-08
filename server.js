const express = require('express');
const next = require('next');
const path = require('path');
const compression = require('compression');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files with caching headers
  server.use(
    '/static',
    express.static(path.join(__dirname, 'static'), {
      maxAge: dev ? '0' : '365d', // Set caching headers based on environment
      immutable: true // Immutable flag for caching
    })
  );

  // Compress responses using gzip
  server.use(compression());

  // Define custom routes or API endpoints here if needed
  // Example: server.get('/api/data', (req, res) => { ... });

  // Serve Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
