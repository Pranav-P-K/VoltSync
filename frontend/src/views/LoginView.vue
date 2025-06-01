<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Animated background elements -->
    <div class="absolute inset-0">
      <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%239C92AC fill-opacity=0.1%3E%3Ccircle cx=30 cy=30 r=1.5/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

    <div class="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        
        <!-- Logo and Header -->
        <div class="text-center">
          <div class="mx-auto h-20 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.5 11.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm5-9h-13c-1.11 0-2 .89-2 2v13c0 1.11.89 2 2 2h13c1.11 0 2-.89 2-2v-13c0-1.11-.89-2-2-2zm-6.5 15.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </div>
          
          <h2 class="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
            {{ isLogin ? 'Welcome Back' : 'Join VoltSync' }}
          </h2>
          
          <p class="text-gray-300 text-lg">
            {{ isLogin ? 'Power up your EV experience' : 'Start your electric journey' }}
          </p>
        </div>

        <!-- Form Container -->
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-all duration-300">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            
            <!-- Name Field (Sign Up) -->
            <div v-if="!isLogin" class="transform transition-all duration-500 ease-in-out">
              <label for="name" class="block text-sm font-medium text-gray-200 mb-2 ml-1">
                Full Name
              </label>
              <div class="relative group">
                <input
                  id="name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/10"
                  placeholder="Enter your full name"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-200 mb-2 ml-1">
                Email Address
              </label>
              <div class="relative group">
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/10"
                  placeholder="Enter your email"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-200 mb-2 ml-1">
                Password
              </label>
              <div class="relative group">
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/10 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="authStore.error" class="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-300 text-sm text-center backdrop-blur-sm">
              <div class="flex items-center justify-center space-x-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <span>{{ authStore.error }}</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              <div class="flex items-center justify-center space-x-2">
                <span v-if="authStore.loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="isLogin" fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  <path v-else fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span>{{ authStore.loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account') }}</span>
              </div>
            </button>
          </form>

          <!-- Toggle Mode -->
          <div class="text-center mt-6">
            <button
              type="button"
              @click="toggleMode"
              class="text-gray-300 hover:text-white text-sm transition-colors group"
            >
              <span>{{ isLogin ? "Don't have an account?" : "Already have an account?" }}</span>
              <span class="text-blue-400 ml-1 group-hover:text-blue-300 font-medium">
                {{ isLogin ? "Sign up" : "Sign in" }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const showPassword = ref(false)
const rememberMe = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  authStore.error = null
  showPassword.value = false
}

const handleSubmit = async () => {
  let success = false
  
  if (isLogin.value) {
    success = await authStore.login({
      email: form.email,
      password: form.password
    })
  } else {
    success = await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password
    })
  }
  
  if (success) {
    router.push('/dashboard')
  }
}
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

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>