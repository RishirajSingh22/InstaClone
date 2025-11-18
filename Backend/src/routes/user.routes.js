import express from "express";
import { getUsers,signInUser, registerUser, sendOtp, verifyOtp } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.post("/signIn", signInUser);
router.post("/send-otp", sendOtp);                  // send OTP to email
router.post("/verify-otp", verifyOtp);              // verify OTP

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.path}`);
});

export default router;
