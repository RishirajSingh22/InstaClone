import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // already hashed
    otpCode: { type: String, required: true },
    otpExpires: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("PendingUser", pendingUserSchema);