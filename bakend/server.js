import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";
import verificationRoutes from "./routes/verification.routes.js";
import coursesRoutes from "./routes/courses.routes.js";

const app = express();
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error("DB_URI not found from .env");
  process.exit(1);
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/verification", verificationRoutes);
app.use("/auth", authRoutes);
app.use("/courses", coursesRoutes);

connectDB(DB_URI);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
