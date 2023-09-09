import { defineStore } from "pinia";
import toDoRequests from "@/api/toDoRequests";
import Swal from "sweetalert2";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getRole(): string {
      return this.role;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    removeToken() {
      localStorage.removeItem("token");
      this.token = '';
    },
    setRole(role: string) {
      this.role = role;
      localStorage.setItem("role", role);
    },
    removeRole() {
      localStorage.removeItem("role");
      this.role = '';
    },
    async login(data: object) {
      try {
        const result = await toDoRequests.post("api/auth/login/", data);
        this.setToken(result.data.token);
        this.setRole(result.data.role);

        return true;
      } catch (error: string | any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error || "¡Algo salió mal!",
        });
      }
    },
    async logout() {
      try {
        await toDoRequests.post("api/auth/logout/", {});
        this.removeToken();
        this.removeRole();
        return true;
      } catch (error) {
        return false;
      }
    },
    async currentUser() {
      try {
        const result = await toDoRequests.get("api/auth/current-user/");
        return result;
      } catch (error) {}
    },
  },
});
