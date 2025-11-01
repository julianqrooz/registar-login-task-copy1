<script setup></script>

<template>
  <div class="px-4 pt-5 my-5 text-center border-bottom">
    <h1 class="display-4 fw-bold text-body-emphasis">
      Welcome to the Task Manager App!
    </h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        Welcome to the Task Manager app! Please use the navigation bar above to
        log in or register. Or click here.
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <router-link to="/login">
          <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">
            Login
          </button>
        </router-link>
        <router-link to="/registar">
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">
            Registe
          </button>
        </router-link>
      </div>
    </div>
    <div class="overflow-hidden" style="max-height: 30vh"></div>
  </div>
</template>
<style scoped></style>
