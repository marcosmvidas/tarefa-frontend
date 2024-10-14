<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="text-right mr-4 mb-4">
    <button
      class="bg-green-500 rounded-lg cursor-pointer px-4"
      @click="openFormTarefa"
    >
      <span class="text-white">Cadastrar tarefa </span>
    </button>
  </div>
  <!-- Formulário para cadastrar ou editar tarefas -->
  <modalcomponent_ :isVisible="isFormVisible" @close="closeFormTarefa">
      <FormularioTarefa @close="closeFormTarefa" />
    >
  </modalcomponent_>
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
                @list="tarefaListar(tarefa)"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { TarefaTypes } from '../types/TarefaTypes';
import { TarefaService } from '../services/tarefaService';
import SnackbarComponent from './../components/SnackbarComponent.vue';
import RowStatusComponent from './StatusBadgeComponent.vue';
import ButtonActionComponent from './ButtonActionComponent.vue';
import FormularioTarefa from './FormularioTarefa.vue';
import modalcomponent_ from './_ModalComponent.vue';

export default defineComponent({
  name: 'ListaTarefas',
  components: {
    SnackbarComponent,
    RowStatusComponent,
    ButtonActionComponent,
    FormularioTarefa,
    modalcomponent_
  },
  props: {
    listTarefas: {
      type: (Array as PropType<TarefaTypes[]>) || [],
      required: true,
    },
  },
  emits: ['edit-tarefa', 'delete-tarefa', 'update-tarefa'],
  setup(props, { emit }) {
    const snackbarVisible = ref(false);
    const snackbarMessage = ref('');
    const tarefas = ref<TarefaTypes[]>(props.listTarefas);
    const isFormVisible = ref(false);
    const selectedTarefa = ref<TarefaTypes | null>(null); // Adicione esta linha

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
      selectedTarefa.value = tarefa; // Define a tarefa selecionada para edição
      isFormVisible.value = true; // Mostra o formulário
      emit('edit-tarefa', tarefa);
    };

    const tarefaListar = (tarefa: TarefaTypes) => {
      console.log('Consultando tarefa:', tarefa);
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

    const openFormTarefa = () => {
      console.log("open formulario ");
      isFormVisible.value = true;
      selectedTarefa.value = null; // Limpa a seleção para uma nova tarefa
    };

    const saveTarefa = async (tarefa: TarefaTypes) => {
      try {
        if (selectedTarefa.value) {
          if (selectedTarefa.value.id !== undefined) {
            await TarefaService.updateTarefa(
              selectedTarefa.value.id,
              tarefa,
              showSnackbar,
            );
            showSnackbar(`Tarefa # ${tarefa.id} atualizada!`);
          }
          // Atualiza a tarefa existente
        } else {
          // Cria uma nova tarefa
          await TarefaService.createTarefa(tarefa, showSnackbar);
          showSnackbar(`Tarefa # ${tarefa.tarefa} cadastrada!`);
        }
        await listaTarefa(); // Atualiza a lista de tarefas
        isFormVisible.value = false; // Fecha o formulário
      } catch (error) {
        console.error('Erro ao salvar a tarefa:', error);
        showSnackbar('Erro ao salvar a tarefa!');
      }
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
      tarefaConcluir,
      tarefaExcluir,
      tarefaListar,
      openFormTarefa,
      isFormVisible,
      selectedTarefa,
      saveTarefa,
      closeFormTarefa,
    };
  },
});
</script>

<style scoped>
/* Adicione seus estilos aqui se necessário */
</style>
