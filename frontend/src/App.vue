<script setup>
  import {ref, watch} from "vue";
  import {useRoute} from "vue-router";
  import Navbar from "@/components/Navbar.vue";
  const items = ref([
    { label: "Bot", link: "/bot", active: true },
    { label: "Friend", link: "/play", active: false },
    { label: "Openings", link: "/openings", active: false },
    { label: "Practice", link: "/practice", active: false },
    { label: "Clock", link: "/clock", active: false },
  ]);
  let route = useRoute();
  watch(
    () => route.path,
    (newPath) => {
      for (let i of items.value) {
        if (i.link === newPath) {
          i.active = true
        } else {
          i.active = false
        }
      }
    },
  );
</script>

<template>
  <div class = "container-fluid">
    <Navbar :items = "items"/>
    <RouterView/>
  </div>
</template>

<style scoped>

</style>
