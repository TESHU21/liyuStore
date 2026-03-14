// backend/routes/uploadRoutes.js
import express from "express";
import { storage } from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage });

router.post("/", (req, res) => {
  // Check if this is Postman
  if (
    req.headers["user-agent"] &&
    req.headers["user-agent"].includes("Postman")
  ) {
    console.log("🔍 Request from Postman detected!");
  }

  upload.single("image")(req, res, (err) => {
    console.log("=== Multer Processing ===");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    console.log("Multer error:", err);

    if (err) {
      console.error("❌ Multer error:", err);
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No image file provided" });
    }

    try {
      console.log("✅ File uploaded successfully");
      console.log("File path:", req.file.path);

      res.status(200).json({
        message: "Image uploaded successfully",
        image: req.file.path,
      });
    } catch (error) {
      console.error("❌ Upload error:", error);
      res.status(500).json({
        message: "Upload failed",
        error: error.message,
      });
    }
  });
});

export default router;
