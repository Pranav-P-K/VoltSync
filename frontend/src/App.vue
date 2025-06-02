<template>
  <div id="app" class="min-h-screen relative overflow-hidden">
    <!-- Dynamic Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <!-- Animated background blobs -->
      <div
        class="absolute top-10 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob">
      </div>
      <div
        class="absolute top-32 -right-8 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000">
      </div>
      <div
        class="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000">
      </div>
      <div
        class="absolute bottom-20 right-32 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000">
      </div>
    </div>

    <!-- Grid overlay -->
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%239C92AC fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=1.5/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">
    </div>

    <!-- Modern Navigation -->
    <nav v-if="isAuthenticated" class="relative z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div class="mt-4 mb-4 transition-all duration-300">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
            <!-- Logo Section -->
            <div class="flex items-center space-x-4">
              <div class="relative group">
                <div
                  class="h-12 w-12 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300">
                  </div>
                </div>
              </div>
              <div>
                <h1
                  class="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  VoltSync
                </h1>
                <p class="text-xs text-gray-400">EV Charging Network</p>
              </div>
            </div>

            <!-- Navigation Links + Logout -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full sm:w-auto gap-2">
              <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full sm:w-auto gap-2">
                <router-link to="/dashboard"
                  class="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group text-center"
                  :class="$route.path === '/dashboard'
                    ? 'text-white bg-gradient-to-r from-blue-500/80 to-purple-600/80 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'">
                  <div class="flex items-center justify-center space-x-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </svg>
                    <span>Dashboard</span>
                  </div>
                </router-link>

                <router-link to="/map"
                  class="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group text-center"
                  :class="$route.path === '/map'
                    ? 'text-white bg-gradient-to-r from-blue-500/80 to-purple-600/80 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'">
                  <div class="flex items-center justify-center space-x-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>Map View</span>
                  </div>
                </router-link>
              </div>

              <!-- Logout Button -->
              <div class="w-full sm:w-auto">
                <button @click="logout"
                  class="w-full sm:w-auto bg-gradient-to-r from-red-500/80 to-pink-600/80 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>


    <!-- Main Content Area -->
    <main class="relative z-40">
      <!-- Page Transition Wrapper -->
      <div class="transition-all duration-500 ease-in-out">
        <router-view />
      </div>
    </main>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <div class="w-12 h-12 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500"></div>
            <div
              class="absolute inset-0 w-12 h-12 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500 animate-reverse">
            </div>
          </div>
          <p class="text-white font-medium">Loading VoltSync...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = async () => {
  isLoading.value = true
  try {
    await authStore.logout()
    router.push('/login')
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 800)
  }
}

onMounted(() => {
  // Add any initialization logic here
  console.log('VoltSync App Initialized')
})
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes reverse-spin {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-reverse {
  animation: reverse-spin 1.5s linear infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Page transitions */
.router-enter-active,
.router-leave-active {
  transition: all 0.5s ease;
}

.router-enter-from,
.router-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Floating elements animation */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.fixed.bottom-6.right-6>div:first-child {
  animation: float 3s ease-in-out infinite;
}

/* Hover effects */
.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Glow effects */
.shadow-lg {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Backdrop blur support */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Glassmorphism effects */
.bg-white\/10 {
  background-color: rgba(255, 255, 255, 0.1);
}

.bg-white\/15 {
  background-color: rgba(255, 255, 255, 0.15);
}

.border-white\/20 {
  border-color: rgba(255, 255, 255, 0.2);
}

/* Smooth animations for all interactive elements */
* {
  transition-property: transform, opacity, background-color, border-color, color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>