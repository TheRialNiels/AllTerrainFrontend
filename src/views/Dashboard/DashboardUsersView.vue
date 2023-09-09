<template>
  <div>
    <h1 class="text-xl font-bold">Formulario para registro de usuarios</h1>

    <AddUserForm :form="form" @save-user="saveUser" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  SwalError,
  SwalLoading,
  SwalCustomLoading,
  SwalDelete,
  SwalClose,
  SwalSuccess,
  SwalWarning,
} from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import AddUserForm from "@/components/Forms/AddUserForm.vue";

const form = reactive({
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  role: "",
});

const emptyForm = () => {
  form.email = "";
  form.username = "";
  form.first_name = "";
  form.last_name = "";
  form.role = "";
};

const saveUser = async () => {
  if (
    !form.email ||
    !form.username ||
    !form.first_name ||
    !form.last_name ||
    !form.role
  ) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Guardando...");

  try {
    const response = await toDoRequest.post(
      "api/auth/create-user/",
      form
    );

    if (response.status === 201) {
      SwalSuccess("Usuario registrado exitosamente");

      emptyForm();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};
</script>
