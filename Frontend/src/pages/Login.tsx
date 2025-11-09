import Input from "../components/common/Input";
import Button from "../components/common/Button";
import React, { useState } from "react";
import type { User } from "@/types/user.types";
import { useNavigate } from "react-router-dom";
import authService from "../services/user.service";

const Login = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try{
     const response=await authService.login(formData);
     navigation('/home')
     console.log(response.data.message)
   }catch(err){
    console.log(err)
   }
  
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="border p-6 rounded-lg shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-3">
          <Input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <Input
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" label="Login" className="w-full" />
        <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigation("/signup")}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium focus:outline-none"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
