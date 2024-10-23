<template>
  <div class="chart-container">
    <label class="text-base font-semibold text-gray-600">Tarefas por Setor de desenvolvimento</label>
    <div class="chart-wrapper p-2">
    <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else><img src="/loading-gif.gif" alt="Loading..." /></p>
  </div>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TarefaGraficoService } from '@/services/graphs/tarefaGraphService';

ChartJS.register(ArcElement, Tooltip, Legend);

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie,
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
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    };
  },

  mounted() {
    this.fetchChartData();
  },

  methods: {
    async fetchChartData() {
  try {
    const response = await TarefaGraficoService.getTarefasPorTipo(this.showSnackBar);
    const data = response.data;

    const labels = data.map((item: { tipo_desenvolvimento: string }) => item.tipo_desenvolvimento);
    const totals = data.map((item: { total: number }) => item.total);

    const getPastelColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, .6)`;
    };

    const backgroundColors = labels.map(() => getPastelColor());

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

<style scoped>
.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: auto;
}

.loading-image {
  width: 120px;
  height: auto;
}

</style>


