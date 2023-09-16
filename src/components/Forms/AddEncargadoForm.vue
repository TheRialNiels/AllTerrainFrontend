<template>
  <div class="mt-5">
    <div class="mb-3">
      <label for="telefono" class="mb-2 block font-bold"> Telefono </label>
      <input
        v-model="props.form.telefono"
        type="phone"
        id="telefono"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="telefono"
        maxlength="10"
        required
      />
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
