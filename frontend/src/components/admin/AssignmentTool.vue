<template>
  <div class="assignment-tool">
    <div class="section-header">
      <h2 class="section-title">Assignment Tool</h2>
      <p class="section-subtitle">Assign chess problems to students</p>
    </div>

    <div class="assignment-layout">
      <!-- Left: Student Selection -->
      <div class="selection-panel">
        <h3 class="panel-title">1. Select Students</h3>
        <div class="select-actions">
          <button class="btn-text" @click="selectAllStudents">Select All</button>
          <button class="btn-text" @click="clearStudents">Clear</button>
        </div>
        <div class="selection-list">
          <label
            v-for="student in students"
            :key="student.id"
            class="selection-item"
            :class="{ selected: selectedStudents.includes(student.id) }"
          >
            <input
              type="checkbox"
              :value="student.id"
              v-model="selectedStudents"
              class="checkbox"
            />
            <span class="item-avatar">{{ getInitials(student.name) }}</span>
            <span class="item-name">{{ student.name }}</span>
          </label>
          <div v-if="students.length === 0" class="empty-hint">
            No students enrolled yet
          </div>
        </div>
        <div class="selection-count">
          {{ selectedStudents.length }} selected
        </div>
      </div>

      <!-- Right: Problem Selection -->
      <div class="selection-panel">
        <h3 class="panel-title">2. Select Problems</h3>
        <div class="select-actions">
          <button class="btn-text" @click="selectAllProblems">Select All</button>
          <button class="btn-text" @click="clearProblems">Clear</button>
        </div>
        <div class="selection-list">
          <label
            v-for="problem in problems"
            :key="problem.id"
            class="selection-item problem-item"
            :class="{ selected: selectedProblems.includes(problem.id) }"
          >
            <input
              type="checkbox"
              :value="problem.id"
              v-model="selectedProblems"
              class="checkbox"
            />
            <div class="problem-info">
              <span class="problem-title">{{ problem.title }}</span>
              <span class="problem-difficulty" :data-level="problem.difficulty.toLowerCase()">
                {{ problem.difficulty }}
              </span>
            </div>
          </label>
          <div v-if="problems.length === 0" class="empty-hint">
            No problems available
          </div>
        </div>
        <div class="selection-count">
          {{ selectedProblems.length }} selected
        </div>
      </div>
    </div>

    <!-- Assign Button -->
    <div class="assign-section">
      <button
        class="btn-assign"
        :disabled="!canAssign"
        @click="handleAssign"
      >
        <span class="btn-icon">📋</span>
        Assign {{ selectedProblems.length }} Problem{{ selectedProblems.length !== 1 ? 's' : '' }} 
        to {{ selectedStudents.length }} Student{{ selectedStudents.length !== 1 ? 's' : '' }}
      </button>
    </div>

    <!-- Recent Assignments -->
    <div v-if="assignments.length > 0" class="recent-assignments">
      <h3 class="panel-title">Recent Assignments</h3>
      <div class="assignments-list">
        <div
          v-for="assignment in recentAssignments"
          :key="assignment.id"
          class="assignment-card"
        >
          <div class="assignment-meta">
            <span class="assignment-date">{{ formatDate(assignment.assignedAt) }}</span>
            <span class="assignment-status" :data-status="assignment.status">
              {{ assignment.status }}
            </span>
          </div>
          <div class="assignment-details">
            <span>{{ assignment.problemIds.length }} problems → {{ assignment.studentIds.length }} students</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="showSuccess" class="success-toast">
      ✓ Assignment created successfully!
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  students: {
    type: Array,
    default: () => []
  },
  problems: {
    type: Array,
    default: () => []
  },
  assignments: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['assign'])

const selectedStudents = ref([])
const selectedProblems = ref([])
const showSuccess = ref(false)

const canAssign = computed(() => {
  return selectedStudents.value.length > 0 && selectedProblems.value.length > 0
})

const recentAssignments = computed(() => {
  return [...props.assignments]
    .sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt))
    .slice(0, 5)
})

function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleString()
  } catch {
    return dateStr
  }
}

function selectAllStudents() {
  selectedStudents.value = props.students.map(s => s.id)
}

function clearStudents() {
  selectedStudents.value = []
}

function selectAllProblems() {
  selectedProblems.value = props.problems.map(p => p.id)
}

function clearProblems() {
  selectedProblems.value = []
}

function handleAssign() {
  if (!canAssign.value) return
  emit('assign', {
    studentIds: [...selectedStudents.value],
    problemIds: [...selectedProblems.value]
  })
  // Clear selections after assign
  selectedStudents.value = []
  selectedProblems.value = []
  // Show success
  showSuccess.value = true
  setTimeout(() => { showSuccess.value = false }, 3000)
}
</script>

<style scoped>
.assignment-tool {
  max-width: 1000px;
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

.assignment-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.selection-panel {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.panel-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #333;
}

.select-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.btn-text {
  background: none;
  border: none;
  color: rgb(115, 149, 82);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.btn-text:hover {
  text-decoration: underline;
}

.selection-list {
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 8px;
}

.selection-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s;
}

.selection-item:last-child {
  border-bottom: none;
}

.selection-item:hover {
  background: #fafafa;
}

.selection-item.selected {
  background: rgba(115, 149, 82, 0.08);
}

.checkbox {
  width: 18px;
  height: 18px;
  accent-color: rgb(115, 149, 82);
}

.item-avatar {
  width: 32px;
  height: 32px;
  background: rgb(115, 149, 82);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
}

.problem-item {
  flex-direction: row;
}

.problem-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.problem-title {
  font-size: 14px;
  font-weight: 500;
}

.problem-difficulty {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  display: inline-block;
  width: fit-content;
}

.problem-difficulty[data-level="easy"] {
  background: #d1fae5;
  color: #065f46;
}

.problem-difficulty[data-level="medium"] {
  background: #fef3c7;
  color: #92400e;
}

.problem-difficulty[data-level="hard"] {
  background: #fee2e2;
  color: #991b1b;
}

.empty-hint {
  padding: 32px;
  text-align: center;
  color: #888;
}

.selection-count {
  margin-top: 12px;
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.assign-section {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.btn-assign {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: rgb(115, 149, 82);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-assign:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(115, 149, 82, 0.3);
}

.btn-assign:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 20px;
}

.recent-assignments {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.assignments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.assignment-card {
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.assignment-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.assignment-date {
  font-size: 12px;
  color: #666;
}

.assignment-status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
}

.assignment-status[data-status="pending"] {
  background: #fef3c7;
  color: #92400e;
}

.assignment-status[data-status="completed"] {
  background: #d1fae5;
  color: #065f46;
}

.assignment-details {
  font-size: 14px;
  color: #333;
}

.success-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(115, 149, 82);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  z-index: 2000;
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
  .assignment-layout {
    grid-template-columns: 1fr;
  }
}
</style>
