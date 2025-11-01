import Task from "../models/TaskModel.js";

// احضار جميع المهام لمستخدم معين
export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

// انشاء مهمة جديدة

export const createTask = async (req, res) => {
  // بدنا نعرف المتغيرات الي بكتبهم
  const { title } = req.body;

  // في حال عدم وجود عنوان للمهمة
  if (!title) {
    res.status(400).json({
      message: "يرجى ادخال عنوان للمهمة",
    });
    return;
  }
  //في حال وجود عنوان للمهمة بننشئ المهمةوبنربطها بالمستخدم
  const task = new Task({
    user: req.user.id,
    title,
  });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

// تحديث المهمة
export const updateTask = async (req, res) => {
  // البحث عن المهمة بواسطة المعرف
  const task = await Task.findById(req.params.id);
  // في حال عدم وجود المهمة
  if (!task) {
    res.status(404).json({
      message: "المهمة غير موجودة",
    });
    return;
  }
  // التأكد أن المهمة تابعة للمستخدم الذي يحاول تعديلها
  if (task.user.toString() !== req.user.id) {
    res.status(401).json({
      message: "غير مصرح لك بتعديل هذه المهمة",
    });
    return;
  }
  // اذا كانت المهمة موجودة وتنتمي للمستخدم
  // تحديث المهمة بالبيانات الجديدة
  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;
  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
};

// حذف المهمة
export const deleteTask = async (req, res) => {
  // البحث عن المهمة بواسطة المعرف
  const task = await Task.findById(req.params.id);
  // في حال عدم وجود المهمة
  if (!task) {
    res.status(404).json({
      message: "المهمة غير موجودة",
    });
    return;
  }
  // التأكد أن المهمة تابعة للمستخدم الذي يحاول حذفها
  if (task.user.toString() !== req.user.id) {
    res.status(401).json({
      message: "غير مصرح لك بحذف هذه المهمة",
    });
    return;
  }
  // اذا كانت المهمة موجودة وتنتمي للمستخدم
  await task.deleteOne();
  res.status(200).json({ message: "تم حذف المهمة بنجاح" });
};
