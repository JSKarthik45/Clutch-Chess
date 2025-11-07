<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from '@vueuse/head'
import Navbar from "@/components/Navbar.vue";
import ChatBot from "@/components/ChatBot.vue";



let items = ref([]);


const isNavOpen = ref(true);
const isReady = ref(false);

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
    { label: "SignIn", link: "/profile", active: false },
  ]
}

items.value = computeItems(route.path)

function getMeta() {
  const p = route.path
  if (p === '/app/bot') {
    return {
      title: 'Clutch Chess - Play with Bot',
      description: 'Play chess against a powerful bot. Test your skills and improve your game.', 
      keywords: 'chess bot, play against bot, chess AI'
    }
  } else if (p === '/app/play') {
    return {
      title: 'Clutch Chess - Play with Friends',
      description: 'Challenge your friends to a chess match online. Enjoy real-time gameplay.', 
      keywords: 'chess with friends, online chess, multiplayer chess, online'
    }
  } else if (p === '/app/practice') {
    return {
      title: 'Clutch Chess - Practice Chess',
      description: 'Practice chess positions by importing FEN, and sharpen your tactics.', 
      keywords: 'chess practice, FEN, chess tactics, import FEN'
    }
  } else if (p === '/app/clock') {
    return {
      title: 'Clutch Chess - Chess Clock',
      description: 'Use a chess clock for timed games and tournaments.', 
      keywords: 'chess clock, timer, chess timer, clock'
    }
  } else if (p === '/app') {
    return {
      title: 'Clutch Chess - Play Online Chess',
      description: 'Play chess online with friends or bots. Practice and improve your skills.', 
      keywords: 'chess, online chess, play chess, chess app'
    }
  } 
  else if (p === '/app') {
    return {
      title: 'Clutch Chess - Play Online Chess',
      description: 'Play chess online with friends or bots. Practice and improve your skills.', 
      keywords: 'chess, online chess, play chess, chess app'
    }
  }
  else if (p === '/dashboard') {
    return {
      title: 'Clutch Chess - Dashboard',
      description: 'View your chess statistics and progress on the dashboard.',
      keywords: 'chess, dashboard, statistics, progress'
    }
  }
  else if (p === '/find') {
    return {
      title: 'Clutch Chess - Find',
      description: 'Find chess coaching classes near you.',
      keywords: 'chess, find coaching, online chess, play chess'
    }
  }  
  else if (p === '/pricing') {
    return {
      title: 'Clutch Chess - Pricing',
      description: 'Explore our pricing plans and choose the best option for you.',
      keywords: 'chess, pricing, plans, subscription'
    }
  }  
  else if (p === '/profile') {
    return {
      title: 'Clutch Chess - Profile',
      description: 'View and edit your Clutch Chess profile information.',
      keywords: 'chess, profile, user settings, account'
    }
  }
  else if (p === '/') {
    return {
      title: 'Clutch Chess',
      description: 'Find Chess Coaching Classes And Software To Extend Learning Even After Classes.',
      keywords: 'chess, online chess, play chess, chess app, find coaching, chess classes, chess software, learn chess'
    }
  }
  else {
    return {
      title: 'Clutch Chess',
      description: 'Find Chess Coaching Classes And Software To Extend Learning Even After Classes.',
      keywords: 'chess, online chess, play chess, chess app, find coaching, chess classes, chess software, learn chess'
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

onMounted(() => {
  // Show a lightweight splash until the page is fully loaded (first paint + assets)
  const done = () => { isReady.value = true }
  if (document.readyState === 'complete') {
    done()
  } else {
    window.addEventListener('load', done, { once: true })
  }
})
</script>

<template>
  <!-- Splash overlay spinner shown until first load completes -->
  <div v-if="!isReady" class="splash-overlay">
    <div class="spinner-border clutch-spinner" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div style = "width: 100vw; height: 100vh;" :style="{ visibility: isReady ? 'visible' : 'hidden' }">
    <div v-if = "!route.path.startsWith('/dashboard')">
      <Navbar :items = "items" :t1 = "t1" :key="route.path" :is-nav-open="isNavOpen"/>
    </div>
    <div class = "container-fluid" style = "overflow-x: hidden;">
  <RouterView  :key="route.path" :t1 = "t1" :is-ready="isReady"> </RouterView>
    </div>
    <!--<ChatBot />-->
  </div>
</template>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: #ffffff;
  z-index: 2000;
}
.clutch-spinner {
  width: 3rem;
  height: 3rem;
  border-width: .55rem; /* slightly thicker ring */
  border-radius: 50%; /* ensure fully rounded edges */
  color: rgb(115,149,82); /* uses currentColor for spinner border */
}
</style>
