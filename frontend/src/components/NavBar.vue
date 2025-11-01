<template>
  <header class="p-3 text-bg-dark fixed-top w-100">
    <div>
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 me-auto"
        >
          <li>
            <router-link
              v-if="!authStore.isLogedIn"
              to="/"
              class="nav-link px-2 text-white"
              >Home</router-link
            >
          </li>

          <li>
            <router-link
              v-if="authStore.isLogedIn"
              to="/tasks"
              class="nav-link px-2 text-white"
              >Task</router-link
            >
          </li>
        </ul>

        <div class="text-end">
          <template v-if="authStore.isLogedIn">
            <!-- <router-link to="/tasks" class="nav-link">My Tasks</router-link> -->
            <span class="welcome-text me-2"
              >Hello, {{ authStore.user.name }}!</span
            >
            <button @click="handleLogout" class="btn btn-outline-light me-2">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/login">
              <button type="button" class="btn btn-outline-light me-2">
                Login
              </button>
            </router-link>
            <router-link to="/registar">
              <button type="button" class="btn btn-outline-light me-2">
                Sign-up
              </button>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  // 💡 استدعاء الـ logout action وتنظيف البيانات
  authStore.logout();
  // 💡 التوجيه إلى صفحة تسجيل الدخول لضمان التغيير الفوري للمسار
  router.push("/login");
};
</script>
