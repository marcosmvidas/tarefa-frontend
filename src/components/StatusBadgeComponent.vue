<template>
    <tr :class="getStatusClass">
      <slot></slot>
    </tr>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'RowStatusComponent',
    props: {
      status: {
        type: String,
        required: true,
      },
    },
    computed: {
      getStatusClass(): string {
        switch (this.status) {
          case 'concluída':
            return 'text-green-600';
          case 'Aberta':
            return 'text-gray-600';
          case 'atrasada':
            return 'bg-red-100';
          default:
            return 'text-blue-600';
        }
      },
    },
  });
  </script>
  
  <style scoped>
  .bg-green-100 {
    background-color: #d4edda;
  }
  
  .bg-yellow-100 {
    background-color: #fff3cd;
  }
  
  .bg-red-100 {
    background-color: #f8d7da;
  }
  </style>
  