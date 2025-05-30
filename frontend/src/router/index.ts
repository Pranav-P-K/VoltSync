import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth"
import LoginView from "@/views/LoginView.vue"
import DashboardView from "@/views/DashboardView.vue"
import MapView from "../views/MapView.vue"

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/map",
    name: "Map",
    component: MapView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.initializeAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login")
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/dashboard")
  } else {
    next()
  }
})

export default router
