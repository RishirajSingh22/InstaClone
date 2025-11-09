import userRepository from "../repositories/user.repository.js";
import pendingUserRepository from "../repositories/pendingUser.repository.js";

import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../utils/email.util.js";
import { signToken } from "../utils/jwt.util.js";

// Step 1: user hits /register. We create a PendingUser entry and email OTP
const registerUser = async (data) => {
  // If already a real user
  const existingUser = await userRepository.findByEmail(data.email);
  if (existingUser) throw new Error("Email already registered and verified");

  // If already pending, remove to avoid duplicate otp spam
  await pendingUserRepository.deleteByEmail(data.email);

  // hash password now; we keep hashed even in pending collection
  const hashed = await bcrypt.hash(data.password, 10);

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 1000 * 60 * 5; // 5 minutes

  await pendingUserRepository.create({
    name: data.name,
    email: data.email,
    password: hashed,
    otpCode,
    otpExpires,
  });

  await sendOtpEmail(data.email, otpCode);
  return { message: "OTP sent to email. Please verify to complete registration." };
};
const getAllUsers = async () => {
  return await userRepository.findAll();
};

const signInUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");
  if (!user.isVerified) throw new Error("Please verify your email first");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signToken({ email: user.email, id: user._id, role: user.role });
  return { user, token };
};

const sendOtp = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("Email not registered");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 1000 * 60 * 5; // 5 minutes
  await userRepository.setOtp(user, otp, expires);
  await sendOtpEmail(email, otp);
  return { message: "OTP sent" };
};

const verifyOtp = async (email, code) => {
  
  const pending = await pendingUserRepository.findByEmailAndOtp(email, code);
  if (!pending) throw new Error("Invalid OTP or email");
  if (pending.otpExpires < Date.now()) {
    await pendingUserRepository.deleteByEmail(email);
    throw new Error("OTP expired. Please register again.");
  }
  // create real user now
  const created = await userRepository.createUser({
    name: pending.name,
    email: pending.email,
    password: pending.password,
    isVerified: true,
  });

  // clean up pending entry
  await pendingUserRepository.deleteByEmail(email);

  const token = signToken({ email: created.email, id: created._id, role: created.role });
  return { message: "Registration successful", user: created, token };
};


export default {
  getAllUsers,
  registerUser,
  signInUser,
  sendOtp,
  verifyOtp
};
