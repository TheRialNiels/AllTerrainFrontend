<template>
  <div>
    <h1 class="text-xl font-bold">Formulario para registro de Equipos</h1>

    <AddTeamForm
      :form="form"
      :isEditing="isEditing"
      @save-team="saveTeam"
      @update-team="updateTeam"
    />

    <TeamTable
      :form="form"
      :teamData="teamData"
      :isEditing="isEditing"
      :getTeamData="getTeamData"
      @change-is-editing="changeIsEditing"
    />
  </div>
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
import AddTeamForm from "@/components/Forms/AddTeamForm.vue";
import TeamTable from "@/components/Tables/TeamTable.vue";

const teamData = ref([]);

const form = reactive({
  id: "",
  nombreEquipo: "",
  puntaje: "",
  status: "",
});

const isEditing = ref(false);

const getTeamData = async () => {
  SwalLoading();

  try {
    const response = await toDoRequest.get("api/equipo/");

    if (response.status === 200) {
      SwalClose();
      teamData.value = response.data;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const emptyForm = () => {
  form.id = "";
  form.nombreEquipo = "";
  form.puntaje = "";
  form.status = "";
};

const saveTeam = async () => {
  if (
    !form.status ||
    !form.nombreEquipo
  ) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Guardando...");

  try {
    const response = await toDoRequest.post("api/equipo/", form);

    if (response.status === 201) {
      SwalSuccess("Equipo registrado exitosamente");

      teamData.value.push(form);

      emptyForm();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const updateTeam = async () => {
  if (
    !form.status||
    !form.nombreEquipo
  ) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Actualizando...");

  try {
    const response = await toDoRequest.patch(`api/equipo/${form.id}/`,form);

    if (response.status === 200) {
      SwalSuccess("Equipo actualizado exitosamente");

      const teamDataArray = teamData.value;

      // Actualiza la información del equipo en la lista teamData
      const updatedTeamIndex = teamDataArray.findIndex((team) => team.id === form.id);
      if (updatedTeamIndex !== -1) {
        teamDataArray[updatedTeamIndex] = { ...teamDataArray[updatedTeamIndex], ...form };
      }

      // Actualiza teamData con la nueva lista modificada
      teamData.value = [...teamDataArray];

      emptyForm();

      isEditing.value = false;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const changeIsEditing = () => {
  isEditing.value = true;
};
</script>
