<template>
  <div class="container py-4">
    <h2 class="text-primary mb-4 border-bottom pb-2">
      <i class="bi bi-person-circle me-2"></i> Hello,
      {{ authStore.user?.name }}! Your Tasks:
    </h2>

    <div class="card shadow-sm mb-4">
      <div class="card-body d-flex align-items-center p-3">
        <form @submit.prevent="handleCreateTask" class="d-flex w-100">
          <input
            type="text"
            v-model="newTaskTitle"
            placeholder="What needs to be done?"
            class="form-control me-2"
            required
          />
          <button type="submit" class="btn btn-primary text-nowrap">
            <i class="bi bi-plus-lg"></i> Add Task
          </button>
        </form>
      </div>
    </div>

    <div v-if="taskStore.tasks.length" class="list-group">
      <li
        v-for="task in taskStore.tasks"
        :key="task._id"
        class="list-group-item d-flex justify-content-between align-items-center my-2 shadow-sm rounded-3"
      >
        <div v-if="editingId === task._id" class="d-flex w-100">
          <input
            type="text"
            v-model="editingTitle"
            class="form-control form-control-sm me-2"
          />
          <button
            @click="handleUpdateTask(task._id)"
            class="btn btn-sm btn-primary me-2"
          >
            <i class="bi bi-check"></i> Save
          </button>
          <button
            @click="editingId = null"
            class="btn btn-sm btn-outline-secondary"
          >
            <i class="bi bi-x"></i> Cancel
          </button>
        </div>

        <div
          v-else
          class="d-flex w-100 justify-content-between align-items-center"
        >
          <span class="fs-5 flex-grow-1 me-3">{{ task.title }}</span>

          <div class="btn-group" role="group">
            <button
              @click="startEdit(task._id, task.title)"
              class="btn btn-sm btn-outline-info"
            >
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button
              @click="taskStore.deleteTask(task._id)"
              class="btn btn-sm btn-outline-danger"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </li>
    </div>

    <div v-else class="alert alert-warning text-center mt-5" role="alert">
      <i class="bi bi-info-circle me-2"></i> No tasks found. Start adding some!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useTaskStore } from "../stores/task";

const authStore = useAuthStore();
const taskStore = useTaskStore();

const newTaskTitle = ref("");
const editingId = ref(null);
const editingTitle = ref("");

onMounted(() => {
  if (authStore.isLogedIn) {
    taskStore.fetchTasks();
  }
});

const handleCreateTask = async () => {
  if (newTaskTitle.value.trim()) {
    await taskStore.createTask(newTaskTitle.value.trim());
    newTaskTitle.value = "";
  }
};

const startEdit = (id, title) => {
  editingId.value = id;
  editingTitle.value = title;
};

const handleUpdateTask = async (id) => {
  if (editingTitle.value.trim()) {
    await taskStore.updateTask(id, editingTitle.value.trim());
    editingId.value = null;
    editingTitle.value = "";
  }
};
</script>
<style scoped>
/* Add some styling for the main container */
/* div {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Style the heading */
/* h2 {
  color: #333;
}

/* Style the input and buttons */
/* input[type="text"] {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
} */

/* button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
} */

/* button:hover {
  background-color: #0056b3;
} */

/* Style the task list */
/* ul {
  list-style-type: none;
  padding: 0;
} */

/* li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

/* Style for the edit input */
/* input[type="text"].edit-input {
  flex-grow: 1;
  margin-right: 10px;
} */
</style>
