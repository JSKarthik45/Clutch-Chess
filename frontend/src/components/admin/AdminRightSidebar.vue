<template>
  <aside class="admin-sidebar" aria-label="Admin rotated menu">
    <div class="rotated-wrap">
      <RouterLink
        v-for="it in itemsNormalized"
        :key="it.label"
        class="rot-item"
        :to="it.to"
      >
        <span class="rot-label">{{ it.label }}</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
// Derive default items from original navbar component's expected items shape.
// We'll replicate typical labels (e.g., Home, Pricing, Find, App, Play, Practice, Clock) for side nav.
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      'Home',
      'App',
      'Find',
      'Pricing', 
      'Profile'
    ]
  }
})

const routeMap = {
  Home: '/',
  App: '/app',
  Find: '/find',
  Pricing: '/pricing',
  Profile: '/profile',
  Play: '/app/play',
  Practice: '/practice',
  Clock: '/clock',
}

const itemsNormalized = computed(() => {
  return (props.items || []).map((it) => {
    if (typeof it === 'string') return { label: it, to: routeMap[it] || '/' }
    if (it && typeof it === 'object') {
      const label = it.label || String(it.to || '')
      const to = it.to || routeMap[label] || '/'
      return { label, to }
    }
    return { label: String(it), to: '/' }
  })
})
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh; /* full length of the viewport */
  width: 48px; /* fit width to vertical labels */
  min-width: 48px;
  padding: 2px 0; /* minimal padding */
  background: #ffffff;
  border-left: 2px solid rgb(115,149,82);
  border-radius: 0; /* perfect rectangle */
  display: flex;
  align-items: stretch;
  justify-content: center;
  box-shadow: -2px 0 8px rgba(0,0,0,0.04);
}
.rotated-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  align-items: stretch;
  justify-content: flex-start;
  padding-top: 2px;
}
.rot-item {
  writing-mode: vertical-rl;
  transform: rotate(0deg);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: .25px;
  color: #222;
  padding: 4px 0;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1 1 auto;
}
.rot-item { text-decoration: none; color: inherit; }
.rot-item:hover { background: #f0f0f0; }

@media (max-width: 900px) {
  .admin-sidebar { flex-direction: row; width: 100%; min-width: unset; border-radius: 10px; }
  .rotated-wrap { flex-direction: row; gap: 24px; padding-top: 0; }
  .rot-item { writing-mode: horizontal-tb; transform: rotate(0deg); border-bottom: none; border-right: 1px solid rgba(0,0,0,0.1); padding: 0 6px; }
  .rot-item:last-child { border-right: none; }
}
</style>
