<template>
  <div>
    <h2>Gerenciamento de Tarefas</h2>
    <!-- Aqui pode ficar a lista de tarefas, o botão para adicionar e o form de edição -->
    <ListaTarefas :tarefas="tarefas" @editar="editarTarefa" @excluir="excluirTarefa" />
    <FormularioTarefa @salvar="salvarTarefa" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ListaTarefas from '@/components/ListaTarefas.vue';
import FormularioTarefa from '@/components/FormularioTarefa.vue';
import { TarefaTypes } from './../types/TarefaTypes';

export default defineComponent({
  components: {
    ListaTarefas,
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
h2 {
  margin-bottom: 20px;
}
</style>
