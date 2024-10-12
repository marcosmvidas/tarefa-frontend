<template>
    <div class="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 class="text-lg font-semibold">{{ tarefa.tarefa }}</h3>
      <p class="text-gray-600">{{ tarefa.descricao }}</p>
      <p class="text-gray-800">Responsável: {{ tarefa.responsavel }}</p>
      <p class="text-sm text-gray-500">Status: {{ tarefa.status }}</p>
      <button @click="markAsComplete" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Marcar como concluída
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tarefa: Object,
    },
    methods: {
      markAsComplete() {
        this.$emit('complete', this.tarefa);
      },
    },
  };
  </script>
  