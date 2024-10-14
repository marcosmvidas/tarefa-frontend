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
            return 'bg-green-100';
          case 'Aberta':
            return 'bg-yellow-100';
          case 'atrasada':
            return 'bg-red-100';
          default:
            return 'bg-orange-300';
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
  