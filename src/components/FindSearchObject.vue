<template>
    <input
      type="text"
      :placeholder="placeholder"
      class="custom-input p-4 mt-2 mb-4"
      @input="onInput"
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'FindSearchInput',
    props: {
      placeholder: {
        type: String,
        required: true,
      },
      searchFields: {
        type: Array as PropType<string[]>,
        required: true,
      },
    },
    methods: {
      onInput(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        this.$emit('search', inputValue);
      },
    },
  });
  </script>
  
  <style scoped>
  .custom-input {
    width: 40%;
    height: 42px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px; 
  }
  </style>
  