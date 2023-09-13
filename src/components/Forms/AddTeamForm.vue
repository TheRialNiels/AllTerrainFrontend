<template>
  <div class="mt-5">
    <div class="mb-3">
      <label for="nombreEquipo" class="mb-2 block font-bold">
        Nombre de Equipo
      </label>
      <input
        v-model="props.form.nombreEquipo"
        type="text"
        id="nombreEquipo"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="Nombre Equipo"
        required
      />
    </div>

    <div class="mb-5">
      <label for="status" class="mb-2 block font-bold">Estatus</label>
      <select
        v-model="props.form.status"
        id="status"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        required
      >
        <option value="" disabled selected>Seleccione un estatus</option>
        <option value="True">Activo</option>
        <option value="False">Inactivo</option>
      </select>
    </div>

    <div>
      <button
        v-if="!props.isEditing"
        type="submit"
        class="block w-full rounded-lg border border-black bg-black p-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white"
        @click.prevent="saveTeam"
      >
        Registrar
      </button>

      <button
        v-if="props.isEditing"
        type="submit"
        class="block w-full rounded-lg border border-black bg-black p-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white"
        @click.prevent="updateTeam"
      >
        Actualizar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["save-team", "update-team"]);
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

const saveTeam = () => {
  emit("save-team");
};

const updateTeam = () => {
  emit("update-team");
};
</script>
