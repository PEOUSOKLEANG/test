import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../api/apiClient";

export const useAuthStore = defineStore("auth", () => {
    const isLoading = ref(false);
    const user = ref(null);

    const login = async (credentials) => {
        isLoading.value = true;
        try {
            const response = await apiClient.post("/api/v1/admin/auth/login", credentials);
            const data = response.data.data;
            
            user.value = data.results;
            localStorage.setItem("access_token", data.results.access_token);
            localStorage.setItem("refresh_token", data.results.refresh_token);
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            isLoading.value = false;
        }
    };

    return { user, isLoading, login };
});