<template>
    <Modal @close="props.closeModal" :escapable="false" :size="'5xl'">
      <template #body>
        <div class="my-10 flex flex-col items-center justify-center">
          <h1 class="mb-2 text-2xl font-bold">Prueba de Resistecia</h1>
          <p class="mb-5 text-center">
            Contador de vueltas al circuito :
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
              <tr v-for="rub in content.rubrica">
                <td class="border border-black px-4 py-2 text-center">
                  {{ rub.id }}
                </td>
                <td class="border border-black px-4 py-2 text-center">
                  {{ rub.nombre }}
                </td>
                <td class="border border-black px-4 py-2 text-center">
                  <input
                    class="border border-black px-4 py-2 w-28"
                    type="number"
                    name="tiempo"
                    id="tiempo"
                    min="0"
                    v-model="rub.puntaje"
                  />
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
            @click="returnSubtotal"
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
  
  const emit = defineEmits(["get-subtotal"]);
  
  const props = defineProps({
    closeModal: Function,
    form: Object,
  });

  
let subtotal = computed(() => {
  let subtotal = 0;
  content.rubrica.forEach((rubro) => {
    if (typeof rubro.puntaje === "number") {
      subtotal += rubro.puntaje;
    } else {
      subtotal += parseInt(rubro.puntaje);
    }
  });

  return subtotal;
});
  
  const content = reactive({
    rubrica: [
      {
        id: 1,
        nombre: "Numero de vueltas :",
        puntaje: 0,
      },
    ],
  });
  
  const returnSubtotal = () => {
  props.form.rubricaPresentaciones = subtotal;
  props.form.rubricaPresentacionesCalificado = true;

  emit("get-subtotal", 1, subtotal);
};
  </script>
