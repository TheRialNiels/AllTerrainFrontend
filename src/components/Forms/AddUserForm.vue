<template>
  <div class="mt-5">
    <div class="mb-3">
      <label for="email" class="mb-2 block font-bold">
        Correo electrónico
      </label>
      <input
        v-model="props.form.email"
        type="email"
        id="email"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="correo@gmail.com"
        required
      />
    </div>

    <div class="mb-3">
      <label for="username" class="mb-2 block font-bold">
        Nombre de usuario
      </label>
      <input
        v-model="props.form.username"
        type="text"
        id="username"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="Nombre de usuario"
        required
      />
    </div>

    <div class="mb-3">
      <label for="first_name" class="mb-2 block font-bold"> Nombre </label>
      <input
        v-model="props.form.first_name"
        type="text"
        id="first_name"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="Nombre"
        required
      />
    </div>

    <div class="mb-3">
      <label for="last_name" class="mb-2 block font-bold"> Apellidos </label>
      <input
        v-model="props.form.last_name"
        type="text"
        id="last_name"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        placeholder="Apellidos"
        required
      />
    </div>

    <div class="mb-5">
      <label for="role" class="mb-2 block font-bold"> Rol </label>
      <select
        v-model="props.form.role"
        id="role"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        required
      >
        <option value="" disabled selected>Seleccione un rol</option>
        <option value="admin">Administrador</option>
        <option value="juez">Juez</option>
        <option value="encargado">Encargado</option>
      </select>
    </div>

    <div>
      <button
        v-if="!props.isEditing"
        type="submit"
        class="block w-full rounded-lg border border-black bg-black text-white p-2 text-sm font-bold hover:bg-black/50 hover:text-white transition-all duration-300 ease-in-out"
        @click.prevent="saveUser"
      >
        Registrar
      </button>

      <button
        v-if="props.isEditing"
        type="submit"
        class="block w-full rounded-lg border border-black bg-black text-white p-2 text-sm font-bold hover:bg-black/50 hover:text-white transition-all duration-300 ease-in-out"
        @click.prevent="updateUser"
      >
        Actualizar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["save-user"]);
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

const saveUser = () => {
  emit("save-user");
};

const updateUser = () => {
  emit("update-user");
};
</script>
