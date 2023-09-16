<template>
  <div class="mt-5">
    <div class="mb-3">
      <label for="nombreCompleto" class="mb-2 block font-bold">
        Nombre Completo
      </label>
      <input
        v-model="props.form.nombreCompleto"
        type="text"
        id="nombreCompleto"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="Nombre Asesor"
        required
      />
    </div>

    <div class="mb-5">
      <label for="tipoAsesor" class="mb-2 block font-bold"> Rol </label>
      <select
        v-model="props.form.tipoAsesor"
        id="tipoAsesor"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        required
      >
        <option value="" disabled selected>Seleccione el tipo de asesor</option>
        <option value="academico">Academico</option>
        <option value="tecnico">Tecnico</option>
      </select>
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


</script>
