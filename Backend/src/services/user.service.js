import userRepository from "../repositories/user.repository.js";

const getAllUsers = async () => {
  return await userRepository.findAll();
};

const registerUser = async (data) => {
  const existing = await userRepository.findByEmail(data.email);
  if (existing) throw new Error("Email already registered");

  return await userRepository.createUser(data);
};

export default {
  getAllUsers,
  registerUser
};
