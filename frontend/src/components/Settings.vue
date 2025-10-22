<script setup>
    const props = defineProps({
        movesArr: Array, 
        route: Object,
        t1: Object, 
    });
    import {ref, onMounted, computed} from "vue";

    let settings = ref(null);
    const normalizedPath = computed(() => {
        const p = props.route.path
        if (p === '/app') return '/'
        if (p.startsWith('/app/')) return p.slice(4)
        return p
    })
    onMounted(() => {
        props.t1.fromTo(settings.value, {
            y: -200, 
        }, {
            y: 0, 
            duration: 2, 
            ease: "bounce",
        }, 0.5)
    });
</script>

<template>
    <div class = "container-fluid text-center" style = "height: 62vh; margin-top: 10px; margin-bottom: 10px;">
        <div ref = "settings">
            <h5 v-if = "movesArr.length != 0" class = "text-center">
                {{ Math.floor(currentMoveNo) - 1 }} Moves
            </h5>
            <button v-else-if = "normalizedPath === '/'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#root">
                Game Settings <img src = "/images/edit.svg"/>
            </button>
            <button v-else-if = "normalizedPath === '/bot'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#bot">
                Game Settings <img src = "/images/edit.svg"/>
            </button>
            <button v-else-if = "normalizedPath === '/play'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#play">
                Game Settings <img src = "/images/edit.svg"/>
            </button>
            <button v-else-if = "normalizedPath === '/openings'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#openings">
                Select Opening <img src = "/images/edit.svg"/>
            </button>
            <button v-else-if = "normalizedPath === '/practice'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#practice">
                FEN <img src = "/images/edit.svg"/>
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>