<template>
  <Modal @close="props.closeModal" :escapable="false" :size="'5xl'">
    <template #body>
      <div class="h-screen overflow-y-auto">
        <div class="my-10 flex flex-col items-center justify-center">
          <h1 class="mb-2 text-2xl font-bold">Rubrica de escrutinio de seguridad</h1>
          <p class="mb-5 text-center">
            Los equipos deberán cumplir con todos los rubros de seguridad, si
            uno de ellos no se cumple no se le puede dar acceso a las pruebas
            dinámica.
          </p>

          <table class="table-auto border-collapse border border-black">
            <thead>
              <tr>
                <th class="border border-black px-4 py-2"></th>
                <th class="border border-black px-4 py-2">Rubro</th>
                <th class="border border-black px-4 py-2">Puntaje</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rub in content.rubrica">
                <td class="border border-black px-4 py-2 text-center">
                  {{ rub.id }}
                </td>
                <td class="border border-black px-4 py-2 text-center">
                  {{ rub.nombre }}
                </td>
                <td class="border border-black px-4 py-2 text-center">
                  <select
                    class="w-full border border-black px-4 py-2"
                    name="opcion"
                    id="opcion"
                  >
                    <option value="" disabled selected>Selecciona</option>
                    <option value="I">Incorrecto</option>
                    <option value="C">Correcto</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-evenly">
          <button
            @click="props.closeModal"
            type="button"
            class="focus:ring-tertiary/50 rounded-full border border-black bg-transparent px-10 py-2.5 text-sm font-bold transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white focus:z-10 focus:outline-none focus:ring-4"
          >
            Cancelar
          </button>
          <button
            @click="returnStatus"
            type="button"
            class="focus:ring-secondary rounded-full bg-black px-10 py-2.5 text-center text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/80 focus:outline-none focus:ring-4"
          >
            Calificar
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Modal } from "flowbite-vue";

const emit = defineEmits(["change-status"]);

const props = defineProps({
  closeModal: Function,
  form: Object,
});

const content = reactive({
  rubrica: [
    {
      id: 1,
      nombre: "La soldadura no presenta porosidades",
    },
    {
      id: 2,
      nombre: "No hay puntos de soldadura con 5 elementos o más",
    },
    {
      id: 3,
      nombre: "La soldadura  es continua en los puntos donde es aplicada",
    },
    {
      id: 4,
      nombre: "El piloto presenta casco de su medida",
    },
    {
      id: 5,
      nombre: "El piloto puede bajar del vehículo en menos de 5 segundos",
    },
    {
      id: 6,
      nombre: "El vehículo cuenta con cinturón de seguridad",
    },
    {
      id: 7,
      nombre: "El frente del vehículo mantiene protegido a conductor de posibles impactos (otros vehículos o piedras)",
    },
    {
      id: 8,
      nombre: "Los laterales del vehículo mantienen protegido al piloto en caso de volcadura",
    },
    {
      id: 9,
      nombre: "Los laterales de vehículo protegen al piloto en caso de impacto con otro vehículo",
    },
    {
      id: 10,
      nombre: "El vehículo cuenta con mecanismo de apagado de emergencia",
    },
    {
      id: 11,
      nombre: "El pedal del acelerador tiene resorte de retorno (Sin posibilidad de trabarse)",
    },
    {
      id: 12,
      nombre: "El motor responde unicamente al acelerador, y tiene una correspondencia funcional",
    },
    {
      id: 13,
      nombre: "El vehículo puede comenzar a moverse sin presentar problemas",
    },
    {
      id: 14,
      nombre: "Durante la aceleración se observa completo control sobre el vehículo.",
    },
    {
      id: 15,
      nombre: "No se observan explosiones en el cuerpo de aceleración",
    },
    {
      id: 16,
      nombre: "Los frenos están correctamente colocados sin posibilidad de desprendimiento (eje o rueda)",
    },
    {
      id: 17,
      nombre: "El pedal de treno esta debidamente colocado y es de fácil accionamiento",
    },
    {
      id: 18,
      nombre: "El pedal de freno presenta rigidez al frenado",
    },
    {
      id: 19,
      nombre: "No se presentan fugas de liquido de freno ni chicotes desgastados",
    },
    {
      id: 20,
      nombre: "Las lineas de frenado no están expuestas fuera  del vehículo",
    },
    {
      id: 21,
      nombre: "El mecanismo de dirección esta debidamente sujeto al chasis",
    },
    {
      id: 22,
      nombre: "El mecanismo de dirección es suave a la conducción",
    },
    {
      id: 23,
      nombre: "El mecanismo de dirección no presenta puntos de unión frágiles",
    },
    {
      id: 24,
      nombre: "El mecanismo de dirección no esta expuesto a golpes externos",
    },
    {
      id: 25,
      nombre: "El volante no presenta filos peligrosos al conductor (volante-columna de dirección)",
    },
    {
      id: 26,
      nombre: "Las horquillas v mecanismo de suspension no se interponen a la dirección del vehículo",
    }
  ],
});

const returnStatus = () => {
  props.form.escrutinioSeguridad = true;

  emit("change-status", 2, true);
};
</script>
