import userService from "../services/user.service.js";
import {successHandler} from "../utils/successHandler.js";

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;
    const avatar = req.file ? `/uploads/images/${req.file.filename}` : undefined;

    const updatedUser = await userService.updateUser(userId, { name, email, avatar });
    successHandler(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};


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

export const signInUser=async(req,res,next)=>{
  const {email,password}=req.body;
try{const result=await userService.signInUser(email,password);
successHandler(res, 200, "User signed in successfully", result);
}catch(error){
  next(error)
}

}
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
