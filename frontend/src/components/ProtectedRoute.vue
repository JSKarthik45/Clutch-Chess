<template>
  <div v-if="loading" class="protected-loading">
    <div class="spinner-border clutch-spinner" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else-if="!isAuthenticated" class="protected-unauthorized">
    <div class="auth-prompt">
      <span class="icon">🔒</span>
      <h2>Authentication Required</h2>
      <p>Please sign in to access this page.</p>
      <RouterLink to="/profile" class="btn-primary-custom">Sign In</RouterLink>
    </div>
  </div>
  <div v-else-if="!hasAccess" class="protected-forbidden">
    <div class="auth-prompt">
      <span class="icon">⛔</span>
      <h2>Access Denied</h2>
      <p>You don't have permission to view this page.</p>
      <RouterLink :to="redirectPath" class="btn-primary-custom">Go to App</RouterLink>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const props = defineProps({
  // Required role to access this route: 'admin', 'user', or 'any'
  requiredRole: {
    type: String,
    default: 'any',
    validator: (v) => ['admin', 'user', 'any'].includes(v)
  }
})

const { user, role, loading, isAuthenticated } = useAuth()

const hasAccess = computed(() => {
  if (props.requiredRole === 'any') return true
  return role.value === props.requiredRole
})

const redirectPath = computed(() => {
  return '/app'
})
</script>

<style scoped>
.protected-loading,
.protected-unauthorized,
.protected-forbidden {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 24px;
}

.clutch-spinner {
  width: 3rem;
  height: 3rem;
  border-width: 0.55rem;
  border-radius: 50%;
  color: rgb(115, 149, 82);
}

.auth-prompt {
  text-align: center;
  max-width: 400px;
}

.auth-prompt .icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.auth-prompt h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111;
}

.auth-prompt p {
  color: #555;
  margin-bottom: 20px;
}

.btn-primary-custom {
  display: inline-block;
  background: rgb(115, 149, 82);
  border: 1px solid rgb(115, 149, 82);
  color: #fff;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: filter 0.2s;
}

.btn-primary-custom:hover {
  filter: brightness(0.95);
}
</style>
