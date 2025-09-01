<script setup>
	import { ref, watch, onMounted, onUnmounted } from "vue";
  	import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
	import * as bootstrap from 'bootstrap';
  	import Clock from "@/components/Clock/Clock.vue";
    import Controls from "@/components/Clock/Controls.vue";
	import Toast from "@/components/Clock/Toast.vue";
	import Settings from "@/components/Clock/Settings.vue";

	let startingTime = ref(180);
	let startingNoOfMoves = ref(0);
	let startingIncrement = ref(0);

	let isCurrentPlayerWhite = ref(false);
	let noOfMoves = ref(startingNoOfMoves.value);
	let whiteRemTime = ref(startingTime.value);
	let blackRemTime = ref(startingTime.value);
	let increment = ref(startingIncrement.value);

	let isPaused = ref(false);
	let isMaximised = ref(false);

	const reInitGame = () => {
		isCurrentPlayerWhite.value = false;
		noOfMoves.value = startingNoOfMoves.value;
		whiteRemTime.value = startingTime.value;
		blackRemTime.value = startingTime.value;
		increment.value = startingIncrement.value;
		isPaused.value = false;
		startTime = 0;
		showToast("Reset");
	}

    const maximise = () => {
		let clock = document.getElementById("clock");
        clock.requestFullscreen();
		//document.documentElement.requestFullscreen();
        isMaximised.value = true;
		showToast("Maximised");
    };
    
    const minimise = () => {
        document.exitFullscreen();
        isMaximised.value = false;
		showToast("Minimised");
    };

	let isCurrentPlayerWhiteWhenPaused = null;
	const pause = () => {
		isCurrentPlayerWhiteWhenPaused = isCurrentPlayerWhite.value
		isCurrentPlayerWhite.value = undefined;
		isPaused.value = true;
		showToast("Paused");
	};

	const play = () => {
		isPaused.value = false;
		isCurrentPlayerWhite.value = isCurrentPlayerWhiteWhenPaused;
		showToast("Resumed");
	}
	
	let startTime = 0;
	let endTime = 0;
	let timeElapsed = 0;

	watch(isCurrentPlayerWhite, () => {
        noOfMoves.value != 0 ? startTime = new Date(Date.now()) : startTime = 0;
    });
	let inc;
	const changePlayer = (isWhite) => {
		endTime = new Date(Date.now());
		if(startTime != 0) {
			inc = increment.value;
			timeElapsed = (endTime - startTime) / 1000;
		}
		else {
			timeElapsed = 0;
			inc = 0;
		}  
		if(isWhite) {
			whiteRemTime.value -= timeElapsed;
			whiteRemTime.value += inc;
			isCurrentPlayerWhite.value = false;
		}
		else {
			blackRemTime.value -= timeElapsed;
			blackRemTime.value += inc;
			isCurrentPlayerWhite.value = true;
			noOfMoves.value += 1;
		}
	};

	let message = ref("");
	const showToast = (m) => {
		message.value = m;
        const toast = document.getElementById("toast");
        const toastObj = new bootstrap.Toast(toast);
        toastObj.show();
    };

	const changeSettings = (time, inc) => {
		startingTime.value = time;
		startingIncrement.value = inc;
		reInitGame();
	};

	const onFullscreenChange = () => {
		if (!document.fullscreenElement) {
			isMaximised.value = false;
		}
	};

	onMounted(() => {
		document.addEventListener('fullscreenchange', onFullscreenChange);
	});

	onUnmounted(() => {
		document.removeEventListener('fullscreenchange', onFullscreenChange);
	});

	const updateTime = (time) => {
		startingTime.value = time * 60;
		reInitGame();
	};

	const updateInc = (inc) => {
		startingIncrement.value = Number(inc);
		reInitGame();
	};

	const props = defineProps({
		t1: Object, 
	})

</script>

<template>
	<div style = "width: 100%; height: 100%;">
		<Clock :isCurrentPlayerWhite = "isCurrentPlayerWhite" :whiteRemTime = "whiteRemTime" :blackRemTime = "blackRemTime" @changePlayer = "changePlayer" class = "margin-top-desktop" :t1 = "t1">
			<Controls :isPaused = "isPaused" :isMaximised = "isMaximised" @maximise = "maximise" @minimise = "minimise" @reset = "reInitGame" @play = "play" @pause = "pause"/>
		</Clock>
		<Toast :message = "message"/>
		<Settings @clicked = "changeSettings" :time = "startingTime / 60" :inc = "startingIncrement" @timeChanged = "updateTime" @incChanged = "updateInc" class = "settings-container" :t1 = "t1"/>
	</div>
</template>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
	@media(min-width: 992px) {
        .margin-top-desktop {
            margin-top: 90px;
        }
    }
    @media(576px <= width <= 991px) {
        .margin-top-desktop {
            margin-top: 50px;
        }
		.settings-container {
			position: fixed;
			top: 0;
			left: 5;
			margin-left: 0px;
			width: 48vw;
		}
    }
	@media(min-width: 992px) {
		.settings-container {
			position: fixed;
			top: 0;
			left: 5;
			margin-left: 0px;
			width: 48vw;
		}
	}
	@media(max-width: 575px) {
		.settings-container {
			margin-left: 0px;
			width: 92vw;
		}
	}
</style>
