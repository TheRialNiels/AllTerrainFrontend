<template>
  <div>
    <div v-if="encargadoData.length > 0">
      <h2 class="mb-3 text-xl font-bold text-center">Ya cuentas con un equipo registrado</h2>
    </div>

    <div v-if="!nextStep && encargadoData.length === 0">
      <h3 class="mb-3 text-xl font-bold">Equipo</h3>
      <AddTeamForm  :form="form.equipo" />

      <div>
        <button
          type="submit"
          class="block w-full rounded-lg border border-black bg-black p-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white"
          @click.prevent="nextStepValidation"
        >
          Siguiente
        </button>
      </div>
    </div>

    <div v-if="nextStep && encargadoData.length === 0">
      <h3 class="mb-3 text-xl font-bold">Universidad</h3>
      <AddUniversityForm  :form="form.universidad" />
      <h3 class="mb-3 text-xl font-bold">Encargado</h3>
      <AddEncargadoForm  :form="form.encargado" />
      <h3 class="mb-3 text-xl font-bold">Asesor</h3>
      <AddAdviserForm  :form="form.asesor" />

      <div>
        <button
          type="submit"
          class="block w-full rounded-lg border border-black bg-black p-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:text-white"
          @click.prevent="safeInfoEquipo"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  SwalError,
  SwalCustomLoading,
  SwalDelete,
  SwalClose,
  SwalSuccess,
  SwalWarning,
} from "@/components/SwalAlerts/index";
import toDoRequest from "@/api/toDoRequests";
import AddEncargadoForm from "@/components/Forms/AddEncargadoForm.vue";
import AddUniversityForm from "@/components/Forms/AddUniversityForm.vue";
import AddTeamForm from "@/components/Forms/AddTeamForm.vue";
import AddAdviserForm from "@/components/Forms/AddAdviserForm.vue";

const nextStep = ref(false);
const router = useRouter();
const encargadoData = ref([]);

const form = reactive({
  encargado: {

    telefono: "",
    idEquipo:0,
  },
  universidad: {

    nombre: "",
    direccion: "",
    idEquipo:0,
  },
  equipo: {

    nombreEquipo: "",
    status: true,
    idEquipo:0,
  },
  asesor: {

    nombreCompleto: "",
    tipoAsesor: "",
    idEquipo:0,

  },
});

const nextStepValidation = async () => {
  if (!form.equipo.nombreEquipo) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Guardando...");

  try {
    const response = await toDoRequest.post("api/equipo/", form.equipo);

    if (response.status === 201) {
      localStorage.setItem("team", response.data.id);
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }

  if (!localStorage.getItem("team")) {
    SwalWarning("Favor de registrar tu equipo");
    return;
  }
  nextStep.value = true;
};

const safeInfoEquipo = async () => {
  if (!form.universidad.nombre||!form.universidad.direccion||
      !form.encargado.telefono||
      !form.asesor.nombreCompleto||!form.asesor.tipoAsesor) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Guardando...");

  try {
    let idEquipo = parseInt (localStorage.getItem("team"));
    form.universidad.idEquipo = idEquipo;
    form.encargado.idEquipo=idEquipo;
    form.asesor.idEquipo=idEquipo;
    const response1 = await toDoRequest.post("api/universidad/", form.universidad);
    const response2 = await toDoRequest.post("api/encargado/" , form.encargado);
    const response3 = await toDoRequest.post("api/asesor/",form.asesor)


    if ((response1.status === 201) && (response2.status === 201) && (response3.status === 201)) {

      router.push("/dashboard/puntajes");

    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }

  if (!localStorage.getItem("team")) {
    SwalWarning("Favor de registrar tu equipo");
    return;
  }
  nextStep.value = true;
};

const getEquipoData = async () => {
  try {
    const response = await toDoRequest.get("api/encargado-by-user/");

    if (response.status === 200) {
      encargadoData.value = response.data;
      console.log(encargadoData.value);
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

onMounted(() => {
  getEquipoData();
});
</script>
