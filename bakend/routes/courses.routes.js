import express from "express";
import { authMiddleware, requireRole } from "../middlewares/auth.js";

const router = express.Router();

let courses = [];
let id = 1;


router.get("/", authMiddleware, (req, res) => {
  res.json(courses);
});


router.post("/", authMiddleware, requireRole("admin"), (req, res) => {
  const { title, description } = req.body;
  const course = { id: id++, title, description };
  courses.push(course);
  res.status(201).json(course);
});


router.put("/:id", authMiddleware, requireRole("admin"), (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: "Course not found" });
  const { title, description } = req.body;
  course.title = title;
  course.description = description;
  res.json(course);
});


router.delete("/:id", authMiddleware, requireRole("admin"), (req, res) => {
  courses = courses.filter((c) => c.id !== parseInt(req.params.id));
  res.json({ message: "Course deleted" });
});

export default router;
