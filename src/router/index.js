import { createRouter, createWebHistory } from "vue-router";

// Lazy load route components(Improves performance by loading components only when needed.)
const Login = () => import("../auth/Login.vue");
const Home = () => import("../pages/Home.vue");
const NewSession = () => import("../pages/NewSession.vue");
const ListSessions = () => import("../pages/ListSessions.vue");
const ViewDetail = () => import("../pages/viewDetail.vue");
const UpdateSession =()=>import("../pages/UpdateSession.vue");


const routes = [
  { path: "/", redirect: { name: "Login" } }, // Redirect root to login
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/new-session",
    name: "NewSession",
    component: NewSession,
    meta: { requiresAuth: true },
  },
  {
    path: "/list-sessions",
    name: "ListSessions",
    component: ListSessions,
    meta: { requiresAuth: true },
  },
  {
    path: "/view-details/:id",
    name: "ViewDetails",
    component: ViewDetail,
    props:true,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-session/:id",
    name: "UpdateSession",
    component: UpdateSession,
    props:true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("access_token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" }); // Redirect unauthenticated users to login
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: "Home" }); // Prevent logged-in users from accessing guest-only pages
  } else {
    next();
  }
});

export default router;
