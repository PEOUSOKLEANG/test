<template>
  <div class="m-4 flex flex-col items-center">
    <Title style="font-family: 'Moul', sans-serif" title="កែប្រែវគ្គសិក្សា" />

    <div class="p-4 space-y-4 w-1/2">
      <FlexibleInput
        v-model="formData.sessionName"
        label="ឈ្មោះវគ្គបណ្តុះបណ្តាល"
        type="input"
        placeholder="បញ្ចូលឈ្មោះវគ្គ"
      />
      <FlexibleInput
        v-model="formData.trainingTypeRef"
        label="ជ្រើសរើសប្រភេទបណ្តុះបណ្តាល"
        type="select"
        :options="store.selectTrainingType"
      />
      <FlexibleInput
        v-model="formData.trainingSkillRef"
        label="ជ្រើសរើសជំនាញ"
        type="select"
        :options="store.selectTrainingSkill"
      />
      <FlexibleInput
        v-model="formData.institution"
        label="ជ្រើសរើសមណ្ឌលបណ្តុះបណ្តាល"
        type="select"
        :options="store.selectTrainingInstitution"
      />
      <FlexibleInput
        v-model="formData.startDate"
        label="ថ្ងៃចាប់ផ្ដើម"
        type="date"
        placeholder="yyyy-mm-dd"
      />
      <FlexibleInput
        v-model="formData.endDate"
        label="ថ្ងៃបញ្ចប់"
        type="date"
        placeholder="yyyy-mm-dd"
      />
      <FlexibleInput
        v-model="formData.notes"
        label="កំណត់ត្រាបន្ថែម"
        type="textarea"
        placeholder="បញ្ចូលអត្ថបទកំណត់ត្រាបន្ថែម"
      />
    </div>

    <div class="p-4 space-y-4 w-1/2">
      <Title
        style="font-family: 'Moul', sans-serif"
        title="ព័ត៍មានគ្រូបណ្តុះបណ្តាល"
        is-subtitle="true"
      />
      <FlexibleInput
        v-model="formData.trainingName"
        label="ឈ្មោះ"
        type="input"
        placeholder="បញ្ចូលឈ្មោះនាម"
      />
      <FlexibleInput
        v-model="formData.trainingPosition"
        label="តួនាទី"
        type="input"
        placeholder="បញ្ចូលតួនាទី"
      />
      <FlexibleInput
        v-model="formData.trainingPhone"
        label="លេខទូរស័ព្ទ"
        type="input"
        placeholder="បញ្ចូលលេខទូរស័ព្ទ"
      />
    </div>

    <div class="w-1/2 flex justify-between px-5">
      <Title
        style="font-family: 'Moul', sans-serif"
        title="រូបថតនិងឯកសារយោង"
        is-subtitle="true"
      />
      <p
        class="text-blue-500 flex items-center cursor-pointer hover:text-blue-700 transition"
        @click="addFile"
      >
        <i class="fa-solid fa-add mr-2"></i> បន្ថែមឯកសារឬរូបថត
      </p>
    </div>

    <!-- Display existing files -->
    <div class="w-1/2 flex flex-col items-start px-5 mt-2 gap-1.5">
      <div
        v-if="sessionDetail && sessionDetail.files.length"
        class="mt-2 space-y-2"
      >
        <div
          v-for="(file, index) in sessionDetail.files"
          :key="index"
          class="flex items-center gap-2"
        >
          <p class="text-gray-600">ឯកសារចាស់ {{ index + 1 }}:</p>
          <a
            :href="file.url"
            target="_blank"
            class="text-blue-500 hover:underline"
            >មើលឯកសារ</a
          >
        </div>
      </div>
      <p v-else class="text-gray-500">មិនមានឯកសារចាស់</p>
    </div>

    <!-- Warning message when adding new files -->
    <div class="w-1/2 flex flex-col items-start px-5 mt-2 gap-1.5">
      <p v-if="uploadedFiles.length" class="text-blue-500">
        ឯកសារថ្មី
        <!-- <span class="text-red-500"
          >(បើបន្ថែមឯកសារ ថ្មី អាចបំបាត់ឯកសារចាស់!!!)</span
        > -->
      </p>
    </div>

    <div class="w-1/2 flex flex-col items-start px-5 mt-2 gap-1.5">
      <UploadFile
        v-for="(file, index) in uploadedFiles"
        :key="index"
        @removeFile="removeFile(index)"
        @uploadValue="(file) => handleUpload(file, index)"
      />
    </div>

    <p
      v-if="errorMessage"
      class="text-red-500 text-sm mt-2 w-1/2 flex flex-col items-start px-5 gap-1.5"
    >
      {{ errorMessage }}
    </p>

    <div class="w-1/2 flex justify-end px-5 mt-4 gap-2.5">
      <FlexibleButton label="បោះបង់" :isCancel="true" @click="handleCancel" />
      <FlexibleButton
        :label="isLoading ? 'កំពុងធ្វើបច្ចុប្បន្នភាព...' : 'ធ្វើបច្ចុប្បន្នភាព'"
        :isCancel="false"
        :disabled="isLoading"
        @click.prevent="updateForm"
      />
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

const errorMessage = ref("");
const uploadedFiles = ref([]); // Stores new files added

const store = useTrainingSessionsStore();
const route = useRoute();
const router = useRouter();
const sessionId = route.params.id;
const isLoading = ref(false);

// Fetch session details
onMounted(async () => {
  store.getTrainingTypes();
  store.getTrainingInstitutions();
  store.getTrainingSkills();
  await store.fetchSessionsDetailById(sessionId);
});

// Get session details from store
const sessionDetail = computed(() => store.sessionDetail);

// Form data
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

// Watch for session details and update formData
watch(
  sessionDetail,
  (newVal) => {
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
    }
  },
  { immediate: true }
);

// Handle adding new file
const addFile = () => {
  uploadedFiles.value.push({});
};

// Remove file
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

// Handle file upload
const handleUpload = (file, index) => {
  uploadedFiles.value[index] = file;
  errorMessage.value = ""; // Clear error if file is valid
};

// Handle form update
const updateForm = async () => {
  if (uploadedFiles.value.some((file) => !file || !(file instanceof File))) {
    errorMessage.value = "សូមជ្រើសរើសឯកសារទាំងអស់មុននឹងធ្វើបច្ចុប្បន្នភាព!";
    console.log("Uploaded files validation failed:", uploadedFiles.value);
    return;
  }
  isLoading.value = true;
  try {
    await store.updateSessionByID(
      sessionId,
      formData.value,
      uploadedFiles.value
    );
    router.push("/");
  } catch (error) {
    console.error("Error updating session:", error);
  } finally {
    isLoading.value = false;
  }
};

// Handle cancel
const handleCancel = () => {
  router.push(`/view-details/${route.params.id}`);
};
</script>
