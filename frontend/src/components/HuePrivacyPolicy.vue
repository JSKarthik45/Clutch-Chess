<template>
  <div class="privacy-wrapper">
    <main class="privacy-page">
      <h1 class="page-title">Privacy Policy</h1>
      <p class="last-updated">Last updated: March 1, 2026</p>

      <!-- ───────── App Privacy ───────── -->
      <section class="policy-section app-card">
        <div class="app-header">
          <div class="app-icon">🎨</div>
          <div>
            <h2 class="app-title">Hue: Artificial Color Detector</h2>
            <p class="app-tagline">Scan barcodes &amp; ingredients to detect harmful artificial colors banned globally.</p>
          </div>
        </div>

        <div class="app-description">
          <h3>About the App</h3>
          <p class="short-description">
            <strong>Hue: Artificial Color Detector</strong> helps you identify harmful artificial colors
            in food and other products by scanning barcodes or ingredient lists. It cross-references
            ingredients against a database of artificial colors that have been banned or restricted in
            countries around the world.
          </p>
          <p class="long-description">
            Simply point your camera at a barcode or ingredient label and Hue instantly highlights any
            artificial colors present — along with details on which countries have banned or restricted
            them and why. Make informed choices about what you consume without needing a chemistry degree.
          </p>
        </div>

        <div class="divider"></div>

        <h3>Privacy Policy — Hue: Artificial Color Detector</h3>

        <div class="policy-block">
          <h4>What data we collect</h4>
          <p>
            <strong>We collect no data whatsoever.</strong> Hue does not collect, store, or transmit any
            personal information, usage data, analytics, or device identifiers. No account or sign-up is
            required to use the app.
          </p>
        </div>

        <div class="policy-block">
          <h4>Camera &amp; barcode scanning</h4>
          <p>
            Hue uses your device camera solely to scan barcodes and ingredient labels in real time.
            Images and scan data are processed <strong>entirely on your device</strong> and are never
            uploaded to any server. No photos or scan history are stored anywhere — on-device or otherwise
            — once the scan is complete.
          </p>
        </div>

        <div class="policy-block">
          <h4>Where your data lives</h4>
          <p>
            All reference data (the list of artificial colors and their regulatory status) is bundled
            within the app itself. There are <strong>no server calls, no cloud storage, and no remote
            databases</strong> involved when you use Hue. Everything runs locally on your device.
          </p>
        </div>

        <div class="policy-block">
          <h4>Third-party sharing</h4>
          <p>
            We do not sell, share, rent, or transmit any user data to any third party, ever.
            There are no analytics SDKs, no advertising networks, and no crash-reporting services
            embedded in Hue.
          </p>
        </div>

        <div class="policy-block">
          <h4>Permissions</h4>
          <p>
            The app requests access to your device camera for barcode and label scanning. This permission
            is used exclusively for scanning and can be revoked at any time from your device settings.
            No other permissions are required.
          </p>
        </div>

        <div class="policy-block">
          <h4>Children's privacy</h4>
          <p>
            Because Hue collects no personal information of any kind, it is safe for users of all ages.
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
  padding-top: 4rem;
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
