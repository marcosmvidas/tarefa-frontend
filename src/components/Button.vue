<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <button
      :class="computedClasses"
      :disabled="loading"
      @click="handleClick"
    >
      <span v-if="loading">Carregando...</span>
      <span v-else>{{ label }}</span>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      loading: Boolean,
      type: {
        type: String,
        default: 'button',
      },
    },
    computed: {
      computedClasses() {
        return `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`;
      },
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      },
    },
  };
  </script>
  