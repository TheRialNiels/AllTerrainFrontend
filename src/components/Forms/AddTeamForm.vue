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

    <div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

</script>
