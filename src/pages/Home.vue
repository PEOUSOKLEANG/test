<template>
    <nav class=" text-blck p-4 flex gap-6 justify-center shadow-md">
      <!-- <router-link 
        to="/" 
        class="nav-link"
        active-class="active-link">
        Home
      </router-link> -->
      
      <router-link 
        to="/list-sessions" 
        class="nav-link"
        active-class="active-link">
        List Sessions
      </router-link>
  
      <router-link 
        to="/new-session" 
        class="nav-link"
        active-class="active-link">
        New Session
      </router-link>
    </nav>
  </template>
  
  <style scoped>
  .nav-link {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 10px 15px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    border: black
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .active-link {
    background-color: white;
    color: blue;
    padding: 10px 15px;
    border-radius: 8px;
  }
  </style>
  