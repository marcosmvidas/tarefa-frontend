<template>
  <div>
    <h1>Gerenciar Tarefas</h1>
    <p>Você é um: {{ userRole }}</p>
    </div>
    <div class="text-right mr-4 mb-4">
    <button
      class="bg-green-500 rounded-lg cursor-pointer px-4"
      @click="openFormTarefa"
    >
      <span class="text-white">Cadastrar tarefa </span>
    </button>
  </div>

  <modalcomponent_ :isVisible="isFormVisible" @close="closeFormTarefa">
    <FormularioTarefa :tarefatask="selectedTarefa" @save-task="saveTarefa" @close="closeFormTarefa" />
  </modalcomponent_>

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
      <template v-if="tarefas && tarefas.length">
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
            <ButtonActionComponent
              @edit="tarefaEditar(tarefa)"
              @delete="tarefaExcluir(tarefa)"
            />
          </td>
        </RowStatusComponent>
      </template>
      <tr v-else>
        <td colspan="6" class="border border-gray-300 px-4 py-2 text-center">
          Nenhuma tarefa disponível
        </td>
      </tr>
    </tbody>
  </table>

  <SnackbarComponent
    :show="snackbarVisible"
    :message="snackbarMessage"
    @close="snackbarVisible = false"
    type="error"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { TarefaTypes } from '../types/TarefaTypes';
import { TarefaService } from '../services/tarefaService';
import SnackbarComponent from './../components/SnackbarComponent.vue';
import RowStatusComponent from './StatusBadgeComponent.vue';
import ButtonActionComponent from './ButtonActionComponent.vue';
import FormularioTarefa from './FormularioTarefa.vue';
import modalcomponent_ from './_ModalComponent.vue';
import { useUserRole } from './../composables/useUserRole';

export default defineComponent({
  name: 'ListaTarefas',

  components: {
    SnackbarComponent,
    RowStatusComponent,
    ButtonActionComponent,
    FormularioTarefa,
    modalcomponent_,
  },
  
  setup() {
    const snackbarVisible = ref(false);
    const snackbarMessage = ref('');
    const tarefas = ref<TarefaTypes[]>([]);
    const isFormVisible = ref(false);
    const selectedTarefa = ref<TarefaTypes | null>(null);
    const { userRole } = useUserRole();

    const showSnackbar = (message: string) => {
      snackbarMessage.value = message;
      snackbarVisible.value = true;
    };

    const listaTarefa = async () => {
      try {
        const response = await TarefaService.getAllTarefas(showSnackbar);
        tarefas.value = Array.isArray(response) ? response : [response];
      } catch (error) {
        showSnackbar(`Tarefa ao listar as tarefas!`);
      }
    };

    const tarefaEditar = (tarefa: TarefaTypes) => {
      selectedTarefa.value = { ...tarefa };
      isFormVisible.value = true;
    };

    const openFormTarefa = () => {
      selectedTarefa.value = null;
      isFormVisible.value = true;
    };

    const saveTarefa = async (tarefa: TarefaTypes) => {
      try {
        if (selectedTarefa.value && selectedTarefa.value.id !== undefined) {
          await TarefaService.updateTarefa(
            selectedTarefa.value.id,
            tarefa,
            showSnackbar,
          );
          showSnackbar(`Tarefa # ${tarefa.id} atualizada!`);
        } else {
          await TarefaService.createTarefa(tarefa, showSnackbar);
          showSnackbar(`Tarefa # ${tarefa.tarefa} cadastrada!`);
        }
        await listaTarefa();
        isFormVisible.value = false;
      } catch (error) {
        showSnackbar('Erro ao salvar a tarefa!');
      }
    };

    const tarefaExcluir = (tarefa: TarefaTypes) => {
      showSnackbar(`Tarefa # ${tarefa.id} - ${tarefa.tarefa} excluída!`);
    };

    const closeFormTarefa = () => {
      isFormVisible.value = false;
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
      tarefaExcluir,
      openFormTarefa,
      isFormVisible,
      selectedTarefa,
      saveTarefa,
      closeFormTarefa,
      userRole
    };
  },
});
</script>
