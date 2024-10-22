<template>
  <main id="tarefa-create-page">
    <div class="w-full h-[calc(100vh-full)] bg-gray-200 p-[20px]">
      <ListaTarefas />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListaTarefas from '@/components/ListaTarefas.vue';

export default defineComponent({
  components: {
    ListaTarefas,
  },
});
</script>

<style scoped></style>
