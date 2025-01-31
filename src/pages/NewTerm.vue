<template>
  <div class="m-4 flex flex-col items-center">
    <Title style="font-family: 'Moul', sans-serif;" title="បញ្ចូលវគ្គសិក្សាថ្មី" />

    <div class="p-4 space-y-4 w-1/2">
      <FlexibleInput v-model="formData.sessionName" label="ឈ្មោះវគ្គបណ្តុះបណ្តាល" type="input"
        placeholder="បញ្ចូលឈ្មោះវគ្គ" />
      <FlexibleInput v-model="formData.trainingTypeRef" label="ជ្រើសរើសប្រភេទបណ្តុះបណ្តាល" type="select"
        :options="courseStore.selectTrainingTypeOptions" />
      <FlexibleInput v-model="formData.trainingSkillRef" label="ជ្រើសរើសជំនាញ" type="select"
        :options="courseStore.selectTrainingSkill" />
      <FlexibleInput v-model="formData.institution" label="ជ្រើសរើសមណ្ឌលបណ្តុះបណ្តាល" type="select" :options="courseStore.selectTrainingInstitution
        " />
      <FlexibleInput v-model="formData.startDate" label="ថ្ងៃចាប់ផ្ដើម" type="date" placeholder="yyyy-mm-dd" />
      <!-- <FlexibleInput v-model="formData.startDate" label="ថ្ងៃចាប់ផ្ដើម" type="input" placeholder="yyyy-mm-dd" /> -->
      <FlexibleInput v-model="formData.endDate" label="ថ្ងៃបញ្ចប់" type="date" placeholder="yyyy-mm-dd" />
      <!-- <FlexibleInput v-model="formData.endDate" label="ថ្ងៃបញ្ចប់" type="input" placeholder="yyyy-mm-dd" /> -->
      <FlexibleInput v-model="formData.notes" label="កំណត់ត្រាបន្ថែម" type="textarea"
        placeholder="បញ្ចូលអត្ថបទកំណត់ត្រាបន្ថែម" />
    </div>

    <div class="w-1/2 flex flex-col items-start px-5">
      <Title style="font-family: 'Moul', sans-serif;" title="ព័ត៍មានគ្រូបណ្តុះបណ្តាល" is-subtitle="true" />
    </div>

    <div class="p-4 space-y-4 w-1/2">
      <FlexibleInput v-model="formData.trainingName" label="ឈ្មោះ" type="input" placeholder="បញ្ចូលឈ្មោះនាម" />
      <FlexibleInput v-model="formData.trainingPosition" label="តួនាទី" type="input" placeholder="បញ្ចូលតួនាទី" />
      <FlexibleInput v-model="formData.trainingPhone" label="លេខទូរស័ព្ទ" type="input"
        placeholder="បញ្ចូលលេខទូរស័ព្ទ" />
    </div>

    <div class="w-1/2 flex justify-between px-5">
      <Title style="font-family: 'Moul', sans-serif;" title="រូបថតនិងឯកសារយោង" is-subtitle="true" />
      <p class="text-blue-500 flex items-center cursor-pointer hover:text-blue-700 transition" @click="addFile">
        <i class="fa-solid fa-add mr-2"></i> បន្ថែមឯកសារឬរូបថត
      </p>
    </div>

    <div class="w-1/2 flex flex-col items-start px-5 mt-2 gap-1.5">
      <!-- <UploadFile v-for="(file, index) in uploadedFiles" :key="index" /> -->
      <UploadFile v-for="(file, index) in uploadedFiles" :key="index" @removeFile="removeFile(index)" />


    </div>

    <div class="w-1/2 flex justify-end px-5 mt-4 gap-2.5">
      <!-- <button @click="submitForm"
        class="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
        រក្សារទុក
      </button> -->
      <FlexibleButton label="បោះបង់" :isCancel="true" />
      <FlexibleButton label="រក្សារទុក" :isCancel="false" @click="submitForm" />



    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCourseStore } from "../stores/courseStore.js";
import { onMounted } from "vue";
import FlexibleInput from "../components/FlexibleInput.vue";
import Title from "../components/Title.vue";
import UploadFile from "../components/UploadFile.vue";
import FlexibleButton from "../components/FlexibleButton.vue";

const formData = ref({
  sessionName: "",
  trainingTypeRef: "",
  trainingSkillRef: "",
  institution: "",
  startDate: "",
  endDate: "",
  notes: "",
  trainingName: "",
  trainingPhone: "",
  trainingPosition: "",
});


const uploadedFiles = ref([]);// index start from 0 of array first element 



const addFile = () => {
  uploadedFiles.value.push({});
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

const courseStore = useCourseStore();

// Fetch training types when the component is mounted
// Compute loading state
// const isLoading = computed(() => courseStore.loading);

// Fetch training data when the component is mounted
onMounted(() => {
  courseStore.fetchTrainingTypes();
  courseStore.fetchTrainingInstitutions();
  courseStore.fetchTrainingSkills();
});



// 🟢 Call `submitForm` from `courseStore`
const submitForm = () => {
  courseStore.submitForm(formData.value, uploadedFiles.value);
};
</script>
