<template>
  <div class="flex h-screen items-center justify-center bg-[#f7f7f7]">
    <div class="hidden lg:block lg:basis-1/2 lg:w-1/2 mx-10">
      <img src="/img/logo.png" alt="allTerrainLogo" class="w-full h-full" />
    </div>

    <div class="lg:basis-1/2">
      <div
        class="mx-auto lg:w-1/2 flex flex-col items-center justify-center rounded-lg bg-primary px-10 py-5"
      >
        <h1 class="text-xl font-bold text-white">Iniciar sesión</h1>
        <div class="mt-5 w-full">
          <div class="mb-3">
            <label for="email" class="mb-2 block font-bold text-white">
              Correo electrónico
            </label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm text-white placeholder:text-white/90 focus:border-white focus:ring-white"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div>
            <label for="password" class="mb-2 block font-bold text-white">
              Contraseña
            </label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              class="block w-full rounded-lg border border-white bg-transparent p-2 text-sm text-white placeholder:text-white/90 focus:border-white focus:ring-white"
              placeholder="Contraseña"
              required
            />
          </div>
        </div>
        <!-- <div class="mt-4 flex w-full justify-end">
          <p class="cursor-pointer text-sm text-white hover:text-black/50">
            Olvidaste tu contraseña?
          </p>
        </div> -->
        <div class="mt-5 w-full">
          <button
            type="submit"
            class="w-full rounded-lg bg-white py-2.5 text-sm font-bold text-black transition-all duration-300 ease-in-out hover:bg-black/90 hover:text-white"
            @click.prevent="login"
          >
            Iniciar sesión
          </button>
        </div>
        <div class="mt-5 w-full">
          <p class="cursor-pointer text-sm text-white">
            ¿No tienes una cuenta?
            <a href="/register" class="hover:text-black/50">Registrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";
import {
  SwalLoading,
  SwalClose,
  SwalWarning,
} from "@/components/SwalAlerts/index";

const store = useAuth();
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const login = async () => {
  if (!form.email || !form.password) {
    SwalWarning("Por favor, complete todos los campos");
    return;
  }

  try {
    SwalLoading();
    let result = await store.login(form);

    if (result) {
      SwalClose();
      router.push("/dashboard/usuarios");
    }
  } catch (error) {}
};
</script>
