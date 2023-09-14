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
        <li>
          <a
            href="/dashboard/usuarios"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'users']" />
            <span class="ml-3">Users</span>
          </a>
        </li>
        <li>
          <a
            href="/dashboard/equipos"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'people-group']" />
            <span class="ml-3 flex-1 whitespace-nowrap">Equipos</span>
          </a>
        </li>
        <li>

          <a
            href="/dashboard/universidades"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'building-columns']" />
            <span class="ml-3 flex-1 whitespace-nowrap">Universidades</span>
          </a>
        </li>

        <li>

          <a
            href="/dashboard/asesores"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'person-harassing']" />
            <span class="ml-3 flex-1 whitespace-nowrap">Asesores</span>
          </a>
        </li> 

        <li>

          <a
            href="/dashboard/pruebas"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'list-check']" />
            <span class="ml-3 flex-1 whitespace-nowrap">Pruebas</span>
          </a>
        </li> 

        <li>

          <a
            href="/dashboard/puntajes"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'trophy']" />
            <span class="ml-3 flex-1 whitespace-nowrap">Puntaje</span>
          </a>
        </li> 

      </ul>

      <button
        class="group flex items-center rounded-lg p-2 text-start text-gray-900 hover:bg-gray-100"
      >
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        <span class="ml-3 flex-1 whitespace-nowrap">Sign Out</span>
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
  </div>
</template>

<script setup></script>
