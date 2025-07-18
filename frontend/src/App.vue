<script setup>
  import {ref} from "vue";
  import Game from "@/components/Game.vue";
  import Navbar from "@/components/Navbar.vue";
  const items = ref([
    { label: "Bot", link: "/bot", active: true },
    { label: "Friend", link: "/play", active: false },
    { label: "Openings", link: "/openings", active: false },
    { label: "Practice", link: "/practice", active: false },
    { label: "Clock", link: "/clock", active: false },
  ]);
</script>

<template>
  <div class = "container-fluid">
    <Navbar :items = "items"/>
    <Game/>
  </div>
</template>

<style scoped>

</style>
