import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // تم استيراد path لمعالجة المسارات
import { fileURLToPath } from "url"; // لاستخدام __dirname مع ESM
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { authProtect } from "./middleware/authMiddleware.js";

// === متغيرات ESM لتحقيق __dirname ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ===================================

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

// =========================================================
// 1. مسارات الواجهة الخلفية (API Endpoints)
// تم تغيير المسار الأساسي ليتطابق مع ما تستخدمه الواجهة الأمامية
app.use("/users", userRoutes);
app.use("/tasks", authProtect, taskRoutes);
// =========================================================

// =========================================================
// 2. خدمة الواجهة الأمامية المجمعة (Frontend Service)
// يتم تفعيل هذا الجزء فقط في بيئة الإنتاج على Render
// ---------------------------------------------------------
if (process.env.NODE_ENV === "production" || process.env.RENDER) {
  // تأكد من أن مجلد dist موجود في جذر المشروع
  const frontendPath = path.join(__dirname, "dist");

  // خدمة الملفات الثابتة (CSS, JS, images, etc.)
  app.use(express.static(frontendPath));

  // أي مسار (غير الـ API) يتم طلبه سيعيد ملف index.html
  // هذا يسمح لـ Vue Router بالعمل بشكل صحيح (History Mode)
  app.get("*", (req, res) => {
    // إذا كان الطلب إلى مسار API، يجب أن يكون قد تم معالجته بالفعل
    // إذا لم يكن كذلك، فإننا نفترض أنه مسار واجهة أمامية ونرسل index.html
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
// =========================================================

// الاستماع للمنفذ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
