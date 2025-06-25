<script setup>
    const emit = defineEmits(['clicked']);

    const props = defineProps({
        rank: String,
        file: Number,
        piece: Object,
    });
    
    const emitfn = () => {
        emit("clicked", props.rank, props.file);
    };

    const mouseenter = (event) => {
        event.target.style.backgroundColor = "lightblue";
    }

    const mouseleave = (event) => {
        event.target.style.backgroundColor = "white";
    }

    const sqrClr = () => {
        return ((props.file + props.rank.charCodeAt(0)) % 2 === 0);
    }

</script>

<template>
    <div @click = "emitfn" @mouseenter="mouseenter" @mouseleave="mouseleave" style = "width: 100%; height: 100%;">
        <img class = "center p-2" id = "img" v-if = "props.piece != undefined" :src = "`/images/${props.piece.player}${props.piece.piece[0]}.png`" style = "width: 100%; height: 100%;" :class = "sqrClr() ? 'colour1' : 'colour2'"/>
        <div v-else style = "width: 100%; height: 100%;" :class = "sqrClr() ? 'colour1' : 'colour2'"></div>
    </div>
</template>

<style scoped>
</style>