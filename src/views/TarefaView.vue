<template>
  <div class="tarefa-view">
    <h1>Lista de Tarefas</h1>
    <!-- Inclui o componente GerenciadorTarefas que gerencia todas as tarefas -->
<ListaTarefas />
    <GerenciadorTarefas />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListaTarefas from '@/components/ListaTarefas.vue'

export default defineComponent({
  components: {
   ListaTarefas,
  },
});
</script>

<style scoped>
.tarefa-view {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}
</style>
