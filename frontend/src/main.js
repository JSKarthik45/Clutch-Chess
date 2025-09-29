import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Game from "@/components/Game.vue";
import ClockContainer from "@/components/Clock/ClockContainer.vue";

const routes = [
    { path: '/bot', component: Game },
    { path: '/play', component: Game },
    { path: '/practice', component: Game },
    { path: '/clock', component: ClockContainer },
    { path: '', component: Game },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

const app = createApp(App)

app.use(router)
app.use(createHead())
app.mount('#app')
