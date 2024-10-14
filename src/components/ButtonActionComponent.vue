<template>
  <div class="action-buttons">
    <button v-if="showEdit" @click="$emit('edit')" class="btn-edit">
      <PencilIcon class="h-5 w-5 text-blue-400 hover:text-blue-700" />
    </button>
    <button v-if="showDelete" @click="$emit('delete')" class="btn-delete">
      <TrashIcon class="h-5 w-5 text-red-400 hover:text-red-700" />
    </button>
    <button v-if="showList" @click="$emit('consult')" class="btn-list">
      <EyeIcon class="h-5 w-5 text-green-400 hover:text-green-700" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/vue/16/solid';

export default defineComponent({
  name: 'ButtonActionComponent',
  components: {
    TrashIcon,
    PencilIcon,
    EyeIcon,
  },
  props: {
    showEdit: {
      type: Boolean,
      default: true,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    showList: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.btn-edit,
.btn-delete,
.btn-consult {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
}

.btn-edit:hover,
.btn-delete:hover,
.btn-consult:hover {
  transform: scale(1.1);
}
</style>
