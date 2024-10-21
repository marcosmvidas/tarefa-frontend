<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Login</h1>
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-96">
      <div class="mb-4">
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="Email" 
          required 
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div class="mb-4">
        <input 
          v-model="form.password" 
          type="password" 
          placeholder="Password" 
          required 
          class="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <button 
        type="submit" 
        :disabled="loading" 
        class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </form>
    <div v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';
import { LoginCredentials } from '../types/AuthTypes';

export default {
  setup() {
    const router = useRouter();
    
    const form = ref<LoginCredentials>({
      email: '',
      password: ''
    });
    const loading = ref(false);
    const errorMessage = ref<string | null>(null);

    const login = async () => {
      loading.value = true;
      errorMessage.value = null;

      try {
        const data = await authService.login(form.value);
        console.log('Login bem-sucedido:', data);
        localStorage.setItem('auth_token', data.token);
        router.push('/tarefa');
      } catch (error) {
        errorMessage.value = (error as Error).message;
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      errorMessage,
      login,
    };
  }
};
</script>

<style scoped>
/* Adicione seu estilo aqui */
</style>
