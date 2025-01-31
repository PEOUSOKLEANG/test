<template>
  <button
    :class="[
      'px-6 py-2 rounded-lg shadow-md transition',
      isCancel ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup>

const props = defineProps({
  label: String,
  isCancel: {
    type: Boolean,
    default: false,
  },
});
</script>
