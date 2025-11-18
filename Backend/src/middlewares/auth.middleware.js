import { verifyToken } from "../utils/jwt.util.js";
import userRepository from "../repositories/user.repository.js";

export const auth  = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) throw new Error("No token provided");

    const decoded = verifyToken(token);
    const user = await userRepository.findByEmail(decoded.email);
    if (!user) throw new Error("User not found");

    req.user = user; // make user available downstream
    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};