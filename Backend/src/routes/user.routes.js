import express from "express";
import { getUsers,signInUser, registerUser, sendOtp, verifyOtp } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.post("/signIn", signInUser);
router.post("/send-otp", sendOtp);                  // send OTP to email
router.post("/verify-otp", verifyOtp);              // verify OTP

export default router;
