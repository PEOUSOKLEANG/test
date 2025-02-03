<template>
    <div class="m-4 flex flex-col items-center">
        <div class="p-6 w-2/3 shadow-lg rounded-xl border border-gray-200 bg-white space-y-6">
            <!-- Course Information -->
            <div v-if="sessionDetail">
                <Title class="flex justify-center mb-5" style="font-family: 'Moul', sans-serif;" 
                    title="ព័ត៌មានលម្អិតអំពីវគ្គសិក្សា" :is-subtitle="true" />

                <div class="grid grid-cols-2 gap-4 mt-2 text-gray-600">
                    <p><strong>ឈ្មោះវគ្គ:</strong> {{ sessionDetail.sessionName }}</p>
                    <p><strong>ប្រភេទបណ្តុះបណ្តាល:</strong> {{ sessionDetail.trainingType.label }}</p>
                    <p><strong>ជំនាញ:</strong> {{ sessionDetail.trainingSkill.label }}</p>
                    <p><strong>មណ្ឌលបណ្តុះបណ្តាល:</strong> {{ sessionDetail.trainingInstitution.label }}</p>
                    <p><strong>ថ្ងៃចាប់ផ្តើម:</strong> {{ sessionDetail.startingDate }}</p>
                    <p><strong>ថ្ងៃបញ្ចប់:</strong> {{ sessionDetail.endingDate }}</p>
                </div>
                <p class="mt-2 text-gray-600"><strong>កំណត់ត្រា:</strong> {{ sessionDetail.description || 'មិនមាន' }}</p>
            </div>

            <!-- Trainer Information -->
            <div v-if="sessionDetail && sessionDetail.trainer">
                <h2 class="text-lg font-semibold text-gray-700">ព័ត៍មានគ្រូបណ្តុះបណ្តាល</h2>
                <div class="grid grid-cols-2 gap-4 mt-2 text-gray-600">
                    <p><strong>ឈ្មោះ:</strong> {{ sessionDetail.trainer.name }}</p>
                    <p><strong>តួនាទី:</strong> {{ sessionDetail.trainer.position }}</p>
                    <p><strong>លេខទូរស័ព្ទ:</strong> {{ sessionDetail.trainer.phone }}</p>
                </div>
            </div>

            <!-- Uploaded Files -->
            <div>
                <h2 class="text-lg font-semibold text-gray-700">ឯកសារ និង រូបថត</h2>
                <div v-if="sessionDetail && sessionDetail.files.length" class="mt-2 space-y-2">
                    <div v-for="(file, index) in sessionDetail.files" :key="index" class="flex items-center gap-2">
                        <p class="text-gray-600">ឯកសារ {{ index + 1 }}:</p>
                        <a :href="file.url" target="_blank" class="text-blue-500 hover:underline">មើលឯកសារ</a>
                    </div>
                </div>
                <p v-else class="text-gray-500">មិនមានឯកសារ</p>
            </div>

            <div class="flex justify-end gap-3">
                <FlexibleButton label="ត្រឡប់ក្រោយ" :isCancel="true" @click="goBack" />
                <FlexibleButton label="កែសម្រួល" :isCancel="false" @click="editCourse" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTrainingSessionsStore } from "../stores/TrainingSessionsStore";
import Title from "../components/Title.vue";
import FlexibleButton from "../components/FlexibleButton.vue";

const store = useTrainingSessionsStore();
const router = useRouter();
const route = useRoute();

// Fetch session details dynamically based on route ID
onMounted(async () => {
    const sessionId = route.params.id;
    await store.fetchSessionsDetailById(sessionId);
});

// Get sessionDetail from store
const sessionDetail = computed(() => store.sessionDetail);

const goBack = () => {
    router.push({ name: "ListSessions" });
};

const editCourse = () => {
    router.push(`/update-session/${route.params.id}`);
};
</script>
