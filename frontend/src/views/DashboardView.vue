<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Charging Stations Dashboard</h1>
        <button
          @click="showAddForm = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Station
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <h3 class="text-lg font-medium mb-4">Filters</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            v-model="filters.status"
            @change="applyFilters"
            class="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          
          <select
            v-model="filters.connectorType"
            @change="applyFilters"
            class="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Connectors</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="Tesla Supercharger">Tesla Supercharger</option>
          </select>
          
          <input
            v-model.number="filters.minPower"
            @input="applyFilters"
            type="number"
            placeholder="Min Power (kW)"
            class="border border-gray-300 rounded-md px-3 py-2"
          />
          
          <input
            v-model.number="filters.maxPower"
            @input="applyFilters"
            type="number"
            placeholder="Max Power (kW)"
            class="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      <!-- Stations Grid -->
      <div v-if="stationsStore.loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading stations...</p>
      </div>

      <div v-else-if="stationsStore.error" class="text-center py-8 text-red-600">
        {{ stationsStore.error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="station in stationsStore.stations"
          :key="station._id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ station.name }}</h3>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                station.status === 'Active' ? 'bg-green-100 text-green-800' :
                station.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              ]"
            >
              {{ station.status }}
            </span>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <p><strong>Location:</strong> {{ station.location.latitude }}, {{ station.location.longitude }}</p>
            <p><strong>Power Output:</strong> {{ station.powerOutput }} kW</p>
            <p><strong>Connector:</strong> {{ station.connectorType }}</p>
            <p><strong>Created by:</strong> {{ station.createdBy.name }}</p>
          </div>
          
          <div class="mt-4 flex space-x-2">
            <button
              @click="editStation(station)"
              class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              @click="deleteStation(station._id)"
              class="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Station Modal -->
      <div
        v-if="showAddForm || editingStation"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click="closeModal"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
          @click.stop
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            {{ editingStation ? 'Edit Station' : 'Add New Station' }}
          </h3>
          
          <form @submit.prevent="submitForm" class="space-y-4">
            <input
              v-model="stationForm.name"
              type="text"
              placeholder="Station Name"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            
            <div class="grid grid-cols-2 gap-2">
              <input
                v-model.number="stationForm.location.latitude"
                type="number"
                step="any"
                placeholder="Latitude"
                required
                class="border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                v-model.number="stationForm.location.longitude"
                type="number"
                step="any"
                placeholder="Longitude"
                required
                class="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <input
              v-model="stationForm.location.address"
              type="text"
              placeholder="Address (optional)"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            
            <select
              v-model="stationForm.status"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            
            <input
              v-model.number="stationForm.powerOutput"
              type="number"
              placeholder="Power Output (kW)"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            
            <select
              v-model="stationForm.connectorType"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Connector Type</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="CCS">CCS</option>
              <option value="CHAdeMO">CHAdeMO</option>
              <option value="Tesla Supercharger">Tesla Supercharger</option>
            </select>
            
            <div class="flex space-x-2">
              <button
                type="submit"
                :disabled="stationsStore.loading"
                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {{ stationsStore.loading ? 'Saving...' : (editingStation ? 'Update' : 'Create') }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { PlusIcon } from 'lucide-vue-next'
import { useChargingStationsStore } from '../stores/chargingStations'
import type { ChargingStation, StationFilters } from '../types'

const stationsStore = useChargingStationsStore()

const showAddForm = ref(false)
const editingStation = ref<ChargingStation | null>(null)

const filters = reactive<StationFilters>({
  status: '',
  connectorType: '',
  minPower: undefined,
  maxPower: undefined
})

const stationForm = reactive({
  name: '',
  location: {
    latitude: 0,
    longitude: 0,
    address: ''
  },
  status: '',
  powerOutput: 0,
  connectorType: ''
})

const resetForm = () => {
  stationForm.name = ''
  stationForm.location.latitude = 0
  stationForm.location.longitude = 0
  stationForm.location.address = ''
  stationForm.status = ''
  stationForm.powerOutput = 0
  stationForm.connectorType = ''
}

const closeModal = () => {
  showAddForm.value = false
  editingStation.value = null
  resetForm()
}

const editStation = (station: ChargingStation) => {
  editingStation.value = station
  stationForm.name = station.name
  stationForm.location.latitude = station.location.latitude
  stationForm.location.longitude = station.location.longitude
  stationForm.location.address = station.location.address || ''
  stationForm.status = station.status
  stationForm.powerOutput = station.powerOutput
  stationForm.connectorType = station.connectorType
}

const submitForm = async () => {
  let success = false
  
  if (editingStation.value) {
    success = await stationsStore.updateStation(editingStation.value._id, stationForm)
  } else {
    success = await stationsStore.createStation(stationForm)
  }
  
  if (success) {
    closeModal()
  }
}

const deleteStation = async (id: string) => {
  if (confirm('Are you sure you want to delete this station?')) {
    await stationsStore.deleteStation(id)
  }
}

const applyFilters = () => {
  const activeFilters: StationFilters = {}
  
  if (filters.status) activeFilters.status = filters.status
  if (filters.connectorType) activeFilters.connectorType = filters.connectorType
  if (filters.minPower) activeFilters.minPower = filters.minPower
  if (filters.maxPower) activeFilters.maxPower = filters.maxPower
  
  stationsStore.fetchStations(activeFilters)
}

onMounted(() => {
  stationsStore.fetchStations()
})
</script>
