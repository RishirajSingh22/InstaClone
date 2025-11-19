import type {  UserFormData } from '@/types/user.types.ts';
import axiosClient from '../api/axiosClient.ts';

const register = async (formData: any) => {
const response= await  axiosClient.post("/users", formData)
  return response;
};

const login = async (formData: UserFormData) => {
  const response = await axiosClient.post("/users/signIn", formData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;