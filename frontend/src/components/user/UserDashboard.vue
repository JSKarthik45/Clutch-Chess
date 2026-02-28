<template>
  <ProtectedRoute requiredRole="user">
    <div class="user-dashboard">
      <!-- Top Navigation -->
      <header class="dashboard-topnav">
        <div class="nav-brand">
          <RouterLink to="/" class="brand-link">
            <span class="brand-icon">♟</span>
            Clutch Chess
          </RouterLink>
        </div>
        <nav class="nav-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="nav-tab"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-label">{{ tab.label }}</span>
          </button>
        </nav>
        <div class="nav-user">
          <RouterLink to="/profile" class="user-avatar-link">
            <img 
              v-if="storedSession?.avatar" 
              :src="storedSession.avatar" 
              alt="Profile" 
              class="user-avatar"
            />
            <span v-else class="user-avatar-placeholder">👤</span>
          </RouterLink>
        </div>
      </header>

      <!-- Main Content -->
      <main class="dashboard-main">
        <!-- My Academy Section -->
        <section v-if="activeTab === 'academy'" class="dashboard-section">
          <MyAcademy :academy="enrolledAcademy" />
        </section>

        <!-- Assignments Section -->
        <section v-if="activeTab === 'assignments'" class="dashboard-section">
          <UserAssignments :assignments="userAssignments" />
        </section>

        <!-- Progress Section -->
        <section v-if="activeTab === 'progress'" class="dashboard-section">
          <div class="section-header">
            <h2 class="section-title">My Progress</h2>
            <p class="section-subtitle">Track your chess learning journey</p>
          </div>
          <div class="progress-cards">
            <div class="stat-card">
              <span class="stat-icon">📝</span>
              <div class="stat-value">{{ completedCount }}</div>
              <div class="stat-label">Problems Solved</div>
            </div>
            <div class="stat-card">
              <span class="stat-icon">🎯</span>
              <div class="stat-value">{{ pendingCount }}</div>
              <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card">
              <span class="stat-icon">🏆</span>
              <div class="stat-value">{{ streakDays }}</div>
              <div class="stat-label">Day Streak</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </ProtectedRoute>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import ProtectedRoute from '../ProtectedRoute.vue'
import MyAcademy from './MyAcademy.vue'
import UserAssignments from './UserAssignments.vue'

const { getStoredSession } = useAuth()

const storedSession = computed(() => getStoredSession())

// Tab navigation
const tabs = [
  { key: 'academy', label: 'My Academy', icon: '🏫' },
  { key: 'assignments', label: 'Assignments', icon: '📋' },
  { key: 'progress', label: 'Progress', icon: '📈' },
]
const activeTab = ref('academy')

// Mock data - would be fetched from Supabase
const enrolledAcademy = ref({
  id: 'academy-1',
  name: 'Grandmaster Chess Academy',
  location: 'New York, NY',
  description: 'Premier chess training for all skill levels. Learn from experienced coaches and improve your game with personalized instruction.',
  contact: 'info@gmchess.com',
  website: 'https://gmchess.example.com',
  coachName: 'GM Alexander Petrov',
  enrolledAt: '2024-01-15',
})

const userAssignments = ref([
  {
    id: 'a1',
    problem: {
      id: 'p1',
      title: 'Mate in 2 - Beginner',
      difficulty: 'Easy',
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
      description: 'Find the quickest checkmate for White.'
    },
    assignedAt: '2024-03-01T10:00:00Z',
    status: 'pending',
    dueDate: '2024-03-08',
  },
  {
    id: 'a2',
    problem: {
      id: 'p2',
      title: 'Fork Tactic',
      difficulty: 'Medium',
      fen: '8/8/8/8/3N4/8/8/k1K5 w - - 0 1',
      description: 'Use the knight to create a fork and win material.'
    },
    assignedAt: '2024-02-25T14:30:00Z',
    status: 'completed',
    completedAt: '2024-02-27T09:15:00Z',
    dueDate: '2024-03-04',
  },
  {
    id: 'a3',
    problem: {
      id: 'p3',
      title: 'Pin and Win',
      difficulty: 'Medium',
      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
      description: 'Identify and exploit the pin to gain an advantage.'
    },
    assignedAt: '2024-03-02T08:00:00Z',
    status: 'pending',
    dueDate: '2024-03-09',
  },
])

// Progress stats
const completedCount = computed(() => 
  userAssignments.value.filter(a => a.status === 'completed').length
)

const pendingCount = computed(() => 
  userAssignments.value.filter(a => a.status === 'pending').length
)

const streakDays = ref(7) // Mock streak

onMounted(() => {
  // TODO: Fetch user's academy and assignments from Supabase
})
</script>

<style scoped>
.user-dashboard {
  min-height: 100vh;
  background: #f9fafb;
}

.dashboard-topnav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid rgb(115, 149, 82);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.nav-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #111;
  font-weight: 700;
  font-size: 16px;
}

.brand-icon {
  font-size: 20px;
}

.nav-tabs {
  display: flex;
  gap: 4px;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-tab:hover {
  background: #f3f4f6;
  color: #111;
}

.nav-tab.active {
  background: rgb(115, 149, 82);
  color: #fff;
}

.tab-icon {
  font-size: 16px;
}

.nav-user {
  flex-shrink: 0;
}

.user-avatar-link {
  display: block;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgb(115, 149, 82);
}

.user-avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #e5e7eb;
  border-radius: 50%;
  font-size: 18px;
}

.dashboard-main {
  margin-top: 72px;
  padding: 24px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.dashboard-section {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  color: #111;
  margin: 0 0 4px;
}

.section-subtitle {
  color: #666;
  margin: 0;
}

.progress-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 36px;
  font-weight: 800;
  color: rgb(115, 149, 82);
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .dashboard-topnav {
    padding: 0 12px;
  }

  .brand-link span:not(.brand-icon) {
    display: none;
  }

  .nav-tab {
    padding: 8px 12px;
  }

  .tab-label {
    display: none;
  }

  .dashboard-main {
    margin-top: 72px;
    padding: 16px;
  }
}
</style>
