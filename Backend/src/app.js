// src/app.js (or wherever this file is)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5000"], // add more origins as needed
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
// Apply CORS middleware globally (handles simple and preflight requests)
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from /uploads (Backend/uploads/..)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Error handler
app.use(errorHandler);

// Connect to database
connectDB();

export default app;
