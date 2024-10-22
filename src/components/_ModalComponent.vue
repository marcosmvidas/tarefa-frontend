<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="close" @click="closeModal">
        <span class="text-red-600 text-2xl font-semibold p-3">X</span>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modalcomponent_',

  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  z-index: 1;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.modal-content {
  background: white;
  padding: 2px;
  border-radius: 5px;
  position: relative;
  z-index: 1;
  width: 60%;
  max-width: 90%;
  height: auto;
}
</style>
