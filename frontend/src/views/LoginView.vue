<template>
  <div class="row align-items-center g-lg-5 py-5">
    <div class="col-lg-7 text-center text-lg-start">
      <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">
        Already have an account? Log In
      </h1>
      <p class="col-lg-10 fs-4">
        "Ready to transform your to-do list? Sign up quickly to access all the
        tools you need to stay on top of every project and goal."
      </p>
    </div>
    <div class="col-md-10 mx-auto col-lg-5">
      <form
        @submit.prevent="loginUser"
        class="p-4 p-md-5 border rounded-3 bg-body-tertiary"
      >
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingemail"
            v-model="email"
          />
          <label for="floatingemail">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            v-model="password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? "Logging in..." : "Sign in" }}
        </button>
        <div v-if="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router"; //

const authStore = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref(null);
const isLoading = ref(false);

const loginUser = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });

    // 💡 التوجيه بعد نجاح الـ Action
    if (authStore.isLogedIn) {
      router.push("/tasks");
    }
  } catch (err) {
    error.value =
      err.response?.data?.message || "Login failed due to network error.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>
