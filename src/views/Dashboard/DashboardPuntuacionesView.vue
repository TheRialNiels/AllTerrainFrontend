<template>
    <div>
        <h1 class="text-xl font-bold">Puntucaiones Equipos</h1>
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
import PuntuacionesTable from "@/components/Tables/PuntuacionesTable.vue";

const puntuacionesData = ref([]);

const getUserData = async () => {
  SwalLoading();

  try {
    const response = await toDoRequest.get("api/auth/get-users/");

    if (response.status === 200) {
      SwalClose();
      puntuacionesData.value = response.data;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};
</script>
