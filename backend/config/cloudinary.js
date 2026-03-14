// backend/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Debug - Check if credentials loaded
console.log("Cloudinary config:");
console.log(
  "Cloud name:",
  process.env.CLOUDINARY_CLOUD_NAME ? "✅ Loaded" : "❌ Missing",
);
console.log(
  "API key:",
  process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing",
);
console.log(
  "API secret:",
  process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing",
);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "liyustore/products", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `product-${Date.now()}`,
  },
});

export { cloudinary, storage };
