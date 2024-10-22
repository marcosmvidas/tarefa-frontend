<template>
  <div class="dashboard">

    <div class="grid grid-cols-1 gap-8">
      <BarChart />
      <!-- <LineChart class="w-24" />
      <PieChart class="w-24" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarChart from './charts/BarChart.vue';
// import LineChart from './charts/LineChart.vue';
// import PieChart from './charts/PieChart.vue';

export default defineComponent({
  name: 'DashboardComponent',

  components: {
    BarChart,
    // LineChart,
    // PieChart,
  },
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>

