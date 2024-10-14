<template>
  <div class="text-right mr-4 mb-4">
    <button class="bg-green-500 rounded-lg cursor-pointer px-4">
      <span class="text-white">Cadastrar tarefa</span>
    </button>
  </div>
  <div>
    <table class="min-w-full border-collapse border border-gray-200 p-4">
      <thead class="bg-gray-600 text-white p-3">
        <tr>
          <th>#</th>
          <th>Tarefa</th>
          <th>Responsável</th>
          <th>Conclusão em</th>
          <th>Status</th>
          <th class="text-right px-8 py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tarefas">
          <RowStatusComponent
            v-for="(tarefa, index) in tarefas" 
            :key="`${tarefa.id}-${index}`"
            :status="tarefa.status"
          >
            <td>{{ tarefa.id }}</td>
            <td>{{ tarefa.tarefa }}</td>
            <td>{{ tarefa.responsavel }}</td>
            <td>{{ tarefa.conclusao_em }}</td>
            <td>{{ tarefa.status }}</td>
            <td class="text-right px-6 py-2">
              <button @click="tarefaEditar(tarefa)">
                <PencilIcon class="h-5 w-5 text-blue-500 hover:text-blue-700" />
              </button>
              <button @click="tarefaConcluir(tarefa)">
                <CheckIcon class="h-5 w-5 text-green-500 hover:text-green-700" />
              </button>
              <button @click="tarefaExcluir(tarefa)">
                <TrashIcon class="h-5 w-5 text-red-400 hover:text-red-700" />
              </button>
            </td>
          </RowStatusComponent>
        </template>
        <tr v-else>
          <td colspan="6" class="border border-gray-300 px-4 py-2 text-center">Nenhuma tarefa disponível</td>
        </tr>
      </tbody>
    </table>

    <SnackbarComponent 
      :show="snackbarVisible" 
      :message="snackbarMessage" 
      @close="snackbarVisible = false"
      type="error"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { TarefaTypes } from '../types/TarefaTypes';
import { TarefaService } from '../services/tarefaService';
import SnackbarComponent from './../components/SnackbarComponent.vue';
import { TrashIcon, PencilIcon, CheckIcon } from '@heroicons/vue/24/solid';
import RowStatusComponent from './StatusBadgeComponent.vue';

export default defineComponent({
  name: 'ListaTarefas',
  components: { SnackbarComponent, RowStatusComponent, TrashIcon, PencilIcon, CheckIcon },
  props: {
    listTarefas: {
      type: Array as PropType<TarefaTypes[]>,
      required: true,
    },
  },
  emits: ['edit-tarefa', 'delete-tarefa', 'update-tarefa'],
  setup(props, { emit }) {
    const snackbarVisible = ref(false);
    const snackbarMessage = ref('');
    const tarefas = ref<TarefaTypes[]>(props.listTarefas);

    const showSnackbar = (message: string) => {
      snackbarMessage.value = message;
      snackbarVisible.value = true;
    };

    const listaTarefa = async () => {
      try {
        const response = await TarefaService.getAllTarefas(showSnackbar);
        tarefas.value = Array.isArray(response) ? response : [response];
        emit('update-tarefa', tarefas.value);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    const tarefaEditar = (tarefa: TarefaTypes) => {
      emit('edit-tarefa', tarefa);
    };

    const tarefaConcluir = (tarefa: TarefaTypes) => {
      // Lógica para concluir a tarefa
      showSnackbar(`Tarefa # ${tarefa.id} ${tarefa.tarefa} concluída!`);
    };

    const tarefaExcluir = (tarefa: TarefaTypes) => {
      // Lógica para deletar a tarefa
      showSnackbar(`Tarefa # ${tarefa.id} - ${tarefa.tarefa} excluída!`);
      // Aqui você pode implementar a chamada de serviço para deletar a tarefa
    };

    onMounted(() => {
      listaTarefa();
    });

    return {
      tarefas,
      snackbarVisible,
      snackbarMessage,
      showSnackbar,
      tarefaEditar,
      tarefaConcluir,
      tarefaExcluir,
    };
  },
});
</script>

<style scoped>
/* Adicione seus estilos aqui se necessário */
</style>
