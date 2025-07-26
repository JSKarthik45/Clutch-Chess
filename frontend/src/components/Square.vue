<script setup>
    const emit = defineEmits(['clicked']);

    const props = defineProps({
        rank: String,
        file: Number,
        piece: Object,
        t1: Object, 
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
    <div @click = "emitfn" style = "width: 100%; height: 100%;"  :class = "sqrClr() ? 'colour1' : 'colour2'" class = "center draggable" draggable = "true" @dragstart="emitfn" @drop = "emitfn" @dragover.prevent>
        <img id = "img" v-if = "props.piece != undefined" :src = "`/images/${props.piece.player}${props.piece.piece[0]}.png`" @mouseenter="mouseenter" @mouseleave="mouseleave"/>
        <div v-else style = "width: 100%; height: 100%;" :class = "sqrClr() ? 'colour1' : 'colour2'" draggable = "false">&nbsp;</div>
    </div>
</template>

<style scoped>
    @media(max-width: 575px) {
        #img {
            height: 90%;
            width: 90%;
        }
    }
    @media(min-width: 576px) {
        #img {
            height: 75%;
            width: 75%;
        }
    }
</style>