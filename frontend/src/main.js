import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
// Lazy-load app components so we can prefetch them after initial render
const loadGame = () => import("@/components/Game.vue")
const loadClockContainer = () => import("@/components/Clock/ClockContainer.vue")

import LandingPage from "@/components/LandingPage.vue";
import SignIn from "@/components/SignIn.vue";

const homeRoutes = [
  { path: '/', component: LandingPage },
  { path: '/find', component: LandingPage },
  { path: '/dashboard', component: LandingPage },
  { path: '/signin', component: SignIn },
  { path: '/pricing', component: LandingPage },
]

const appRoutes = [
  { path: '/', component: loadGame },
  { path: '/bot', component: loadGame },
  { path: '/play', component: loadGame },
  { path: '/practice', component: loadGame },
  { path: '/clock', component: loadClockContainer },
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

const app = createApp(App)

app.use(router)
app.use(createHead())
// Prefetch app chunks on idle so /app is instant when clicked
const prefetchAppChunks = () => { try { loadGame(); loadClockContainer(); } catch (_) {} }
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(prefetchAppChunks)
  } else {
    setTimeout(prefetchAppChunks, 1200)
  }
  // Optional: warm SPA fallback for /app via service worker
  navigator.serviceWorker?.ready?.then(() => {
    try { fetch('/app', { mode: 'no-cors' }).catch(() => {}) } catch (_) {}
  })
}
app.mount('#app')
