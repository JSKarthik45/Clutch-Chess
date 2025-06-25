<script setup>
    const props = defineProps({
        whiteRemTime: Number, 
        blackRemTime: Number,
        currentPlayer: String, 
    })

    const formatTime = (time) => {
        let mins = Math.floor(time / 60);
        let secs = time % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
</script>

<template>
    <div class = "container-fluid">
        <div class = "row clock gx-2 border rounded-5 my-2 p-2">
            <div class = "col center rounded-5" :class = "{'colour1' : currentPlayer === 'W'}">
                <h5>
                    {{ formatTime(whiteRemTime) }}
                </h5>
            </div>
            <div class = "col center rounded-5" :class = "{'colour2' : currentPlayer === 'B'}">
                <h5>
                    {{ formatTime(blackRemTime) }}
                </h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .clock {
        height: 70px;
    }
</style>