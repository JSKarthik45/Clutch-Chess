<template>
  <div class="my-academy">
    <div class="section-header">
      <h2 class="section-title">My Academy</h2>
      <p class="section-subtitle">Your enrolled chess academy</p>
    </div>

    <div v-if="!academy || !academy.name" class="empty-state">
      <span class="empty-icon">🏫</span>
      <h3 class="empty-title">Not Enrolled Yet</h3>
      <p class="empty-text">You haven't been enrolled in any academy yet.</p>
      <RouterLink to="/find" class="btn-find">Find an Academy</RouterLink>
    </div>

    <div v-else class="academy-card">
      <div class="card-banner">
        <span class="banner-icon">♟</span>
      </div>

      <div class="card-content">
        <div class="card-header">
          <h3 class="academy-name">{{ academy.name }}</h3>
          <span class="enrolled-badge">Enrolled</span>
        </div>

        <div class="academy-location">
          <span class="location-icon">📍</span>
          {{ academy.location }}
        </div>

        <p class="academy-description">{{ academy.description }}</p>

        <div class="academy-details">
          <div class="detail-item" v-if="academy.coachName">
            <span class="detail-icon">👨‍🏫</span>
            <div class="detail-content">
              <span class="detail-label">Coach</span>
              <span class="detail-value">{{ academy.coachName }}</span>
            </div>
          </div>

          <div class="detail-item" v-if="academy.contact">
            <span class="detail-icon">📧</span>
            <div class="detail-content">
              <span class="detail-label">Contact</span>
              <span class="detail-value">{{ academy.contact }}</span>
            </div>
          </div>

          <div class="detail-item" v-if="academy.enrolledAt">
            <span class="detail-icon">📅</span>
            <div class="detail-content">
              <span class="detail-label">Enrolled Since</span>
              <span class="detail-value">{{ formatDate(academy.enrolledAt) }}</span>
            </div>
          </div>
        </div>

        <div class="card-actions">
          <a 
            v-if="academy.website" 
            :href="academy.website" 
            target="_blank" 
            class="btn-secondary"
          >
            <span class="btn-icon">🔗</span>
            Visit Website
          </a>
          <RouterLink to="/app" class="btn-primary">
            <span class="btn-icon">♟</span>
            Start Playing
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  academy: {
    type: Object,
    default: null
  }
})

function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.my-academy {
  max-width: 700px;
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

.empty-state {
  text-align: center;
  padding: 48px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  margin: 0 0 24px;
}

.btn-find {
  display: inline-block;
  background: rgb(115, 149, 82);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

.btn-find:hover {
  filter: brightness(0.95);
}

.academy-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-banner {
  height: 100px;
  background: linear-gradient(135deg, rgb(115, 149, 82), rgb(85, 119, 52));
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-icon {
  font-size: 48px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.card-content {
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.academy-name {
  font-size: 22px;
  font-weight: 800;
  color: #111;
  margin: 0;
}

.enrolled-badge {
  background: rgba(115, 149, 82, 0.15);
  color: rgb(54, 70, 39);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.academy-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

.location-icon {
  font-size: 14px;
}

.academy-description {
  color: #444;
  line-height: 1.6;
  margin: 0 0 24px;
}

.academy-details {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-icon {
  font-size: 20px;
  width: 32px;
  text-align: center;
}

.detail-content {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: rgb(115, 149, 82);
  color: #fff;
  flex: 1;
  justify-content: center;
}

.btn-primary:hover {
  filter: brightness(0.95);
}

.btn-secondary {
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #f5f5f5;
}

.btn-icon {
  font-size: 16px;
}

@media (max-width: 600px) {
  .card-header {
    flex-direction: column;
    gap: 8px;
  }

  .card-actions {
    flex-direction: column;
  }

  .btn-secondary {
    justify-content: center;
  }
}
</style>
