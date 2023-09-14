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
  
  const props = defineProps({
    puntajeData: {
      type: Array,
      required: true,
    }
  });
  
  const tabulator = ref(null);
  const table = ref(null);
  
  const initTable = () => {
    tabulator.value = new Tabulator(table.value, {
      data: props.puntajeData,
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
          title: "Equipo",
          field: "idEquipo",
          headerFilter: "input",
          headerHozAlign: "center",
        },
        {
          title: "Tiempo de circuito completo",
          field: "recorrido",
          headerFilter: "input",
          headerHozAlign: "center",
        },
        {
          title: "Tiempo de acelaracion",
          field: "aceleracion",
          headerFilter: "input",
          headerHozAlign: "center",
        },
        {
          title: "Total",
          field: "total",
          headerFilter: "input",
          headerHozAlign: "center",
        },
        
      ],
    });
  };
  
  
  watch(
    () => props.puntajeData,
    (newPuntajeData) => {
      if (tabulator.value) {
        tabulator.value.setData(newPuntajeData);
      }
    }
  );

  onMounted(async () => {
  
  initTable();
});
  
  

</script>