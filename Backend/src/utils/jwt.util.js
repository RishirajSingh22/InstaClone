import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const signToken = (payload, expiresIn = "7d") =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);