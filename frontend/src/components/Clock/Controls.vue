<script setup>
    const emit = defineEmits(["reset", "pause", "play", "maximise", "minimise"]);

    const props = defineProps({
        isPaused: Boolean, 
        isMaximised: Boolean, 
    });

</script>

<template>
    <div class = "center" style = "height: 100%">
        <div class = "row controls-container">
            <div class = "col center">
                <img v-if = "isPaused" src = "/images/gravity-ui--play-fill.svg" alt = "Play" class = "btn btn-primary" @click = "$emit('play')"/>
                <img v-else src = "/images/solar--pause-bold.svg" alt = "Pause" class = "btn btn-primary" @click = "$emit('pause')"/>
            </div>
            <div class = "col center">
                <img src = "/images/bx--reset.svg" alt = "Reset" class = "btn btn-primary" @click = "$emit('reset')"/>
            </div>
            <div class = "col center">
                <img v-if = "isMaximised" src = "/images/charm--screen-minimise.svg" alt = "Minimise" class = "btn btn-primary" @click = "$emit('minimise')"/>
                <img v-else src = "/images/fluent--full-screen-maximize-28-filled.svg" alt = "Maximise" class = "btn btn-primary" @click = "$emit('maximise')"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .btn {
        width: 100px;
        background-color: white;
        border: none;
    }
    .btn:hover {
        background-color: rgb(149, 149, 224);
        box-shadow: 0 0 3px black;
    }
    @media (max-width: 991px) { /* Phone */
        .controls-container {
            width: 100%;
            height: 80%;
        }
        .btn {
            width: 50px;
            border: none;
        }
    }
    @media (min-width: 992px) { /* Desktop */
        .controls-container {
            width: 65%;
            height: 90%;
        }
        .btn {
            width: 100px;
            background-color: white;
            border: none;
        }
    }
    .controls-container {
        border-radius: 50px;
        padding: 0px;
        margin: 0px;
        transition: box-shadow 1s ease-out;
    }
    .controls-container:hover {
        box-shadow: 0 0 5px black;
    }
</style>