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
        event.target.style.height = "80%";
        event.target.style.width = "80%";
        event.target.parentNode.style.position = "relative"
        event.target.parentNode.style.zIndex = "1";
        event.target.parentNode.style.boxShadow = "0 0 1px rgb(0, 0, 0)";

    }

    const mouseleave = (event) => {
        event.target.style.height = "75%";
        event.target.style.width = "75%";
        event.target.parentNode.style.boxShadow = "none";
        event.target.parentNode.style.zIndex = "auto";
    }

    const sqrClr = () => {
        return ((props.file + props.rank.charCodeAt(0)) % 2 === 0);
    }

</script>

<template>
    <div @click = "emitfn" style = "width: 100%; height: 100%;"  :class = "sqrClr() ? 'colour1' : 'colour2'" class = "center">
        <img id = "img" v-if = "props.piece != undefined" :src = "`/images/${props.piece.player}${props.piece.piece[0]}.png`" style = "width: 75%; height: 75%;" @mouseenter="mouseenter" @mouseleave="mouseleave" draggable = "true" @dragstart="emitfn" @drop = "emitfn" @dragover.prevent/>
        <div v-else style = "width: 100%; height: 100%;" :class = "sqrClr() ? 'colour1' : 'colour2'">&nbsp;</div>
    </div>
</template>

<style scoped>
</style>