import PendingUser from "../models/pendingUser.model.js";

const create = async (data) => {
  try {
    return await PendingUser.create(data);
  } catch (error) {
    // Handle duplicate email (Mongo duplicate key error code 11000) or other validation errors
    if (error.code === 11000) {
      throw new Error("A pending registration with this email already exists. Please verify the OTP sent or wait until it expires.");
    }
    throw new Error(`Failed to create pending user: ${error.message}`);
  }
};

const findByEmail = async (email) => PendingUser.findOne({ email });

const findByEmailAndOtp = async (email, otpCode) =>{
  try {
    return await PendingUser.findOne({ email, otpCode });
  } catch (error) {
    throw new Error(`Failed to find pending user by email and OTP: ${error.message}`);
  }               
}

const deleteByEmail = async (email) => PendingUser.deleteOne({ email });

export default {
  create,
  findByEmail,
  findByEmailAndOtp,
  deleteByEmail,
};