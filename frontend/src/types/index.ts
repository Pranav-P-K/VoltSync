export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "operator"
}

export interface ChargingStation {
  _id: string
  name: string
  location: {
    latitude: number
    longitude: number
    address?: string
  }
  status: "Active" | "Inactive" | "Maintenance"
  powerOutput: number
  connectorType: "Type 1" | "Type 2" | "CCS" | "CHAdeMO" | "Tesla Supercharger"
  createdBy: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role?: "admin" | "operator"
}

export interface StationFilters {
  status?: string
  connectorType?: string
  minPower?: number
  maxPower?: number
}
