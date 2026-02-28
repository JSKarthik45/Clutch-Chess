<template>
  <ProtectedRoute requiredRole="any">
    <section class="find-academy">
      <div class="container">
        <!-- Header -->
        <header class="page-header">
          <h1 class="page-title">Find an Academy</h1>
          <p class="page-subtitle">Discover chess academies and join one to start your learning journey</p>
        </header>

        <!-- Search and Filters -->
        <div class="controls-bar">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Search by name or description..."
              @input="handleSearch"
            />
            <button
              v-if="searchQuery"
              class="clear-btn"
              @click="searchQuery = ''"
              aria-label="Clear search"
            >
              ✕
            </button>
          </div>

          <div class="filter-controls">
            <!-- Location Filter -->
            <div class="filter-dropdown">
              <label class="filter-label">Location</label>
              <select v-model="selectedLocation" class="filter-select">
                <option value="">All Locations</option>
                <option v-for="loc in uniqueLocations" :key="loc" :value="loc">
                  {{ loc }}
                </option>
              </select>
            </div>

            <!-- Sort -->
            <div class="filter-dropdown">
              <label class="filter-label">Sort by</label>
              <select v-model="sortBy" class="filter-select">
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="location-asc">Location (A-Z)</option>
                <option value="students-desc">Most Students</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results Count -->
        <div class="results-info">
          <span class="results-count">{{ filteredAcademies.length }} academies found</span>
          <button
            v-if="hasActiveFilters"
            class="clear-filters-btn"
            @click="clearAllFilters"
          >
            Clear filters
          </button>
        </div>

        <!-- Academy Cards Grid -->
        <div v-if="filteredAcademies.length === 0" class="empty-state">
          <span class="empty-icon">🔍</span>
          <h3 class="empty-title">No academies found</h3>
          <p class="empty-text">Try adjusting your search or filters</p>
        </div>

        <div class="academy-grid">
          <div
            v-for="academy in filteredAcademies"
            :key="academy.id"
            class="academy-card"
          >
            <div class="card-banner" :style="{ background: getBannerGradient(academy.id) }">
              <span class="banner-icon">♟</span>
            </div>

            <div class="card-content">
              <h3 class="academy-name">{{ academy.name }}</h3>
              <div class="academy-location">
                <span class="location-icon">📍</span>
                {{ academy.location }}
              </div>

              <p class="academy-description">{{ truncate(academy.description, 120) }}</p>

              <div class="academy-stats">
                <div class="stat">
                  <span class="stat-value">{{ academy.studentCount }}</span>
                  <span class="stat-label">Students</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ academy.coachCount }}</span>
                  <span class="stat-label">Coaches</span>
                </div>
                <div class="stat" v-if="academy.rating">
                  <span class="stat-value">{{ academy.rating }}</span>
                  <span class="stat-label">Rating</span>
                </div>
              </div>

              <button class="btn-view" @click="viewAcademy(academy)">
                View Details
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Academy Detail Modal -->
      <div v-if="selectedAcademy" class="modal-overlay" @click.self="selectedAcademy = null">
        <div class="modal-content">
          <button class="modal-close" @click="selectedAcademy = null">✕</button>

          <div class="modal-banner" :style="{ background: getBannerGradient(selectedAcademy.id) }">
            <span class="banner-icon-lg">♟</span>
          </div>

          <div class="modal-body">
            <h2 class="modal-title">{{ selectedAcademy.name }}</h2>
            <div class="modal-location">
              <span class="location-icon">📍</span>
              {{ selectedAcademy.location }}
            </div>

            <p class="modal-description">{{ selectedAcademy.description }}</p>

            <div class="modal-details">
              <div class="detail-row" v-if="selectedAcademy.contact">
                <span class="detail-icon">📧</span>
                <span>{{ selectedAcademy.contact }}</span>
              </div>
              <div class="detail-row" v-if="selectedAcademy.website">
                <span class="detail-icon">🔗</span>
                <a :href="selectedAcademy.website" target="_blank">{{ selectedAcademy.website }}</a>
              </div>
              <div class="detail-row" v-if="selectedAcademy.coachName">
                <span class="detail-icon">👨‍🏫</span>
                <span>Head Coach: {{ selectedAcademy.coachName }}</span>
              </div>
            </div>

            <div class="modal-stats">
              <div class="stat-card">
                <span class="stat-value-lg">{{ selectedAcademy.studentCount }}</span>
                <span class="stat-label">Students Enrolled</span>
              </div>
              <div class="stat-card">
                <span class="stat-value-lg">{{ selectedAcademy.coachCount }}</span>
                <span class="stat-label">Expert Coaches</span>
              </div>
            </div>

            <button class="btn-request" @click="requestEnrollment(selectedAcademy)">
              Request Enrollment
            </button>
          </div>
        </div>
      </div>

      <!-- Enrollment Request Toast -->
      <div v-if="showEnrollmentToast" class="toast-message">
        ✓ Enrollment request sent to {{ enrollmentAcademyName }}
      </div>
    </section>
  </ProtectedRoute>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProtectedRoute from './ProtectedRoute.vue'

// Search and filter state
const searchQuery = ref('')
const selectedLocation = ref('')
const sortBy = ref('name-asc')

// Modal state
const selectedAcademy = ref(null)

// Toast state
const showEnrollmentToast = ref(false)
const enrollmentAcademyName = ref('')

// Mock academy data - would come from Supabase
const academies = ref([
  {
    id: 'a1',
    name: 'Grandmaster Chess Academy',
    location: 'New York, NY',
    description: 'Premier chess training for all skill levels. Learn from experienced grandmasters and improve your game with personalized instruction and advanced tactics training.',
    contact: 'info@gmchess.com',
    website: 'https://gmchess.example.com',
    coachName: 'GM Alexander Petrov',
    studentCount: 124,
    coachCount: 5,
    rating: 4.9
  },
  {
    id: 'a2',
    name: 'Chess Champions Institute',
    location: 'Los Angeles, CA',
    description: 'Building future champions through systematic training and competitive play. Our students have won multiple national championships.',
    contact: 'enroll@chesschamps.com',
    website: 'https://chesschamps.example.com',
    coachName: 'IM Sarah Johnson',
    studentCount: 89,
    coachCount: 3,
    rating: 4.7
  },
  {
    id: 'a3',
    name: 'Royal Chess School',
    location: 'London, UK',
    description: 'Traditional chess education with a modern twist. We focus on classical openings, strategic thinking, and tournament preparation.',
    contact: 'info@royalchess.co.uk',
    website: 'https://royalchess.example.com',
    coachName: 'FM James Wilson',
    studentCount: 156,
    coachCount: 7,
    rating: 4.8
  },
  {
    id: 'a4',
    name: 'Knight Moves Academy',
    location: 'Chicago, IL',
    description: 'Fun and engaging chess education for children and adults. Learn at your own pace with flexible scheduling options.',
    contact: 'hello@knightmoves.com',
    coachName: 'NM Michael Chen',
    studentCount: 67,
    coachCount: 2,
    rating: 4.6
  },
  {
    id: 'a5',
    name: 'Strategic Minds Chess Club',
    location: 'San Francisco, CA',
    description: 'Where tech meets chess. Innovative training methods using AI analysis and online resources to accelerate learning.',
    contact: 'join@strategicminds.io',
    website: 'https://strategicminds.example.com',
    coachName: 'IM David Kumar',
    studentCount: 203,
    coachCount: 8,
    rating: 4.9
  },
  {
    id: 'a6',
    name: 'Classic Chess Center',
    location: 'Boston, MA',
    description: 'Emphasis on classical chess education and deep positional understanding. Perfect for serious students looking to improve.',
    contact: 'info@classicchess.com',
    coachName: 'FM Robert Lee',
    studentCount: 45,
    coachCount: 2,
    rating: 4.5
  },
  {
    id: 'a7',
    name: 'Mumbai Chess Academy',
    location: 'Mumbai, India',
    description: 'One of India\'s premier chess training centers. We\'ve produced multiple national champions and international masters.',
    contact: 'admin@mumbaichess.in',
    website: 'https://mumbaichess.example.com',
    coachName: 'GM Viswanathan Sharma',
    studentCount: 312,
    coachCount: 12,
    rating: 4.9
  },
  {
    id: 'a8',
    name: 'Berlin Chess Studio',
    location: 'Berlin, Germany',
    description: 'Modern chess training facility in the heart of Berlin. Bilingual instruction in German and English.',
    contact: 'kontakt@berlinchess.de',
    coachName: 'IM Hans Müller',
    studentCount: 78,
    coachCount: 4,
    rating: 4.7
  },
])

// Computed: Unique locations for filter dropdown
const uniqueLocations = computed(() => {
  const locations = academies.value.map(a => a.location)
  return [...new Set(locations)].sort()
})

// Computed: Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedLocation.value
})

// Computed: Filtered and sorted academies using .filter() and .sort()
const filteredAcademies = computed(() => {
  let result = [...academies.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(academy => 
      academy.name.toLowerCase().includes(query) ||
      academy.description.toLowerCase().includes(query) ||
      academy.location.toLowerCase().includes(query)
    )
  }

  // Apply location filter
  if (selectedLocation.value) {
    result = result.filter(academy => academy.location === selectedLocation.value)
  }

  // Apply sorting
  result = result.sort((a, b) => {
    switch (sortBy.value) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'location-asc':
        return a.location.localeCompare(b.location)
      case 'students-desc':
        return b.studentCount - a.studentCount
      default:
        return 0
    }
  })

  return result
})

// Helper functions
function truncate(text, length) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

function getBannerGradient(id) {
  const gradients = [
    'linear-gradient(135deg, rgb(115, 149, 82), rgb(85, 119, 52))',
    'linear-gradient(135deg, #6366f1, #4f46e5)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #ec4899, #be185d)',
    'linear-gradient(135deg, #14b8a6, #0d9488)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  ]
  const index = parseInt(id.replace(/\D/g, '') || '0') % gradients.length
  return gradients[index]
}

function handleSearch() {
  // Debounce could be added here for performance
}

function clearAllFilters() {
  searchQuery.value = ''
  selectedLocation.value = ''
}

function viewAcademy(academy) {
  selectedAcademy.value = academy
}

function requestEnrollment(academy) {
  enrollmentAcademyName.value = academy.name
  selectedAcademy.value = null
  showEnrollmentToast.value = true
  setTimeout(() => {
    showEnrollmentToast.value = false
  }, 3000)
  // TODO: Send enrollment request to Supabase
}
</script>

<style scoped>
.find-academy {
  min-height: 100vh;
  background: #f9fafb;
  padding: 100px 16px 48px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #111;
  margin: 0 0 8px;
}

.page-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.controls-bar {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.search-box {
  flex: 1;
  min-width: 280px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f5;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 14px;
}

.search-icon {
  font-size: 16px;
  color: #888;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
}

.clear-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
}

.filter-controls {
  display: flex;
  gap: 16px;
}

.filter-dropdown {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-select {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  min-width: 150px;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: rgb(115, 149, 82);
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.results-count {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.clear-filters-btn {
  background: none;
  border: none;
  color: rgb(115, 149, 82);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.clear-filters-btn:hover {
  text-decoration: underline;
}

.empty-state {
  text-align: center;
  padding: 64px 24px;
  background: #fff;
  border-radius: 12px;
}

.empty-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin: 0 0 8px;
}

.empty-text {
  color: #666;
  margin: 0;
}

.academy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.academy-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.academy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-banner {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-icon {
  font-size: 36px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.card-content {
  padding: 20px;
}

.academy-name {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin: 0 0 6px;
}

.academy-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 13px;
  margin-bottom: 12px;
}

.location-icon {
  font-size: 13px;
}

.academy-description {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px;
  min-height: 63px;
}

.academy-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: rgb(115, 149, 82);
}

.stat-label {
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
}

.btn-view {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-view:hover {
  background: #333;
}

.btn-arrow {
  font-size: 16px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 16px;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  z-index: 1;
}

.modal-banner {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-icon-lg {
  font-size: 56px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.modal-body {
  padding: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 800;
  color: #111;
  margin: 0 0 8px;
}

.modal-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  margin-bottom: 16px;
}

.modal-description {
  color: #444;
  line-height: 1.6;
  margin: 0 0 20px;
}

.modal-details {
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  color: #555;
  font-size: 14px;
}

.detail-row a {
  color: rgb(115, 149, 82);
  text-decoration: none;
}

.detail-row a:hover {
  text-decoration: underline;
}

.detail-icon {
  font-size: 16px;
  width: 24px;
  text-align: center;
}

.modal-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  text-align: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
}

.stat-value-lg {
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: rgb(115, 149, 82);
}

.btn-request {
  width: 100%;
  padding: 14px;
  background: rgb(115, 149, 82);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;
}

.btn-request:hover {
  filter: brightness(0.95);
}

/* Toast */
.toast-message {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(115, 149, 82);
  color: #fff;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
  z-index: 3000;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  .find-academy {
    padding-top: 80px;
  }

  .page-title {
    font-size: 26px;
  }

  .controls-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: 100%;
  }

  .filter-controls {
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }

  .academy-grid {
    grid-template-columns: 1fr;
  }
}
</style>
