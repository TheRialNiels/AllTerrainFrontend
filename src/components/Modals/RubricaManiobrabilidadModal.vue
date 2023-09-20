<template>
  <Modal @close="props.closeModal" :escapable="false" :size="'5xl'">
    <template #body>
      <div class="my-10 flex flex-col items-center justify-center">
        <h1 class="mb-2 text-2xl font-bold">
          Rubrica de tiempo maniobrabilidad
        </h1>
        <p class="mb-5 text-center">
          El vehículo deberá completar el circuito sin ayuda externa de los
          integrantes del equipo.
        </p>

        <table class="table-auto border-collapse border border-black">
          <thead>
            <tr>
              <th class="border border-black px-4 py-2"></th>
              <th class="border border-black px-4 py-2">Rubro</th>
              <th class="border border-black px-4 py-2">Tiempo/seg</th>
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

        <p class="my-5 text-center">
          <span class="font-bold">Nota:</span> Cada intervención de los
          integrantes del equipo se considerará como una penalización de 5
          segundos más, y cada obstáculo que se derribe se considerará 1 segundo
          más.
        </p>
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
          @click="returnTime"
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

const emit = defineEmits(["get-time"]);

const props = defineProps({
  closeModal: Function,
  form: Object,
});

const content = reactive({
  rubrica: [
    {
      id: 1,
      nombre: "Tiempo en terminar la prueba de maniobrabilidad 1ª vez:",
      tiempo: 0,
    },
    {
      id: 2,
      nombre: "Tiempo en terminar la prueba maniobrabilidad 2ª vez:",
      tiempo: 0,
    },
  ],
});

const returnTime = () => {
  props.form.maniobrabilidadPrimeraVez = content.rubrica[0].tiempo;
  props.form.maniobrabilidadSegundaVez = content.rubrica[1].tiempo;
  props.form.rubricaManiobrabilidadCalificado = true;

  emit("get-time", 6, content.rubrica);
};
</script>
