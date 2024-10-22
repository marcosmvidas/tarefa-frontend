<template>
  <div class="text-center p-2">
    <!-- <span class="text-sm">Total de receitas por mês</span> -->
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else>Loading data...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { TarefaGraficoService } from '@/services/graphs/tarefaGraphService';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar,
  },

  data() {
    return {
      chartData: null as {
        labels: string[];
        datasets: { label: string; backgroundColor: string; data: number[] }[];
      } | null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  mounted() {
    this.fetchChartData();
  },

  methods: {
    async fetchChartData() {
  try {
    const response = await TarefaGraficoService.getTarefasPorStatus(this.showSnackBar);
    const data = response.data;

    const labels = data.map((item: { status: any }) => item.status);
    const totals = data.map((item: { total: any }) => item.total);
    console.log(labels);

    const backgroundColors = labels.map((label: string) => {
      switch (label) {
        case 'Aberta':
          return '#1B5E20';
        case 'Fechada':
          return '#1976D2';
        case 'Cancelada':
          return '#D32F2F';
        default:
          return '#9E9E9E';
      }
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Total de Tarefas',
          backgroundColor: backgroundColors,
          data: totals,
        },
      ],
    };
  } catch (error) {
    this.showSnackBar('Erro ao buscar dados do gráfico.');
    console.error('Erro ao buscar dados do gráfico:', error);
  }
},

    showSnackBar(message: string) {
      alert(message);
    },
  },
});
</script>

<style scoped></style>

