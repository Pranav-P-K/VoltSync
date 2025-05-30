<template>
  <div class="h-screen relative">
    <div id="map" class="w-full h-full"></div>
    
    <!-- Station Details Modal -->
    <div
      v-if="selectedStation"
      class="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-50"
    >
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold">{{ selectedStation.name }}</h3>
        <button
          @click="selectedStation = null"
          class="text-gray-400 hover:text-gray-600"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>
      
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="font-medium">Status:</span>
          <span
            :class="[
              'px-2 py-1 rounded-full text-xs',
              selectedStation.status === 'Active' ? 'bg-green-100 text-green-800' :
              selectedStation.status === 'Inactive' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            ]"
          >
            {{ selectedStation.status }}
          </span>
        </div>
        
        <div class="flex justify-between">
          <span class="font-medium">Power Output:</span>
          <span>{{ selectedStation.powerOutput }} kW</span>
        </div>
        
        <div class="flex justify-between">
          <span class="font-medium">Connector:</span>
          <span>{{ selectedStation.connectorType }}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="font-medium">Location:</span>
          <span>{{ selectedStation.location.latitude.toFixed(4) }}, {{ selectedStation.location.longitude.toFixed(4) }}</span>
        </div>
        
        <div v-if="selectedStation.location.address" class="flex justify-between">
          <span class="font-medium">Address:</span>
          <span class="text-right">{{ selectedStation.location.address }}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="font-medium">Created by:</span>
          <span>{{ selectedStation.createdBy.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- Loading Overlay -->
    <div
      v-if="stationsStore.loading"
      class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-40"
    >
      <div class="bg-white rounded-lg p-6 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-600">Loading charging stations...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { XIcon } from 'lucide-vue-next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useChargingStationsStore } from '../stores/chargingStations'
import type { ChargingStation } from '../types'

const stationsStore = useChargingStationsStore()
const selectedStation = ref<ChargingStation | null>(null)

let map: L.Map | null = null
let markers: L.Marker[] = []

const initMap = () => {
  // Initialize map centered on a default location
  map = L.map('map').setView([37.7749, -122.4194], 10) // San Francisco

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
}

const addMarkersToMap = () => {
  if (!map) return

  // Clear existing markers
  markers.forEach(marker => map!.removeLayer(marker))
  markers = []

  // Add markers for each station
  stationsStore.stations.forEach(station => {
    const marker = L.marker([station.location.latitude, station.location.longitude])
      .addTo(map!)
      .bindPopup(`
        <div class="text-center">
          <h4 class="font-semibold">${station.name}</h4>
          <p class="text-sm text-gray-600">${station.status} • ${station.powerOutput} kW</p>
          <p class="text-sm text-gray-600">${station.connectorType}</p>
        </div>
      `)
      .on('click', () => {
        selectedStation.value = station
      })

    markers.push(marker)
  })

  // Fit map to show all markers if there are any
  if (markers.length > 0) {
    const group = new L.FeatureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.1))
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'green'
    case 'Inactive': return 'red'
    case 'Maintenance': return 'orange'
    default: return 'gray'
  }
}

onMounted(async () => {
  initMap()
  await stationsStore.fetchStations()
  addMarkersToMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>
