<template>
    <div>
      <h1 class="text-xl font-bold">Formulario de encargado</h1>
  
      <AddRegisterForm
        :form="form"
        @save-user="saveUser"
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
  import AddRegisterForm from "@/components/Forms/AddRegisterForm.vue";
  import { useRouter } from "vue-router";

  
  const router = useRouter();
  
  const form = reactive({
    id: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    role: "",
    password:"",
    repeatPassword:""

  });
  
  const saveUser = async () => {
    if (
      !form.email ||
      !form.username ||
      !form.first_name ||
      !form.last_name ||
      !form.role||
      !form.password||
      !form.repeatPassword
    ) {
      SwalWarning("Todos los campos son obligatorios");
      return;
    }

    if(form.password !== form.repeatPassword){
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
  