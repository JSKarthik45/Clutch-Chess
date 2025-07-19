<script setup>
    const props = defineProps({
        capturedPieces: Array,
        player: String
    })
</script>

<template>
    <div class = "container-fluid d-flex">
        <div v-for = "piece in capturedPieces" class = "center">
            <img v-if = "piece.player === player" :src = "`/images/${piece.player}${piece.piece[0]}.png`"/>
        </div>
        &nbsp;
    </div>
</template>

<style scoped>
    @media(max-width: 575px) {
        img {
            width: 20px;
            height: 20px;
        }
    }
    @media(min-width: 576px) {
        img {
            width: 30px;
            height: 30px;
        }
    }
</style>