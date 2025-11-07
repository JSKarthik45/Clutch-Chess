<template>
  <header class="admin-topnav" role="navigation" aria-label="Admin sections">
    <nav class="nav-buttons">
      <button
        v-for="item in items"
        :key="item.key"
        class="button-effect nav-btn"
        :aria-pressed="modelValue === item.key"
        @click="$emit('update:modelValue', item.key)"
      >
        {{ item.label }}
      </button>
    </nav>
  </header>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: 'users' },
  items: {
    type: Array,
    default: () => ([
      { key: 'users', label: 'Users' },
      { key: 'attendance', label: 'Attendance' },
      { key: 'puzzle', label: 'Puzzle' },
      { key: 'tournaments', label: 'Tournaments' },
    ]),
  },
})
</script>

<style scoped>
.admin-topnav {
  position: fixed;
  top: 0;
  left: 0;
  right: 48px; /* keep clear of sidebar */
  z-index: 1000;
  width: auto;
  height: 52px; /* original reduced height */
  background: #ffffff;
  border-bottom: 2px solid rgb(115, 149, 82);
  border-radius: 0;
  padding: 4px 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  align-items: stretch;
}
.nav-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 6px;
}
.nav-btn {
  border: 1px solid rgba(0,0,0,0.15);
  background: #fdfdfd;
  color: #111;
  padding: 8px 4px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: .5px;
  transition: background .25s ease, color .25s ease, transform .25s ease;
}
.nav-btn[aria-pressed="true"] {
  background: rgb(115, 149, 82);
  color: #ffffff;
  border-color: rgb(115, 149, 82);
  transform: translateY(-2px);
}
.nav-btn:hover:not([aria-pressed="true"]),
.nav-btn:focus-visible:not([aria-pressed="true"]) {
  background: #000;
  color: #fff;
}
</style>
