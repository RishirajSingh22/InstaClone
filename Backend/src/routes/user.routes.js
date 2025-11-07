import express from "express";
import { getUsers, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);

export default router;
