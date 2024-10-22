<template>
  <div class="flex">
    <SideBarComponent />
    <HeaderComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBarComponent from './../components/Sidebar.vue';
import HeaderComponent from './../components/Header.vue';
export default defineComponent({
  components: {
    SideBarComponent,
    HeaderComponent,
  },
});
</script>

<style scoped>
/* Estilos para o layout do HomeView, se necessário */
</style>

