<script setup>
    import {ref, onMounted} from "vue";
    const props = defineProps({
        whiteRemTime: Number, 
        blackRemTime: Number,
        currentPlayer: String, 
        t1: Object, 
    })

    const formatTime = (time) => {
        let mins = Math.floor(time / 60);
        let secs = time % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    let clock = ref(null)

    onMounted(() => {
        props.t1.restart();
        props.t1.fromTo(clock.value, {
            opacity: 0,
            y: 100,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
        }, 0.5)
    })
</script>

<template>
    <div class = "container-fluid" ref = "clock" >
        <div class = "row clock gx-2 border rounded-5 my-2 p-2">
            <div class = "col center rounded-5" :class = "{'colour1' : currentPlayer === 'W'}" style = "padding-top: 3px;">
                <h5>
                    {{ formatTime(whiteRemTime) }}
                </h5>
            </div>
            <div class = "col center rounded-5" :class = "{'colour2' : currentPlayer === 'B'}" style = "padding-top: 3px;">
                <h5>
                    {{ formatTime(blackRemTime) }}
                </h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @media(max-width: 575px) {
        .clock {
            height: 50px;
            width: 88vw;
        }
    }
    @media (min-width: 576px) {
        .clock {
            height: 70px;
            width: 45vw;
        }
    }
</style>