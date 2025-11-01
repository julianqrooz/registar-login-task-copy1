import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { authProtect } from "./middleware/authMiddleware.js";

// تحميل متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
connectDb();

const app = express();

// السماح بالطلبات من اي مصدر
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// لقبول بيانات json
app.use(express.json());

// مسار اختبار بسيط
app.get("/", (req, res) => {
  res.send("API is running...");
});

// مسارات المستخدم
app.use("/api/users", userRoutes);

// مسارات المهام
app.use("/api/tasks", authProtect, taskRoutes);

// الاستماع للمنفذ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
