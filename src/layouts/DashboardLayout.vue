<template>
  <button
    type="button"
    class="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="h-6 w-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="default-sidebar"
    class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div
      class="flex h-full flex-col justify-between overflow-y-auto bg-gray-50 px-3 py-4"
    >
      <ul class="space-y-2 font-medium">
        <li v-for="link in links">
          <a
            v-if="link.roles.includes(role)"
            :href="link.href"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', link.icon]" />
            <span class="ml-3 flex-1 whitespace-nowrap">
              {{ link.label }}
            </span>
          </a>
        </li>
      </ul>

      <button
        class="group flex items-center rounded-lg p-2 text-start text-gray-900 hover:bg-gray-100"
        @click.prevent="logOut"
      >
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        <span class="ml-3 flex-1 whitespace-nowrap">Cerrar sesión</span>
      </button>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <div class="rounded-lg border-2 border-dashed border-gray-200 p-4">
      <RouterView />
      <!-- <div class="mb-4 grid grid-cols-3 gap-4">
        <div
          class="flex h-24 items-center justify-center rounded bg-gray-50 "
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-24 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-24 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
      </div> -->
      <!-- <div
        class="mb-4 flex h-48 items-center justify-center rounded bg-gray-50"
      >
        <p class="text-2xl text-gray-400">
          <svg
            class="h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </p>
      </div> -->
      <!-- <div class="mb-4 grid grid-cols-2 gap-4">
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
      </div> -->
      <!-- <div
        class="mb-4 flex h-48 items-center justify-center rounded bg-gray-50"
      >
        <p class="text-2xl text-gray-400">
          <svg
            class="h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </p>
      </div> -->
      <!-- <div class="grid grid-cols-2 gap-4">
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div
          class="flex h-28 items-center justify-center rounded bg-gray-50"
        >
          <p class="text-2xl text-gray-400">
            <svg
              class="h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
      </div> -->
    </div>

    <div class="flex justify-between items-center mt-5">
      <img src="/img/upsrj.jpeg" alt="Coyote Imagen" class="w-1/4 h-40">
      <img src="/img/coyote.jpeg" alt="Coyote Imagen" class="w-1/4 h-40">
      <img src="/img/coyotes.jpeg" alt="Coyote Imagen" class="w-1/4 h-40">
      
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SwalError,
  SwalClose,
  SwalCustomConfirm,
  SwalCustomLoading,
} from "@/components/SwalAlerts/index";
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const role = localStorage.getItem("role");
const links = [
  {
    href: "/dashboard/usuarios",
    icon: "users",
    label: "Usuarios",
    roles: ['admin'],
  },
  {
    href: "/dashboard/equipos",
    icon: "people-group",
    label: "Equipos",
    roles: ["admin"],
  },
  {
    href: "/dashboard/universidades",
    icon: "building-columns",
    label: "Universidades",
    roles: ["admin"],
  },
  {
    href: "/dashboard/asesores",
    icon: "person-harassing",
    label: "Asesores",
    roles: ["admin"],
  },
  {
    href: "/dashboard/pruebas",
    icon: "list-check",
    label: "Pruebas",
    roles: ["admin", "juez"],
  },
  {
    href: "/dashboard/puntajes",
    icon: "trophy",
    label: "Puntajes",
    roles: ["admin", "encargado"],
  },
  {
    href: "/dashboard/encargado",
    icon: "user-tie",
    label: "Mi perfil",
    roles: ["encargado"],
  }
]

const logOut = async () => {
  let opc = await SwalCustomConfirm(
    "¿Estás seguro de cerrar sesión?",
    "",
    "",
    "Cerrar sesión",
  );

  if (opc) {
    SwalCustomLoading("Cerrando sesión...");
    let result = await useAuth().logout();
    if (result) {
      SwalClose();
      router.push("/login");
    } else {
      SwalError("Hubo un error al cerrar sesión");
    }
  }
};
</script>
