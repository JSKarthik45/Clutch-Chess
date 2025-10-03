import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Game from "@/components/Game.vue";
import ClockContainer from "@/components/Clock/ClockContainer.vue";

import LandingPage from "@/components/LandingPage.vue";

const homeRoutes = [
  { path: '/', component: LandingPage },
  { path: '/find', component: LandingPage },
  { path: '/dashboard', component: LandingPage },
  { path: '/signin', component: LandingPage },
  { path: '/pricing', component: LandingPage },
]

const appRoutes = [
  { path: '/', component: Game },
  { path: '/bot', component: Game },
  { path: '/play', component: Game },
  { path: '/practice', component: Game },
  { path: '/clock', component: ClockContainer },
]

let routeConfig = [...homeRoutes]
let hostname = window.location.hostname;
if(hostname === 'localhost' || hostname === 'clutchess') {
  routeConfig = [...homeRoutes]
}
else {
  routeConfig = [...appRoutes]
}


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
