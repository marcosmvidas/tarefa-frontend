<template>
    <div class="h-screen flex items-center justify-center">
      <div class="w-full max-w-md">
        <form @submit.prevent="login">
          <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
          
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Digite seu email"
            v-model="form.email"
          />
          
          <InputField
            id="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            v-model="form.password"
          />
          
          <Button
            :label="'Entrar'"
            :loading="loading"
            type="submit"
          />
          
          <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { authService } from '../services/authService';
  import InputField from '../components/InputField.vue';
  import Button from '../components/Button.vue';
  
  export default {
    components: {
      InputField,
      Button,
    },
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        loading: false,
        errorMessage: null,
      };
    },
    methods: {
      async login() {
        this.loading = true;
        this.errorMessage = null;
        try {
          const data = await authService.login(this.form);
          // Armazenar o token e redirecionar para a página principal
          console.log(localStorage.getItem('auth_token'));

          console.log(data);
          localStorage.setItem('authToken', data.token);
          this.$router.push('/');
        } catch (error) {
          this.errorMessage = error.message;
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilo adicional, caso necessário */
  </style>
  