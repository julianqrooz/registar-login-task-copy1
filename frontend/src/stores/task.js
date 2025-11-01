import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "../stores/auth";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/tasks/";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    getAuthHeader() {
      const authStore = useAuthStore();
      return {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      };
    },

    async fetchTasks() {
      try {
        const response = await axios.get(API_URL, this.getAuthHeader());
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async createTask(title) {
      const response = await axios.post(
        API_URL,
        { title },
        this.getAuthHeader()
      );
      this.tasks.push(response.data);
    },

    async updateTask(id, newTitle) {
      const response = await axios.put(
        API_URL + id,
        { title: newTitle },
        this.getAuthHeader()
      );
      const index = this.tasks.findIndex((task) => task._id === id);
      if (index !== -1) {
        this.tasks[index] = response.data;
      }
    },

    async deleteTask(id) {
      await axios.delete(API_URL + id, this.getAuthHeader());
      this.tasks = this.tasks.filter((task) => task._id !== id);
    },
  },
});
