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
  },
  getPuntajeData: Function,
});

const tabulator = ref(null);
const table = ref(null);

const initTable = () => {
  tabulator.value = new Tabulator(table.value, {
    data: props.puntajeData,
    layout: "fitColumns",
    printAsHtml: true,
    printStyled: true,
    reactiveData: true,
    responsiveLayout: "collapse",
    width: "100%",
    placeholder: "No hay puntajes registrados",
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
        field: "nombre_equipo",
        headerFilter: "input",
        headerHozAlign: "center",
      },
      {
        title: "Reporte Diseño",
        field: "promedioReporteDiseno",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Rubrica Presentación",
        field: "promedioRubricaPresentaciones",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Rubrica Aceleración y Frenado",
        field: "promedioAceleracionFrenado",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Rubrica Maniobrabilidad",
        field: "promedioRubricaManiobrabilidad",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Hill Traction",
        field: "promedioHillTraction",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Rubrica Resistencia",
        field: "promedioRubricaResistencia",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Menor tiempo en circuito",
        field: "menorTiempoCircuito",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Menor tiempo de aceleración",
        field: "menorTiempoAceleracion",
        headerHozAlign: "center",
        formatter: (cell) => {
          return cell.getValue() || "0.0";
        },
      },
      {
        title: "Total",
        field: "totalPuntaje",
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
  await props.getPuntajeData();
  initTable();
});
</script>
