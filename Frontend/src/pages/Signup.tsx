import React, { useState } from "react";
import type { User, UserFormData } from "@/types/user.types";
import authService from '../../src/services/user.service';
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";



interface VerifyResponse {
  message: string;
  token: string;
  user: User;
}

const SignupForm: React.FC = () => {
  const [step, setStep] = useState<"register" | "verify">("register");
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
const navigation=useNavigate()
  const setUser = useAuthStore((state) => (state as any).setUser);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await authService.register(formData);
      console.log(res)
      setSuccess(res.data.message);
      setStep("verify");
    } catch (err: any) {
      setError(err.message || "Server error");
    }
  };

  const handleVerify = async () => {
    try {
      const payload = { email: formData.email, code: otp };
      const res = await axiosClient.post<VerifyResponse>(
        "/users/verify-otp",
        payload
      );
      setSuccess(res.data.message);
      localStorage.setItem("access_token", res.data.token);
      setUser(res.data.user); // Set user data in authStore
      // setToken(res.data.token); // Set token in authStore
navigation("/home")
      // Reset form
      setFormData({ name: "", email: "", password: "" });
      setOtp("");
      setStep("register");
    } catch (err: any) {
      setError(err.message || "Invalid OTP or server error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (step === "register") {
      await handleRegister();
    } else {
      await handleVerify();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
  <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 transition-transform transform hover:scale-[1.01]">
    <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
      {step === "register" ? "Create an Account" : "Verify OTP"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      {step === "register" && (
        <>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </>
      )}

      {step === "verify" && (
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
            OTP Code
          </label>
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none tracking-widest text-center text-lg"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 disabled:opacity-60"
      >
        {loading
          ? "Processing..."
          : step === "register"
          ? "Sign Up"
          : "Verify OTP"}
      </button>

      {error && (
        <p className="text-red-600 text-center font-medium bg-red-50 dark:bg-red-900/20 rounded-lg py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 text-center font-medium bg-green-50 dark:bg-green-900/20 rounded-lg py-2">
          {success}
        </p>
      )}
    </form>
    <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
      Already have an account?{" "}
      <button
        onClick={() => navigation("/login")}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium focus:outline-none"
      >
        Login
      </button>
    </p>
  </div>
</div>

  );
};

export default SignupForm;
