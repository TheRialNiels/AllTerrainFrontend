<template>
    <div>
      <h1 class="text-xl font-bold">Formulario para registro de equipos</h1>
  
      <PuntajesTable
        :puntajeData="puntajeData"
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
  import PuntajesTable from "@/components/Tables/PuntajesTable.vue";
  
  const puntajeData = ref([]);
  
  </script>
  