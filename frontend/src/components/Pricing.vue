<template>
  <section class="pricing" aria-labelledby="pricing-title">
    <h1 id="pricing-title" class="title">Pricing</h1>

    <div class="cards">
      <!-- User plan -->
      <article
        class="card free"
        tabindex="0"
        aria-labelledby="plan-user"
        @mousemove="onCardMove"
        @mouseenter="onCardEnter"
        @mouseleave="onCardLeave"
      >
        <header class="card-header">
          <h2 id="plan-user" class="plan-name">User</h2>
          <p class="price">Free</p>
        </header>
        <ul class="features">
          <li>Real Time Connections</li>
          <li>Access To Bots</li>
          <li>Practice By Importing Any Position</li>
          <li>Join Coaching Classes And Get Personalised Training</li>
        </ul>
        <button class="choose-btn" type="button">Get started</button>
      </article>

      <!-- Admin plan -->
      <article
        class="card admin"
        tabindex="0"
        aria-labelledby="plan-admin"
        @mousemove="onCardMove"
        @mouseenter="onCardEnter"
        @mouseleave="onCardLeave"
      >
        <header class="card-header">
          <h2 id="plan-admin" class="plan-name">Admin</h2>
          <p class="price"><span class="currency">₹</span>50 <span class="alt">or $1</span><span class="unit"> per registered student</span></p>
        </header>
        <ul class="features">
          <li>Manage Coaching Classes</li>
          <li>Register Students</li>
          <li>Provide Personalized Training To Students Registered To Your Classes</li>
          <li>Manage Students According To Their Level</li>
        </ul>
        <button class="choose-btn" type="button">Start as Admin</button>
      </article>
    </div>

    <p class="disclaimer">Admin is billed at ₹50 or $1 per user registered to your coaching class.</p>
  </section>
</template>

<script>
export default {
  methods: {
    onCardEnter(e) {
      const el = e.currentTarget
      el.classList.add('is-tilting')
      el.style.setProperty('--z', '16px')
      el.style.setProperty('--scale', '1.02')
      // enable cursor shadow
      el.style.setProperty('--spot-opacity', '0.05')
    },
    onCardLeave(e) {
      const el = e.currentTarget
      el.classList.remove('is-tilting')
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--z', '0px')
      el.style.setProperty('--scale', '1')
      // hide cursor shadow
      el.style.setProperty('--spot-opacity', '0')
      el.style.setProperty('--mx', '-9999px')
      el.style.setProperty('--my', '-9999px')
    },
    onCardMove(e) {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const midX = rect.width / 2
      const midY = rect.height / 2
      const max = 6
      const ry = ((x - midX) / midX) * max
      const rx = -((y - midY) / midY) * max
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
      // update cursor position for radial shadow
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
  }
}
</script>

<style scoped>
.pricing {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  text-align: center;
  margin-top: 120px;
}
.title {
  margin: 0 0 16px;
  font-size: 28px;
  font-weight: 700;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin-top: 12px;
  perspective: 1200px;
}

.card {
  position: relative;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 18px 16px;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  transform-style: preserve-3d;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease, color 220ms ease;
  outline: none;
  --rx: 0deg;
  --ry: 0deg;
  --z: 0px;
  --scale: 1;
  --mx: -9999px;   /* mouse X (px) */
  --my: -9999px;   /* mouse Y (px) */
  --spot-opacity: 0; /* 0..1 shadow alpha */
  will-change: transform;
  transform: rotateX(var(--rx)) rotateY(var(--ry)) translateZ(var(--z)) scale(var(--scale));
}

/* circular cursor-follow shadow */
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0; /* fade in/out with class */
  transition: opacity 160ms ease;
  background: radial-gradient(
    circle 140px at var(--mx) var(--my),
    rgba(0, 0, 0, var(--spot-opacity)) 0%,
    rgba(0, 0, 0, 0) 60%
  );
}
.card.is-tilting::before { opacity: 1; }

.card:hover,
.card:focus-visible {
  /* amplify elevation on hover/focus; rotation comes from --rx/--ry */
  --z: 16px;
  --scale: 1.02;
  box-shadow: 0 16px 32px rgba(0,0,0,0.16);
  border-color: rgba(0,0,0,0.16);
}

.card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}
.plan-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}
.price {
  margin: 0;
  font-weight: 700;
  color: #111;
}
.price .currency { font-weight: 700; }
.price .alt {
  color: #666;
  font-weight: 500;
  margin-left: 6px;
}
.price .unit {
  color: #444;
  font-weight: 500;
  margin-left: 4px;
}

.features {
  margin: 10px 0 16px;
  padding-left: 18px;
}
.features li { margin: 6px 0; }

.choose-btn {
  /* base button */
  display: inline-block;
  border: 1px solid rgba(0,0,0,0.15);
  background: #fff;
  color: #111;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;
}
.choose-btn:hover,
.choose-btn:focus-visible {
  transform: translateZ(8px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
}

/* User (free) – green button */
.card.free { border-top: 4px solid #6a9e46; }
.card.free .choose-btn {
  background: #739552;
  color: #fff;
  border-color: #6a8f4d;
}
.card.free .choose-btn:hover,
.card.free .choose-btn:focus-visible {
  background: #5f7f44;
  border-color: #5a7a3f;
}

/* Admin – white card, black accents */
.card.admin {
  background: #ffffff;
  color: #111;
  border: 1px solid rgba(0,0,0,0.08);
  border-top: 4px solid #000000;
}
.card.admin .plan-name,
.card.admin .price {
  color: #111111;
}
.card.admin .price .alt,
.card.admin .price .unit {
  color: #444444;
}
.card.admin .features li {
  color: #222222;
}
.card.admin .choose-btn {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
}
.card.admin .choose-btn:hover,
.card.admin .choose-btn:focus-visible {
  background: #111111;
  border-color: #111111;
  color: #ffffff;
}

.disclaimer {
  margin-top: 10px;
  color: #555;
  font-size: 14px;
}

/* responsive tweaks */
@media (max-width: 480px) {
  .pricing { margin-top: 0; }
  .title { font-size: 24px; }
  .cards { gap: 14px; }
}
</style>