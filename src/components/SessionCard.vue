<template>
  <div
    class="flex flex-col bg-white shadow-lg p-6 rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
    <!-- Session Name -->
    <div class="flex justify-center text-xl font-bold text-blue-700 tracking-wide">
      {{ sessionName }}
    </div>

    
    <!-- Session Details -->
    <div class="px-3 grid gap-2 text-gray-800 mt-2">
      <p class="flex items-center gap-2">
        <span class="font-semibold text-gray-600 text-sm">📌 Training Name:</span>
        <span class="font-medium text-base">{{ trainingName }}</span>
      </p>

      <p class="flex items-center gap-2">
        <span class="font-semibold text-gray-600 text-sm">📅 Training Period:</span>
        <span class="font-medium text-base">{{ startingDate }} - {{ endingDate }}</span>
      </p>

      <p class="flex items-center gap-2">
        <span class="font-semibold text-gray-700 text-xs md:text-sm flex items-center">
          🏫 <span class="ml-1">Institution:</span>
        </span>
        <span class="font-medium text-sm md:text-base text-gray-800">{{ trainingInstitution }}</span>
      </p>

    </div>

  </div>
</template>

<script setup>
defineProps({
  trainingName: String,
  sessionName: String,
  startingDate: String,
  endingDate: String,
  trainingInstitution: String,
});
</script>

<style scoped>
/* Custom Styling for 3D Effect */
div:hover {
  transition: all 0.3s ease-in-out;
}
</style>
