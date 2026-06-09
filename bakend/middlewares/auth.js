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
    try {
      // Читаем токен из cookie
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await userModel.findById(id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      next();
    } catch {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  export function requireRole(...roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  }
