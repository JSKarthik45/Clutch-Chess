<template>
  <ProtectedRoute requiredRole="admin">
    <div class="admin-dashboard">
      <!-- Top Navigation -->
      <header class="dashboard-topnav">
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
          <span class="user-role">Admin</span>
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
        <!-- Academy Profile Section -->
        <section v-if="activeTab === 'academy'" class="dashboard-section">
          <AcademyProfile 
            :academy="academy" 
            @save="handleSaveAcademy"
          />
        </section>

        <!-- Student Management Section -->
        <section v-if="activeTab === 'students'" class="dashboard-section">
          <StudentManagement
            :students="students"
            :academyId="academy.id"
            @add-student="handleAddStudent"
            @remove-student="handleRemoveStudent"
          />
        </section>

        <!-- Assignment Tool Section -->
        <section v-if="activeTab === 'assignments'" class="dashboard-section">
          <AssignmentTool
            :students="students"
            :problems="problems"
            :assignments="assignments"
            @assign="handleAssign"
          />
        </section>

        <!-- Users Overview (existing functionality) -->
        <section v-if="activeTab === 'users'" class="dashboard-section">
          <div class="section-header">
            <h2 class="section-title">User Management</h2>
          </div>
          <div class="controls-row">
            <FieldSelector v-model="selectedFields" :fields="allFields" />
            <PaginationControls
              class="controls-right"
              v-model:limit="limit"
              v-model:page="page"
            />
          </div>
          <UsersTable :rows="userRows" :columns="selectedFields" :limit="limit" />
        </section>
      </main>

      <!-- Right Sidebar -->
      <AdminRightSidebar class="dashboard-sidebar" />
    </div>
  </ProtectedRoute>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import ProtectedRoute from '../ProtectedRoute.vue'
import AdminRightSidebar from './AdminRightSidebar.vue'
import FieldSelector from './FieldSelector.vue'
import PaginationControls from './PaginationControls.vue'
import UsersTable from './UsersTable.vue'
import AcademyProfile from './AcademyProfile.vue'
import StudentManagement from './StudentManagement.vue'
import AssignmentTool from './AssignmentTool.vue'

const { getStoredSession } = useAuth()

const storedSession = computed(() => getStoredSession())

// Tab navigation
const tabs = [
  { key: 'academy', label: 'Academy Profile', icon: '🏫' },
  { key: 'students', label: 'Students', icon: '👥' },
  { key: 'assignments', label: 'Assignments', icon: '📋' },
  { key: 'users', label: 'Users', icon: '👤' },
]
const activeTab = ref('academy')

// Academy state
const academy = ref({
  id: 'academy-1',
  name: '',
  location: '',
  description: '',
  contact: '',
})

// Students state
const students = ref([
  { id: 's1', name: 'Alice Chen', email: 'alice@example.com', enrolledAt: '2024-01-15' },
  { id: 's2', name: 'Bob Smith', email: 'bob@example.com', enrolledAt: '2024-02-20' },
  { id: 's3', name: 'Carol Davis', email: 'carol@example.com', enrolledAt: '2024-03-10' },
])

// Chess problems library
const problems = ref([
  { id: 'p1', title: 'Mate in 2 - Beginner', difficulty: 'Easy', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4' },
  { id: 'p2', title: 'Fork Tactic', difficulty: 'Medium', fen: '8/8/8/8/3N4/8/8/k1K5 w - - 0 1' },
  { id: 'p3', title: 'Pin and Win', difficulty: 'Medium', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3' },
  { id: 'p4', title: 'Endgame Study', difficulty: 'Hard', fen: '8/8/8/8/8/4K3/4P3/4k3 w - - 0 1' },
])

// Assignments state
const assignments = ref([])

// Users table state (existing)
const allFields = ['id', 'name', 'email', 'role', 'status', 'created_at']
const selectedFields = ref(['id', 'name', 'email', 'role'])
const limit = ref(10)
const page = ref(0)

const userRows = ref([
  { id: 1, name: 'Ava', email: 'ava@example.com', role: 'Admin', status: 'Active', created_at: '2024-01-02' },
  { id: 2, name: 'Ben', email: 'ben@example.com', role: 'Coach', status: 'Active', created_at: '2024-02-14' },
  { id: 3, name: 'Cara', email: 'cara@example.com', role: 'Student', status: 'Inactive', created_at: '2024-03-03' },
])

// Handlers
function handleSaveAcademy(data) {
  academy.value = { ...academy.value, ...data }
  // TODO: Save to Supabase
  console.log('Academy saved:', academy.value)
}

function handleAddStudent(student) {
  students.value.push({
    ...student,
    id: `s${Date.now()}`,
    enrolledAt: new Date().toISOString().split('T')[0]
  })
}

function handleRemoveStudent(studentId) {
  students.value = students.value.filter(s => s.id !== studentId)
}

function handleAssign({ studentIds, problemIds }) {
  const newAssignment = {
    id: `a${Date.now()}`,
    studentIds,
    problemIds,
    assignedAt: new Date().toISOString(),
    status: 'pending'
  }
  assignments.value.push(newAssignment)
  console.log('Assignment created:', newAssignment)
}

onMounted(() => {
  // TODO: Fetch academy, students, assignments from Supabase
})
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9fafb;
  padding-right: 56px; /* sidebar width */
}

.dashboard-topnav {
  position: fixed;
  top: 0;
  left: 0;
  right: 56px;
  z-index: 1000;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid rgb(115, 149, 82);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-role {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: rgb(115, 149, 82);
  padding: 4px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  flex: 1;
}

.dashboard-section {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 800;
  color: #111;
  margin: 0;
}

.controls-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.controls-right {
  margin-left: auto;
}

.dashboard-sidebar {
  position: fixed;
  right: 0;
  top: 0;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding-right: 0;
  }

  .dashboard-topnav {
    right: 0;
    flex-direction: column;
    height: auto;
    padding: 8px;
  }

  .nav-tabs {
    width: 100%;
    overflow-x: auto;
  }

  .nav-tab {
    padding: 8px 12px;
    font-size: 12px;
  }

  .tab-label {
    display: none;
  }

  .dashboard-sidebar {
    display: none;
  }

  .dashboard-main {
    margin-top: 100px;
    padding: 16px;
  }
}
</style>
