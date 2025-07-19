import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Game from "@/components/Game.vue";
import ClockContainer from "@/components/Clock/ClockContainer.vue";

const routes = [
    { path: '/bot', component: Game },
    { path: '/play', component: Game },
    { path: '/openings', component: Game },
    { path: '/practice', component: Game },
    { path: '/clock', component: ClockContainer },
    { path: '', component: Game },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
