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
      <FlexibleInput v-model="formData.endDate" label="ថ្ងៃបញ្ចប់" type="date" placeholder="yyyy-mm-dd" />
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
      <UploadFile v-for="(file, index) in uploadedFiles" :key="index" @removeFile="removeFile(index)"
        @uploadValue="(file) => handleUpload(file, index)" />
    </div>

    <div class="w-1/2 flex justify-end px-5 mt-4 gap-2.5">
 
      <FlexibleButton label="បោះបង់" :isCancel="true" @click="handleCencel" />
      <FlexibleButton :label="isLoading ? 'កំពុងផ្ញើ...' : 'រក្សារទុក'" :isCancel="false" :disabled="isLoading"
        @click="submitForm" />



    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCourseStore } from "../stores/courseStore.js";
import { onMounted } from "vue";
import FlexibleInput from "../components/FlexibleInput.vue";
import Title from "../components/Title.vue";
import UploadFile from "../components/UploadFile.vue";
import FlexibleButton from "../components/FlexibleButton.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const uploadedFiles = ref([]);// index start from 0 of array first element 
const courseStore = useCourseStore();
const isLoading = computed(() => courseStore.loading);


const formData = ref({
  sessionName: "វគ្គខ្លី សិក្ខាកាម makeup",
  trainingTypeRef: "1",
  trainingSkillRef: "1",
  institution: "",
  startDate: "2024-03-23",
  endDate: "2024-03-23",
  trainingName: "រដ្ឋ កុល",
  trainingPhone: "+85512478356",
  trainingPosition: "Doctor",
});




const addFile = () => {
    uploadedFiles.value.push({});
  
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

const handleUpload = (file, index) => {
  uploadedFiles.value[index] = file; 
};



// Fetch training data when the component is mounted
onMounted(() => {
  courseStore.fetchTrainingTypes();
  courseStore.fetchTrainingInstitutions();
  courseStore.fetchTrainingSkills();
});
const handleCencel = async () =>{
  router.push("/"); 

}

const submitForm = async () => {
  isLoading.value = true; // Start loading
  try {
    await courseStore.submitForm(formData.value, uploadedFiles.value);
    router.push("/"); // Navigate after success
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isLoading.value = false; // Stop loading
  }
};


</script>
