<template>
  <section class="soon" aria-live="polite">
    <!-- Full-width subtle band (no cards) -->
    <div class="band">
      <div class="container">
        <span class="badge">Coming soon</span>
        <h1 class="title">Dashboard is in progress</h1>
        <p class="lede">We're building the new Dashboard experience. It will be available before 2026 — please check back soon.</p>
      </div>
    </div>

    <!-- Plain content section -->
    <div class="container">
      <h2 class="section-title">Try the App in the meantime</h2>
      <p class="muted">You can jump into chess right now:</p>
      <ul class="features">
        <li>Play a bot or challenge a friend</li>
        <li>Practice positions with FEN imports</li>
        <li>Use a configurable chess clock</li>
      </ul>
      <RouterLink class="btn" to="/app" aria-label="Go to the App">Go to App</RouterLink>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.soon { padding: 24px 12px; margin-top: 96px; }
.container { max-width: 960px; margin: 0 auto; }
.band { background: linear-gradient(135deg, rgba(115,149,82,0.08), rgba(115,149,82,0.02)); padding: 20px 0; }
.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .4px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(115,149,82,0.12);
  color: rgb(54, 70, 39);
  border: 1px solid rgba(115,149,82,0.35);
}
.title {
  margin: 8px 0 6px;
  font-size: 26px;
  font-weight: 800;
}
.lede { margin: 0; color: #444; }
.section-title { margin: 16px 0 4px; font-size: 18px; font-weight: 700; }
.muted { margin: 0 0 10px; color: #555; }
.features { margin: 0 0 14px; padding-left: 16px; }
.features li { margin: 6px 0; }

.btn {
  display: inline-block;
  background: rgb(115, 149, 82);
  border: 1px solid rgb(115, 149, 82);
  color: #fff;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 8px;
  text-decoration: none;
}
.btn:hover { filter: brightness(0.95); }

@media (max-width: 520px) {
  .title { font-size: 22px; }
}
</style>
