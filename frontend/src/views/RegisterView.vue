<template>
  <div class="row align-items-center g-lg-5 py-5">
    <div class="col-lg-7 text-center text-lg-start">
      <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">
        Create Account
      </h1>
      <p class="col-lg-10 fs-4">
        "Unlock a simpler way to organize your work and life. It only takes a
        minute to create an account and start building your perfect to-do list."
      </p>
    </div>
    <div class="col-md-10 mx-auto col-lg-5">
      <form
        @submit.prevent="register"
        class="p-4 p-md-5 border rounded-3 bg-body-tertiary"
      >
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingname"
            v-model="name"
          />
          <label for="floatingname">Name</label>
        </div>
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
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
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
const name = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    if (authStore.isLogedIn) {
      router.push("/tasks");
    }
  } catch (error) {
    alert(error.response.data.message || "Registration failed");
  }
};
</script>
