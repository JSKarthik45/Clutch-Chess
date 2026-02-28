<template>
  <div class="academy-profile">
    <div class="section-header">
      <h2 class="section-title">Academy Profile</h2>
      <p class="section-subtitle">Manage your academy's information</p>
    </div>

    <form class="profile-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <div class="form-group">
          <label for="academy-name" class="form-label">Academy Name *</label>
          <input
            id="academy-name"
            v-model="form.name"
            type="text"
            class="form-input"
            placeholder="Enter academy name"
            required
          />
        </div>

        <div class="form-group">
          <label for="academy-location" class="form-label">Location *</label>
          <input
            id="academy-location"
            v-model="form.location"
            type="text"
            class="form-input"
            placeholder="City, State/Country"
            required
          />
        </div>

        <div class="form-group full-width">
          <label for="academy-description" class="form-label">Description</label>
          <textarea
            id="academy-description"
            v-model="form.description"
            class="form-textarea"
            placeholder="Describe your academy, teaching philosophy, achievements..."
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="academy-contact" class="form-label">Contact Information</label>
          <input
            id="academy-contact"
            v-model="form.contact"
            type="text"
            class="form-input"
            placeholder="Email or phone number"
          />
        </div>

        <div class="form-group">
          <label for="academy-website" class="form-label">Website</label>
          <input
            id="academy-website"
            v-model="form.website"
            type="url"
            class="form-input"
            placeholder="https://yourchessacademy.com"
          />
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="resetForm">
          Reset
        </button>
        <button type="submit" class="btn-primary" :disabled="!isValid">
          Save Changes
        </button>
      </div>

      <div v-if="showSuccess" class="success-message">
        ✓ Academy profile saved successfully!
      </div>
    </form>

    <!-- Preview Card -->
    <div class="preview-section">
      <h3 class="preview-title">Preview</h3>
      <div class="academy-card">
        <div class="card-header">
          <h4 class="card-name">{{ form.name || 'Academy Name' }}</h4>
          <span class="card-location">📍 {{ form.location || 'Location' }}</span>
        </div>
        <p class="card-description">{{ form.description || 'Academy description will appear here...' }}</p>
        <div class="card-footer">
          <span v-if="form.contact" class="card-contact">📧 {{ form.contact }}</span>
          <a v-if="form.website" :href="form.website" target="_blank" class="card-link">🔗 Website</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  academy: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['save'])

const form = ref({
  name: '',
  location: '',
  description: '',
  contact: '',
  website: '',
})

const showSuccess = ref(false)

// Sync with prop
watch(() => props.academy, (newVal) => {
  if (newVal) {
    form.value = { ...form.value, ...newVal }
  }
}, { immediate: true })

const isValid = computed(() => {
  return form.value.name.trim() && form.value.location.trim()
})

function handleSubmit() {
  if (!isValid.value) return
  emit('save', { ...form.value })
  showSuccess.value = true
  setTimeout(() => { showSuccess.value = false }, 3000)
}

function resetForm() {
  form.value = {
    name: props.academy?.name || '',
    location: props.academy?.location || '',
    description: props.academy?.description || '',
    contact: props.academy?.contact || '',
    website: props.academy?.website || '',
  }
}
</script>

<style scoped>
.academy-profile {
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

.profile-form {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.form-input,
.form-textarea {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: rgb(115, 149, 82);
  box-shadow: 0 0 0 3px rgba(115, 149, 82, 0.15);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: rgb(115, 149, 82);
  color: #fff;
  border: 1px solid rgb(115, 149, 82);
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(0.95);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #f5f5f5;
}

.success-message {
  margin-top: 16px;
  padding: 12px;
  background: rgba(115, 149, 82, 0.1);
  border: 1px solid rgba(115, 149, 82, 0.3);
  border-radius: 8px;
  color: rgb(54, 70, 39);
  font-weight: 600;
  text-align: center;
}

.preview-section {
  margin-top: 32px;
}

.preview-title {
  font-size: 16px;
  font-weight: 700;
  color: #666;
  margin-bottom: 12px;
}

.academy-card {
  background: #fff;
  border: 2px solid rgb(115, 149, 82);
  border-radius: 12px;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-name {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.card-location {
  font-size: 13px;
  color: #666;
}

.card-description {
  color: #444;
  line-height: 1.5;
  margin: 0 0 16px;
}

.card-footer {
  display: flex;
  gap: 16px;
  font-size: 13px;
}

.card-contact {
  color: #555;
}

.card-link {
  color: rgb(115, 149, 82);
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: span 1;
  }

  .card-header {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
