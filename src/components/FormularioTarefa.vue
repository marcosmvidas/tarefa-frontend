<template>
    <h2 class="p-6 font-bold text-blue-600 bg-slate-200">Cadastro de tarefa </h2>
    <form @submit.prevent="submitTask" class="grid grid-cols-12 gap-2 p-12 mb-5">
    <div class="md:col-span-8">
      <div class="relative z-0 w-1/2 mb-5 group">
        <div class="relative">
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
    </div>

    <div class="md:col-span-12">
      <div class="relative z-0 w-1/2 mb-5 group">
        <div class="relative">
          <textarea
            name="floating_descricao"
            v-model="form.descricao"
            required
            class="input-base h-24"
            placeholder=""
          >
          </textarea>
          <label for="floating_descricao" class="label-base">Descrição</label>
        </div>
      </div>
    </div>

    <div class="md:col-span-8">
      <div class="relative z-0 w-1/2 mb-5 group">
        <div class="relative">
          <input
            name="floating_responsavel"
            v-model="form.responsavel"
            required
            class="input-base"
            placeholder=""
          />
          <label for="floating_responsavel" class="label-base">Responsável</label>
        </div>
      </div>
    </div>

    <div class="md:col-span-8">
      <div class="relative z-0 w-1/2 mb-5 group">
        <div class="relative">
          <select v-model="form.tipo_desenvolvimento" class="input-base">
            <option value="backend">Backend</option>
            <option value="frontend">Frontend</option>
            <option value="fullstack">Fullstack</option>
          </select>
          <label for="floating_tipo_desenvolvimento" class="label-base">Desenvolvimento</label>
        </div>
      </div>
    </div>

    <div class="md:col-span-4">
      <div class="relative z-0 w-1/2 mb-5 group">
        <div class="relative">
          <select v-model="form.nivel_dificuldade" class="input-base">
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
          <label for="floating_tipo_dificuldade" class="label-base">Nível de Dificuldade</label>
        </div>
      </div>
    </div>

    <div class="md:col-span-4">
      <div class="relative">
        <input
          type="date"
          v-model="form.conclusao_em"
          required
          class="input-base"
        />
        <label for="floating_conclusao" class="label-base">Conclusão em</label>
      </div>
    </div>

    <div class="md:col-span-4">
      <label class="block text-blue-700 text-xs mb-2">Concluída:</label>
      <input
        type="checkbox"
        v-model="form.concluida"
        class="mr-2 leading-tight"
      />
      <span class="text-sm">Sim</span>
    </div>

    <div class="md:col-span-12 flex justify-end mt-4">
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

    const resetForm = () => {
      form.value = {
        tarefa: '',
        descricao: '',
        responsavel: '',
        tipo_desenvolvimento: 'backend',
        nivel_dificuldade: 'facil',
        status: '',
        concluida: false,
      };
    };

    return {
      form,
      submitTask,
      cancel,
    };
  },
});
</script>

<style scoped></style>
