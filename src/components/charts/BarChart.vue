<template>
  <div class="chart-container">
    <label class="text-base font-semibold text-gray-600">Tarefas por status</label>
    <div class="chart-wrapper p-2">
      <Bar v-if="chartDataPorStatus" :data="chartDataPorStatus" :options="chartOptions" />
      <p v-else><img class="loading-image" src="/loading-gif.gif" alt="Loading..." /></p>
    </div>
  </div>

  <div class="chart-container">
    <label class="text-base font-semibold text-gray-600">Tarefas por responsáveis</label>
    <div class="chart-wrapper p-2">
      <Bar
        v-if="chartDataPorResponsavel"
        :data="chartDataPorResponsavel"
        :options="chartOptionsResponsavel"
      />
      <p v-else><img class="loading-image" src="/loading-gif.gif" alt="Loading..." /></p>
    </div>
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
  ChartData as ChartJSData,
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
      chartDataPorStatus: null as ChartJSData<'bar'> | null,
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
      chartDataPorResponsavel: null as ChartJSData<'bar'> | null,
      chartOptionsResponsavel: {
        responsive: true,
        maintainAspectRatio: false,
      },
      usedColors: new Set<string>(),
    };
  },

  mounted() {
    this.fetchChartData('status', 'getTarefasPorStatus');
    this.fetchChartData('responsavel', 'getTarefasPorResponsavel');
  },

  methods: {
    generatePastelColor(): string {
      let color: string;

      do {
        const r = Math.floor(Math.random() * 156 + 100);
        const g = Math.floor(Math.random() * 158 + 105);
        const b = Math.floor(Math.random() * 156 + 100);
        color = `rgba(${r}, ${g}, ${b}, 0.9)`;
      } while (this.usedColors.has(color));

      this.usedColors.add(color);
      return color;
    },

    generateChartData(labels: string[], totals: number[]): ChartJSData<'bar'> {
      const backgroundColors = labels.map(() => this.generatePastelColor());

      return {
        labels: labels,
        datasets: [
          {
            label: 'Total de Tarefas',
            backgroundColor: backgroundColors,
            data: totals,
          },
        ],
      };
    },

    async fetchChartData(type: string, serviceMethod: keyof typeof TarefaGraficoService) {
      try {
        const response = await TarefaGraficoService[serviceMethod](this.showSnackBar);
        const data = response.data;

        let labels: string[] = [];
        let totals: number[] = [];

        if (type === 'status') {
          labels = data.map((item: { status: string }) => item.status);
          totals = data.map((item: { total: number }) => item.total);
        } else if (type === 'responsavel') {
          labels = data.map(
            (item: { nome_responsavel: { name: string } }) => item.nome_responsavel.name,
          );
          totals = data.map((item: { total: number }) => item.total);
        }

        const chartData = this.generateChartData(labels, totals);

        if (type === 'status') {
          this.chartDataPorStatus = chartData;
        } else if (type === 'responsavel') {
          this.chartDataPorResponsavel = chartData;
        }
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
