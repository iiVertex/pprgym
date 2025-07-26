export default function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
  res.json({ 
    message: 'Thank you for your message! We will get back to you soon.' 
  });
}