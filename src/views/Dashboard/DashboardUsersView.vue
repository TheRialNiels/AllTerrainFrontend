<template>
  <div>
    <h1 class="text-xl font-bold">Formulario para registro de usuarios</h1>

    <AddUserForm :form="form" :isEditing="isEditing" @save-user="saveUser" @update-user="updateUser" />

    <UserTable :form="form" :isEditing="isEditing" @change-is-editing="changeIsEditing" />
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
import UserTable from "@/components/Tables/UserTable.vue";

const form = reactive({
  id: "",
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  role: "",
});

const isEditing = ref(false);

const emptyForm = () => {
  form.id = "";
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

const updateUser = async () => {
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

  SwalCustomLoading("Actualizando...");

  try {
    const response = await toDoRequest.patch(
      "api/auth/update-user/",
      form
    );

    if (response.status === 200) {
      SwalSuccess("Usuario actualizado exitosamente");

      emptyForm();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
}

const changeIsEditing = () => {
  isEditing.value = true;
};
</script>