<template>
  <div class="mb-4">
    <label :for="id" class="label-base">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      :class="['input-base', inputClasses]"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    inputClasses: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target) {
        this.$emit('update:modelValue', target.value);
      }
    },
  },
});
</script>

<style scoped>
/* Se houver estilizações específicas adicionais, elas podem ser adicionadas aqui */
</style>
