import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle contact form submission
  if (req.method === 'POST' && req.url === '/api/contact') {
    const { firstName, lastName, email, message } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }
    
    // Log the contact form submission
    console.log('Contact form submission:', { firstName, lastName, email, message });
    
    // Return success response
    return res.json({ 
      message: 'Thank you for your message! We will get back to you soon.' 
    });
  }

  // Serve the main HTML file for all other requests
  try {
    const htmlPath = path.join(__dirname, '../client/dist/index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(404).send('Not Found');
  }
}