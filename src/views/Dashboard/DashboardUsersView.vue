<template>
  <div>
    <h1 class="text-xl font-bold">Tabla de usuarios</h1>

    <!-- <AddUserForm
      :form="form"
      :isEditing="isEditing"
      @save-user="saveUser"
      @update-user="updateUser"
    /> -->

    <UserTable
      :form="form"
      :userData="userData"
      :isEditing="isEditing"
      :getUserData="getUserData"
      @change-is-editing="changeIsEditing"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
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

const userData = ref([]);

const form = reactive({
  id: "",
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  role: "",
});

const isEditing = ref(false);

const getUserData = async () => {
  SwalLoading();

  try {
    const response = await toDoRequest.get("api/auth/get-users/");

    if (response.status === 200) {
      SwalClose();
      userData.value = response.data;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

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
    const response = await toDoRequest.post("api/auth/create-user/", form);

    if (response.status === 201) {
      SwalSuccess("Usuario registrado exitosamente");

      userData.value.push(form);

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
    const response = await toDoRequest.patch("api/auth/update-user/", form);

    if (response.status === 200) {
      SwalSuccess("Usuario actualizado exitosamente");

      const userDataArray = userData.value;

      // Actualiza la información del usuario en la lista userData
      const updatedUserIndex = userDataArray.findIndex((user) => user.id === form.id);
      if (updatedUserIndex !== -1) {
        userDataArray[updatedUserIndex] = { ...userDataArray[updatedUserIndex], ...form };
      }

      // Actualiza userData con la nueva lista modificada
      userData.value = [...userDataArray];

      emptyForm();

      isEditing.value = false;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const changeIsEditing = () => {
  isEditing.value = true;
};
</script>
