<template>
    <div>
      <h1 class="text-xl font-bold">Pruebas por equipo</h1>

      <div class="mb-5">
        <label for="idEquipo" class="mb-2 block font-bold">Equipo</label>
        <select
          v-model="form.idEquipo"
          id="idEquipo"
          class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
          required
        >
          <option value="0" disabled selected>Seleccione un Equipo</option>
          <option
            v-for="equipo in equipoData "
            :key="equipo.id"
            :value="equipo.id"
          >
            {{ equipo.nombreEquipo }}
          </option>
        </select>
      </div>
  
  
     
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

  const form = reactive({
    idEquipo: 0,
  });
  
  const equipoData = ref([]);

  const getEquipoData = async () => {
    try {
      const response = await toDoRequest.get("api/equipo/");
  
      if (response.status === 200) {
        equipoData.value = response.data;
        console.log(equipoData.value);
      }
    } catch (error) {
      SwalError(error.response.data.error || "¡Algo salió mal!");
    }
  };
  
  onMounted(() => {
      getEquipoData();
  })

  </script>
  