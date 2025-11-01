import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

// في حالة التسجيل لاول مره
export const registerUser = async (req, res) => {
  // بدنا نعرف المتغيرات الي بكتبهم
  const { name, email, password } = req.body;

  // 💡 ابدأ بـ try لحماية الكود من الأخطاء
  try {
    // تحويل الايميل لحروف صغيرة
    const emaillower = email.toLowerCase();

    // بدنا نتاكد اذا الايميل موجود مسبقا
    const userExists = await User.findOne({ email: emaillower });
    if (userExists) {
      res.status(400).json({
        message: "المستخدم مسجل مسبقا",
      });
      return;
    }

    // اذا الايميل مش موجود بنسجل المستخدم
    const user = await User.create({
      name,
      email: emaillower,
      password,
    });

    // اذا سجل بنرجع البيانات التاليه
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // إذا فشل الـ Mongoose في الإنشاء لسبب لم يتم التقاطه صراحة
      res.status(400).json({
        message: "بيانات المستخدم غير صالحة",
      });
    }
  } catch (error) {
    // 💡 Catch Block: لالتقاط أي خطأ عام (مثل خطأ في الاتصال بالـ DB، أو فشل Mongoose Validation)
    console.error("Error during user registration:", error);

    // التحقق من نوع الخطأ لإعطاء استجابة أدق إذا كان خطأ تحقق (Validation Error)
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "الرجاء التأكد من إدخال جميع الحقول المطلوبة بشكل صحيح.",
        details: error.message,
      });
      return;
    }

    // إرجاع رسالة خطأ عامة للخادم
    res.status(500).json({
      message: "حدث خطأ غير متوقع في الخادم أثناء التسجيل.",
      error: error.message,
    });
  }
};

// في حالة الدخول
export const loginUser = async (req, res) => {
  // بدنا نعرف المتغيرات الي بكتبهم
  const { email, password } = req.body;

  // تحويل الايميل لحروف صغيرة
  const emaillower = email.toLowerCase();

  // بدنا نتاكد اذا الايميل موجود
  const user = await User.findOne({ email: emaillower });

  // في حال الايميل كان موجود وكلمة المرور المدخلة لما نقارنه نفسها
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: "الايميل او كلمة المرور غير صحيحه",
    });
  }
};
