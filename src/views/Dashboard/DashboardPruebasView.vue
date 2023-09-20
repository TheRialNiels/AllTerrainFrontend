<template>
  <div>
    <h1 class="text-xl font-bold">Pruebas por equipo</h1>

    <div class="my-5">
      <label for="idEquipo" class="mb-2 block text-lg font-bold">Equipo</label>
      <select
        v-model="form.idEquipo"
        id="idEquipo"
        class="block w-full rounded-lg border border-black bg-transparent p-2 text-sm placeholder:text-black/50 focus:border-black focus:ring-black"
        @change="getPuntajeEquipoData"
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

    <div v-if="form.idEquipo > 0" class="my-5">
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
                  v-else-if="prueba.calificado"
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

  <RubricaPresentacionesModal
    v-if="modalSelected === 1"
    :form="form"
    @get-subtotal="getSubtotal"
    :closeModal="closeModal"
  />
  <RubricaSeguridadModal
    v-if="modalSelected === 2"
    :form="form"
    @change-status="changeStatus"
    :closeModal="closeModal"
  />
  <RubricaTiempoVueltaModal
    v-if="modalSelected === 3"
    :form="form"
    @get-time="getTime"
    :closeModal="closeModal"
  />
  <RubricaAceleracionFrenadoModal
    v-if="modalSelected === 4"
    :form="form"
    @get-subtotal="getSubtotal"
    @get-time="getTime"
    :closeModal="closeModal"
  />
  <RubricaTiempoHillModal
    v-if="modalSelected === 5"
    :form="form"
    @get-time="getTime"
    :closeModal="closeModal"
  />
  <RubricaTiempoManiobrabilidadModal
    v-if="modalSelected === 6"
    :form="form"
    @get-time="getTime"
    :closeModal="closeModal"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { SwalError, SwalCustomLoading } from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import RubricaPresentacionesModal from "@/components/Modals/RubricaPresentacionesModal.vue";
import RubricaSeguridadModal from "@/components/Modals/RubricaSeguridadModal.vue";
import RubricaTiempoVueltaModal from "@/components/Modals/RubricaTiempoVueltaModal.vue";
import RubricaAceleracionFrenadoModal from "@/components/Modals/RubricaAceleracionFrenadoModal.vue";
import RubricaTiempoHillModal from "@/components/Modals/RubricaTiempoHillModal.vue";
import RubricaTiempoManiobrabilidadModal from "@/components/Modals/RubricaManiobrabilidadModal.vue";
interface RubricaTiempoVuelta {
  id: number;
  nombre: string;
  tiempo: number;
}

const form = reactive({
  idEquipo: 0,
  rubricaPresentaciones: 0,
  escrutinioSeguridad: false,
  aceleracionFrenado: 0,
  rubricaResistencia: 0,
  circuitoPrimeraVez: 0,
  circuitoSegundaVez: 0,
  aceleracionPrimeraVez: 0,
  aceleracionSegundaVez: 0,
  hillTractionPrimeraVez: 0,
  hillTractionSegundaVez: 0,
  maniobrabilidadPrimeraVez:0,
  maniobrabilidadSegundaVez:0,
  reporteDisenoCalificado: false,
  rubricaPresentacionesCalificado: false,
  aceleracionFrenadoCalificado: false,
  rubricaManiobrabilidadCalificado: false,
  hillTractionCalificado: false,
  rubricaResistenciaCalificado: false,
  circuitoCalificado: false,
  aceleracionCalificado: false,
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
    nombrePrueba: "Prueba de hill and traction",
    tiempos: [
      {
        nombre: "hillTractionPrimeraVez",
        tiempo: 0,
      },
      {
        nombre: "hillTractionSegundaVez",
        tiempo: 0,
      },
    ],
    calificado: false,
  },
  {
    id: 6,
    nombrePrueba: "Prueba de maniobrabilidad",
    tiempos: [
      {
        nombre: "maniobrabilidadPrimeraVez",
        tiempo: 0,
      },
      {
        nombre: "maniobrabilidadSegundaVez",
        tiempo: 0,
      },
    ],
    calificado: false,
  },
]);

const emptyPruebaData = () => {
  pruebaData.value = [
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
      nombrePrueba: "Prueba de hill and traction",
      tiempos: [
        {
          nombre: "hillTractionPrimeraVez",
          tiempo: 0,
        },
        {
          nombre: "hillTractionSegundaVez",
          tiempo: 0,
        },
      ],
      calificado: false,
    },
    {
    id: 6,
    nombrePrueba: "Prueba de maniobrabilidad",
    tiempos: [
      {
        nombre: "maniobrabilidadPrimeraVez",
        tiempo: 0,
      },
      {
        nombre: "maniobrabilidadSegundaVez",
        tiempo: 0,
      },
    ],
    calificado: false,
  },
  ];
};

const getEquipoData = async () => {
  try {
    const response = await toDoRequest.get("api/equipo/");

    if (response.status === 200) {
      equipoData.value = response.data;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const getPuntajeEquipoData = async () => {
  emptyPruebaData();
  try {
    const response = await toDoRequest.get(
      `api/obtener-prueba/?idEquipo=${form.idEquipo}`
    );

    if (response.status === 200) {
      pruebaData.value.forEach((prueba) => {
        if (prueba.id === 1) {
          prueba.puntaje = response.data[0].rubricaPresentaciones || 0;
          prueba.calificado = response.data[0].rubricaPresentacionesCalificado;
        } else if (prueba.id === 2) {
          prueba.calificado = response.data[0].escrutinioSeguridad;
        } else if (prueba.id === 3) {
          prueba.tiempos[0].tiempo = response.data[0].circuitoPrimeraVez || 0;
          prueba.tiempos[1].tiempo = response.data[0].circuitoSegundaVez || 0;
          prueba.calificado = response.data[0].circuitoCalificado;
        } else if (prueba.id === 4) {
          prueba.puntaje = response.data[0].aceleracionFrenado || 0;
          prueba.tiempos[0].tiempo =
            response.data[0].aceleracionPrimeraVez || 0;
          prueba.tiempos[1].tiempo =
            response.data[0].aceleracionSegundaVez || 0;
          prueba.calificado = response.data[0].aceleracionFrenadoCalificado;
        } else if (prueba.id === 5) {
          prueba.tiempos[0].tiempo =
            response.data[0].hillTractionPrimeraVez || 0;
          prueba.tiempos[1].tiempo =
            response.data[0].hillTractionSegundaVez || 0;
          prueba.calificado = response.data[0].hillTractionCalificado;
        }else if (prueba.id === 6) {
          prueba.tiempos[0].tiempo =
            response.data[0].maniobrabilidadPrimeraVez || 0;
          prueba.tiempos[1].tiempo =
            response.data[0].maniobrabilidadSegundaVez || 0;
          prueba.calificado = response.data[0].rubricaManiobrabilidadCalificado;
        }
      });
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const closeModal = () => {
  modalSelected.value = 0;
};

const getSubtotal = async (modal: number, subtotal: number) => {
  SwalCustomLoading("Guardando...");
  try {
    const response = await toDoRequest.post("api/actualizar-puntaje/", form);

    if (response.status === 201) {
      pruebaData.value.forEach((prueba) => {
        if (prueba.id === modal) {
          prueba.puntaje = subtotal;
          prueba.calificado = true;
        }
      });
      closeModal();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const changeStatus = async (modal: number, status: boolean) => {
  SwalCustomLoading("Guardando...");
  try {
    const response = await toDoRequest.post("api/actualizar-puntaje/", form);

    if (response.status === 201) {
      pruebaData.value.forEach((prueba) => {
        if (prueba.id === modal) {
          prueba.calificado = status;
        }
      });
      closeModal();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const getTime = async (modal: number, content: Array<RubricaTiempoVuelta>) => {
  SwalCustomLoading("Guardando...");
  try {
    const response = await toDoRequest.post("api/actualizar-puntaje/", form);

    if (response.status === 201) {
      pruebaData.value.forEach((prueba) => {
        if (prueba.id === modal) {
          prueba.tiempos[0] = content[0].tiempo;
          prueba.tiempos[1] = content[1].tiempo;
          prueba.calificado = true;
        }
      });
      closeModal();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

onMounted(() => {
  getEquipoData();
});
</script>
