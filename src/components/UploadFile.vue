<template>
  <div @click.stop="removeFile">
    <i class="fa-solid fa-xmark text-lg"></i>
  </div>

  <div
    class="w-1/2 max-w-sm p-4 border border-gray-300 rounded-lg shadow-sm relative"
  >
    <label
      v-if="!fileName"
      class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition relative"
    >
      <input
        type="file"
        class="hidden"
        @change="handleFileUpload"
        accept="image/*, .pdf, .docx"
      />

      <div class="text-gray-500 text-center">
        <i class="fa-solid fa-cloud-upload-alt text-3xl text-blue-500"></i>
        <p class="mt-2">Click or Drag to Upload</p>
      </div>
    </label>

    <!-- Show file preview and remove button when file is uploaded -->
    <div
      v-if="fileName"
      class="relative flex items-center justify-center w-full h-32 bg-gray-100 rounded-lg p-2"
    >
      <!-- Remove button -->
      <button
        @click.stop="removeFile"
        class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-600 transition shadow-md"
      >
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <!-- File preview -->
      <img
        v-if="isImage"
        :src="previewUrl"
        alt="Uploaded Image"
        class="h-full max-w-full object-cover rounded-md"
      />
      <p v-else class="text-gray-700">📄 {{ fileName }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  removeElement: Function, // Accept the prop to remove the element
});

const emit = defineEmits(["removeFile", "uploadValue"]);

const fileName = ref("");
const previewUrl = ref("");
const isImage = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  fileName.value = file.name;
  isImage.value = file.type.startsWith("image");

  if (isImage.value) {
    previewUrl.value = URL.createObjectURL(file);
  } else {
    previewUrl.value = "";
  }

  emit("uploadValue",file);
};

const removeFile = () => {
  fileName.value = "";
  previewUrl.value = "";
  isImage.value = false;
  emit("removeFile"); // Emit event to parent
};
</script>

<style scoped>
/* Optional: Adjust styles further if needed */
</style>
