<template>
	<div class="landing-container">
		<div class="landing-left">
			<h1 class="landing-title">
				<span class="clutch-text" id = "h1">Clutch</span>
				<span class="colour2 p-2 rounded-4 chess-badge" style = "color: white;" id = "h1">
					Chess
					<!-- slide-in icon (no layout shift) -->
					<img class="chess-icon" src="/images/ClutChess.svg" alt="" aria-hidden="true" />
				</span>
			</h1>
			<div class="landing-desc" id = "h2">Find Chess Coaching Classes And Software To Extend Learning Even After Classes.</div>
			<div class="landing-buttons">
				<button ref = "b1" class="button-effect px-3 py-2 rounded-1" style = "background-color: rgb(115, 149, 82); color: white;" @click="goToPlay">Play</button>
				<button ref = "b2" class="button-effect px-3 py-2 rounded-1" style = "background-color: rgb(235, 236, 208);" @click="goToFind">Find Coaching Classes</button>
            </div>
		</div>
		<div class="landing-right">
			<video
				src="/images/ClutchessDemo.mp4"
				alt="Clutchess demo"
				class="landing-image"
				ref="image"
				autoplay
				muted
				loop
				playsinline
				preload="metadata"
			></video>
		</div>
	</div>
		<!-- Bento Grid Start -->
		<div class="bento-grid">
			<div class="bento-row">
				<div class="bento-item bento-item-large">
					<img src="/images/BotPageImg.png" alt="Bento 1" loading="lazy" />
				</div>
				<div class="bento-item bento-item-small">
					<img src="/images/AppPhone.jpg" alt="Bento 2" loading="lazy" />
				</div>
			</div>
			<div class="bento-row">
				<div class="bento-item bento-item-small">
					<img src="/images/ClockPhone.jpg" alt="Bento 3" loading="lazy" />
				</div>
				<div class="bento-item bento-item-large">
					<iframe title="Clutch Chess locations map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d111907.67443893717!2d80.17666711100043!3d12.986511802368824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1761154095609!5m2!1sen!2sin" width="950" height="100%" style="border-radius: 10px; padding: 5px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="site-footer">
			<div class="footer-inner">
				<div class="brand">
					<span class="logo-dot" aria-hidden="true"></span>
					<span class="brand-name">Clutch Chess</span>
				</div>
				<nav class="footer-nav" aria-label="Footer">
					<a href="/" class="f-link">Home</a>
					<a href="/pricing" class="f-link">Pricing</a>
					<a href="/find" class="f-link">Find Classes</a>
					<a href="/app/bot" class="f-link">Play Bot</a>
					<a href="/app/friend" class="f-link">Play Friend</a>
				</nav>
				<div class="legal">© {{ new Date().getFullYear() }} Clutch Chess. All rights reserved.</div>
			</div>
		</footer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function goToPlay() {
	router.push('/app')
}
function goToFind() {
	router.push('/find')
}

const props = defineProps({
	t1: Object,
	isReady: { type: Boolean, default: false },
})

import { onMounted } from 'vue'
import { SplitText } from "gsap/all";
import { routeLocationKey } from "vue-router";

let image = ref(null);
let h1split = null;
let h2split = null;
let b1 = ref(null);
let b2 = ref(null);

let ran = false;
function runAnimations() {
	if (ran || !props.t1) return; // ensure it runs only once
	ran = true;
	props.t1.restart();
	props.t1.fromTo(image.value, {
		scale: 0,
	}, {
		scale: 1,
		duration: 2,
		ease: "power1.out",
	}, 1.5);
	h1split = SplitText.create("#h1", { type: "chars" })
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
	h2split = SplitText.create("#h2", { type: "words" })
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
	}, 1.5);
	props.t1.fromTo(b2.value, {
		opacity: 0,
		x: -400,
	}, {
		x: 0,
		opacity: 1,
		duration: 1,
		ease: "circ.in",
	}, 0.5);
}

onMounted(() => {
	// Run immediately if app is already ready; otherwise wait for isReady flip
	if (props.isReady) runAnimations();
})

watch(() => props.isReady, (v) => {
	if (v) runAnimations();
})
</script>

<style>
/* Prevent horizontal scroll globally */
html, body {
	overflow-x: hidden !important;
	max-width: 100vw;
}
</style>

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
	overflow-x: hidden;
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
	border-radius: 10px;
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
		max-width: clamp(240px, 92vw, 640px);
		width: 100%;
	}
}

@media (max-width: 600px) {
	.landing-title {
		/* Larger heading on phones */
		font-size: clamp(1.8rem, 9vw, 2.4rem);
	}
	.landing-subtitle {
		font-size: 1.1rem;
	}
	.landing-desc {
		/* Larger tagline on phones */
		font-size: 1.2rem;
		line-height: 1.4;
	}
	.landing-image {
		/* Fully visible video on phones without cropping */
		width: 100%;
		max-width: 100%;
		aspect-ratio: 16 / 9;
		height: auto;
		object-fit: contain;
		background: #000; /* letterbox background if needed */
	}
	.landing-buttons {
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		align-items: stretch;
	}
	.landing-container {
		margin-top: 0;
		/* reduce side padding so media can breathe */
		padding-left: 0;
		padding-right: 0;
	}
	.landing-buttons button {
		/* Slightly smaller buttons on phones */
		width: 100%;
		padding: 0.7rem 0.9rem;
		font-size: 0.95rem;
	}
}
button:hover {
    transform: scale(1.1);
}
button {
    transition: transform 0.5s ease;
    touch-action: manipulation;
}
/* Bento Grid Styles */
.bento-grid {
	width: 72%;
	max-width: 72vw;
	margin: 0 auto 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow-x: hidden;
}
.bento-row {
	display: flex;
	gap: 1rem;
	overflow-x: hidden;
}
.bento-item {
	background: rgba(0, 0, 0, 1);
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 2px 0 0 rgba(0, 0, 0, 0.1);
}
.bento-item img {
	border-radius: 10px;
	padding: 5px;
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}
.bento-item-large {
	flex: 4;
	min-height: 180px;
}
.bento-item-small {
	flex: 1;
	min-height: 140px;
}
/* ensure iframe scales with the smaller cards */
.bento-item iframe {
	width: 100% !important;
	height: auto;
	aspect-ratio: 16 / 9;
	min-height: 180px;
	display: block;
}

@media (max-width: 900px) {
	.bento-grid {
		gap: 1rem;
	}
	.bento-row {
		gap: 1rem;
	}
	.bento-item-large, .bento-item-small {
		min-height: 100px;
	}
}
@media (max-width: 600px) {
	.bento-grid {
		gap: 0.5rem;
		/* Smaller bento grid on phones */
		width: 88%;
		max-width: 88vw;
	}
	.bento-row {
		flex-direction: column;
		gap: 0.5rem;
	}
	.bento-item-large { min-height: 120px; }
	.bento-item-small { min-height: 64px; }
	.bento-item iframe { min-height: 120px; }
	.bento-item img { padding: 3px; }
}

/* Chess badge styles */
.chess-badge {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	overflow: hidden; /* keep icon inside rounded box */
}

/* disable previous pseudo-element approach */
.chess-badge::after { display: none !important; }

/* icon centered and slower animation */
.chess-icon {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 1.2em;     /* tie to font size for consistent scale */
	height: 1.2em;
	transform: translate(-50%, 140%); /* start below center */
	opacity: 0;
	pointer-events: none;
	transition: transform 420ms cubic-bezier(.22,.61,.36,1), opacity 360ms ease; /* slower in/out */
	filter: drop-shadow(0 2px 2px rgba(0,0,0,0.25));
	z-index: 1; /* ensure above (transparent) text */
}

/* hide text and show icon while hovering */
.chess-badge:hover { color: transparent !important; }
.chess-badge:hover .chess-icon {
	transform: translate(-50%, -50%); /* end centered */
	opacity: 1;
}

/* Disable hover-dependent effect on touch devices so text doesn't disappear */
@media (hover: none) {
  .chess-badge { color: inherit !important; }
  .chess-badge .chess-icon { opacity: 0; transform: translate(-50%, 140%); }
}

/* Footer */
.site-footer {
  margin-top: 48px;
  background: #ffffff;
  color: #000000;
  border-top: 3px solid rgb(115, 149, 82);
}
.footer-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 16px 28px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  text-align: center;
}
.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(115, 149, 82);
  box-shadow: 0 0 0 3px rgba(115,149,82,0.15);
}
.brand-name { color: #000000; }

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 18px;
  justify-content: center;
}
.f-link {
  color: #000000;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 6px;
  transition: color .2s ease, background-color .2s ease, transform .2s ease;
}
.f-link:hover,
.f-link:focus-visible {
  color: #ffffff;
  background: rgba(0, 0, 0, 0.95);
  outline: none;
  transform: translateY(-1px);
}

.legal {
  color: #000000;
  font-size: 13px;
}

/* responsive */
@media (min-width: 720px) {
  .footer-inner {
    grid-template-columns: auto 1fr auto;
    align-items: center;
    text-align: left;
  }
  .brand { justify-content: start; }
  .footer-nav { justify-content: center; }
  .legal { justify-self: end; }
}
</style>