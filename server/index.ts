import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes, setupRoutes } from './routes.js';
import path from "path";
import fs from "fs";

// Simple log function
function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [express] ${message}`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached assets
app.use('/attached_assets', express.static('attached_assets'));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// For Vercel deployment - export the app directly
if (process.env.VERCEL) {
  // Register routes synchronously for Vercel
  setupRoutes(app);
  
  // Try multiple possible paths for the build files
  const possiblePaths = [
    path.resolve(process.cwd(), "dist/public"),
    path.resolve(process.cwd(), "../dist/public"),
    path.resolve(__dirname, "../dist/public"),
    path.resolve(__dirname, "../../dist/public")
  ];
  
  let distPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }
  
  if (distPath) {
    console.log(`[Vercel] Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    
    // SPA fallback
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('React app index.html not found');
      }
    });
  } else {
    console.log('[Vercel] No build files found, serving fallback page');
    console.log('[Vercel] Checked paths:', possiblePaths);
    console.log('[Vercel] Current working directory:', process.cwd());
    console.log('[Vercel] __dirname:', __dirname);
    
    // List files in current directory for debugging
    try {
      const files = fs.readdirSync(process.cwd());
      console.log('[Vercel] Files in cwd:', files);
    } catch (e) {
      console.log('[Vercel] Could not list files:', e);
    }
    
    // Fallback if no build files
    app.get('*', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>PPR Gym</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
              }
              h1 { font-size: 3em; margin-bottom: 20px; }
              p { font-size: 1.2em; margin-bottom: 30px; }
              .api-info { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <h1>🏋️ PPR Gym</h1>
            <p>Website is deployed but React build files not found!</p>
            <p>Check Vercel build logs for details.</p>
            <div class="api-info">
              <h3>API Endpoints Available:</h3>
              <p>POST /api/contact - Submit contact form</p>
              <p>GET /api/contact - Get contact messages</p>
            </div>
          </body>
        </html>
      `);
    });
  }
} else {
  // For local development - run the full server
  (async () => {
    const server = await registerRoutes(app);

    // Serve static files from dist/public for local development too
    const distPath = path.resolve(process.cwd(), "dist/public");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      
      // SPA fallback
      app.get('*', (req, res) => {
        const indexPath = path.join(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send('Build files not found - run npm run build first');
        }
      });
    } else {
      app.get('*', (req, res) => {
        res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>PPR Gym - Development</title>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 40px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  text-align: center;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                }
                h1 { font-size: 3em; margin-bottom: 20px; }
                p { font-size: 1.2em; margin-bottom: 30px; }
                .build-info { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-top: 30px; }
              </style>
            </head>
            <body>
              <h1>🏋️ PPR Gym</h1>
              <p>Development server running!</p>
              <div class="build-info">
                <h3>To see your React app:</h3>
                <p>Run <code>npm run build</code> first</p>
                <h3>API Endpoints Available:</h3>
                <p>POST /api/contact - Submit contact form</p>
                <p>GET /api/contact - Get contact messages</p>
              </div>
            </body>
          </html>
        `);
      });
    }

    const port = parseInt(process.env.PORT || '5000', 10);
    const host = process.platform === 'win32' ? 'localhost' : '0.0.0.0';
    
    server.listen(port, host, () => {
      log(`serving on port ${port}`);
    });
  })();
}

// Export for Vercel and CommonJS
export default app;
