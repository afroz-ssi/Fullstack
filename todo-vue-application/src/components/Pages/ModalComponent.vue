<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8">
        <button class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style>
  </style>
  <!-- @import '../styles.css'; -->
