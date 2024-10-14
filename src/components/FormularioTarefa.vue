<template>
  <form @submit.prevent="submitTask" class="max-w-lg mx-auto bg-white p-6 shadow-md rounded">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Tarefa:</label>
      <input v-model="form.tarefa" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
      <textarea v-model="form.descricao" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Responsável:</label>
      <input v-model="form.responsavel" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Tipo de Desenvolvimento:</label>
      <select v-model="form.tipo_desenvolvimento" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="backend">Backend</option>
        <option value="frontend">Frontend</option>
        <option value="fullstack">Fullstack</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Nível de Dificuldade:</label>
      <select v-model="form.nivel_dificuldade" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="facil">Fácil</option>
        <option value="medio">Médio</option>
        <option value="dificil">Difícil</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Status:</label>
      <input v-model="form.status" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Conclusão em:</label>
      <input type="date" v-model="form.conclusao_em" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">Concluída:</label>
      <input type="checkbox" v-model="form.concluida" class="mr-2 leading-tight" />
      <span class="text-sm">Sim</span>
    </div>
    <div class="flex items-center justify-between">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Salvar
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { TarefaTypes } from '../types/TarefaTypes';

export default defineComponent({
  props: {
    tarefatask: Object as () => TarefaTypes | null,
  },
  setup(props, { emit }) {
    const form = ref<TarefaTypes>({
      tarefa: '',
      descricao: '',
      responsavel: '',
      tipo_desenvolvimento: 'backend',
      nivel_dificuldade: 'facil',
      status: '',
      concluida: false,
    });

    watch(
      () => props.tarefatask,
      (newTarefa) => {
        if (newTarefa) {
          form.value = { ...newTarefa };
        }
      },
      { immediate: true }
    );

    const submitTask = () => {
      emit('save-task', form.value);
      form.value = {
        tarefa: '',
        descricao: '',
        responsavel: '',
        tipo_desenvolvimento: 'backend',
        nivel_dificuldade: 'facil',
        status: '',
        concluida: false,
      }; // Reseta o formulário após salvar
    };

    return {
      form,
      submitTask,
    };
  },
});
</script>
