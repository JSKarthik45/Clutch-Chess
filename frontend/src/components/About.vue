<script setup>
    import {ref, onMounted} from "vue";
    import { SplitText } from "gsap/all";
    const props = defineProps({
        t1: Object, 
    })
    let split;
    let headingsplit;

    onMounted(() => {
        split = SplitText.create("#content", { 
            type: "words",
        });
        headingsplit = SplitText.create("#heading", {
            type: "chars"
        })
        props.t1.restart();
        props.t1.fromTo(split.words, {
            opacity: 0,
            y: 100,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            stagger: 0.01, 
        }, 0.5);
        props.t1.fromTo(headingsplit.chars, {
            opacity: 0,
            x: -100,
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            stagger: 0.02, 
        }, 0.5);
    });
</script>

<template>
    <div style = "height: 80vh; display: flex; justify-content: center;" class = "mt-2">
        <div class = "widthcont">
            <h2 class = "text-center" id = "heading">
                ClutChess
            </h2>
            <h4 id = "content">
                Clutchess is a modern chess platform designed for enthusiasts of all levels. Play against the powerful Stockfish bot, challenge other players online, or hone your skills with our chess clock features and practice positions using FEN notation. Discover daily puzzles to sharpen your tactics and strategic thinking, making every session fresh and engaging. Whether training, competing, or exploring new scenarios, Clutchess offers all the tools needed for an immersive chess experience.
            </h4>
        </div>
    </div>
</template>

<style scoped>
    @media(max-width: 575px) {
        .widthcont {
            width: 100%;
        }
    }
    @media(min-width: 576px) {
        .widthcont {
            width: 80%;
        }
    }
</style>