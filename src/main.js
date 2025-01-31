import { createApp } from 'vue'
import { createPinia } from 'pinia'; // Import Pinia
import './style.css'
import App from './App.vue'
import router from './router'; // Import the router

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance

app.use(pinia); // Register Pinia
app.use(router);
app.mount('#app');
