import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { authAPI } from "../services/api"
import type { User, LoginCredentials, RegisterData } from "../types"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem("token"))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (credentials: LoginCredentials) => {
    try {
      loading.value = true
      error.value = null

      const response = await authAPI.login(credentials)
      const { token: authToken, user: userData } = response.data

      token.value = authToken
      user.value = userData

      localStorage.setItem("token", authToken)
      localStorage.setItem("user", JSON.stringify(userData))

      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || "Login failed"
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    try {
      loading.value = true
      error.value = null

      const response = await authAPI.register(data)
      const { token: authToken, user: userData } = response.data

      token.value = authToken
      user.value = userData

      localStorage.setItem("token", authToken)
      localStorage.setItem("user", JSON.stringify(userData))

      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || "Registration failed"
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const initializeAuth = () => {
    const storedUser = localStorage.getItem("user")
    if (storedUser && token.value) {
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        logout()
      }
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    initializeAuth,
  }
})
