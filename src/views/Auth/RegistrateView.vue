<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="flex flex-col items-center justify-center rounded-lg bg-primary px-20 py-5"
    >
      <h1 class="text-xl font-bold text-white">Crear cuenta</h1>

      <AddRegisterForm :form="form" @save-user="saveUser" />

      <div class="mt-4 flex w-full justify-end">
        <p class="cursor-pointer text-sm text-white">
          ¿Ya tienes una cuenta?
          <a href="/login" class="hover:text-black/50">Inicia sesión aquí</a>
        </p>
      </div>

      <div class="mt-10 w-full">
        <button
          type="submit"
          class="w-full rounded-lg bg-white py-2.5 text-sm font-bold text-black transition-all duration-300 ease-in-out hover:bg-black/90 hover:text-white"
          @click.prevent="saveUser"
        >
          Registrate
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {
  SwalError,
  SwalCustomLoading,
  SwalSuccess,
  SwalWarning,
} from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import AddRegisterForm from "@/components/Forms/AddRegisterForm.vue";

const router = useRouter();

const form = reactive({
  id: "",
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  role: "encargado",
  password: "",
  repeatPassword: "",
});

const saveUser = async () => {
  if (
    !form.email ||
    !form.username ||
    !form.first_name ||
    !form.last_name ||
    !form.role ||
    !form.password ||
    !form.repeatPassword
  ) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  if (form.password !== form.repeatPassword) {
    SwalWarning("Las contraseñas no coinciden");
    return;
  }

  SwalCustomLoading("Guardando...");

  try {
    const response = await toDoRequest.post("api/auth/create-encargado/", form);

    if (response.status === 201) {
      SwalSuccess("Usuario registrado exitosamente");
      router.push("/login");
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};
</script>
