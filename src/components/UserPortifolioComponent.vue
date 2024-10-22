<template>
  <div class="flex items-center">
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      alt="Avatar"
      class="h-10 w-10 rounded-full ring-2 ring-white"
    />
    <h3 class="ml-2 cursor-pointer" @click="openPortfolio">{{ username }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'UserPortfolio',
  props: {
    username: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  methods: {
    openPortfolio() {
      this.$emit('open-portfolio'); // Emite o evento quando o nome é clicado
    },
  },
});
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
