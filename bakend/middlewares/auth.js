import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables.");
  process.exit(1);
}

export async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  if (!token)
    return res 
        .status(401)
        .json({ message: "No token provided, authorization denied" });
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(id);
  if (!user) return res.status(400).json({ message: "Invalid token" });
  next();
}
