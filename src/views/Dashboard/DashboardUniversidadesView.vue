<template>
  <div>
    <h1 class="text-xl font-bold">Tabla de universidades</h1>

    <!-- <AddUniversityForm
      :form="form"
      :isEditing="isEditing"
      @save-uni="saveUni"
      @update-uni="updateUni"
    /> -->

    <UniversidadesTable
      :form="form"
      :UniData="uniData"
      :isEditing="isEditing"
      :getUniData="getUniData"
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
import AddUniversityForm from "@/components/Forms/AddUniversityForm.vue";
import UniversidadesTable from "@/components/Tables/UniversidadesTable.vue";

const uniData = ref([]);

const form = reactive({
  id: "",
  nombre: "",
  direccion: "",
  idEquipo: 0,
});

const isEditing = ref(false);

const getUniData = async () => {
  SwalLoading();

  try {
    const response = await toDoRequest.get("api/universidad/");

    if (response.status === 200) {
      SwalClose();
      uniData.value = response.data;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const emptyForm = () => {
  form.id = "";
  form.nombre = "";
  form.direccion = "";
  form.idEquipo = 0;
};

const saveUni = async () => {
  if (!form.nombre || !form.direccion) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Guardando...");

  try {
    const response = await toDoRequest.post("api/universidad/", form);

    if (response.status === 201) {
      SwalSuccess("Universidad registrado exitosamente");

      uniData.value.push(form);

      emptyForm();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const updateUni = async () => {
  if (!form.nombre || !form.direccion) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Actualizando...");

  try {
    const response = await toDoRequest.patch(
      `api/universidad/${form.id}/`,
      form
    );

    if (response.status === 200) {
      SwalSuccess("Equipo actualizado exitosamente");

      const uniDataArray = uniData.value;

      // Actualiza la información del equipo en la lista teamData
      const updatedUniIndex = uniDataArray.findIndex(
        (uni) => uni.id === form.id
      );
      if (updatedUniIndex !== -1) {
        uniDataArray[updatedUniIndex] = {
          ...uniDataArray[updatedUniIndex],
          ...form,
        };
      }

      // Actualiza teamData con la nueva lista modificada
      uniData.value = [...uniDataArray];

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
