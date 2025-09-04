<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";

const items = ref([
  { label: "Bot", link: "/bot", active: false },
  { label: "Friend", link: "/play", active: false },
  { label: "Practice", link: "/practice", active: false },
  { label: "Clock", link: "/clock", active: false },
]);

const isNavOpen = ref(true);

let route = useRoute();

watch(() => route.path, (newPath) => {
  for (let i of items.value) {
    i.active = (i.link === newPath);
  }
  
  isNavOpen.value = (newPath === "/");
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
