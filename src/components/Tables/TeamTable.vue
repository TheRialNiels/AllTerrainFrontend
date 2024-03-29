<template>
  <div ref="table"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import toDoRequest from "@/api/toDoRequests.js";
import {
  SwalError,
  SwalCustomLoading,
  SwalSuccess,
  SwalDelete,
} from "@/components/SwalAlerts/index";

const emit = defineEmits(["change-is-editing"]);
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  teamData: {
    type: Array,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
  getTeamData: {
    type: Function,
    required: true,
  },
  getTeamUserData: {
    type: Function,
    required: true,
  },
});

const tabulator = ref(null);
const table = ref(null);
const role = localStorage.getItem("role");

const initTable = () => {
  tabulator.value = new Tabulator(table.value, {
    data: props.teamData,
    layout: "fitColumns",
    printAsHtml: true,
    printStyled: true,
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    reactiveData: true,
    responsiveLayout: "collapse",
    width: "100%",
    placeholder: "No hay equipos registrados",
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 30,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },
      {
        title: "Nombre del equipo",
        field: "nombreEquipo",
        headerFilter: "input",
        headerHozAlign: "center",
      },
      {
        title: "Estatus",
        field: "status",
        headerFilter: "select",
        headerHozAlign: "center",
        headerFilterParams: {
          values: {
            true: "Activo",
            false: "Inactivo",
          },
        },
        width: 200,
        formatter: (cell) => {
          let data = cell.getRow().getData();
          console.log(data.status);

          return data.status ? "Activo" : "Inactivo";
        },
      },
      // {
      //   title: "Editar",
      //   headerHozAlign: "center",
      //   headerSort: false,
      //   formatter: (cell) => {
      //     return `<div class="flex justify-center"><svg fill="#000000" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg></div>`;
      //   },
      //   cellClick: (e, cell) => {
      //     editTeam(cell);
      //   },
      // },
      {
        title: "Eliminar",
        headerHozAlign: "center",
        headerSort: false,
        width: 100,
        formatter: (cell) => {
          return `<div class="flex justify-center"><svg fill="#000000" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></div>`;
        },
        cellClick: (e, cell) => {
          deleteTeam(cell);
        },
      },
    ],
  });
};

const editTeam = (cell) => {
  let data = cell.getRow().getData();

  props.form.id = data.id;
  props.form.nombreEquipo = data.nombreEquipo;
  props.form.status = data.status;

  emit("change-is-editing");
};

const deleteTeam = async (cell) => {
  let res = await SwalDelete("No podrás revertir esto");

  if (res) {
    SwalCustomLoading("Eliminando Equipo...");

    try {
      let data = cell.getRow().getData();

      let response = await toDoRequest.delete(`api/equipo/${data.id}/`);

      if (response.status === 204) {
        // Delete row
        cell.getRow().delete();
        SwalSuccess("Equipo Eliminado");
      }
    } catch (error) {
      SwalError(error.response.data.error || "Error al eliminar el equipo");
    }
  }
};

watch(
  () => props.teamData,
  (newTeamData) => {
    if (tabulator.value) {
      tabulator.value.setData(newTeamData);
    }
  }
);

onMounted(async () => {
  role !== "encargado"
    ? await props.getTeamData()
    : await props.getTeamUserData();

  initTable();
});
</script>
