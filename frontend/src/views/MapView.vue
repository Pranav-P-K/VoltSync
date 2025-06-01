<template>
  <div class="h-screen relative overflow-hidden">
    <!-- Dynamic Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <!-- Animated background blobs -->
      <div class="absolute top-10 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-32 -right-8 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Map Container with Glassmorphism -->
    <div class="relative z-10 h-full p-4">
      <div class="h-full bg-black/10 backdrop-blur-lg rounded-3xl border border-black/20 shadow-2xl overflow-hidden">
        <div id="map" class="w-full h-full rounded-3xl"></div>
      </div>
    </div>
    
    <!-- Modern Control Panel -->
    <div class="absolute top-6 left-6 z-50 space-y-4">
      <!-- Station Counter -->
      <div class="bg-black/15 backdrop-blur-lg rounded-2xl p-4 border border-black/20 shadow-xl">
        <div class="flex items-center space-x-3">
          <div class="h-10 w-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-black font-semibold">{{ stationsStore.stations.length }}</p>
            <p class="text-black-300 text-xs">Charging Stations</p>
          </div>
        </div>
      </div>

      <!-- Status Filter -->
      <div class="bg-black/15 backdrop-blur-lg rounded-2xl p-4 border border-black/20 shadow-xl">
        <h4 class="text-black font-medium mb-3 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
          </svg>
          Filter Status
        </h4>
        <div class="space-y-2">
          <button
            v-for="status in ['All', 'Active', 'Inactive', 'Maintenance']"
            :key="status"
            @click="filterByStatus(status)"
            :class="[
              'w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300',
              selectedFilter === status 
                ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-black shadow-lg' 
                : 'text-black-300 hover:text-black hover:bg-black/10'
            ]"
          >
            {{ status }}
          </button>
        </div>
      </div>

      <!-- Legend -->
      <div class="bg-black/15 backdrop-blur-lg rounded-2xl p-4 border border-black/20 shadow-xl">
        <h4 class="text-black font-medium mb-3 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Status Legend
        </h4>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            <span class="text-black-300 text-xs">Active</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
            <span class="text-black-300 text-xs">Inactive</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-orange-500 rounded-full shadow-sm"></div>
            <span class="text-black-300 text-xs">Maintenance</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Station Details Modal -->
    <div
      v-if="selectedStation"
      class="absolute top-6 right-6 bg-black/15 backdrop-blur-lg rounded-3xl shadow-2xl p-6 w-96 z-50 border border-black/20 transform transition-all duration-500"
    >
      <!-- Header with gradient -->
      <div class="flex justify-between items-start mb-6">
        <div class="flex items-center space-x-3">
          <div 
            :class="[
              'h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg',
              selectedStation.status === 'Active' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
              selectedStation.status === 'Inactive' ? 'bg-gradient-to-r from-red-400 to-red-500' :
              'bg-gradient-to-r from-orange-400 to-yellow-500'
            ]"
          >
            <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-black">{{ selectedStation.name }}</h3>
            <p class="text-black-300 text-sm">Charging Station Details</p>
          </div>
        </div>
        <button
          @click="selectedStation = null"
          class="text-black-400 hover:text-black bg-black/10 hover:bg-black/20 rounded-xl p-2 transition-all duration-300"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Status Badge -->
      <div class="mb-6">
        <span
          :class="[
            'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-lg',
            selectedStation.status === 'Active' ? 'bg-gradient-to-r from-green-400/80 to-emerald-500/80 text-black' :
            selectedStation.status === 'Inactive' ? 'bg-gradient-to-r from-red-400/80 to-red-500/80 text-black' :
            'bg-gradient-to-r from-orange-400/80 to-yellow-500/80 text-black'
          ]"
        >
          <div 
            :class="[
              'w-2 h-2 rounded-full mr-2',
              selectedStation.status === 'Active' ? 'bg-green-200' :
              selectedStation.status === 'Inactive' ? 'bg-red-200' :
              'bg-orange-200'
            ]"
          ></div>
          {{ selectedStation.status }}
        </span>
      </div>
      
      <!-- Details Grid -->
      <div class="space-y-4">
        <!-- Power Output -->
        <div class="bg-black/10 rounded-2xl p-4 border border-black/10">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="h-10 w-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
                </svg>
              </div>
              <div>
                <p class="text-black font-medium">Power Output</p>
                <span class="text-2xl font-bold text-black">{{ selectedStation.powerOutput }}</span>
                <span class="text-black-300 text-sm ml-1">kW</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Connector Type -->
        <div class="bg-black/10 rounded-2xl p-4 border border-black/10">
          <div class="flex items-center space-x-3">
            <div class="h-10 w-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <p class="text-black-300 text-sm">Connector Type</p>
              <p class="text-black font-medium">{{ selectedStation.connectorType }}</p>
            </div>
          </div>
        </div>
        
        <!-- Location -->
        <div class="bg-black/10 rounded-2xl p-4 border border-black/10">
          <div class="flex items-start space-x-3">
            <div class="h-10 w-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-black-300 text-sm">Location</p>
              <p class="text-black font-medium text-sm">
                {{ selectedStation.location.latitude.toFixed(4) }}, {{ selectedStation.location.longitude.toFixed(4) }}
              </p>
              <p v-if="selectedStation.location.address" class="text-black-300 text-sm mt-1">
                {{ selectedStation.location.address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Floating Action Button -->
    <div class="absolute bottom-6 right-6 z-50">
      <button 
        @click="centerMapOnUser"
        class="h-14 w-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl text-black hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <svg class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      </button>
    </div>
    
    <!-- Enhanced Loading Overlay -->
    <div
      v-if="stationsStore.loading"
      class="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-black/15 backdrop-blur-lg rounded-3xl p-8 border border-black/20 text-center">
        <div class="relative mb-6">
          <div class="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500 mx-auto"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500 animate-reverse mx-auto"></div>
        </div>
        <p class="text-black font-medium text-lg">Loading charging stations...</p>
        <p class="text-black-300 text-sm mt-2">Discovering nearby charging points</p>
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
const selectedFilter = ref('All')

let map: L.Map | null = null
let markers: L.Marker[] = []
let allStations: ChargingStation[] = []

const initMap = () => {
  // Initialize map centered on a default location
  map = L.map('map', {
    zoomControl: false, // We'll add custom controls
    attributionControl: false
  }).setView([37.7749, -122.4194], 10) // San Francisco

  // Add custom zoom control
  L.control.zoom({
    position: 'bottomleft'
  }).addTo(map)

  // Add tile layer with dark theme
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map)
}

const createCustomMarker = (station: ChargingStation) => {
  const color = getStatusColor(station.status)
  
  const markerHtml = `
    <div class="relative">
      <div class="w-8 h-8 bg-gradient-to-r from-${color}-400 to-${color}-500 rounded-full shadow-lg border-2 border-black flex items-center justify-center">
        <svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute inset-0 w-8 h-8 bg-gradient-to-r from-${color}-400 to-${color}-500 rounded-full blur opacity-50"></div>
    </div>
  `
  
  return L.divIcon({
    html: markerHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: 'custom-marker'
  })
}

const addMarkersToMap = (stations: ChargingStation[] = stationsStore.stations) => {
  if (!map) return

  // Clear existing markers
  markers.forEach(marker => map!.removeLayer(marker))
  markers = []

  // Add markers for each station
  stations.forEach(station => {
    const customIcon = createCustomMarker(station)
    
    const marker = L.marker([station.location.latitude, station.location.longitude], {
      icon: customIcon
    })
      .addTo(map!)
      .bindPopup(`
        <div class="text-center bg-white/95 backdrop-blur-lg rounded-xl p-3 border border-black-200">
          <h4 class="font-bold text-black-800 mb-2">${station.name}</h4>
          <div class="flex items-center justify-center space-x-2 mb-2">
            <span class="px-2 py-1 rounded-full text-xs font-medium ${
              station.status === 'Active' ? 'bg-green-100 text-green-800' :
              station.status === 'Inactive' ? 'bg-red-100 text-red-800' :
              'bg-orange-100 text-orange-800'
            }">${station.status}</span>
          </div>
          <p class="text-sm text-black-600 mb-1">${station.powerOutput} kW • ${station.connectorType}</p>
        </div>
      `, {
        className: 'custom-popup'
      })
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

const filterByStatus = (status: string) => {
  selectedFilter.value = status
  
  if (status === 'All') {
    addMarkersToMap(allStations)
  } else {
    const filteredStations = allStations.filter(station => station.status === status)
    addMarkersToMap(filteredStations)
  }
}

const centerMapOnUser = () => {
  if (navigator.geolocation && map) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      map!.setView([latitude, longitude], 15)
      
      // Add user location marker
      L.marker([latitude, longitude], {
        icon: L.divIcon({
          html: `
            <div class="relative">
              <div class="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full shadow-lg border-2 border-black animate-pulse"></div>
              <div class="absolute inset-0 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur opacity-50"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          className: 'user-location-marker'
        })
      }).addTo(map!).bindPopup('Your Location')
    })
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'green'
    case 'Inactive': return 'red'
    case 'Maintenance': return 'orange'
    default: return 'black'
  }
}

onMounted(async () => {
  initMap()
  await stationsStore.fetchStations()
  allStations = [...stationsStore.stations]
  addMarkersToMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
/* Animations */
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

/* Custom map styles */
:deep(.leaflet-container) {
  background: transparent;
  outline: none;
}

:deep(.leaflet-control-zoom) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.leaflet-control-zoom a) {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: black !important;
  border-radius: 12px !important;
  margin: 2px !important;
  width: 36px !important;
  height: 36px !important;
  line-height: 34px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  transition: all 0.3s ease !important;
}

:deep(.leaflet-control-zoom a:hover) {
  background: rgba(255, 255, 255, 0.25) !important;
  transform: scale(1.1) !important;
}

:deep(.custom-popup .leaflet-popup-content-wrapper) {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 16px !important;
  padding: 0 !important;
}

:deep(.custom-popup .leaflet-popup-tip) {
  background: rgba(255, 255, 255, 0.95) !important;
}

/* Glassmorphism effects */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.bg-black\/10 {
  background-color: rgba(255, 255, 255, 0.1);
}

.bg-black\/15 {
  background-color: rgba(255, 255, 255, 0.15);
}

.border-black\/20 {
  border-color: rgba(255, 255, 255, 0.2);
}

.border-black\/10 {
  border-color: rgba(255, 255, 255, 0.1);
}

/* Smooth animations */
* {
  transition-property: transform, opacity, background-color, border-color, color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
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
</style>