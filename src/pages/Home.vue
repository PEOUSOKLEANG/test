<template>
  <nav class="text-black p-4 flex gap-6 justify-center shadow-md">
    <router-link to="/list-sessions" >
      List Sessions
    </router-link>
    
    <router-link to="/new-session"  >
      New Session
    </router-link>
    
    <FlexibleButton label="Log out" :isCancel="true" @click="handleLogout" />
  </nav>
</template>



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