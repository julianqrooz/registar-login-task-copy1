import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// حماية المسارات الي بدها تسجيل دخول
export const authProtect = async (req, res, next) => {
  let token;
  // التحقق من وجود التوكن في الهيدر
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // استخراج التوكن من الهيدر
      token = req.headers.authorization.split(" ")[1];
      // التحقق من صحة التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // جلب بيانات المستخدم بدون كلمة المرور
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "غير مصرح، التوكن غير صالح" });
    }
  }
};
