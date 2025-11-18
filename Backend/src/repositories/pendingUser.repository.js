// src/repositories/pendingUser.repository.js
import PendingUser from "../models/pendingUser.model.js";

export const create = async (data) => {
  try {
    return await PendingUser.create(data);
  } catch (error) {
    // Handle duplicate email (Mongo duplicate key error code 11000) or other validation errors
    if (error.code === 11000) {
      throw new Error(
        "A pending registration with this email already exists. Please verify the OTP sent or wait until it expires."
      );
    }
    throw new Error(`Failed to create pending user: ${error.message}`);
  }
};

export const findByEmail = async (email) => {
  try {
    return await PendingUser.findOne({ email });
  } catch (error) {
    throw new Error(`Failed to find pending user by email: ${error.message}`);
  }
};

export const findByEmailAndOtp = async (email, otpCode) => {
  try {
    return await PendingUser.findOne({ email, otpCode });
  } catch (error) {
    throw new Error(
      `Failed to find pending user by email and OTP: ${error.message}`
    );
  }
};

export const deleteByEmail = async (email) => {
  try {
    return await PendingUser.deleteOne({ email });
  } catch (error) {
    throw new Error(`Failed to delete pending user by email: ${error.message}`);
  }
};
