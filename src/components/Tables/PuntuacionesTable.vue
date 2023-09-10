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

const tabulator = ref(null);
const table = ref(null);

const initTable = () => {
  tabulator.value = new Tabulator(table.value, {
    data: props.userData,
    layout: "fitColumns",
    printAsHtml: true,
    printStyled: true,
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    reactiveData: true,
    responsiveLayout: "collapse",
    width: "100%",
    placeholder: "No hay usuarios registrados",
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
        title: "Nombre Completo",
        headerFilter: "input",
        headerHozAlign: "center",
        formatter: (cell) => {
          let data = cell.getRow().getData();

          return `${data.first_name} ${data.last_name}`;
        },
      },
      {
        title: "Correo",
        field: "email",
        headerFilter: "input",
        headerHozAlign: "center",
      },
      {
        title: "Rol",
        field: "role",
        headerFilter: "input",
        headerHozAlign: "center",
      },
    ],
  });
};
</script>
