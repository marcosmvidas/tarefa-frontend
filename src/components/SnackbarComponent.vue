<template>
  <transition name="fade">
    <div v-if="show" :class="`snackbar ${type}`">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SnackbarComponent',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success', // 'success' or 'error'
    },
    duration: {
      type: Number,
      default: 3000, // Default duration of 3 seconds
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$emit('close');
        }, this.duration);
      }
    },
  },
});
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  z-index: 1000;
}
.snackbar.success {
  background-color: #4caf50;
}
.snackbar.error {
  background-color: #f44336;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

