import User from "../models/user.model.js";

const findAll = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

const findByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Failed to find user by email: ${error.message}`);
  }
};

const createUser = async (data) => {
  try {
    return await User.create(data);
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("A user with this email already exists");
    }
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

const findByVerificationToken = async (token) => {
  try {
    return await User.findOne({ verificationToken: token });
  } catch (error) {
    throw new Error(`Failed to find user by verification token: ${error.message}`);
  }
};

const markVerified = async (user) => {
  try {
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    return await user.save();
  } catch (error) {
    throw new Error(`Failed to mark user as verified: ${error.message}`);
  }
};

const setOtp = async (user, code, expires) => {
  try {
    user.otpCode = code;
    user.otpExpires = expires;
    return await user.save();
  } catch (error) {
    throw new Error(`Failed to set OTP: ${error.message}`);
  }
};

const verifyOtp = async (user, code) => {
  try {
    if (user.otpCode === code && user.otpExpires > Date.now()) {
      user.otpCode = undefined;
      user.otpExpires = undefined;
      return await user.save();
    }
    throw new Error("Invalid or expired OTP");
  } catch (error) {
    throw new Error(`OTP verification failed: ${error.message}`);
  }
};

export default {
  findAll,
  findByEmail,
  createUser,
  findByVerificationToken,
  markVerified,
  setOtp,
  verifyOtp
};
