<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Animated background elements -->
    <div class="absolute inset-0">
      <div class="absolute top-10 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div class="absolute top-32 -right-8 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-blob animation-delay-4000"></div>
      <div class="absolute bottom-20 right-32 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-6000"></div>
    </div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%239C92AC fill-opacity=0.1%3E%3Ccircle cx=30 cy=30 r=1.5/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

    <div class="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.5 11.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm5-9h-13c-1.11 0-2 .89-2 2v13c0 1.11.89 2 2 2h13c1.11 0 2-.89 2-2v-13c0-1.11-.89-2-2-2zm-6.5 15.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Charging Stations
            </h1>
            <p class="text-gray-300 text-sm mt-1">Manage your EV charging network</p>
          </div>
        </div>
        
        <button @click="showAddForm = true"
          class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group">
          <PlusIcon class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span class="font-medium">Add Station</span>
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-300 text-sm font-medium">Total Stations</p>
              <p class="text-3xl font-bold text-white mt-1">{{ stationsStore.stations.length }}</p>
            </div>
            <div class="h-12 w-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-300 text-sm font-medium">Active</p>
              <p class="text-3xl font-bold text-white mt-1">{{ stationsStore.stations.filter(s => s.status === 'Active').length }}</p>
            </div>
            <div class="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-300 text-sm font-medium">Maintenance</p>
              <p class="text-3xl font-bold text-white mt-1">{{ stationsStore.stations.filter(s => s.status === 'Maintenance').length }}</p>
            </div>
            <div class="h-12 w-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-300 text-sm font-medium">Avg Power</p>
              <p class="text-3xl font-bold text-white mt-1">
                {{ stationsStore.stations.length > 0 ? Math.round(stationsStore.stations.reduce((sum, s) => sum + s.powerOutput, 0) / stationsStore.stations.length) : 0 }}
                <span class="text-lg text-gray-300">kW</span>
              </p>
            </div>
            <div class="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8 hover:bg-white/15 transition-all duration-300">
        <div class="flex items-center space-x-3 mb-6">
          <div class="h-8 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white">Smart Filters</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-200">Status</label>
            <select v-model="filters.status" @change="applyFilters"
              class="appearance-none w-full px-3 py-3 bg-white/5 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10">
              <option class="bg-gray-800 text-white" value="">All Status</option>
              <option class="bg-gray-800 text-white" value="Active">Active</option>
              <option class="bg-gray-800 text-white" value="Inactive">Inactive</option>
              <option class="bg-gray-800 text-white" value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-200">Connector Type</label>
            <select v-model="filters.connectorType" @change="applyFilters"
              class="appearance-none w-full px-3 py-3 bg-white/5 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10">
              <option class="bg-gray-800 text-white" value="">All Connectors</option>
              <option class="bg-gray-800 text-white" value="Type 1">Type 1</option>
              <option class="bg-gray-800 text-white" value="Type 2">Type 2</option>
              <option class="bg-gray-800 text-white" value="CCS">CCS</option>
              <option class="bg-gray-800 text-white" value="CHAdeMO">CHAdeMO</option>
              <option class="bg-gray-800 text-white" value="Tesla Supercharger">Tesla Supercharger</option>
            </select>
          </div>
                   
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-200">Min Power (kW)</label>
            <input v-model.number="filters.minPower" @input="applyFilters" type="number" placeholder="0"
              class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10" />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-200">Max Power (kW)</label>
            <input v-model.number="filters.maxPower" @input="applyFilters" type="number" placeholder="1000"
              class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10" />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="stationsStore.loading" class="flex flex-col items-center justify-center py-16">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500 animate-reverse"></div>
        </div>
        <p class="mt-6 text-gray-300 text-lg font-medium">Loading stations...</p>
        <p class="text-gray-400 text-sm">Fetching the latest data</p>
      </div>

      <!-- Error State -->
      <div v-else-if="stationsStore.error" class="bg-red-500/10 backdrop-blur-lg border border-red-500/50 rounded-2xl p-8 text-center">
        <div class="h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong</h3>
        <p class="text-red-400">{{ stationsStore.error }}</p>
      </div>

      <!-- Stations Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="station in stationsStore.stations" :key="station._id"
          class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transform hover:scale-[1.02] transition-all duration-300 group">
          
          <!-- Station Header -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center space-x-3">
              <div class="h-10 w-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.5 11.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">{{ station.name }}</h3>
                <p class="text-gray-400 text-sm">{{ station.createdBy.name }}</p>
              </div>
            </div>
            
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300',
              station.status === 'Active' 
                ? 'bg-green-500/20 text-green-300 border-green-500/30' :
              station.status === 'Inactive' 
                ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
            ]">
              {{ station.status }}
            </span>
          </div>

          <!-- Station Details -->
          <div class="space-y-3 mb-6">
            <div class="flex items-center space-x-3 text-gray-300">
              <div class="h-6 w-6 bg-blue-500/20 rounded-md flex items-center justify-center">
                <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span class="text-sm">{{ station.location.latitude }}, {{ station.location.longitude }}</span>
            </div>
            
            <div class="flex items-center space-x-3 text-gray-300">
              <div class="h-6 w-6 bg-purple-500/20 rounded-md flex items-center justify-center">
                <svg class="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
              <span class="text-sm">{{ station.powerOutput }} kW</span>
            </div>
            
            <div class="flex items-center space-x-3 text-gray-300">
              <div class="h-6 w-6 bg-cyan-500/20 rounded-md flex items-center justify-center">
                <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
              </div>
              <span class="text-sm">{{ station.connectorType }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button @click="editStation(station)"
              class="flex-1 bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              <span>Edit</span>
            </button>
            <button @click="deleteStation(station._id)"
              class="flex-1 bg-gradient-to-r from-red-500/80 to-pink-600/80 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Station Modal -->
      <div v-if="showAddForm || editingStation"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" 
        @click="closeModal">
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 w-full max-w-md transform hover:scale-[1.01] transition-all duration-300" @click.stop>
          
          <!-- Modal Header -->
          <div class="flex items-center space-x-3 mb-6">
            <div class="h-10 w-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path v-if="!editingStation" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                <path v-else d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white">
              {{ editingStation ? 'Edit Station' : 'Add New Station' }}
            </h3>
          </div>

          <form @submit.prevent="submitForm" class="space-y-5">
            <!-- Station Name -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-200">Station Name</label>
              <input v-model="stationForm.name" type="text" placeholder="Enter station name" required
                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10" />
            </div>

            <!-- Location -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-200">Location</label>
              <div class="grid grid-cols-2 gap-3">
                <input v-model.number="stationForm.location.latitude" type="number" step="any" placeholder="Latitude" required 
                  class="px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10" />
                <input v-model.number="stationForm.location.longitude" type="number" step="any" placeholder="Longitude" required 
                  class="px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10" />
              </div>
            </div>

            <!-- Address -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-200">Address (Optional)</label>
              <input v-model="stationForm.location.address" type="text" placeholder="Enter address"
                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10" />
            </div>

            <!-- Status and Power Output -->
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-200">Status</label>
                <select v-model="stationForm.status" required 
                  class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10">
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-200">Power (kW)</label>
                <input v-model.number="stationForm.powerOutput" type="number" placeholder="Power" required
                  class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10" />
              </div>
            </div>

            <!-- Connector Type -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-200">Connector Type</label>
              <select v-model="stationForm.connectorType" required
                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/10">
                <option value="">Select Connector</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="CCS">CCS</option>
                <option value="CHAdeMO">CHAdeMO</option>
                <option value="Tesla Supercharger">Tesla Supercharger</option>
              </select>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3 pt-4">
              <button type="submit" :disabled="stationsStore.loading"
                class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 flex items-center justify-center space-x-2">
                <span v-if="stationsStore.loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path v-if="!editingStation" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  <path v-else d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z"/>
                </svg>
                <span>{{ stationsStore.loading ? 'Processing...' : (editingStation ? 'Update Station' : 'Create Station') }}</span>
              </button>
              
              <button type="button" @click="closeModal"
                class="flex-1 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl border border-gray-600 hover:border-gray-500 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                <span>Cancel</span>
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
  status: "Active" as "Active" | "Inactive" | "Maintenance",
  powerOutput: 0,
  connectorType: "Type 1" as "Type 1" | "Type 2" | "CCS" | "CHAdeMO" | "Tesla Supercharger"
})

const resetForm = () => {
  stationForm.name = ''
  stationForm.location.latitude = 0
  stationForm.location.longitude = 0
  stationForm.location.address = ''
  stationForm.status = undefined as any
  stationForm.powerOutput = 0
  stationForm.connectorType = undefined as any
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
  animation: reverse-spin 1s linear infinite;
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

/* Custom scrollbar for webkit browsers */
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

/* Smooth focus transitions */
input:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Hover effects for interactive elements */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-blue-100 {
  color: rgb(219, 234, 254);
}

.group:hover .group-hover\:rotate-90 {
  transform: rotate(90deg);
}
</style>