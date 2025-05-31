import axios from "axios"
import type { LoginCredentials, RegisterData, ChargingStation, StationFilters } from "../types"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
//const API_BASE_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  login: (credentials: LoginCredentials) => api.post("/auth/login", credentials),
  register: (data: RegisterData) => api.post("/auth/register", data),
  getProfile: () => api.get("/auth/profile"),
}

export const stationsAPI = {
  getAll: (filters?: StationFilters) => api.get("/charging-stations", { params: filters }),
  getById: (id: string) => api.get(`/charging-stations/${id}`),
  create: (data: Partial<ChargingStation>) => api.post("/charging-stations", data),
  update: (id: string, data: Partial<ChargingStation>) => api.put(`/charging-stations/${id}`, data),
  delete: (id: string) => api.delete(`/charging-stations/${id}`),
}

export default api
