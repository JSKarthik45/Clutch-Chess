import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Game from "@/components/Game.vue";
import ClockContainer from "@/components/Clock/ClockContainer.vue";

import LandingPage from "@/components/LandingPage.vue";
import DashboardSoon from "@/components/DashboardSoon.vue";
import FindSoon from "@/components/FindSoon.vue";
import SignIn from "@/components/SignIn.vue";
import Pricing from "@/components/Pricing.vue";

import AdminUserDetailsPage from './components/admin/AdminUserDetailsPage.vue'
import AdminDashboard from './components/admin/AdminDashboard.vue'
import UserDashboard from './components/user/UserDashboard.vue'
import FindAcademy from './components/FindAcademy.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import HuePrivacyPolicy from './components/HuePrivacyPolicy.vue'

// Auth composable for role-based redirects
import { useAuth } from './composables/useAuth.js'

const homeRoutes = [
  { path: '/', component: LandingPage },
  { path: '/find', component: FindAcademy }, // Updated to new FindAcademy page
  { path: '/dashboard', component: AdminUserDetailsPage }, // Legacy route
  { path: '/profile', component: SignIn },
  { path: '/pricing', component: Pricing },
  { path: '/noscroll-privacy', component: PrivacyPolicy },
  { path: '/hue-privacy', component: HuePrivacyPolicy },
  
  // Role-based dashboard routes
  { 
    path: '/admin/dashboard', 
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  { 
    path: '/user/dashboard', 
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' }
  },
]

const appRoutes = [
  { path: '/', component: Game },
  { path: '/bot', component: Game },
  { path: '/play', component: Game },
  { path: '/practice', component: Game },
  { path: '/clock', component: ClockContainer },
]

// Create path-prefixed versions of app routes to live under /app
const appPrefixedRoutes = appRoutes.map(r => ({
  ...r,
  path: r.path === '/' ? '/app' : `/app${r.path}`,
}))

// Serve marketing pages at root and app under /app everywhere.
// Also include legacy non-prefixed app routes for backward compatibility.
const routeConfig = [...homeRoutes, ...appPrefixedRoutes, ...appRoutes]


const router = createRouter({
    history: createWebHistory(),
    routes: routeConfig,
    scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

// Navigation guard for role-based access and post-login redirects
router.beforeEach(async (to, from, next) => {
  const { initAuth, isAuthenticated, role } = useAuth()
  
  // Initialize auth state if not already done
  await initAuth()
  
  // Handle post-login redirect: if coming from /profile and now authenticated
  if (from.path === '/profile' && isAuthenticated.value && to.path === '/profile') {
    // After successful login, redirect based on role
    const targetDashboard = role.value === 'admin' ? '/admin/dashboard' : '/user/dashboard'
    return next(targetDashboard)
  }
  
  // For routes with meta.requiresAuth, the ProtectedRoute component handles access control
  // This guard is mainly for post-login redirects
  next()
})

const app = createApp(App)

app.use(router)
app.use(createHead())
app.mount('#app')
