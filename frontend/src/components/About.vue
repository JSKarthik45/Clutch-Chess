<script setup>
    import {ref, onMounted} from "vue";
    import { SplitText } from "gsap/all";
    const props = defineProps({
        t1: Object, 
    })
    let split;
    let split2
    let headingsplit;
    let headingsplit2

    import Navbar from "@/components/Navbar.vue";

    onMounted(() => {
        split = SplitText.create("#content", { 
            type: "words",
        });
        split2 = SplitText.create("#content2", { 
            type: "words",
        });
        headingsplit = SplitText.create("#heading", {
            type: "chars"
        })
        headingsplit2 = SplitText.create("#heading2", {
            type: "words"
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
        props.t1.fromTo(split2.words, {
            opacity: 0,
            y: 100,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            stagger: 0.01, 
        }, 2.5);
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
        props.t1.fromTo(headingsplit2.words, {
            opacity: 0,
            x: -100,
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            stagger: 0.02, 
        }, 2.5);
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
    let nooffriend = ref(localStorage.getItem("friend") || 0);
    let noofbot = ref(localStorage.getItem("bot") || 0);
</script>

<template>
    <div style="display: flex; justify-content: center; position: relative;" class="contain mt-2 me-3 rounded-3 pt-4" id="cont">
        <div class="widthcont">
            <h2 class="text-center" id="heading">
                Clutch Chess
            </h2>
            <h5 id="content" style="text-align: justify;">
                Clutch Chess is a chess software designed for players to practice, improve, and enjoy fast online games. Play with friends by joining the same room or challenge yourself against a smart chess bot. Easily import any board position using FEN to continue your practice exactly from where you left off.
            </h5>
            <br/>
            <h5 class="text-center" id="heading2">
                User History
            </h5>
            <p id="content2" style="text-align: justify;">
                Total Number of Games Played: {{ parseInt(nooffriend) + parseInt(noofbot) }}
                <br/>
                Number Of Games Played Against Bot: {{ noofbot }}
                <br/>
                Number Of Games Played Against Friends: {{ nooffriend }}
                <br/>
            </p>
            <div class="product-hunt-badge-wrapper">
                <a href="https://www.producthunt.com/products/clutchess?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-clutchess" target="_blank">
                    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1016930&theme=dark&t=1758047801580" alt="CLUTCHESS - Connect&#0044;&#0032;Play&#0044;&#0032;and&#0032;Sharpen&#0032;Your&#0032;Skills | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media(max-width: 575px) {
    .widthcont {
        width: 100%;
    }
    .contain {
        height: 100vh;
        margin: 0px;
    }
    .product-hunt-badge-wrapper {
        display: flex;
        justify-content: center;
        position: static;
        margin-top: 40px;
        margin-bottom: 0;
        width: 100%;
    }
}
@media(min-width: 576px) {
    .widthcont {
        width: 80%;
    }
    .contain {
        height: 80vh;
    }
    .product-hunt-badge-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 20px;
        display: flex;
        justify-content: center;
        width: 100%;
        z-index: 2;
        margin-top: 0;
        margin-bottom: 0;
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
    background-size: 1400% 1400%;
    animation: gradientShift 10s ease infinite;
}
</style>