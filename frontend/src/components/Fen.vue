<script setup>
    const props = defineProps({
        fen: String, 
        t1: Object, 
    })
    
    import {ref, onMounted} from "vue";
    let f = ref(null);
    onMounted(() => {
        props.t1.restart();
        props.t1.fromTo(f.value, {
            opacity: 0,
            y: 100,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
        }, 0.5)
    });
</script>

<template>
        <h5 class = "fen center deskFixed" ref = "f">
            <div class = "text-center">
                Current FEN
            </div>
            
            <input type = "text" :value = "fen" class = "form-control"/>
        </h5>
</template>

<style scoped>
@media(max-width: 575px) {
        .fen {
            height: 50px;
            width: 88vw;
        }
    }
    @media (min-width: 576px) {
        .fen {
            height: 80px;
            width: 45vw;
        }
        .deskFixed {
            position: fixed; 
            bottom: 15px;
            width: 48%;
        }
    }
</style>