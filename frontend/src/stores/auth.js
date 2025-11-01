import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/users/";

// دالة امان لاسترجاع بيانات المستحدم المخزنة في localstorage
const getSafeUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined" || user === "null") {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.log("يوجد خطأ في المستخدم", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getSafeUser(),
  }),
  getters: {
    isLogedIn: (state) => !!state.user,
    token: (state) => (state.user ? state.user.token : null),
  },
  actions: {
    async register(userData) {
      const response = await axios.post(API_URL + "register", userData);
      this.user = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));
    },
    async login(userData) {
      const response = await axios.post(API_URL + "login", userData);
      this.user = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
