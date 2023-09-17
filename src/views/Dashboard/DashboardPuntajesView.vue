<template>
  <div>
    <h1 class="text-xl font-bold">Tabla de puntajes</h1>

    <PuntajesTable :puntajeData="puntajeData" :getPuntajeData="getPuntajeData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  SwalError,
  SwalLoading,
  SwalClose,
} from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import PuntajesTable from "@/components/Tables/PuntajesTable.vue";

const puntajeData = ref([]);

const getPuntajeData = async () => {
  SwalLoading();

  try {
    const response = await toDoRequest.get("api/obtener-puntajes/");

    if (response.status === 200) {
      SwalClose();
      puntajeData.value = response.data;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};
</script>
