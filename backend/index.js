// packages
import "./env.js";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import passwordResetRoutes from "./routes/passwordResetRoutes.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();
// ✅ Set up CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://liyumart.netlify.app", //
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow non-browser clients
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", passwordResetRoutes);
app.get("/", (req, res) => {
  res.json({ msg: "Hello world!" });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
