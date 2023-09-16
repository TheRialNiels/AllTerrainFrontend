<template>
  <div>
    <h1 class="text-xl font-bold">Tabla de asesores</h1>

    <!-- <AddAdviserForm
      :form="form"
      :isEditing="isEditing"
      @save-adv="saveAdv"
      @update-adv="updateAdv"
    /> -->

    <AsesorTable
      :form="form"
      :advData="advData"
      :isEditing="isEditing"
      :getAdvData="getAdvData"
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
import AddAdviserForm from "@/components/Forms/AddAdviserForm.vue";
import AsesorTable from "@/components/Tables/AsesorTable.vue";

const advData = ref([]);

const form = reactive({
  id: "",
  nombreCompleto: "",
  tipoAsesor: "",
  idEquipo: 0,
});

const isEditing = ref(false);

const getAdvData = async () => {
  SwalLoading();

  try {
    const response = await toDoRequest.get("api/asesor/");

    if (response.status === 200) {
      SwalClose();
      advData.value = response.data;
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const emptyForm = () => {
  form.id = "";
  form.nombreCompleto = "";
  form.tipoAsesor = "";
  form.idEquipo = 0;
};

const saveAdv = async () => {
  if (!form.nombreCompleto || !form.tipoAsesor) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Guardando...");

  try {
    const response = await toDoRequest.post("api/asesor/", form);

    if (response.status === 201) {
      SwalSuccess("Asesor registrado exitosamente");

      advData.value.push(form);

      emptyForm();
    }
  } catch (error) {
    SwalError(error.response.data.error || "¡Algo salió mal!");
  }
};

const updateAdv = async () => {
  if (!form.nombreCompleto || !form.tipoAsesor) {
    SwalWarning("Todos los campos son obligatorios");
    return;
  }

  SwalCustomLoading("Actualizando...");

  try {
    const response = await toDoRequest.patch(`api/asesor/${form.id}/`, form);

    if (response.status === 200) {
      SwalSuccess("Asesor actualizado exitosamente");

      const advDataArray = advData.value;

      // Actualiza la información del equipo en la lista teamData
      const updatedAdvIndex = advDataArray.findIndex(
        (uni) => uni.id === form.id
      );
      if (updatedAdvIndex !== -1) {
        advDataArray[updatedAdvIndex] = {
          ...advDataArray[updatedAdvIndex],
          ...form,
        };
      }

      // Actualiza teamData con la nueva lista modificada
      advData.value = [...advDataArray];

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
