<template>
  <div id="dashboard-page">
    <DashboardComponent />
  </div>
</template>

<script lang="ts">
import DashboardComponent from '@/components/DashboardComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardView',

  components: {
    DashboardComponent,
  },
});
</script>

<style lang="scss" scoped>
#dashboard-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 60px;
  color: rgb(167, 167, 167);
  font-weight: 600;
}
</style>
