const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());

// Serve static files from the correct build directory
const staticPath = path.join(process.cwd(), 'dist', 'public');
console.log('Static path:', staticPath);
console.log('Static path exists:', fs.existsSync(staticPath));

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
}

// API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    cwd: process.cwd(),
    staticPath: staticPath,
    exists: fs.existsSync(staticPath),
    nodeVersion: process.version
  });
});

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send(`
      <h1>App Error</h1>
      <p>Index file not found at: ${indexPath}</p>
      <p>Working directory: ${process.cwd()}</p>
      <p>Node version: ${process.version}</p>
    `);
  }
});

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Simple response for testing
  if (req.url === '/api/health') {
    return res.json({ 
      status: 'ok', 
      url: req.url,
      method: req.method 
    });
  }

  // For all other routes, return a simple HTML
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>PPR Gym</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div id="root">
          <h1>PPR Gym</h1>
          <p>Server is running!</p>
          <p>URL: ${req.url}</p>
          <p>Method: ${req.method}</p>
        </div>
      </body>
    </html>
  `);
};