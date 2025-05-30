import { defineStore } from "pinia"
import { ref } from "vue"
import { stationsAPI } from "../services/api"
import type { ChargingStation, StationFilters } from "../types"

export const useChargingStationsStore = defineStore("chargingStations", () => {
  const stations = ref<ChargingStation[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStations = async (filters?: StationFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await stationsAPI.getAll(filters)
      stations.value = response.data.stations
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch stations"
    } finally {
      loading.value = false
    }
  }

  const createStation = async (stationData: Partial<ChargingStation>) => {
    try {
      loading.value = true
      error.value = null

      const response = await stationsAPI.create(stationData)
      stations.value.unshift(response.data.station)

      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create station"
      return false
    } finally {
      loading.value = false
    }
  }

  const updateStation = async (id: string, stationData: Partial<ChargingStation>) => {
    try {
      loading.value = true
      error.value = null

      const response = await stationsAPI.update(id, stationData)
      const index = stations.value.findIndex((s) => s._id === id)
      if (index !== -1) {
        stations.value[index] = response.data.station
      }

      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update station"
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteStation = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await stationsAPI.delete(id)
      stations.value = stations.value.filter((s) => s._id !== id)

      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete station"
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    stations,
    loading,
    error,
    fetchStations,
    createStation,
    updateStation,
    deleteStation,
  }
})
