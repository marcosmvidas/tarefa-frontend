<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 class="text-xl font-semibold mb-4">Logout</h2>
      <p class="mb-6">Você está prestes a sair do sistema. Deseja continuar?</p>
      <div class="flex justify-center space-x-4">
        <button 
          @click="handleLogout" 
          class="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
        >
          Sim
        </button>
        <button 
          @click="cancelLogout" 
          class="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authService } from '../services/authService';

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async handleLogout() {
      try {
        await authService.logout(); // Chama o método de logout do authService
        this.$router.push('/'); // Redireciona para a página de login
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao fazer logout. Tente novamente.');
      }
    },
    cancelLogout() {
      this.$emit('close'); // Emitir um evento para fechar o modal
    },
  },
});
</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui, se necessário */
</style>
