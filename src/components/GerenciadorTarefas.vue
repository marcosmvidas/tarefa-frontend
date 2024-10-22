<template>
  <div class="gerenciaTarefa">
    <h2>Gerenciamento de Tarefas</h2>
    <FormularioTarefa @salvar="salvarTarefa" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormularioTarefa from '@/components/FormularioTarefa.vue';
import { TarefaTypes } from './../types/TarefaTypes';

export default defineComponent({
  components: {
    FormularioTarefa,
  },
  setup() {
    const tarefas = ref<TarefaTypes[]>([]);

    const salvarTarefa = (tarefa: TarefaTypes) => {
      tarefas.value.push(tarefa);
    };

    const editarTarefa = (tarefaEditada: TarefaTypes) => {
      const index = tarefas.value.findIndex((t) => t.id === tarefaEditada.id);
      if (index !== -1) {
        tarefas.value[index] = tarefaEditada;
      }
    };

    const excluirTarefa = (id: number) => {
      tarefas.value = tarefas.value.filter((t) => t.id !== id);
    };

    return {
      tarefas,
      salvarTarefa,
      editarTarefa,
      excluirTarefa,
    };
  },
});
</script>

<style scoped>
.gerenciaTarefa {
  padding: 20px;
  
}
</style>
