<template>
  <div class="users-table">
    <table>
      <thead>
        <tr>
          <th v-for="col in visibleColumns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in displayRows" :key="row.id ?? JSON.stringify(row)">
          <td v-for="col in visibleColumns" :key="col">{{ row[col] ?? '—' }}</td>
        </tr>
        <tr v-if="displayRows.length === 0">
          <td :colspan="visibleColumns.length" class="empty">No data</td>
        </tr>
      </tbody>
    </table>
    <p class="hint">Data source: Supabase table "user_details" (placeholder)</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => ['id', 'name', 'email'] },
  limit: { type: Number, default: 10 },
})

const visibleColumns = computed(() => props.columns?.length ? props.columns : ['id','name','email'])
const displayRows = computed(() => props.rows.slice(0, props.limit))
</script>

<style scoped>
.users-table { width: 100%; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { border: 1px solid rgba(0,0,0,0.08); padding: 10px; text-align: left; }
th { background: #f5f5f5; font-weight: 700; }
.empty { text-align: center; color: #777; }
.hint { margin-top: 8px; font-size: 12px; color: #666; }
</style>
