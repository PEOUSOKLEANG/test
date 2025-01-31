<template>
    <h1
      :class="[
        isSubtitle ? 'text-xl text-blue-500' : 'text-3xl',
        'font-bold '
      ]"
    >
      {{ title }}
    </h1>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    isSubtitle: {
      type: Boolean,
      default: false
    }
  });
  </script>
  