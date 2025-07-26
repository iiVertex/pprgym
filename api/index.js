const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ 
      message: 'All fields are required' 
    });
  }
  
  console.log('Contact form submission:', { firstName, lastName, email, message });
  
  res.json({ 
    message: 'Thank you for your message! We will get back to you soon.' 
  });
});

// Serve static files and handle SPA routing
app.get('*', (req, res) => {
  const url = req.url;
  
  // Handle attached assets
  if (url.startsWith('/attached_assets/')) {
    const assetPath = path.join(__dirname, '..', url);
    if (fs.existsSync(assetPath)) {
      return res.sendFile(assetPath);
    }
    return res.status(404).send('Asset not found');
  }
  
  // Handle static assets from build
  if (url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    const staticPath = path.join(__dirname, '../client/dist', url);
    if (fs.existsSync(staticPath)) {
      return res.sendFile(staticPath);
    }
    return res.status(404).send('File not found');
  }
  
  // Serve index.html for all other routes (SPA)
  const indexPath = path.join(__dirname, '../client/dist/index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  
  res.status(404).send('Application not found');
});

module.exports = app;