<template>
  <div class="user-assignments">
    <div class="section-header">
      <h2 class="section-title">My Assignments</h2>
      <p class="section-subtitle">Chess problems assigned by your coach</p>
    </div>

    <!-- Filters -->
    <div class="filter-bar">
      <button
        v-for="filter in filters"
        :key="filter.key"
        class="filter-btn"
        :class="{ active: activeFilter === filter.key }"
        @click="activeFilter = filter.key"
      >
        {{ filter.label }}
        <span class="filter-count">{{ getCount(filter.key) }}</span>
      </button>
    </div>

    <!-- Assignments List -->
    <div v-if="filteredAssignments.length === 0" class="empty-state">
      <span class="empty-icon">📋</span>
      <p>No {{ activeFilter === 'all' ? '' : activeFilter }} assignments</p>
    </div>

    <div class="assignments-list">
      <div
        v-for="assignment in filteredAssignments"
        :key="assignment.id"
        class="assignment-card"
        :class="{ completed: assignment.status === 'completed' }"
      >
        <div class="card-status">
          <span
            class="status-badge"
            :data-status="assignment.status"
          >
            {{ assignment.status === 'completed' ? '✓ Completed' : '○ Pending' }}
          </span>
        </div>

        <div class="card-main">
          <div class="problem-header">
            <h3 class="problem-title">{{ assignment.problem.title }}</h3>
            <span
              class="difficulty-badge"
              :data-level="assignment.problem.difficulty.toLowerCase()"
            >
              {{ assignment.problem.difficulty }}
            </span>
          </div>

          <p class="problem-description">{{ assignment.problem.description }}</p>

          <div class="card-meta">
            <span class="meta-item">
              <span class="meta-icon">📅</span>
              Assigned: {{ formatDate(assignment.assignedAt) }}
            </span>
            <span v-if="assignment.dueDate" class="meta-item" :class="{ overdue: isOverdue(assignment) }">
              <span class="meta-icon">⏰</span>
              Due: {{ formatDate(assignment.dueDate) }}
            </span>
            <span v-if="assignment.completedAt" class="meta-item completed-at">
              <span class="meta-icon">✓</span>
              Completed: {{ formatDate(assignment.completedAt) }}
            </span>
          </div>
        </div>

        <div class="card-actions">
          <RouterLink
            :to="`/app/practice?fen=${encodeURIComponent(assignment.problem.fen)}`"
            class="btn-practice"
          >
            <span v-if="assignment.status === 'completed'">Review</span>
            <span v-else>Solve</span>
            <span class="btn-arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  assignments: {
    type: Array,
    default: () => []
  }
})

const filters = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
]

const activeFilter = ref('all')

const filteredAssignments = computed(() => {
  if (activeFilter.value === 'all') return props.assignments
  return props.assignments.filter(a => a.status === activeFilter.value)
})

function getCount(filterKey) {
  if (filterKey === 'all') return props.assignments.length
  return props.assignments.filter(a => a.status === filterKey).length
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

function isOverdue(assignment) {
  if (assignment.status === 'completed') return false
  if (!assignment.dueDate) return false
  return new Date(assignment.dueDate) < new Date()
}
</script>

<style scoped>
.user-assignments {
  max-width: 800px;
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

.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: rgb(115, 149, 82);
}

.filter-btn.active {
  background: rgb(115, 149, 82);
  border-color: rgb(115, 149, 82);
  color: #fff;
}

.filter-count {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
}

.filter-btn.active .filter-count {
  background: rgba(255, 255, 255, 0.25);
}

.empty-state {
  text-align: center;
  padding: 48px;
  background: #fff;
  border-radius: 12px;
  color: #888;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 8px;
}

.assignments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.assignment-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
}

.assignment-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.assignment-card.completed {
  opacity: 0.85;
}

.card-status {
  padding: 12px 16px 0;
}

.status-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
}

.status-badge[data-status="pending"] {
  background: #fef3c7;
  color: #92400e;
}

.status-badge[data-status="completed"] {
  background: #d1fae5;
  color: #065f46;
}

.card-main {
  padding: 12px 16px;
  flex: 1;
}

.problem-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.problem-title {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.difficulty-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  flex-shrink: 0;
}

.difficulty-badge[data-level="easy"] {
  background: #d1fae5;
  color: #065f46;
}

.difficulty-badge[data-level="medium"] {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-badge[data-level="hard"] {
  background: #fee2e2;
  color: #991b1b;
}

.problem-description {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 12px;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
}

.meta-item.overdue {
  color: #dc2626;
  font-weight: 600;
}

.meta-item.completed-at {
  color: rgb(54, 70, 39);
}

.meta-icon {
  font-size: 14px;
}

.card-actions {
  padding: 12px 16px;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
}

.btn-practice {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgb(115, 149, 82);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-practice:hover {
  filter: brightness(0.95);
}

.btn-arrow {
  font-size: 16px;
}

@media (max-width: 600px) {
  .filter-bar {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }

  .problem-header {
    flex-direction: column;
    gap: 8px;
  }

  .card-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
