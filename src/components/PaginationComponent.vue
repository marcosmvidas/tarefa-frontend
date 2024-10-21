<template>
  <div class="flex justify-center space-x-2 my-4">
    <button
      :disabled="current === 1"
      class="item prev px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-l"
      @click="changePage(current - 1)"
      aria-label="Previous Page"
    >
      <ChevronLeftIcon class="h-6"/>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      :class="['item px-4 py-2', { 'bg-blue-500 text-white font-bold': page === current }]"
      @click="changePage(page)"
      :aria-label="'Page ' + page"
    >
      {{ page }}
    </button>

    <button
      :disabled="current === totalPages"
      class="item next px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-r"
      @click="changePage(current + 1)"
      aria-label="Next Page"
    >
      <ChevronRightIcon class="h-6"/>
    </button>
  </div>
  <p>
    Total de registros {{ total }}
  </p>
</template>

<script lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/16/solid';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaginationComponent',

  props: {
    offset: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
    handlePagination: {
      type: Function,
      required: false,
    },
  },

  computed: {
    current(): number {
      return this.offset;
    },
    totalPages(): number {
      return Math.ceil(this.total / this.limit);
    },
    pages(): number[] {
      const pagesArray = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
      const startPage = Math.max(this.current - 2, 1);
      const endPage = Math.min(this.current + 2, this.totalPages);
      return pagesArray.slice(startPage - 1, endPage); // -1 para ajustar índice
    },
  },

  methods: {
    changePage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('change-page', page);
        if (this.handlePagination) {
          this.handlePagination(page);
        }
      }
    },
  },

  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
});
</script>

<style scoped>
.item {
  cursor: pointer;
  transition: background-color 0.3s;
}
.item:disabled {
  cursor: not-allowed;
  background-color: #e5e5e5;
}
</style>
