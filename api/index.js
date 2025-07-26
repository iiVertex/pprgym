import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve attached assets
app.use('/attached_assets', express.static(path.join(__dirname, '../attached_assets')));

// Simple contact form endpoint
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  
  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ 
      message: 'All fields are required' 
    });
  }
  
  // For now, just log the contact form submission
  console.log('Contact form submission:', { firstName, lastName, email, message });
  
  // Return success response
  res.json({ 
    message: 'Thank you for your message! We will get back to you soon.' 
  });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

export default app;