import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API for Admin
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === "01212") {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "كلمة مرور خاطئة" });
    }
  });

  app.get("/api/menu", async (req, res) => {
    try {
      const data = await fs.readFile(path.join(__dirname, "menu.json"), "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read menu data" });
    }
  });

  app.post("/api/menu", async (req, res) => {
    try {
      const { password, data } = req.body;
      if (password !== "01212") {
        return res.status(401).json({ error: "Unauthorized" });
      }
      await fs.writeFile(path.join(__dirname, "menu.json"), JSON.stringify(data, null, 2), "utf-8");
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save menu data" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
