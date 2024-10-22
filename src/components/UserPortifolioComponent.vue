<template>
  <div class="relative flex flex-col items-center">
    <div class="flex items-center px-8">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        alt="Avatar"
        class="h-10 w-10 rounded-full ring-2 ring-white cursor-pointer"
        @click="togglePortfolio"
      />
      <h3 
        class="ml-2 cursor-pointer" 
        @click="togglePortfolio"
        :title="username"
      >
        {{ username }}
      </h3>
    </div>
    <transition name="fade">
      <div v-if="isPortfolioVisible" class="absolute mt-6 p-4 bg-gray-100 rounded-lg shadow-md z-10 ml-[-50px]">
        <p class="text-gray-600">{{ status }}</p>
        <p class="text-sm text-gray-500">Localização: {{ location }}</p>
        <p class="text-sm text-gray-500">Linguagens: {{ languages.join(', ') }}</p>
        <p class="mt-2">{{ biography }}</p>
        <div class="mt-2 flex flex-wrap">
          <a 
            v-if="githubUrl" 
            :href="githubUrl" 
            target="_blank" 
            class="text-blue-500 hover:underline mr-2"
          >
            GitHub
          </a>
          <a 
            v-if="linkedinUrl" 
            :href="linkedinUrl" 
            target="_blank" 
            class="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

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
    status: {
      type: String,
      default: 'Atualmente trabalhando em projetos',
    },
    location: {
      type: String,
      default: 'Não especificado',
    },
    languages: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    biography: {
      type: String,
      default: 'Sem biografia disponível.',
    },
    githubUrl: {
      type: String,
      required: false,
    },
    linkedinUrl: {
      type: String,
      required: false,
    },
  },
  setup() {
    const isPortfolioVisible = ref(false); // Estado para controlar a visibilidade do portfólio

    const togglePortfolio = () => {
      isPortfolioVisible.value = !isPortfolioVisible.value; // Alterna a visibilidade
    };

    return {
      isPortfolioVisible,
      togglePortfolio,
    };
  },
});
</script>

<style scoped>
/* Estilos adicionais se necessário */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
