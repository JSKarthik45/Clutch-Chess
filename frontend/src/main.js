import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Game from "@/components/Game.vue";
import ClockContainer from "@/components/Clock/ClockContainer.vue";

import LandingPage from "@/components/LandingPage.vue";
import SignIn from "@/components/SignIn.vue";
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import HuePrivacyPolicy from './components/HuePrivacyPolicy.vue'
import NoScrollPrivacyPolicy from './components/NoScrollPrivacyPolicy.vue'
import GwenPrivacyPolicy from './components/GwenPrivacyPolicy.vue'

// Auth composable for role-based redirects
import { useAuth } from './composables/useAuth.js'

const homeRoutes = [
  { path: '/', component: LandingPage },
  { path: '/profile', component: SignIn },
  { path: '/chessscreentime-privacy', component: PrivacyPolicy },
  { path: '/noscroll-privacy', component: NoScrollPrivacyPolicy },
  { path: '/hue-privacy', component: HuePrivacyPolicy },
  { path: '/gwen-privacy', component: GwenPrivacyPolicy },
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
  const { initAuth, isAuthenticated } = useAuth()
  
  // Initialize auth state if not already done
  await initAuth()
  
  // Keep signed-in users on the app experience instead of the sign-in page.
  if (to.path === '/profile' && isAuthenticated.value) {
    return next('/app')
  }
  
  next()
})

const app = createApp(App)

app.use(router)
app.use(createHead())
app.mount('#app')
