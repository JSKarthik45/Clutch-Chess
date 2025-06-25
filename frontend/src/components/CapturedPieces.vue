<script setup>
    const props = defineProps({
        capturedPieces: Array,
        player: String
    })
</script>

<template>
    <div class = "container-fluid d-flex">
        <div v-for = "piece in capturedPieces" class = "center">
            <img v-if = "piece.player === player" :src = "`/images/${piece.player}${piece.piece[0]}.png`" style = "width: 30px; height: 30px;"/>
        </div>
    </div>
</template>

<style scoped>

</style>