<template>
  <Modal @close="props.closeModal" :escapable="false" :size="'5xl'">
    <template #body>
      <div class="h-screen overflow-y-auto">
        <div class="my-10 flex flex-col items-center justify-center">
          <h1 class="mb-5 text-2xl font-bold">
            Rubrica de presentaciones
          </h1>

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
                    name="puntaje"
                    id="puntaje"
                    v-model="rub.puntaje"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="my-5 flex items-center justify-between gap-5">
            <p class="text-lg">
              Espacio para preguntas (15 puntos máximo de acuerdo al nivel de
              satisfacción en la respuesta):
            </p>
            <input
              class="w-20 border border-black px-4 py-2"
              type="number"
              name="preguntas"
              id="preguntas"
              min="0"
              max="15"
              v-model="extraQuestion"
            />
          </div>

          <div class="my-5 flex items-center justify-between gap-5">
            <h2 class="text-lg font-bold">Subtotal</h2>
            <p class="text-2xl font-bold">{{ subtotal }} / 30</p>
          </div>
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
            @click="returnSubtotal"
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

const emit = defineEmits(["get-subtotal"]);

const props = defineProps({
  closeModal: Function,
});

const extraQuestion = ref(0);

let subtotal = computed(() => {
  let subtotal = 0;
  content.rubrica.forEach((rubro) => {
    if (typeof rubro.puntaje === "number") {
      subtotal += rubro.puntaje;
    } else {
      subtotal += parseInt(rubro.puntaje);
    }
  });

  subtotal += extraQuestion.value;

  return subtotal;
});

const content = reactive({
  rubrica: [
    {
      id: 1,
      nombre: "El equipo usa vestimenta acorde al evento",
      puntaje: 0,
    },
    {
      id: 2,
      nombre: "La presentación comenzó a tiempo",
      puntaje: 0,
    },
    {
      id: 3,
      nombre: "La presentación concluyó en el tiempo acordado (5 - 7 minutos)",
      puntaje: 0,
    },
    {
      id: 4,
      nombre: "El equipo muestra dominio del tema durante la presentación",
      puntaje: 0,
    },
    {
      id: 5,
      nombre:
        "La presentación refleja secuencia lógica en el desarrollo de las ideas",
      puntaje: 0,
    },
    {
      id: 6,
      nombre: "La presentación muestra claramente el proceso de diseño",
      puntaje: 0,
    },
    {
      id: 7,
      nombre: "La presentación muestra el proceso de manuractura",
      puntaje: 0,
    },
    {
      id: 8,
      nombre: "La presentación muestra el proceso de pruebas al vehículo",
      puntaje: 0,
    },
    {
      id: 9,
      nombre: "Describen claramente la metodología de trabajo",
      puntaje: 0,
    },
    {
      id: 10,
      nombre: "Se muestra un análisis crítico de los resultados obtenidos",
      puntaje: 0,
    },
    {
      id: 11,
      nombre: "El proyecto muestra ideas innovadoras",
      puntaje: 0,
    },
    {
      id: 12,
      nombre: "La presentación del poster es atractiva y sirve de apoyo",
      puntaje: 0,
    },
    {
      id: 13,
      nombre:
        "El equipo mantiene un correcto lenguaje corporal, vocal y visual",
      puntaje: 0,
    },
    {
      id: 14,
      nombre:
        "Las evidencias de la presentación demuestran un trabajo colaborativo",
      puntaje: 0,
    },
    {
      id: 15,
      nombre: "La presentación se realizó en idioma inglés",
      puntaje: 0,
    },
  ],
});

const returnSubtotal = () => {
  emit("get-subtotal", 1, subtotal.value);
};
</script>
