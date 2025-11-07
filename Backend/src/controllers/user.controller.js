import userService from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await userService.sendOtp(email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const result = await userService.verifyOtp(email, code);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
