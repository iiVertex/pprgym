// server/index.ts
import express from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  contactMessages;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContactMessage(insertMessage) {
    const id = randomUUID();
    const message = {
      ...insertMessage,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
  async getContactMessages() {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  firstName: true,
  lastName: true,
  email: true,
  message: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({
        success: true,
        message: "Contact message sent successfully!",
        id: message.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Failed to send contact message"
        });
      }
    }
  });
  app2.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve contact messages"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function setupRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({
        success: true,
        message: "Contact message sent successfully!",
        id: message.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Failed to send contact message"
        });
      }
    }
  });
  app2.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve contact messages"
      });
    }
  });
  return app2;
}

// server/index.ts
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
function log(message) {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [express] ${message}`);
}
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/attached_assets", express.static("attached_assets"));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});
if (process.env.VERCEL) {
  setupRoutes(app);
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
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("React app index.html not found");
      }
    });
  } else {
    console.log("[Vercel] No build files found, serving fallback page");
    console.log("[Vercel] Checked paths:", possiblePaths);
    console.log("[Vercel] Current working directory:", process.cwd());
    console.log("[Vercel] __dirname:", __dirname);
    try {
      const files = fs.readdirSync(process.cwd());
      console.log("[Vercel] Files in cwd:", files);
    } catch (e) {
      console.log("[Vercel] Could not list files:", e);
    }
    app.get("*", (req, res) => {
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
            <h1>\u{1F3CB}\uFE0F PPR Gym</h1>
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
  (async () => {
    const server = await registerRoutes(app);
    const distPath = path.resolve(process.cwd(), "dist/public");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send("Build files not found - run npm run build first");
        }
      });
    } else {
      app.get("*", (req, res) => {
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
              <h1>\u{1F3CB}\uFE0F PPR Gym</h1>
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
    const port = parseInt(process.env.PORT || "5000", 10);
    const host = process.platform === "win32" ? "localhost" : "0.0.0.0";
    server.listen(port, host, () => {
      log(`serving on port ${port}`);
    });
  })();
}
var index_default = app;
export {
  index_default as default
};
