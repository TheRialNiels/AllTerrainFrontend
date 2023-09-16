<template>
    <div class="mt-5 w-full">
      <div class="mb-3">
        <label for="email" class="mb-2 block font-bold text-white">
          Correo electrónico
        </label>
        <input
          v-model="props.form.email"
          type="email"
          id="email"
          class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm placeholder:text-white/50 focus:border-white focus:ring-white"
          placeholder="correo@gmail.com"
          required
        />
      </div>

      <div class="mb-3">
        <label for="username" class="mb-2 block font-bold text-white">
          Nombre de usuario
        </label>
        <input
          v-model="props.form.username"
          type="text"
          id="username"
          class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm placeholder:text-white/50 focus:border-white focus:ring-white"
          placeholder="Nombre de usuario"
          required
        />
      </div>

      <div class="mb-3">
        <label for="first_name" class="mb-2 block font-bold text-white"> Nombre </label>
        <input
          v-model="props.form.first_name"
          type="text"
          id="first_name"
          class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm placeholder:text-white/50 focus:border-white focus:ring-white"
          placeholder="Nombre"
          required
        />
      </div>

      <div class="mb-3">
        <label for="last_name" class="mb-2 block font-bold text-white"> Apellidos </label>
        <input
          v-model="props.form.last_name"
          type="text"
          id="last_name"
          class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm placeholder:text-white/50 focus:border-white focus:ring-white"
          placeholder="Apellidos"
          required
        />
      </div>

      <div class="mb-3">
        <label for="role" class="mb-2 block font-bold text-white"> Rol </label>
        <select
          v-model="props.form.role"
          id="role"
          class="block w-full rounded-lg border text-white border-white bg-transparent p-2 text-sm placeholder:text-white/50 focus:border-white focus:ring-white"
          required
        >
          <option value="" disabled selected>Seleccione un rol</option>
          <option value="encargado">Encargado</option>
          <option value="juez">Juez</option>
        </select>
      </div>

      <div class="mb-3" >
        <label for="password" class="mb-2 block font-bold text-white">
          Contraseña
        </label>
        <input
          v-model="props.form.password"
          type="password"
          id="password"
          class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm placeholder:text-white/50 focus:border-white focus:ring-white"
          required
        />
      </div>

      <div>
        <label for="repeatPassword" class="mb-2 block font-bold text-white ">
          Repite contraseña
        </label>
        <input
          v-model="props.form.repeatPassword"
          type="password"
          id="repeatPassword"
          class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm placeholder:text-white/50 focus:border-white focus:ring-white"
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
