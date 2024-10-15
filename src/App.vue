<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <button @click="showModal = true">Logout</button> <!-- Botão de Logout -->
    </nav>
    <router-view/>
    
    <LogoutModal :isVisible="showModal" @close="showModal = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LogoutModal from './components/LogoutModal.vue'; // Certifique-se de importar o LogoutModal

export default defineComponent({
  components: {
    LogoutModal,
  },
  data() {
    return {
      showModal: false, // Controle do estado do modal
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 15px; /* Adiciona um espaço entre os links */
}

nav button {
  font-weight: bold;
  color: white;
  background-color: #e74c3c; /* Cor de fundo do botão */
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
}

nav button:hover {
  background-color: #c0392b; /* Cor de fundo do botão ao passar o mouse */
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
