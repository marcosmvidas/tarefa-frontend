<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Login</button>
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';
import { LoginCredentials } from '../types/AuthTypes'; // Certifique-se de que este tipo existe

export default {
  setup() {
    const router = useRouter();
    
    // Definindo as reativas
    const form = ref<LoginCredentials>({
      email: '',
      password: ''
    });
    const loading = ref(false);
    const errorMessage = ref<string | null>(null);

    // Função de login
    const login = async () => {
      loading.value = true;
      errorMessage.value = null;

      try {
        const data = await authService.login(form.value);
        localStorage.setItem('auth_token', data.token); // Use a mesma chave para o token
        router.push('/'); // Redireciona após o login
      } catch (error) {
        errorMessage.value = (error as Error).message; // Captura a mensagem de erro
      } finally {
        loading.value = false;
      }
    };

    // Retornando os dados e métodos que serão utilizados no template
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
