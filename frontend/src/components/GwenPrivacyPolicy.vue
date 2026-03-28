<template>
  <div class="privacy-wrapper">
    <main class="privacy-page">
      <h1 class="page-title">Gwen AI Privacy Policy</h1>
      <p class="last-updated">Last updated: March 28, 2026</p>

      <section class="policy-section app-card">
        <div class="app-header">
          <div class="app-icon">⚡</div>
          <div>
            <h2 class="app-title">Gwen AI</h2>
            <p class="app-tagline">Multi-agent AI that turns your idea into an Expo React Native MVP.</p>
          </div>
        </div>

        <div class="policy-block">
          <h3>1. Data Collection & Processing</h3>
          <p><strong>Zero data retention.</strong> Prompts are processed only to generate your app.</p>
          <p>
            <strong>User prompts.</strong> When you enter a prompt, it is sent to backend servers hosted at
            SASTRA University for real-time codebase generation via multi-agent AI. Processing happens in
            volatile memory (RAM) and is deleted immediately after the codebase is created and pushed to GitHub.
          </p>
          <p>
            We do not store your prompts, identity, or generated code on local servers once generation is finished.
          </p>
        </div>

        <div class="policy-block">
          <h3>2. User Accounts & Identification</h3>
          <p><strong>No logins.</strong> Gwen AI does not require an account, email, or name.</p>
          <p>
            <strong>No third-party logins.</strong> We do not use Google or GitHub sign-in. Automated agents
            handle the GitHub connection for storing the generated codebase; you do not provide your own credentials.
          </p>
        </div>

        <div class="policy-block">
          <h3>3. Data Storage</h3>
          <p><strong>Local-only.</strong> Any app state or preferences stay in your device cache.</p>
          <p>
            <strong>User control.</strong> To remove app traces, clear the app cache or uninstall the app from your phone.
          </p>
        </div>

        <div class="policy-block">
          <h3>4. Third-Party Services</h3>
          <p>
            <strong>GitHub.</strong> Generated codebases are hosted on GitHub and are subject to GitHub terms and privacy policy.
          </p>
          <p>
            <strong>Expo.</strong> We provide an Expo QR code for preview. Scanning with Expo Go routes traffic through Expo's
            services under Expo's Privacy Policy.
          </p>
        </div>

        <div class="policy-block">
          <h3>5. Security</h3>
          <p>
            All communication between your device and SASTRA servers is encrypted via HTTPS to keep prompts private
            during generation.
          </p>
        </div>

        <div class="policy-block">
          <h3>Contact</h3>
          <p>Questions about privacy? Email <a class="email-link" href="mailto:privacy@gwen.ai">privacy@gwen.ai</a>.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Static policy content only.
</script>

<style scoped>
.privacy-wrapper {
  min-height: 100vh;
  background: #0f1115;
  color: #e6e8ed;
  font-family: 'Poppins', sans-serif;
  padding: 3rem 1rem 4rem;
}

.privacy-page {
  max-width: 820px;
  margin: 0 auto;
  padding-top: 3rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.3rem;
  color: #ffffff;
}

.last-updated {
  font-size: 0.82rem;
  color: #6c737f;
  margin: 0 0 1.8rem;
}

.policy-section {
  background: #161a21;
  border: 1px solid #1f2630;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.app-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  color: #fff;
  border-radius: 14px;
  font-size: 1.8rem;
  box-shadow: 0 10px 22px rgba(63, 99, 233, 0.4);
}

.app-title {
  margin: 0 0 0.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #f5f7fb;
}

.app-tagline {
  margin: 0;
  font-size: 0.9rem;
  color: #9ba3b4;
}

.policy-block {
  margin-top: 1.4rem;
  padding-top: 1rem;
  border-top: 1px solid #1f2630;
}

.policy-block:first-of-type {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.policy-block h3 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #dce2ed;
}

.policy-block p {
  margin: 0.45rem 0;
  line-height: 1.6;
  color: #c5ccda;
}

.email-link {
  color: #8ab4ff;
  text-decoration: underline;
}

.email-link:hover {
  color: #b4cbff;
}
</style>
