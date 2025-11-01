import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TasksView from "../views/TasksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: "/registar",
      name: "registar",
      component: RegisterView,
      meta: { guestOnly: true },
    },
    {
      path: "/tasks",
      name: "tasks",
      component: TasksView,
      meta: { requirAuth: true },
    },
  ],
});
// حماية المسارات
router.beforeEach((to, from, next) => {
  const userItem = localStorage.getItem("user");
  let user = null;
  try {
    if (userItem && userItem !== "undefined" && userItem !== "null") {
      user = JSON.parse(userItem);
    }
  } catch (error) {
    console.log("خطا في المستخدم", error);
    localStorage.removeItem("user");
  }
  // اذا كان المسار محمي بس ما في user
  if (to.meta.requirAuth && !user) {
    next("/login");

    // اذا كان المسار للضيوف وفي user
  } else if (to.meta.guestOnly && user) {
    next("/tasks");
  } else {
    next();
  }
});

export default router;
