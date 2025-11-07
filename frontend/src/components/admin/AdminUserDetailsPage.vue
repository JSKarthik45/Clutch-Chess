<template>
  <div class="admin-page">
    <!-- Content with right sidebar and topbar spanning only main column -->
    <div class="content-wrap">
      <AdminTopNav v-model="section" class="topbar" />
      <main class="main-area">
        <h1 class="page-title">ADMIN DASHBOARD - USER DETAILS</h1>
        <!-- Work-in-progress banner (not blurred) -->
        <div class="wip-banner">This dashboard is currently being worked on.</div>
        <!-- Blurred content wrapper -->
        <div class="blur-wrapper">

        <!-- Field selector -->
        <div class="controls-row">
          <FieldSelector v-model="selectedFields" :fields="allFields" />
          <PaginationControls
            class="controls-right"
            v-model:limit="limit"
            v-model:page="page"
          />
        </div>

        <!-- Users table -->
        <UsersTable :rows="rows" :columns="selectedFields" :limit="limit" />
        </div>
      </main>

      <AdminRightSidebar class="sidebar" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminTopNav from './AdminTopNav.vue'
import AdminRightSidebar from './AdminRightSidebar.vue'
import FieldSelector from './FieldSelector.vue'
import PaginationControls from './PaginationControls.vue'
import UsersTable from './UsersTable.vue'

// Current section (top nav)
const section = ref('users')

// Field selection
const allFields = ['id', 'name', 'email', 'role', 'status', 'created_at']
const selectedFields = ref(['id', 'name', 'email', 'role'])

// Pagination
const limit = ref(10)
const page = ref(0)

// Placeholder rows (would be fetched via Supabase from table "user_details")
// Example Supabase fetch (placeholder):
// import { supabase } from '@/supabase'
// async function load() {
//   const from = page.value * limit.value
//   const to = from + limit.value - 1
//   const { data, error } = await supabase
//     .from('user_details')
//     .select(selectedFields.value.join(','))
//     .range(from, to)
//   if (!error) rows.value = data || []
// }

const rows = ref([
  { id: 1, name: 'Ava', email: 'ava@example.com', role: 'Admin', status: 'Active', created_at: '2024-01-02' },
  { id: 2, name: 'Ben', email: 'ben@example.com', role: 'Coach', status: 'Active', created_at: '2024-02-14' },
  { id: 3, name: 'Cara', email: 'cara@example.com', role: 'Student', status: 'Inactive', created_at: '2024-03-03' },
  { id: 4, name: 'Dev', email: 'dev@example.com', role: 'Student', status: 'Active', created_at: '2024-03-21' },
  { id: 5, name: 'Eli', email: 'eli@example.com', role: 'Coach', status: 'Active', created_at: '2024-04-10' },
  { id: 6, name: 'Fay', email: 'fay@example.com', role: 'Student', status: 'Active', created_at: '2024-05-18' },
  { id: 7, name: 'Gus', email: 'gus@example.com', role: 'Admin', status: 'Active', created_at: '2024-06-01' },
  { id: 8, name: 'Hana', email: 'hana@example.com', role: 'Student', status: 'Inactive', created_at: '2024-06-12' },
  { id: 9, name: 'Ian', email: 'ian@example.com', role: 'Student', status: 'Active', created_at: '2024-07-09' },
  { id: 10, name: 'Jae', email: 'jae@example.com', role: 'Coach', status: 'Active', created_at: '2024-08-24' },
])
</script>

<style scoped>
.admin-page { display: flex; flex-direction: column; min-height: 100%; background: #fff; position: relative; }
.blur-wrapper { filter: blur(2px); pointer-events: none; user-select: none; }
.wip-banner {
  position: relative;
  z-index: 5;
  font-size: 14px;
  font-weight: 600;
  color: #222;
  background: rgba(115,149,82,0.15);
  border: 1px solid rgba(115,149,82,0.35);
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  margin: 4px 0 16px;
  backdrop-filter: blur(2px);
}
  /* With fixed navbars, we simply pad the content to avoid overlap */
  .content-wrap {
    display: block;
    padding-top: 48px; /* match fixed top nav height */
    padding-right: 56px; /* sidebar 48px + 8px gap */
  }
  .main-area { padding: 16px; }
  

.page-title { font-size: 20px; font-weight: 800; margin: 14px 0 16px; color: #111; }
.controls-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; width: 100%; }
.controls-right { margin-left: auto; }

 @media (max-width: 900px) {
   .content-wrap {
     grid-template-columns: 1fr;
     grid-template-areas:
       "nav"
       "main"
       "sidebar";
   }
 }
</style>
