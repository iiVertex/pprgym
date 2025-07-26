const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist/public')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch all handler for SPA
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/public/index.html');
  
  // Check if the file exists before trying to send it
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback HTML if index.html doesn't exist
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>PPR Gym</title>
        </head>
        <body>
          <div id="root">Loading...</div>
          <script>console.log('Build files not found');</script>
        </body>
      </html>
    `);
  }
});

module.exports = app;