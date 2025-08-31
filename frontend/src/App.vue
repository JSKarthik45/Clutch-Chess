<script setup>
  import {ref, watch, computed, onMounted} from "vue";
  import {useRoute} from "vue-router";
  import Navbar from "@/components/Navbar.vue";
  import Collapse from 'bootstrap/js/dist/collapse';
  const items = ref([
    { label: "Bot", link: "/bot", active: false },
    { label: "Friend", link: "/play", active: false },
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
      i.active = (i.link === newPath);
    }

    const bsCollapse = document.getElementById('navbarSupportedContent');
    if (!bsCollapse) return;

    import('bootstrap/js/dist/collapse').then(({ default: Collapse }) => {
      const collapseInstance = Collapse.getOrCreateInstance(bsCollapse);

      if (newPath === '/') {
        // On root, show (open) the navbar
        collapseInstance.show();
      } else {
        // On other routes, hide (collapse) the navbar
        collapseInstance.hide();
      }
    });
  }
);
onMounted(() => {
  const bsCollapse = document.getElementById('navbarSupportedContent');
  if (!bsCollapse) return;
  const collapseInstance = Collapse.getOrCreateInstance(bsCollapse);

  if (route.path === '/') {
    collapseInstance.show();
  } else {
    collapseInstance.hide();
  }
});

  import {gsap} from "gsap";
  let t1 = gsap.timeline();
</script>

<template>
  <div>
    <div>
      <Navbar :items = "items" :t1 = "t1"/>
    </div>
    <div class = "container-fluid">
      <RouterView  :key="$route.fullPath" :t1 = "t1"> </RouterView>
    </div>
  </div>
</template>

<style scoped>
</style>
