<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useHead } from '@vueuse/head'
import Navbar from "@/components/Navbar.vue";



let items = ref([]);


const isNavOpen = ref(true);

let route = useRoute();
function computeItems(path) {
  const isApp = path.startsWith('/app') || path === '/bot' || path === '/play' || path === '/practice' || path === '/clock'
  if (isApp) {
    return [
      { label: "Bot", link: "/app/bot", active: false },
      { label: "Friend", link: "/app/play", active: false },
      { label: "Practice", link: "/app/practice", active: false },
      { label: "Clock", link: "/app/clock", active: false },
    ]
  }
  return [
    { label: "App", link: "/app", active: false },
    { label: "Dashboard", link: "/dashboard", active: false },
    { label: "Find", link: "/find", active: false },
    { label: "Pricing", link: "/pricing", active: false },
    { label: "SignIn", link: "/signin", active: false },
  ]
}

items.value = computeItems(route.path)

function getMeta() {
  const p = route.path
  if (p === '/bot' || p === '/app/bot') {
    return {
      title: 'Clutch Chess - Play with Bot',
      description: 'Play chess against a powerful bot. Test your skills and improve your game.', 
      keywords: 'chess bot, play against bot, chess AI'
    }
  } else if (p === '/play' || p === '/app/play') {
    return {
      title: 'Clutch Chess - Play with Friends',
      description: 'Challenge your friends to a chess match online. Enjoy real-time gameplay.', 
      keywords: 'chess with friends, online chess, multiplayer chess, online'
    }
  } else if (p === '/practice' || p === '/app/practice') {
    return {
      title: 'Clutch Chess - Practice Chess',
      description: 'Practice chess positions by importing FEN, and sharpen your tactics.', 
      keywords: 'chess practice, FEN, chess tactics, import FEN'
    }
  } else if (p === '/clock' || p === '/app/clock') {
    return {
      title: 'Clutch Chess - Chess Clock',
      description: 'Use a chess clock for timed games and tournaments.', 
      keywords: 'chess clock, timer, chess timer, clock'
    }
  } else {
    return {
      title: 'Clutch Chess - Play Online Chess',
      description: 'Play chess online with friends or bots. Practice and improve your skills.', 
      keywords: 'chess, online chess, play chess, chess app'
    }
  }
}

// Make head reactive with route
useHead(() => {
  const meta = getMeta()
  return {
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords }
    ]
  }
})

watch(() => route.path, (newPath) => {
  document.body.style.overflow = "";
  for (let i of items.value) {
    i.active = (i.link === newPath);
  }
  items.value = computeItems(newPath)
  
  isNavOpen.value = (newPath === "/");

  // head is reactive via the function above

});

  import {gsap} from "gsap";
  let t1 = gsap.timeline();
</script>

<template>
  <div style = "width: 100vw; height: 100vh;">
    <div>
      <Navbar :items = "items" :t1 = "t1" :key="route.path" :is-nav-open="isNavOpen"/>
    </div>
    <div class = "container-fluid" style = "overflow-x: hidden;">
      <RouterView  :key="route.path" :t1 = "t1"> </RouterView>
    </div>
  </div>
</template>

<style scoped>
</style>
