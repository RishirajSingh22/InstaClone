import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";

dotenv.config();
const app = express();

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

// Routes
app.use("/users", userRoutes);

// Error handler
app.use(errorHandler);

// Connect to database
connectDB();

export default app;
