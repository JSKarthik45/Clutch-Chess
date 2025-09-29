<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useHead } from '@vueuse/head'
import Navbar from "@/components/Navbar.vue";

const items = ref([
  { label: "Bot", link: "/bot", active: false },
  { label: "Friend", link: "/play", active: false },
  { label: "Practice", link: "/practice", active: false },
  { label: "Clock", link: "/clock", active: false },
]);

const isNavOpen = ref(true);

let route = useRoute();


function getMeta() {
  if (route.path === '/bot') {
    return {
      title: 'Clutch Chess - Play with Bot',
      description: 'Play chess against a powerful bot. Test your skills and improve your game.', 
      keywords: 'chess bot, play against bot, chess AI'
    }
  } else if (route.path === '/play') {
    return {
      title: 'Clutch Chess - Play with Friends',
      description: 'Challenge your friends to a chess match online. Enjoy real-time gameplay.', 
      keywords: 'chess with friends, online chess, multiplayer chess, online'
    }
  } else if (route.path === '/practice') {
    return {
      title: 'Clutch Chess - Practice Chess',
      description: 'Practice chess positions by importing FEN, and sharpen your tactics.', 
      keywords: 'chess practice, FEN, chess tactics, import FEN'
    }
  } else if (route.path === '/clock') {
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

const meta = getMeta()
useHead({
  title: meta.title,
  meta: [
    { name: 'description', content: meta.description },
    { name: 'keywords', content: meta.keywords }
  ]
})

watch(() => route.path, (newPath) => {
  document.body.style.overflow = "";
  for (let i of items.value) {
    i.active = (i.link === newPath);
  }
  
  isNavOpen.value = (newPath === "/");

  const meta = getMeta()
  useHead({
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords }
    ]
  })

});

  import {gsap} from "gsap";
  let t1 = gsap.timeline();
</script>

<template>
  <div style = "width: 100vw; height: 100vh;">
    <div>
      <Navbar :items = "items" :t1 = "t1" :key="route.path" :is-nav-open="isNavOpen"/>
    </div>
    <div class = "container-fluid">
      <RouterView  :key="route.path" :t1 = "t1"> </RouterView>
    </div>
  </div>
</template>

<style scoped>
</style>
