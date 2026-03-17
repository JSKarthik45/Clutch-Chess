<template>
  <div class="privacy-wrapper">
    <main class="privacy-page">
      <h1 class="page-title">Privacy Policy</h1>
      <p class="last-updated">Last updated: March 17, 2026</p>

      <section class="policy-section app-card">
        <!-- App Header -->
        <div class="app-header">
          <div class="app-icon">🚫📱</div>
          <div>
            <h2 class="app-title">NoScroll — Chess Focus</h2>
            <p class="app-tagline">Block social media. Train your mind with chess puzzles instead.</p>
          </div>
        </div>

        <!-- 1. Introduction -->
        <div class="policy-block">
          <h4>Introduction</h4>
          <p>
            This Privacy Policy applies to the <strong>NoScroll: Chess Screen Time</strong> Android application
            developed by <strong>J S Karthik</strong> (contact:
            <a href="mailto:jskarthik45@gmail.com" class="email-link">jskarthik45@gmail.com</a>).
            This policy is effective as of <strong>March 17, 2026</strong> and governs how the app handles
            your data. By using the app you agree to the practices described here.
          </p>
        </div>

        <div class="divider"></div>

        <!-- 2. Data Collected -->
        <h3>Data Collected</h3>
        <p class="section-intro">
          The following data is stored <strong>exclusively on your device</strong> using AsyncStorage. None
          of it is ever transmitted, uploaded, or shared with any server or third party.
        </p>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>List of apps the user chose to block (e.g. Instagram, YouTube)</td>
                <td>Core screen-time blocking feature</td>
              </tr>
              <tr>
                <td>Daily puzzle goal (number of problems per day)</td>
                <td>App functionality</td>
              </tr>
              <tr>
                <td>Streak / puzzle solve counts per date</td>
                <td>Streak tracking feature</td>
              </tr>
              <tr>
                <td>Puzzle progress (batch index, last seen puzzle ID)</td>
                <td>Resume where user left off</td>
              </tr>
              <tr>
                <td>UI theme preference</td>
                <td>Personalization</td>
              </tr>
              <tr>
                <td>Chess username (optional, user-entered)</td>
                <td>Import chess tactics rating from chess.com</td>
              </tr>
              <tr>
                <td>Self-reported chess tactics rating</td>
                <td>Serve appropriately difficulty-matched puzzles</td>
              </tr>
              <tr>
                <td>Count of how many times the user unblocked apps</td>
                <td>Enforce daily unblock limit</td>
              </tr>
              <tr>
                <td>Onboarding completion flag</td>
                <td>Show/skip onboarding on next launch</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="table-note">
          All of the above are stored locally using AsyncStorage and <strong>never leave the device</strong>.
        </p>

        <div class="divider"></div>

        <!-- 3. Third-Party Services -->
        <h3>Third-Party Services &amp; Data Transmitted</h3>

        <div class="policy-block">
          <h4>Supabase (backend)</h4>
          <p>
            The app fetches chess puzzle data (FEN strings, moves, ratings, popularity) from a
            Supabase-hosted database. An anonymous session token is generated automatically and stored
            encrypted on-device using AES-256 encryption (key stored in Android Keystore via Expo
            SecureStore). No account creation or login is required. No personally identifiable information
            is sent to Supabase; puzzle queries are unauthenticated reads.
          </p>
          <p class="sublink">
            Supabase Privacy Policy:
            <a href="https://supabase.com/privacy" class="email-link" target="_blank" rel="noopener noreferrer">
              https://supabase.com/privacy
            </a>
          </p>
        </div>

        <div class="policy-block">
          <h4>chess.com (optional)</h4>
          <p>
            If you optionally provide a chess.com username, the app fetches your publicly available
            tactics rating from chess.com's public API. This request is initiated solely by you and only
            the rating (a number) is stored locally on your device. No data is sent to chess.com beyond
            the username you entered.
          </p>
        </div>

        <div class="divider"></div>

        <!-- 4. Permissions -->
        <h3>Sensitive Permissions</h3>

        <div class="policy-block">
          <h4>PACKAGE_USAGE_STATS — Usage Access</h4>
          <p>
            <strong>What it does:</strong> Allows the app to read which apps are open or running on the
            device.<br />
            <strong>Why it's needed:</strong> The app's core function is to detect when you open a blocked
            social media app (e.g. Instagram, Facebook, YouTube, Twitter/X, Reddit, WhatsApp, Snapchat)
            and display a chess puzzle interruption.<br />
            <strong>What is NOT done:</strong> App usage data is <em>never stored, never transmitted
            off-device, and never shared with any third party.</em> The app only checks whether the
            current foreground app is one you have chosen to block.
          </p>
        </div>

        <div class="policy-block">
          <h4>SYSTEM_ALERT_WINDOW — Draw Over Other Apps</h4>
          <p>
            Required to display an overlay or interstitial (a chess puzzle prompt) when you open a
            blocked app. The overlay is shown only to you on your own device and no data is collected
            through it.
          </p>
        </div>

        <div class="policy-block">
          <h4>FOREGROUND_SERVICE + FOREGROUND_SERVICE_SPECIAL_USE</h4>
          <p>
            The app runs a persistent foreground service (ForegroundMonitorService) to continuously
            monitor app usage in real time. A persistent notification is visible to you while monitoring
            is active, as required by Android. Declared subtype: <em>"App usage monitoring for digital
            wellbeing and focus."</em>
          </p>
        </div>

        <div class="policy-block">
          <h4>RECEIVE_BOOT_COMPLETED</h4>
          <p>
            The app restarts its monitoring service automatically after your device reboots so blocking
            remains active without you needing to reopen the app.
          </p>
        </div>

        <div class="policy-block">
          <h4>SCHEDULE_EXACT_ALARM</h4>
          <p>
            Used to schedule a daily midnight reset. At 12:00 AM your blocked-app counter and daily
            puzzle goal are reset for the new day.
          </p>
        </div>

        <div class="policy-block">
          <h4>POST_NOTIFICATIONS</h4>
          <p>
            Used to send local (on-device) reminder notifications to encourage you to complete your
            daily chess puzzles. No notification data is sent to any server — all notifications are
            generated and delivered entirely on-device.
          </p>
        </div>

        <div class="policy-block">
          <h4>VIBRATE / WAKE_LOCK</h4>
          <p>Used solely to support local notification delivery.</p>
        </div>

        <div class="divider"></div>

        <!-- 5. Data NOT Collected -->
        <h3>Data We Do NOT Collect</h3>
        <div class="policy-block">
          <p>NoScroll does not collect, access, or use any of the following:</p>
          <ul class="no-collect-list">
            <li>Location data</li>
            <li>Contacts or call logs</li>
            <li>Camera or microphone access</li>
            <li>Financial or payment information</li>
            <li>Health or fitness data</li>
            <li>Biometric data</li>
            <li>Advertising IDs or any tracking identifiers</li>
            <li>User account credentials (there is no login)</li>
          </ul>
        </div>

        <div class="divider"></div>

        <!-- 6. Data Sharing -->
        <div class="policy-block">
          <h4>Data Sharing</h4>
          <p>
            No personal data is sold, rented, or shared with advertisers or data brokers.
            Supabase receives only anonymous puzzle-fetch queries. chess.com receives only a GET request
            for a publicly available username rating (user-initiated, optional).
          </p>
        </div>

        <!-- 7. Data Security -->
        <div class="policy-block">
          <h4>Data Security</h4>
          <p>
            The Supabase authentication session token is stored encrypted on-device using AES-256
            encryption (key stored in Android Keystore via Expo SecureStore). All other preferences are
            stored in AsyncStorage (local device storage). No sensitive personal data is transmitted
            over the network.
          </p>
        </div>

        <!-- 8. Children's Privacy -->
        <div class="policy-block">
          <h4>Children's Privacy</h4>
          <p>
            This app is not intended for use by children under 13. We do not knowingly collect data
            from children under 13 (COPPA) or under 16 (GDPR). If you believe a child has provided
            information through this app, please contact us at
            <a href="mailto:jskarthik45@gmail.com" class="email-link">jskarthik45@gmail.com</a>
            and we will take appropriate steps.
          </p>
        </div>

        <!-- 9. User Rights & Data Deletion -->
        <div class="policy-block">
          <h4>User Rights &amp; Data Deletion</h4>
          <p>
            Because all data is stored locally on your device and nothing is stored on a server tied to
            your identity, you can delete all app data at any time by uninstalling the app or clearing
            app data via Android Settings → Apps → NoScroll → Clear Data.
          </p>
          <p class="sublink">
            For any privacy-related requests or questions, contact us at
            <a href="mailto:jskarthik45@gmail.com" class="email-link">jskarthik45@gmail.com</a>.
          </p>
        </div>

        <!-- 10. Changes -->
        <div class="policy-block">
          <h4>Changes to This Policy</h4>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be reflected by an
            updated "Last updated" date at the top of this page. Continued use of the app after changes
            are posted constitutes your acceptance of the revised policy.
          </p>
        </div>

        <!-- 11. Contact -->
        <div class="policy-block">
          <h4>Contact</h4>
          <p>
            <strong>Developer:</strong> J S Karthik<br />
            <strong>Email:</strong>
            <a href="mailto:jskarthik45@gmail.com" class="email-link">jskarthik45@gmail.com</a><br />
            <strong>Website:</strong>
            <a href="https://clutchchess.com" class="email-link" target="_blank" rel="noopener noreferrer">clutchchess.com</a>
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

.privacy-page {
  max-width: 780px;
  margin: 0 auto;
  padding-top: 4rem;
}

.policy-section {
  margin-bottom: 3rem;
}

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
  font-size: 1.8rem;
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

.policy-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #ccc;
  margin: 0 0 0.75rem;
}

.section-intro {
  font-size: 0.88rem;
  line-height: 1.75;
  color: #999;
  margin: 0 0 1rem;
}

.divider {
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 1.75rem 0;
}

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
  line-height: 1.85;
  color: #999;
  margin: 0;
}

.policy-block p + p,
.sublink {
  margin-top: 0.5rem;
}

/* Data table */
.data-table-wrapper {
  overflow-x: auto;
  margin-bottom: 0.75rem;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
}

.data-table th {
  background: #1e1e1e;
  color: #ccc;
  font-weight: 600;
  padding: 0.65rem 1rem;
  text-align: left;
  letter-spacing: 0.03em;
  font-size: 0.8rem;
  text-transform: uppercase;
  border-bottom: 1px solid #2a2a2a;
}

.data-table td {
  padding: 0.6rem 1rem;
  color: #999;
  border-bottom: 1px solid #1f1f1f;
  line-height: 1.5;
  vertical-align: top;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:nth-child(even) td {
  background: #131313;
}

.table-note {
  font-size: 0.82rem;
  color: #666;
  margin: 0 0 0;
  font-style: italic;
}

/* No-collect list */
.no-collect-list {
  list-style: none;
  padding: 0;
  margin: 0.6rem 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.35rem 1rem;
}

.no-collect-list li {
  font-size: 0.86rem;
  color: #888;
  padding-left: 1.1rem;
  position: relative;
  line-height: 1.6;
}

.no-collect-list li::before {
  content: '✕';
  position: absolute;
  left: 0;
  color: #c0392b;
  font-size: 0.7rem;
  top: 0.22em;
}

.email-link {
  color: #7ec8e3;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}
</style>
