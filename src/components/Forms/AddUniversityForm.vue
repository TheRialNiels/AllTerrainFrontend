<template>
  <div class="mt-5">
    <div class="mb-3">
      <label for="nombre" class="mb-2 block font-bold">
        Nombre de universidad
      </label>
      <input
        v-model="props.form.nombre"
        type="text"
        id="nombre"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="Nombre Universidad"
        required
      />
    </div>
    <div class="mb-3">
      <label for="direccion" class="mb-2 block font-bold"> Direccion </label>
      <input
        v-model="props.form.direccion"
        type="text"
        id="direccion"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="Direccion"
        required
      />
    </div>
    <div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { SwalError } from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import { onMounted, ref } from "vue";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  
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
});
</script>
