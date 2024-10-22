<template>
  <div class="p-2 w-full bg-gray-100">
    <div class="flex justify-between items-center">
      <FindSearchInput
        :placeholder="'Pesquisar...'"
        :searchFields="['cpf', 'nome', 'cnpj', 'razaoSocial']"
        @search="handleSearch"
      />
      <UserPortfolio 
        :username="username" 
        :avatarUrl="avatarUrl" 
        @open-portfolio="handleOpenPortfolio"
      />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FindSearchInput from './../components/FindSearchObject.vue';
import UserPortfolio from './../components/UserPortifolioComponent.vue';

export default defineComponent({
  name: 'HeaderComponent',
  components: { FindSearchInput, UserPortfolio },
  data() {
    return {
      username: 'Astolfo.Oliveira', // Nome do usuário
      avatarUrl: '', // URL do avatar (substitua por uma URL real)
    };
  },
  methods: {
    handleSearch(value: string) {
      console.log('Valor pesquisado:', value);
    },
    handleOpenPortfolio() {
      // Implementar a lógica para abrir o portfólio do usuário
      console.log('Portfólio do usuário aberto!');
      // Aqui você pode redirecionar para uma nova rota ou abrir um modal, por exemplo
      // this.$router.push('/user-portfolio');
    },
  },
});
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
