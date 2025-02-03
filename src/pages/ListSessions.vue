<!-- <template>
    <div class="m-10">
        <Title class="p-3 flex justify-center" title="Training Sessions" />

        <div class="grid grid-cols-3 w-full gap-4 p-5">
            <SessionCard v-for="session in store.sessions" :key="session.id" :trainingName="session.trainingName"
                :sessionName="session.sessionName" :startingDate="session.startingDate" :endingDate="session.endingDate"
                :trainingInstitution="session.trainingInstitution" />
        </div>

        <div class="flex justify-between items-center px-5 text-gray-700 text-lg font-semibold">
            <span>Page {{ store.currentPage }} of {{ store.totalPages }}</span>
            <span>Showing {{ startItem }} - {{ endItem }} of {{ totalCount }} items</span>
        </div>

        <div class="flex justify-center items-center gap-4 mt-6">
            <button @click="store.prevPage" :disabled="store.currentPage === 1"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Previous
            </button>

            <button @click="store.nextPage" :disabled="store.currentPage === store.totalPages"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTrainingSessionsStore } from "../stores/TrainingSessionsStore";
import Title from "../components/Title.vue";
import SessionCard from "../components/SessionCard.vue";

const store = useTrainingSessionsStore();

onMounted(() => {
    store.fetchSessions();
});

// Computed properties for pagination display
const startItem = computed(() => (store.currentPage - 1) * store.itemsPerPage + 1);
const endItem = computed(() => Math.min(store.currentPage * store.itemsPerPage, store.totalPages * store.itemsPerPage));
const totalCount = computed(() => store.totalPages * store.itemsPerPage);
</script> -->


<template>
    <div class="m-10">
        <Title class="p-3 flex justify-center" title="Training Sessions" />

        <!-- Loading Indicator -->
        <div v-if="store.loading" class="flex justify-center text-blue-500 text-lg font-semibold">
            Loading training sessions...
        </div>

        <!-- Error Message -->
        <div v-if="store.error" class="text-center text-red-500 font-semibold">
            {{ store.error }}
        </div>

        <!-- Training Sessions Grid -->
        <div v-else class="grid grid-cols-3 w-full gap-4 p-5">
            <SessionCard v-for="session in store.sessions" :key="session.id"
                :id="session.id"
                :trainingName="session.trainingName"
                :sessionName="session.sessionName"
                :startingDate="session.startingDate"
                :endingDate="session.endingDate"
                :trainingInstitution="session.trainingInstitution" />
        </div>

        <!-- Pagination Info -->
        <div class="flex justify-between items-center px-5 text-gray-700 text-lg font-semibold">
            <span>Page {{ store.currentPage }} of {{ store.totalPages }}</span>
            <span>Showing {{ startItem }} - {{ endItem }} of {{ store.totalCount }} items</span>
        </div>

        <!-- Pagination Buttons -->
        <div class="flex justify-center items-center gap-4 mt-6">
            <button @click="store.prevPage" :disabled="store.currentPage === 1"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Previous
            </button>

            <button @click="store.nextPage" :disabled="store.currentPage === store.totalPages"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTrainingSessionsStore } from "../stores/TrainingSessionsStore";
import Title from "../components/Title.vue";
import SessionCard from "../components/SessionCard.vue";

const store = useTrainingSessionsStore();

onMounted(() => {
    store.fetchSessions();
});

// Computed properties for pagination display
const startItem = computed(() => (store.currentPage - 1) * store.itemsPerPage + 1);
const endItem = computed(() => Math.min(store.currentPage * store.itemsPerPage, store.totalCount));
</script>
