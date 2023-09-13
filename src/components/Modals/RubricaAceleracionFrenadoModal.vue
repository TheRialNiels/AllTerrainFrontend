<template>
  <Modal @close="props.closeModal" :escapable="false" :size="'5xl'">
    <template #body>
      <div class="my-10 flex flex-col items-center justify-center">
        <h1 class="mb-2 text-2xl font-bold">
          Rubrica de evaluación de aceleración y frenado
        </h1>
        <p class="mb-5 text-center">
          El vehículo deberá detenerse dentro del área determinada para que se
          pueda tomar el tiempo de aceleración.
        </p>

        <table class="table-auto border-collapse border border-black">
          <thead>
            <tr>
              <th class="border border-black px-4 py-2"></th>
              <th class="border border-black px-4 py-2">Rubro</th>
              <th class="border border-black px-4 py-2">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rub in content.rubrica.puntaje">
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
                    v-model="rub.opcion"
                  >
                    <option value="" disabled selected>Selecciona</option>
                    <option value="I">Incorrecto</option>
                    <option value="C">Correcto</option>
                  </select>
                </td>
            </tr>
            <tr v-for="rub in content.rubrica.tiempo">
              <td class="border border-black px-4 py-2 text-center">
                {{ rub.id }}
              </td>
              <td class="border border-black px-4 py-2 text-center">
                {{ rub.nombre }}
              </td>
              <td class="border border-black px-4 py-2 text-center">
                <input
                  class="w-28 border border-black px-4 py-2"
                  type="number"
                  name="tiempo"
                  id="tiempo"
                  min="0"
                  v-model="rub.tiempo"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="my-5 flex items-center justify-between gap-5">
          <h2 class="text-lg font-bold">Subtotal</h2>
          <p class="text-2xl font-bold">{{ subtotal }} / 10</p>
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
          @click="returnResults"
          type="button"
          class="focus:ring-secondary rounded-full bg-black px-10 py-2.5 text-center text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/80 focus:outline-none focus:ring-4"
        >
          Calificar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Modal } from "flowbite-vue";

const emit = defineEmits(["get-subtotal", "get-time"]);

const props = defineProps({
  closeModal: Function,
});

const content = reactive({
  rubrica: {
    puntaje: [
      {
        id: 1,
        nombre: "El vehículo se detiene en el área determinada",
        opcion: "",
        puntaje: 0,
      },
    ],
    tiempo: [
      {
        id: 2,
        nombre: "Tiempo en terminar la recta de 10 metros 1ª vez:",
        tiempo: 0,
      },
      {
        id: 3,
        nombre: "Tiempo en terminar la recta de 10 metros 2ª vez:",
        tiempo: 0,
      },
    ],
  },
});

let subtotal = computed(() => {
  let subtotal = 0;
  content.rubrica.puntaje.forEach((rubro) => {
    if (rubro.opcion === "C") {
      rubro.puntaje = 10;
    } else {
      rubro.puntaje = 0;
    }

    subtotal += rubro.puntaje;
  });

  return subtotal;
});

const returnSubtotal = () => {
  emit("get-subtotal", 4, subtotal.value);
};

const returnTime = () => {
  emit("get-time", 4, content.rubrica.tiempo);
};

const returnResults = () => {
  returnSubtotal();
  returnTime();
};
</script>
