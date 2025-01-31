import { createRouter, createWebHistory } from "vue-router";
import NewTerm from "../pages/NewTerm.vue";
import Login from "../auth/Login.vue";

const routes = [
  // { path: "/", redirect: "/login" }, // Redirect root path to login
  // { path: "/login", component: Login },
  { path: "/new-term", component: NewTerm }, // Define your route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("access_token"); // Check if token exists

//   if (to.path === "/login" && isAuthenticated) {
//     next("/new-term"); // Redirect logged-in users
//   } else {
//     next();
//   }
// });

export default router;
