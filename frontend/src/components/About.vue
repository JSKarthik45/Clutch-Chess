<script setup>
    import {ref, onMounted} from "vue";
    import { SplitText } from "gsap/all";
    const props = defineProps({
        t1: Object, 
    })
    let split;
    let headingsplit;

    import Navbar from "@/components/Navbar.vue";

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
        }, 1.5);
        props.t1.fromTo(headingsplit.chars, {
            opacity: 0,
            x: -100,
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            stagger: 0.02, 
        }, 1);
        props.t1.fromTo("#cont", {
            opacity: 0,
            scale: 0, 
        }, {
            opacity: 1,
            scale: 1,
            duration: 1, 
            ease: "power1.out",
        }, 0);
        props.t1.fromTo("#feedback", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
        }, 3);
    });
</script>

<template>
    <div style = "display: flex; justify-content: center;" class = "center contain dynamic-gradient mt-2 me-3 rounded-3 pt-4" id = "cont">
        <div class = "widthcont">
            <h2 class = "text-center" id = "heading">
                ClutChess
            </h2>
            <h5 id = "content" style="text-align: justify;">
                Clutchess is a chess software designed for enthusiasts to practice and improve their skills. Easily import any board position using FEN to continue your practice from that exact setup. Enjoy fast and seamless connections by joining the same room number to play with other players. When you're alone, challenge yourself by playing against the bot.            
            </h5>
            <br/>
        </div>
    </div>
    <div style = "display: flex; justify-content: center;" class = "center contain dynamic-gradient mt-2 me-3 rounded-3 pt-4" id = "cont">
        <div class = "widthcont">
            <h5 class = "text-center" id = "heading">
                User History
            </h5>
            <p id = "content" style="text-align: justify;">
                Number Of Games Played Against Bot: 
                <br/>
                Number Of Games Won Against Bot: 
                <br/>
                Number Of Games Played Against Friends: 
                <br/>
                Number Of Games Won Against Friends: 
                <br/>
            </p>
            <br/>
        </div>
    </div>
</template>

<style scoped>
    @media(max-width: 575px) {
        .widthcont {
            width: 100%;
        }
        .contain {
            height: auto; 
            margin: 0px;
        }
    }
    @media(min-width: 576px) {
        .widthcont {
            width: 80%;
        }
        .contain {
            height: auto; 
        }
    }
    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .dynamic-gradient {
        background: linear-gradient(
            270deg,
            rgb(235, 236, 208),
            rgb(150, 180, 100),
            rgb(180, 210, 140),  
            rgb(115, 149, 82),
            rgb(120, 160, 70)
        );
        background-size: 1400% 1400%;  /* expanded size for slower/higher variation */
        animation: gradientShift 10s ease infinite; /* faster animation (3s) */
    }
</style>