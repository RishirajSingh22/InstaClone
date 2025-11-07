import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandler);

connectDB();

export default app;
