import express from "express";
import productModel from "./product.model.js";
import { authMiddleware } from "../middlewares/auth.js";
import { title } from "framer-motion/client";
import { message } from "telegraf/filters";
const router = express.Router();

router.use(authMiddleware);

router.get("/", authMiddleware, async (req, res) => {
  const product = await productModel.find();
  res.json(200).json(product);
});

router.post("/", authMiddleware, async (req, res) => {
  const { title, price } = req.body;
  if (!title || !price) {
    return res.status(400).json({ message: "Title and price are required" });
  }
  const product = await productModel.create({ title, price });
  res.status(201).json(product);
});
export default router;
