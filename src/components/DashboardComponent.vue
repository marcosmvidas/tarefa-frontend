<template>
  <div class="dashboard">

    <div class="grid grid-cols-4 gap-6">
      <BarChart />
      <PieChart />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarChart from './charts/BarChart.vue';
import PieChart from './charts/PieChart.vue';

export default defineComponent({
  name: 'DashboardComponent',

  components: {
    BarChart,
    PieChart,
  },

});
</script>

<style scoped>
.dashboard {
  padding: 1p;
}
</style>

