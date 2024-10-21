<template>
  <h2 class="p-6 font-bold text-blue-600 bg-slate-200">
    <strong>CADASTRO TAREFA </strong>
    <p class="text-blue-400">{{ tarefatask ? 'Edição' : 'Inclusão' }}</p>
  </h2>

  <form @submit.prevent="submitTask">
    <div class="grid grid-cols-12 gap-8 p-12 mb-5">
      <div class="md:col-span-9">
        <div class="relative z-0 mb-5 group">
          <input
            name="floating_tarefa"
            v-model="form.tarefa"
            required
            class="input-base"
            placeholder=""
          />
          <label for="floating_tarefa" class="label-base">Tarefa</label>
        </div>
      </div>

      <div class="md:col-span-3">
        <div class="relative z-0 mb-5 group">
          <input
            type="date"
            v-model="form.conclusao_em"
            required
            class="input-base"
          />
          <label for="floating_conclusao" class="label-base"
            >Conclusão em</label
          >
        </div>
      </div>

      <div class="md:col-span-12">
        <div class="relative z-0 mb-5 group">
          <textarea
            name="floating_descricao"
            v-model="form.descricao"
            required
            class="input-base h-24"
            placeholder=""
          ></textarea>
          <label for="floating_descricao" class="label-base">Descrição</label>
        </div>
      </div>

      <div class="md:col-span-4">
        <div class="relative z-0 mb-5 group">
          <select v-model="form.tipo_desenvolvimento" class="input-base">
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Banco de dados">Banco de dados</option>
            <option value="Infra">Infra</option>
          </select>
          <label for="floating_desenvolvimento" class="label-base"
            >Desenvolvimento</label
          >
        </div>
      </div>

      <div class="md:col-span-4">
        <div class="relative z-0 mb-5 group">
          <select v-model="form.nivel_dificuldade" class="input-base">
            <option value="Difícil">Difícil</option>
            <option value="Moderada">Moderada</option>
            <option value="Intermediária">Intermediária</option>
            <option value="Fácil">Fácil</option>
          </select>
          <label for="floating_dificuldade" class="label-base"
            >Grau de dificuldade</label
          >
        </div>
      </div>

      <div class="md:col-span-4">
        <div class="relative z-0 mb-5 group">
          <select v-model="form.status" class="input-base">
            <option value="Aberta">Aberta</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Cancelada">Cancelada</option>
            <option value="Fechada">Fechada</option>
          </select>
          <label for="floating_status" class="label-base"
            >Status da Tarefa</label
          >
        </div>
      </div>

      <div class="md:col-span-8">
        <div class="relative z-0 mb-5 group">
          <select v-model="form.responsavel" required class="input-base">
            <option value="" disabled selected>Selecione um responsável</option>
            <option v-for="user in users" :key="user.id" :value="user.name">
              {{ user.name }}
            </option>
          </select>
          <label class="label-base">Responsável</label>
        </div>
      </div>

      <div class="md:col-span-12">
        <div class="relative z-0 mb-5 group">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="form.concluida"
              :disabled="!isGestor()"
              class="sr-only"
            />
            <div
              class="block w-14 h-8 rounded-full transition"
              :class="form.concluida ? 'bg-blue-600' : 'bg-gray-300'"
            ></div>
            <div
              class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition"
              :class="form.concluida ? 'transform translate-x-6' : ''"
            ></div>
            <span
              class="ml-3 text-sm"
              :class="form.concluida ? 'text-blue-600' : 'text-red-700'"
            >
              {{ form.concluida ? 'Concluida ok!' : 'Não concluida' }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <div class="flex justify-end m-6">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Salvar
      </button>
      <button
        type="button"
        @click="cancel"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { TarefaTypes } from '../types/TarefaTypes';
import { UserService } from '@/services/userService';
import { authService } from '@/services/authService'; // Importe o authService

export default defineComponent({
  props: {
    tarefatask: Object as () => TarefaTypes | null,
  },

  setup(props, { emit }) {
    const users = ref<{ id: number; name: string }[]>([]);
    const roleId = ref(authService.getRoleId()); // Obtém o role_id do usuário logado

    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers((message) => {
          console.error(message);
        });
        users.value = response;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();

    const form = ref<TarefaTypes>({
      tarefa: '',
      descricao: '',
      responsavel: 0,
      tipo_desenvolvimento: 'backend',
      nivel_dificuldade: 'facil',
      status: 'Aberta',
      concluida: false,
      conclusao_em: '',
    });

    const resetForm = () => {
      form.value = {
        tarefa: '',
        descricao: '',
        responsavel: 0,
        tipo_desenvolvimento: 'backend',
        nivel_dificuldade: 'facil',
        status: 'Aberta',
        concluida: false,
        conclusao_em: '',
      };
    };

    watch(
      () => props.tarefatask,
      (newTarefa) => {
        if (newTarefa) {
          form.value = { ...newTarefa };
        } else {
          resetForm();
        }
      },
      { immediate: true },
    );

    const submitTask = () => {
      emit('save-task', form.value);
      resetForm();
    };

    const cancel = () => {
      resetForm();
      emit('close');
    };

    // Determina se o usuário é um gestor (substitua pelo ID real do gestor, como 1)
    const isGestor = () => {
      return roleId.value === 1; // Supondo que o role_id do gestor seja 1
    };

    return {
      form,
      users,
      submitTask,
      cancel,
      isGestor, // Exponha a função
    };
  },
});
</script>
<style scoped></style>
