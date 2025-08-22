<script setup>
  import {ref, watch, computed, onMounted} from "vue";
  import {useRoute} from "vue-router";
  import Navbar from "@/components/Navbar.vue";
  const items = ref([
    { label: "Bot", link: "/bot", active: true },
    { label: "Friend", link: "/play", active: false },
    { label: "Openings", link: "/openings", active: false },
    { label: "Practice", link: "/practice", active: false },
    { label: "Clock", link: "/clock", active: false },
  ]);
  const modalId = computed(() => {
        return (props.route.path?.slice(1)) || 'root';
    });
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
      setTimeout(() => {
      const bsCollapse = document.getElementById('navbarSupportedContent');
      if (bsCollapse && bsCollapse.classList.contains("show")) {
        import('bootstrap/js/dist/collapse').then(({ default: Collapse }) => {
          const collapseInstance = Collapse.getOrCreateInstance(bsCollapse);
          collapseInstance.hide();
        });
      }
    }, 200);
    }}
  );

  import {gsap} from "gsap";
  let t1 = gsap.timeline();
</script>

<template>
  <div class = "container-fluid">
      <Navbar :items = "items" :t1 = "t1"/>
      <RouterView  :key="$route.fullPath" :t1 = "t1"> </RouterView>
  </div>
</template>

<style scoped>
</style>
