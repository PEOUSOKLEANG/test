<template>
  <div class="m-4 flex flex-col items-center">
    <Title style="font-family: 'Moul', sans-serif;" title="កែប្រែវគ្គសិក្សា" />

    <div class="p-4 space-y-4 w-1/2">
      <FlexibleInput v-model="formData.sessionName" label="ឈ្មោះវគ្គបណ្តុះបណ្តាល" type="input"
        placeholder="បញ្ចូលឈ្មោះវគ្គ" />
      <FlexibleInput v-model="formData.trainingTypeRef" label="ជ្រើសរើសប្រភេទបណ្តុះបណ្តាល" type="select"
        :options="store.selectTrainingType" />
      <FlexibleInput v-model="formData.trainingSkillRef" label="ជ្រើសរើសជំនាញ" type="select"
        :options="store.selectTrainingSkill" />
      <FlexibleInput v-model="formData.institution" label="ជ្រើសរើសមណ្ឌលបណ្តុះបណ្តាល" type="select"
        :options="store.selectTrainingInstitution" />
      <FlexibleInput v-model="formData.startDate" label="ថ្ងៃចាប់ផ្ដើម" type="date" placeholder="yyyy-mm-dd" />
      <FlexibleInput v-model="formData.endDate" label="ថ្ងៃបញ្ចប់" type="date" placeholder="yyyy-mm-dd" />
      <FlexibleInput v-model="formData.notes" label="កំណត់ត្រាបន្ថែម" type="textarea"
        placeholder="បញ្ចូលអត្ថបទកំណត់ត្រាបន្ថែម" />
    </div>

    <div class="p-4 space-y-4 w-1/2">
      <Title style="font-family: 'Moul', sans-serif;" title="ព័ត៍មានគ្រូបណ្តុះបណ្តាល" is-subtitle="true" />
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
      <!-- <UploadFile v-for="(file, index) in uploadedFiles" :key="index" @removeFile="removeFile(index)"
        @uploadValue="(file) => handleUpload(file, index)" /> -->
      <UploadFile v-for="(file, index) in uploadedFiles" :key="index" :file="file" @removeFile="removeFile(index)"
        @uploadValue="(newFile) => handleUpload(newFile, index)" />

    </div>

    <div class="w-1/2 flex justify-end px-5 mt-4 gap-2.5">
      <FlexibleButton label="បោះបង់" :isCancel="true" @click="handleCancel" />
      <FlexibleButton :label="isLoading ? 'កំពុងធ្វើបច្ចុប្បន្នភាព...' : 'ធ្វើបច្ចុប្បន្នភាព'" :isCancel="false"
        :disabled="isLoading" @click.prevent="updateForm" />
    </div>


  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTrainingSessionsStore } from "../stores/TrainingSessionsStore";
import FlexibleInput from "../components/FlexibleInput.vue";
import Title from "../components/Title.vue";
import FlexibleButton from "../components/FlexibleButton.vue";
import UploadFile from "../components/UploadFile.vue";


const uploadedFiles = ref([]);// index start from 0 of array first element 

const store = useTrainingSessionsStore();
const route = useRoute();
const router = useRouter();
const sessionId = route.params.id;
const isLoading = ref(false);

// Fetch session details dynamically based on route ID
onMounted(async () => {
  store.getTrainingTypes();
  store.getTrainingInstitutions();
  store.getTrainingSkills();
  await store.fetchSessionsDetailById(sessionId);
  
});



// Get sessionDetail from store
const sessionDetail = computed(() => store.sessionDetail);


// Define formData with empty values initially
// if you write this form under watch the component not relaod(not render,you have to refresh)
const formData = ref({
  sessionName: "",
  trainingTypeRef: "",
  trainingSkillRef: "",
  institution: "",
  startDate: "",
  endDate: "",
  trainingName: "",
  trainingPhone: "",
  trainingPosition: "",
});


// Watch sessionDetail and update formData when it changes
// watch(sessionDetail, (newVal) => {
//   if (newVal) {
//     formData.value = {
//       sessionName: newVal.sessionName || "",
//       trainingTypeRef: newVal.trainingType?.value || "",
//       trainingSkillRef: newVal.trainingSkill.value || "",
//       institution: newVal.trainingInstitution.value || "",
//       startDate: newVal.startingDate || "",
//       endDate: newVal.endingDate || "",
//       trainingName: newVal.trainer?.name || "",
//       trainingPhone: newVal.trainer?.phone || "",
//       trainingPosition: newVal.trainer?.position || "",
//     };
//   }
// }, { immediate: true });
watch(sessionDetail, (newVal) => {
  if (newVal) {
    formData.value = {
      sessionName: newVal.sessionName || "",
      trainingTypeRef: newVal.trainingType?.value || "",
      trainingSkillRef: newVal.trainingSkill.value || "",
      institution: newVal.trainingInstitution.value || "",
      startDate: newVal.startingDate || "",
      endDate: newVal.endingDate || "",
      trainingName: newVal.trainer?.name || "",
      trainingPhone: newVal.trainer?.phone || "",
      trainingPosition: newVal.trainer?.position || "",
    };

    // Preload existing files
    uploadedFiles.value = newVal.files.map(file => ({
      name: file.name || "Existing File",
      url: file.url, // Preload file URL
      isExisting: true, // Mark as existing file
    }));
  }
}, { immediate: true });

const handleCancel = () => {
  router.push(`/view-details/${route.params.id}`);
};

const addFile = () => {
  uploadedFiles.value.push({});

};

// const removeFile = (index) => {
//   uploadedFiles.value.splice(index, 1);
// };

// const handleUpload = (file, index) => {
//   uploadedFiles.value[index] = file;
// };
const handleUpload = (file, index) => {
  uploadedFiles.value[index] = { ...file, isExisting: false }; // Mark new file
};

const removeFile = (index) => {
  const removedFile = uploadedFiles.value[index];

  // If it's an existing file, mark it for deletion instead of removing it immediately
  if (removedFile.isExisting) {
    uploadedFiles.value[index] = { ...removedFile, isDeleted: true };
  } else {
    uploadedFiles.value.splice(index, 1);
  }
};



// const updateForm = async () => {
//   isLoading.value = true;
//   try {
//     await store.updateSessionByID(sessionId, formData.value, uploadedFiles.value);
//     router.push("/");
//   } catch (error) {
//     console.error("Error updating session:", error);
//   } finally {
//     isLoading.value = false;
//   }
// };

const updateForm = async () => {
  isLoading.value = true;
  try {
    const newFiles = uploadedFiles.value.filter(file => !file.isExisting);
    const deletedFiles = uploadedFiles.value.filter(file => file.isDeleted);

    await store.updateSessionByID(sessionId, formData.value, newFiles, deletedFiles);
    router.push("/");
  } catch (error) {
    console.error("Error updating session:", error);
  } finally {
    isLoading.value = false;
  }
};

</script>
