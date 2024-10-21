<template>
  <div>
    <h1>Gerenciar Tarefas</h1>
    <p>Você é um: {{ userRole }}</p>
    <div class="flex justify-between items-center mb-4 w-full">
      <div
        class="flex flex-col md:flex-row justify-start items-center w-full md:w-auto"
      >
        <label for="limit" class="mr-2 mb-2 md:mb-0">Tarefas por página</label>
        <select
          id="limit"
          v-model="perPage"
          @change="changePage(1)"
          class="bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-600 focus:border-blue-500 p-1 w-full md:w-auto"
        >
          <option v-for="option in options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="text-right">
        <button
          class="bg-green-500 rounded-lg cursor-pointer shadow-sm p-1 hover:bg-blue-500"
          @click="openFormTarefa"
        >
          <span class="text-white hover:font-semibold p-2">Cadastrar tarefa</span>
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
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
              <td>
                <span v-if="tarefa.nome_responsavel">
                  {{ tarefa.nome_responsavel }}
                </span>
                <span v-else> Não atribuído </span>
              </td>
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
            <td
              colspan="6"
              class="border border-gray-300 px-4 py-2 text-center"
            >
              Nenhuma tarefa disponível
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <modalcomponent_ :isVisible="isFormVisible" @close="closeFormTarefa">
      <FormularioTarefa
        :tarefatask="selectedTarefa"
        @save-task="saveTarefa"
        @close="closeFormTarefa"
      />
    </modalcomponent_>

    <PaginationComponent
      :offset="page"
      :total="totalTarefas"
      :limit="perPage"
      @change-page="changePage"
    />

    <SnackbarComponent
      :show="snackbarVisible"
      :message="snackbarMessage"
      @close="snackbarVisible = false"
      type="error"
    />
  </div>
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
import PaginationComponent from './PaginationComponent.vue'; // Certifique-se de importar o componente de paginação
import { useUserRole } from './../composables/useUserRole';

export default defineComponent({
  name: 'ListaTarefas',

  components: {
    SnackbarComponent,
    RowStatusComponent,
    ButtonActionComponent,
    FormularioTarefa,
    modalcomponent_,
    PaginationComponent,
  },

  setup() {
    const snackbarVisible = ref(false);
    const snackbarMessage = ref('');
    const tarefas = ref<TarefaTypes[]>([]);
    const isFormVisible = ref(false);
    const selectedTarefa = ref<TarefaTypes | null>(null);
    const { userRole } = useUserRole();

    const page = ref(1);
    const totalTarefas = ref(0);
    const perPage = ref(10);
    const options = [5, 10, 15, 20, 50, 100];

    const showSnackbar = (message: string) => {
      snackbarMessage.value = message;
      snackbarVisible.value = true;
    };

    const listaTarefa = async () => {
      try {
        const { data, paginacao } = await TarefaService.getAllTarefas(
          page.value,
          perPage.value,
          showSnackbar,
        );

        tarefas.value = data.map((tarefa) => ({
          ...tarefa,
          nome_responsavel:
            typeof tarefa.nome_responsavel === 'object' &&
            tarefa.nome_responsavel !== null
              ? tarefa.nome_responsavel.name
              : null,
        }));

        console.log('tarefas.value ', tarefas.value);

        totalTarefas.value = paginacao.limit;
        console.log('paginacao ', paginacao);
      } catch (error) {
        showSnackbar((error as Error).message || 'Erro ao listar tarefas');
      }
    };

    const changePage = (newPage: number) => {
      page.value = newPage;
      listaTarefa();
    };

    const tarefaEditar = (tarefa: TarefaTypes) => {
      selectedTarefa.value = { ...tarefa };
      isFormVisible.value = true;
    };

    const openFormTarefa = () => {
      selectedTarefa.value = {
        tarefa: '',
        descricao: '',
        responsavel: 0,
        tipo_desenvolvimento: '',
        nivel_dificuldade: '',
        status: '',
        conclusao_em: '',
        concluida: false,
        nome_responsavel: '',
      };
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
      // Lógica para excluir a tarefa (se necessário implementar a exclusão)
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
      userRole,
      page,
      totalTarefas,
      changePage,
      perPage,
      options,
    };
  },
});
</script>
