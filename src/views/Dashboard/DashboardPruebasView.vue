<template>
  <div>
    <h1 class="text-xl font-bold">Pruebas por equipo</h1>

    <div class="my-5">
      <label for="idEquipo" class="mb-2 block text-lg font-bold">Equipo</label>
      <select
        v-model="form.idEquipo"
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

    <div class="my-5">
      <h2 class="mb-2 text-lg font-bold">Pruebas</h2>

      <ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="prueba in pruebaData"
          :key="prueba.id"
          class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center justify-between space-x-3">
                <h3 class="truncate font-medium text-gray-900">
                  {{ prueba.nombrePrueba }}
                </h3>

                <button
                  v-if="!prueba.calificado"
                  class="rounded-lg bg-black px-2 text-sm font-bold text-white hover:bg-black/80"
                  @click="modalSelected = prueba.id"
                >
                  Calificar
                </button>

                <p
                  v-else-if="prueba.calificado && prueba.tiempos && prueba.puntaje"
                  class="rounded-lg bg-black px-2 text-sm font-bold text-white hover:bg-black/80"
                >
                  Calificado ({{ prueba.puntaje }} pts)
                </p>

                <p
                  v-else-if="prueba.calificado && !prueba.tiempos"
                  class="rounded-lg bg-black px-2 text-sm font-bold text-white hover:bg-black/80"
                >
                  Calificado ({{ prueba.puntaje }} pts)
                </p>

                <p
                  v-else-if="prueba.calificado && prueba.tiempos"
                  class="rounded-lg bg-black px-2 text-sm font-bold text-white hover:bg-black/80"
                >
                  Calificado
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <RubricaPresentacionesModal v-if="modalSelected === 1" @get-subtotal="getSubtotal" :closeModal="closeModal" />
  <RubricaSeguridadModal v-if="modalSelected === 2" @get-subtotal="getSubtotal" :closeModal="closeModal" />
  <RubricaTiempoVueltaModal v-if="modalSelected === 3" @get-time="getTime" :closeModal="closeModal" />
  <RubricaAceleracionFrenadoModal v-if="modalSelected === 4" @get-subtotal="getSubtotal" @get-time="getTime" :closeModal="closeModal" />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  SwalError,
  SwalLoading,
  SwalCustomLoading,
  SwalDelete,
  SwalClose,
  SwalSuccess,
  SwalWarning,
} from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import RubricaPresentacionesModal from "@/components/Modals/RubricaPresentacionesModal.vue";
import RubricaSeguridadModal from "@/components/Modals/RubricaSeguridadModal.vue";
import RubricaTiempoVueltaModal from "@/components/Modals/RubricaTiempoVueltaModal.vue";
import RubricaAceleracionFrenadoModal from "@/components/Modals/RubricaAceleracionFrenadoModal.vue";

interface RubricaTiempo {
  id: number;
  nombrePrueba: string;
  tiempos: any;
}

interface RubricaTiempoVuelta {
  id: number;
  nombre: string;
  tiempo: number;
}

const form = reactive({
  idEquipo: 0,
});

const modalSelected = ref(0);

const equipoData = ref([]);
const pruebaData = ref([
  {
    id: 1,
    nombrePrueba: "Rubrica de presentaciones",
    puntaje: 0,
    calificado: false,
  },
  {
    id: 2,
    nombrePrueba: "Escrutinio de seguridad",
    puntaje: 0,
    calificado: false,
  },
  {
    id: 3,
    nombrePrueba: "Tiempo de vuelta",
    tiempos: [
      {
        nombre: "circuitoPrimeraVez",
        tiempo: 0,
      },
      {
        nombre: "circuitoSegundaVez",
        tiempo: 0,
      },
    ],
    calificado: false,
  },
  {
    id: 4,
    nombrePrueba: "Prueba de aceleración y frenado",
    puntaje: 0,
    tiempos: [
      {
        nombre: "aceleracionPrimeraVez",
        tiempo: 0,
      },
      {
        nombre: "aceleracionSegundaVez",
        tiempo: 0,
      },
    ],
    calificado: false,
  },
  {
    id: 5,
    nombrePrueba: "Prueba de aceleración y frenado",
    puntaje: 0,
    calificado: false,
  },
]);

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

const closeModal = () => {
  modalSelected.value = 0;
};

const getSubtotal = (modal: number, subtotal: number) => {
  pruebaData.value.forEach((prueba) => {
    if (prueba.id === modal) {
      prueba.puntaje = subtotal;
      prueba.calificado = true;
    }
  });
  closeModal();
};

const getTime = (modal: number, content: Array<RubricaTiempoVuelta>) => {
  pruebaData.value.forEach((prueba) => {
    if (prueba.id === modal) {
      prueba.tiempos[0] = content[0].tiempo;
      prueba.tiempos[1] = content[1].tiempo;
      prueba.calificado = true;
    }
  });
  closeModal();
};

onMounted(() => {
  getEquipoData();
});
</script>
