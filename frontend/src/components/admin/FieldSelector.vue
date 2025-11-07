<template>
  <div class="field-selector">
    <label class="fs-label">Visible fields</label>
    <div class="fs-dropdown" :class="{ open: open }">
      <button type="button" class="button-effect fs-trigger" @click="toggle">
        {{ summaryText }}
      </button>
      <div class="fs-panel" v-if="open">
        <label v-for="f in fields" :key="f" class="fs-option">
          <input type="checkbox" :value="f" :checked="modelValue.includes(f)" @change="onToggle(f, $event)" />
          <span>{{ f }}</span>
        </label>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  fields: { type: Array, default: () => ['id', 'name', 'email', 'role', 'created_at'] },
  modelValue: { type: Array, default: () => ['id', 'name', 'email'] },
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
function toggle() { open.value = !open.value }
function onToggle(field, e) {
  const set = new Set(props.modelValue)
  if (e.target.checked) set.add(field)
  else set.delete(field)
  emit('update:modelValue', Array.from(set))
}

const summaryText = computed(() => {
  if (!props.modelValue?.length) return 'Select fields'
  const shown = props.modelValue.slice(0, 3).join(', ')
  return props.modelValue.length > 3 ? `${shown} +${props.modelValue.length - 3} more` : shown
})

function onClickOutside(e) {
  const root = e.composedPath?.() ? e.composedPath()[0] : e.target
  // naive: close if click outside this component root
  // rely on stopPropagation by consumer if embedding custom portals
  // In Vue SFC runtime, $el is not accessible in <script setup>, so we'll use a simple heuristic
  // and let users click the trigger again to close if needed on edge cases.
  // Keep it lightweight.
  if (!e.target.closest('.fs-dropdown')) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.field-selector { display: flex; align-items: center; gap: 10px; position: relative; }
.fs-label { font-weight: 600; }
.fs-dropdown { position: relative; }
.fs-trigger { border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; padding: 6px 10px; background: #fff; }
.fs-panel {
  position: absolute; z-index: 20; top: calc(100% + 6px); left: 0;
  min-width: 220px; background: #fff; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.fs-option { display: flex; align-items: center; gap: 8px; font-size: 14px; }
</style>
