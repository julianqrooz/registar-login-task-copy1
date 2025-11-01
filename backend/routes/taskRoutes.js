import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// جلب جميع المهام لمستخدم معين
router.get("/", getTasks);

// انشاء مهمة جديدة
router.post("/", createTask);

// تحديث مهمة
router.put("/:id", updateTask);

// حذف مهمة
router.delete("/:id", deleteTask);
export default router;
