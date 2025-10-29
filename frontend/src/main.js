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

const homeRoutes = [
  { path: '/', component: LandingPage },
  { path: '/find', component: FindSoon },
  { path: '/dashboard', component: DashboardSoon },
  { path: '/signin', component: SignIn },
  { path: '/pricing', component: Pricing },
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

const app = createApp(App)

app.use(router)
app.use(createHead())
app.mount('#app')
