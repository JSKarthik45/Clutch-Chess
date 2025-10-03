<template>
	<div class="landing-container">
		<div class="landing-left">
			<h1 class="landing-title">
				<span class="clutch-text" id = "h1">Clutch</span>
				<span class="colour2 p-2 rounded-4" style = "color: white;" id = "h1">Chess</span>
			</h1>
			<div class="landing-desc" id = "h2">Find Chess Coaching Classes And Software To Extend Learning Even After Classes.</div>
			<div class="landing-buttons">
				<button ref = "b1" class="button-effect px-3 py-2 rounded-1" style = "background-color: rgb(115, 149, 82); color: white;" @click="goToPlay">Play</button>
				<button ref = "b2" class="button-effect px-3 py-2 rounded-1" style = "background-color: rgb(235, 236, 208);">Find Coaching Classes</button>
            </div>
		</div>
		<div class="landing-right">
			<img src="/images/BotPageImg.png" alt="Chess Board" class="landing-image" ref="image"/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
const hostname = "http://app." + window.location.hostname + ":3000"
function goToPlay() {
	window.location.href = hostname
}

const props = defineProps({
    t1: Object,
})

import { onMounted } from 'vue'
import { SplitText } from "gsap/all";
import { routeLocationKey } from "vue-router";

let image = ref(null);
let h1split = null;
let h2split = null;
let b1 = ref(null);
let b2 = ref(null);

onMounted(() => {
    props.t1.restart();
    props.t1.fromTo(image.value, {
        scale: 0, 
    }, {
        scale: 1, 
        duration: 2,
        ease: "power1.out",
    }, 1.5);
    h1split = SplitText.create("#h1", {
        type: "chars"
    })
    props.t1.fromTo(h1split.chars, {
        opacity: 0,
        x: -100,
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        stagger: 0.02, 
    }, 0);
    h2split = SplitText.create("#h2", {
        type: "words"
    })
    props.t1.fromTo(h2split.words, {
        opacity: 0,
        y: 100,
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        stagger: 0.02, 
    }, 0.5);
    props.t1.fromTo(b1.value, {
        opacity: 0,
        x: -120,
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "circ.in",
    }, 2.7);
    props.t1.fromTo(b2.value, {
        opacity: 0,
        x: -400,
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "circ.in",
    }, 1.7);
})
</script>



<style scoped>
.landing-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 80vh;
	padding: 2rem;
	box-sizing: border-box;
	gap: 2rem;
	margin-top: 80px; /* Space for navbar on desktop */
	overflow-x:hidden;
}

.landing-left {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	min-width: 250px;
	height: 100%;
}

.landing-title {
	font-size: 5rem;
	font-weight: 700;
	margin-bottom: 1rem;
	line-height: 1.1;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
.clutch-text {
	color: rgb(115, 149, 82); /* colour2 text color */
}
.chess-bg {
	background-color: rgb(190, 100, 48); /* colour2 commented bg color */
	color: #fff;
	padding: 0.2em 0.5em;
	border-radius: 8px;
	margin-left: 0.3em;
}

.landing-subtitle {
	font-size: 2rem;
	color: #333;
	margin-bottom: 0.5rem;
}

.landing-desc {
	font-size: 1.5rem;
	color: #666;
	margin-bottom: 1.5rem;
}

.landing-buttons {
	display: flex;
	gap: 1rem;
    font-size: 1.1rem;
}

/* Use only the user's button-effect class from main.css */


.landing-right {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 200px;
}

.landing-image {
    width: 48vw;
	height: auto;
	border-radius: 16px;
	box-shadow: 0 0 5px rgba(0,0,0,0.10);
}

@media (max-width: 900px) {
	.landing-container {
		flex-direction: column;
		padding: 1rem;
		gap: 1.5rem;
		margin-top: 0;
	}
	.landing-left, .landing-right {
		min-width: unset;
		width: 100%;
		align-items: center;
		text-align: center;
	}
	.landing-title {
		font-size: clamp(1.2rem, 6vw, 2.2rem);
		justify-content: center;
	}
	.landing-image {
		max-width: clamp(160px, 80vw, 380px);
	}
}

@media (max-width: 600px) {
	.landing-title {
		font-size: clamp(1rem, 8vw, 1.3rem);
	}
	.landing-subtitle {
		font-size: 1.1rem;
	}
	.landing-desc {
		font-size: 0.95rem;
	}
	.landing-image {
		max-width: clamp(120px, 90vw, 260px);
	}
	.landing-buttons {
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		align-items: center;
	}
	.landing-container {
		margin-top: 0;
	}
}
button:hover {
    transform: scale(1.1);
}
button {
    transition: transform 0.5s ease;
}
</style>