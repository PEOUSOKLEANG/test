<template>
    <div class="m-auto mt-20 w-1/2 flex flex-col items-center shadow-lg p-6 rounded-2xl border border-gray-200">
        <Title class="flex justify-center p-5" title="Login" is-subtitle="true" />

        <div class="p-4 space-y-4 w-1/2">
            <FlexibleInput v-model="formLogin.username" label="Username" type="input" placeholder="@name" />
            <FlexibleInput v-model="formLogin.password" label="Password" type="password" placeholder="*******" />
        </div>

        <div class="w-1/2 flex justify-end px-5 mt-4 gap-2.5">
            <FlexibleButton :label="isLoading ? 'កំពុងផ្ញើ...' : 'ចូល'" :isCancel="false" @click="handleLogin" />
        </div>
    </div>
</template>

<script setup>
import FlexibleInput from "../components/FlexibleInput.vue";
import FlexibleButton from "../components/FlexibleButton.vue";
import Title from "../components/Title.vue";
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const formLogin = ref({ username: "admin", password: "12345678" });
const router = useRouter();

const handleLogin = async () => {
    await authStore.login(formLogin.value);
    if (authStore.user) {
        router.push("/home"); // Redirect after login
    }
};
</script>
