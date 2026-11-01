import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);
app.use(express.json());
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.use(express.static(__dirname));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
}
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Production server running on http://0.0.0.0:${PORT}`);
});
