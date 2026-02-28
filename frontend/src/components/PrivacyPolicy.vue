<template>
  <div class="privacy-wrapper">
    <main class="privacy-page">
      <h1 class="page-title">Privacy Policy</h1>
      <p class="last-updated">Last updated: March 1, 2026</p>

      <!-- ───────── App Privacy ───────── -->
      <section class="policy-section app-card">
        <div class="app-header">
          <div class="app-icon">♟</div>
          <div>
            <h2 class="app-title">Chess Screen Time - Puzzles</h2>
            <p class="app-tagline">Break the scroll habit. Train your mind instead.</p>
          </div>
        </div>

        <div class="app-description">
          <h3>About the App</h3>
          <p class="short-description">
            <strong>Chess Screen Time - Puzzles</strong> replaces mindless doomscrolling with chess puzzle training
            — delivered in the same swipe-up, short-form infinite-scroll format your brain is already wired to love.
          </p>
          <p class="long-description">
            Most screen-time blockers just lock you out. Chess Screen Time - Puzzles works with your habit, not against it.
            When you pick up your phone during the no-scroll hours you set yourself, instead of opening
            Instagram or TikTok, you get an infinite feed of chess puzzles — one per card, swipe to the
            next. The cue is the same (phone pickup), the action is the same (swipe), but the reward is
            real cognitive training instead of a dopamine drizzle that leaves you emptier than before.
            Over time this quietly rewires the <em>cue → action → reward</em> loop from doomscrolling
            to chess improvement.
          </p>
        </div>

        <div class="divider"></div>

        <h3>Privacy Policy — Chess Screen Time - Puzzles</h3>

        <div class="policy-block">
          <h4>What data we collect</h4>
          <p>
            <strong>We collect no personal data whatsoever.</strong> Chess Screen Time - Puzzles does not ask for your
            name, email address, phone number, or any account credentials to function.
          </p>
        </div>

        <div class="policy-block">
          <h4>Where your data lives</h4>
          <p>
            All app data — your no-scroll schedule, puzzle progress, streaks, and settings — is stored
            exclusively <strong>on your own device</strong> using local on-device storage. Nothing is
            uploaded to our servers or any third-party servers.
          </p>
        </div>

        <div class="policy-block">
          <h4>What Supabase is used for</h4>
          <p>
            The app connects to <strong>Supabase</strong> solely to <em>download chess puzzles</em> to
            your device for display. This is a one-way read-only fetch — puzzle content is pulled to
            your phone; nothing from your phone is ever sent back. No identifiers (not even an anonymous
            device ID) are included in these requests beyond what a standard HTTPS connection requires.
          </p>
        </div>

        <div class="policy-block">
          <h4>Third-party sharing</h4>
          <p>
            We do not sell, share, rent, or transmit any user data to any third party, ever.
            There are no analytics SDKs, no advertising networks, and no crash-reporting services
            embedded in Chess Screen Time - Puzzles.
          </p>
        </div>

        <div class="policy-block">
          <h4>Permissions</h4>
          <p>
            The app may request permission to send you focus-reminder notifications. This is entirely
            optional and can be revoked at any time from your device settings. Notification scheduling
            is handled locally on your device — no notification tokens or IDs are sent to any server.
          </p>
        </div>

        <div class="policy-block">
          <h4>Children's privacy</h4>
          <p>
            Because Chess Screen Time - Puzzles collects no personal information, it is safe for users of all ages.
            We do not knowingly collect data from children under 13 or under any applicable age threshold
            in your jurisdiction.
          </p>
        </div>

        <div class="policy-block">
          <h4>Changes to this policy</h4>
          <p>
            If the data practices described above ever change, we will update this page and bump the
            "Last updated" date at the top. Continued use of the app after such changes constitutes
            acceptance of the revised policy.
          </p>
        </div>

        <div class="policy-block">
          <h4>Contact</h4>
          <p>
            Questions about privacy? Reach us at
            <a href="mailto:privacy@clutchchess.com" class="email-link">privacy@clutchchess.com</a>.
          </p>
        </div>
      </section>


    </main>
  </div>
</template>

<script setup>
// No data collection — nothing to set up.
</script>

<style scoped>
.privacy-wrapper {
  min-height: 100vh;
  background: #0d0d0d;
  color: #e8e8e8;
  font-family: 'Poppins', sans-serif;
  padding: 3rem 1rem 4rem;
}

/* ── layout ── */
.privacy-page {
  max-width: 780px;
  margin: 0 auto;
  padding-top: 2rem;
}

.policy-section {
  margin-bottom: 3rem;
}

/* ── headings ── */
.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 0.2rem;
  color: #ffffff;
}

.last-updated {
  font-size: 0.78rem;
  color: #555;
  margin: 0 0 1.8rem;
}

/* ── app card ── */
.app-card {
  background: #161616;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 2rem;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.app-icon {
  font-size: 2.4rem;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.app-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 0.15rem;
  color: #fff;
}

.app-tagline {
  font-size: 0.82rem;
  color: #888;
  margin: 0;
}

.app-description h3,
.policy-section h2,
.policy-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #ccc;
  margin: 0 0 0.5rem;
}

.short-description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #c8c8c8;
  margin: 0 0 0.75rem;
}

.long-description {
  font-size: 0.88rem;
  line-height: 1.75;
  color: #999;
  margin: 0;
}

.divider {
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 1.75rem 0;
}

/* ── policy blocks ── */
.policy-block {
  margin-bottom: 1.4rem;
}

.policy-block h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e0e0e0;
  margin: 0 0 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.policy-block p,
.policy-section p {
  font-size: 0.88rem;
  line-height: 1.75;
  color: #999;
  margin: 0;
}

.email-link {
  color: #7ec8e3;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}
</style>
