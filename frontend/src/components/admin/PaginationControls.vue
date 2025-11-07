<template>
  <div class="pagination-controls">
    <label class="limit-label" for="limitSelect">Limit</label>
    <select id="limitSelect" class="limit-select" :value="limit" @change="onLimit">
      <option v-for="n in limits" :key="n" :value="n">{{ n }}</option>
    </select>
    <div class="pager-buttons">
      <button class="button-effect pg-btn" :disabled="page === 0" @click="prev">← Prev</button>
      <span class="pg-info">Page {{ page + 1 }}</span>
      <button class="button-effect pg-btn" @click="next">Next →</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  limit: { type: Number, default: 10 },
  page: { type: Number, default: 0 },
  limits: { type: Array, default: () => [5, 10, 20, 50] },
})
const emit = defineEmits(['update:limit', 'update:page'])

function onLimit(e) { emit('update:limit', parseInt(e.target.value, 10)) }
function prev() { if (props.page > 0) emit('update:page', props.page - 1) }
function next() { emit('update:page', props.page + 1) }
</script>

<style scoped>
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.limit-select { padding: 6px 8px; border-radius: 8px; border:1px solid rgba(0,0,0,0.12); }
.pg-btn { padding: 6px 12px; border-radius: 8px; }
.pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pager-buttons { display: flex; align-items: center; gap: 10px; }
.pg-info { font-size: 14px; font-weight: 500; }
</style>
