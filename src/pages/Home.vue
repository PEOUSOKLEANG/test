<template>
  <nav class="text-black p-4 flex gap-6 justify-center shadow-md">
    <router-link to="/list-sessions" class="nav-link" active-class="active-link">
      List Sessions
    </router-link>
    
    <router-link to="/new-session" class="nav-link" active-class="active-link">
      New Session
    </router-link>
    
    <FlexibleButton label="Log out" :isCancel="true" @click="handleLogout" />
  </nav>
</template>

<style scoped>
/* .nav-link {
  @apply text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300;
}

.nav-link:hover {
  @apply bg-gray-200;
}

.active-link {
  @apply bg-white text-blue-500 px-4 py-2 rounded-lg;
} */
</style>

<script setup>
import { useRouter } from 'vue-router';
import FlexibleButton from "../components/FlexibleButton.vue";

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  router.push("/login");
};
</script>