<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <button @click="showModal = true">Logout</button>
    </nav> -->
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

<style lang="scss">
</style>
