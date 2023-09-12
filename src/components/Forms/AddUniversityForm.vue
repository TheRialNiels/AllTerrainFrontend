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
          v-for="equipo in equipoData "
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
        @click.prevent="saveUni"
      >
        Registrar
      </button>

      <button
        v-if="props.isEditing"
        type="submit"
        class="block w-full rounded-lg border border-black bg-black p-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white"
        @click.prevent="updateUni"
      >
        Actualizar
      </button>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { SwalError } from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import { onMounted ,ref } from "vue";

const emit = defineEmits(["save-uni", "update-uni"]);
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

const saveUni = () => {
  emit("save-uni");
};

const updateUni = () => {
  emit("update-uni");
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
})
</script>
