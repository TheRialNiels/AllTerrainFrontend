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

    <div class="mb-5">
      <label for="idEquipo" class="mb-2 block font-bold">Equipo</label>
      <select
        v-model="props.form.idEquipo"
        id="idEquipo"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        required
      >
        <option value="0" disabled selected>Seleccione un Equipo</option>
        <option
          v-for="equipo in equipoData"
          :key="equipo.id"
          :value="equipo.id"
        >
          {{ equipo.nombreEquipo }}
        </option>
      </select>
    </div>

    <div>
      <button
        v-if="!props.isEditing"
        type="submit"
        class="block w-full rounded-lg border border-black bg-black p-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white"
        @click.prevent="saveAdv"
      >
        Registrar
      </button>

      <button
        v-if="props.isEditing"
        type="submit"
        class="block w-full rounded-lg border border-black bg-black p-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white"
        @click.prevent="updateAdv"
      >
        Actualizar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SwalError } from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import { onMounted, ref } from "vue";

const emit = defineEmits(["save-adv", "update-adv"]);
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
});

const equipoData = ref([]);

const saveAdv = () => {
  emit("save-adv");
};

const updateAdv = () => {
  emit("update-adv");
};

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
