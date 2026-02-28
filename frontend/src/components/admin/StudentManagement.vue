<template>
  <div class="student-management">
    <div class="section-header">
      <h2 class="section-title">Student Management</h2>
      <p class="section-subtitle">Add and manage enrolled students</p>
    </div>

    <!-- Add Student Form -->
    <div class="add-student-card">
      <h3 class="card-title">Add New Student</h3>
      <form class="add-form" @submit.prevent="handleAddStudent">
        <div class="form-row">
          <div class="form-group">
            <label for="student-name" class="form-label">Name</label>
            <input
              id="student-name"
              v-model="newStudent.name"
              type="text"
              class="form-input"
              placeholder="Student name"
              required
            />
          </div>
          <div class="form-group">
            <label for="student-email" class="form-label">Email</label>
            <input
              id="student-email"
              v-model="newStudent.email"
              type="email"
              class="form-input"
              placeholder="student@example.com"
              required
            />
          </div>
          <button type="submit" class="btn-add" :disabled="!canAdd">
            <span class="btn-icon">+</span>
            Add Student
          </button>
        </div>
      </form>
    </div>

    <!-- Search and Filter -->
    <div class="controls-bar">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search students..."
        />
      </div>
      <div class="stats">
        <span class="stat-badge">{{ filteredStudents.length }} students</span>
      </div>
    </div>

    <!-- Students List -->
    <div class="students-list">
      <div v-if="filteredStudents.length === 0" class="empty-state">
        <span class="empty-icon">👥</span>
        <p>No students found</p>
      </div>

      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="student-card"
      >
        <div class="student-avatar">
          {{ getInitials(student.name) }}
        </div>
        <div class="student-info">
          <h4 class="student-name">{{ student.name }}</h4>
          <p class="student-email">{{ student.email }}</p>
          <span class="student-date">Enrolled: {{ formatDate(student.enrolledAt) }}</span>
        </div>
        <div class="student-actions">
          <button
            class="btn-action btn-remove"
            @click="confirmRemove(student)"
            title="Remove student"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Remove Modal -->
    <div v-if="studentToRemove" class="modal-overlay" @click.self="studentToRemove = null">
      <div class="modal-content">
        <h3 class="modal-title">Remove Student</h3>
        <p class="modal-text">
          Are you sure you want to remove <strong>{{ studentToRemove.name }}</strong> from the academy?
        </p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="studentToRemove = null">Cancel</button>
          <button class="btn-confirm" @click="handleRemove">Remove</button>
        </div>
      </div>
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
  academyId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['add-student', 'remove-student'])

const newStudent = ref({ name: '', email: '' })
const searchQuery = ref('')
const studentToRemove = ref(null)

const canAdd = computed(() => {
  return newStudent.value.name.trim() && newStudent.value.email.trim()
})

const filteredStudents = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return props.students
  return props.students.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.email.toLowerCase().includes(query)
  )
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
    return new Date(dateStr).toLocaleDateString()
  } catch {
    return dateStr
  }
}

function handleAddStudent() {
  if (!canAdd.value) return
  emit('add-student', {
    name: newStudent.value.name.trim(),
    email: newStudent.value.email.trim(),
    academyId: props.academyId
  })
  newStudent.value = { name: '', email: '' }
}

function confirmRemove(student) {
  studentToRemove.value = student
}

function handleRemove() {
  if (studentToRemove.value) {
    emit('remove-student', studentToRemove.value.id)
    studentToRemove.value = null
  }
}
</script>

<style scoped>
.student-management {
  max-width: 900px;
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

.add-student-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px;
}

.add-form .form-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.form-group {
  flex: 1;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: rgb(115, 149, 82);
  box-shadow: 0 0 0 3px rgba(115, 149, 82, 0.15);
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: rgb(115, 149, 82);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-add:hover:not(:disabled) {
  filter: brightness(0.95);
}

.btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 18px;
  font-weight: 700;
}

.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
  width: 280px;
}

.search-icon {
  font-size: 14px;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
}

.stat-badge {
  background: rgba(115, 149, 82, 0.1);
  color: rgb(54, 70, 39);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.students-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: #888;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 8px;
}

.student-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;
}

.student-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.student-avatar {
  width: 48px;
  height: 48px;
  background: rgb(115, 149, 82);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

.student-info {
  flex: 1;
}

.student-name {
  font-size: 16px;
  font-weight: 600;
  color: #111;
  margin: 0 0 2px;
}

.student-email {
  font-size: 14px;
  color: #555;
  margin: 0 0 4px;
}

.student-date {
  font-size: 12px;
  color: #888;
}

.student-actions {
  display: flex;
  gap: 8px;
}

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-remove {
  background: #fee2e2;
  color: #dc2626;
}

.btn-remove:hover {
  background: #fecaca;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px;
}

.modal-text {
  color: #555;
  margin: 0 0 20px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel {
  background: #f3f4f6;
  border: none;
  color: #333;
}

.btn-confirm {
  background: #dc2626;
  border: none;
  color: #fff;
}

.btn-confirm:hover {
  background: #b91c1c;
}

@media (max-width: 600px) {
  .add-form .form-row {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }

  .controls-bar {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
}
</style>
