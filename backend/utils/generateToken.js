import jwt from "jsonwebtoken";

// انشاء دالة لتوليد رمز توكن
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

export default generateToken;
