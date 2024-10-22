<template>
  <div class="flex">
    <SideBarComponent />
    <main class="flex-1 p-4">
      <router-view /> <!-- Aqui será exibido TarefaView quando navegar para /home/tarefa -->
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBarComponent from './../components/Sidebar.vue';

export default defineComponent({
  components: {
    SideBarComponent,
  },
});
</script>

<style scoped>
/* Estilos para o layout do HomeView, se necessário */
</style>
