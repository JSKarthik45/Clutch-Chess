<template>
  <div class="privacy-wrapper">
    <main class="privacy-page">
      <h1 class="page-title">Privacy Policy</h1>
      <p class="last-updated">Last updated: April 12, 2026</p>

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
            ("the App"), a Digital Wellbeing tool designed to reduce screen time and replace distracting app use
            with chess puzzle-based interventions, developed by <strong>J S Karthik</strong> ("Developer").
          </p>
          <p><strong>Developer Contact:</strong></p>
          <p>
            Email: <a href="mailto:jskarthik45@gmail.com" class="email-link">jskarthik45@gmail.com</a><br />
            Website: <a href="https://clutchchess.com" class="email-link" target="_blank" rel="noopener noreferrer">clutchchess.com</a>
          </p>
          <p>
            This policy is effective as of <strong>April 12, 2026</strong>, and supersedes all prior privacy policies.
            It describes the App's data practices, permission usage, and your rights under applicable privacy laws including GDPR and COPPA.
            By downloading, installing, or using this App, you agree to the terms and practices described in this policy.
            If you do not agree, you must uninstall the App and discontinue use immediately.
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
          <h4>PACKAGE_USAGE_STATS — Usage Access (High-Risk Permission)</h4>
          <p>
            <strong>System Permission:</strong> android.permission.PACKAGE_USAGE_STATS<br />
            <strong>Requested At:</strong> Onboarding (Phase 3: Core Permissions)<br />
            <strong>Feature Implemented:</strong> Real-time foreground app monitoring for blocking trigger detection
          </p>
          <p>
            <strong>User-Facing Feature Purpose:</strong><br />
            The App accesses your device's usage statistics to identify when a user-selected "Blocked App" (such as
            Instagram, Facebook, YouTube, Twitter/X, Reddit, WhatsApp, Snapchat, TikTok, or any other app you choose
            to block) enters the foreground. This real-time detection is the technical foundation of the App's core
            function: when a blocked app is detected in the foreground, the App immediately brings itself to the front
            and presents a chess puzzle intervention. This is required to prevent access to the blocked application
            until your configured daily puzzle goal has been completed.
          </p>
          <p>
            <strong>How the Data is Used:</strong><br />
            The foreground app name is checked against your locally stored list of blocked apps once per second (or on
            system-defined polling intervals). This comparison is performed exclusively on your device in real-time, in
            the native ForegroundMonitorService. No record of which apps you open, their names, frequencies, or usage
            patterns is ever stored, logged, persisted, or transmitted to any external service, server, cloud platform,
            or third party (including Google, Supabase, or any analytics provider).
          </p>
          <p>
            <strong>Data Retention:</strong><br />
            App names and usage patterns are processed in-memory only and are discarded immediately after the real-time
            foreground check completes. No persistent log of your app usage history is maintained.
          </p>
        </div>

        <div class="policy-block">
          <h4>SYSTEM_ALERT_WINDOW — Draw Over Other Apps (High-Risk Permission)</h4>
          <p>
            <strong>System Permission:</strong> android.permission.SYSTEM_ALERT_WINDOW<br />
            <strong>Requested At:</strong> Onboarding (Phase 3: Core Permissions)<br />
            <strong>Feature Implemented:</strong> In-app puzzle interstitial display over blocked applications
          </p>
          <p>
            <strong>User-Facing Feature Purpose:</strong><br />
            When a blocked application is detected in the foreground (via PACKAGE_USAGE_STATS), the App uses this permission
            to present a chess puzzle UI window that draws over the blocked app. This "intervention overlay" prevents the user
            from interacting with the blocked app until the required action is taken (e.g., solving a chess puzzle or completing
            the daily goal). The overlay is rendered locally on your device only; no data is transmitted or collected through it.
          </p>
          <p>
            <strong>How the Data is Used:</strong><br />
            The overlay mechanism is a UI rendering function only. It does not capture, record, or transmit any information
            about what is displayed behind the overlay, your device state, or your interactions. The overlay is an on-device,
            user-facing interaction surface with no persistent logging or external visibility.
          </p>
        </div>

        <div class="policy-block">
          <h4>FOREGROUND_SERVICE + FOREGROUND_SERVICE_SPECIAL_USE — Background Monitoring Service</h4>
          <p>
            <strong>System Permissions:</strong> android.permission.FOREGROUND_SERVICE, android.permission.FOREGROUND_SERVICE_SPECIAL_USE<br />
            <strong>Declared Foreground Service Subtype:</strong> "App usage monitoring for digital wellbeing and focus"<br />
            <strong>Feature Implemented:</strong> Persistent background monitoring service with system-visible notification
          </p>
          <p>
            <strong>User-Facing Feature Purpose:</strong><br />
            The App runs a persistent background service (ForegroundMonitorService) that continuously monitors your device's
            foreground app state. This service is required to maintain the blocking and intervention loop even when:
            </p>
            <ul class="permission-sublist">
              <li>The App's UI is not visibly open</li>
              <li>Your device enters the background</li>
              <li>Your device is about to reboot or undergo system updates</li>
              <li>The system is low on memory and would normally kill background processes</li>
            </ul>
          <p>
            Without this persistent service, the monitoring loop would be terminated by Android's memory management or system lifecycle,
            leaving blocked apps accessible. The service remains active as long as you have enabled blocking in the App's settings.
          </p>
          <p>
            <strong>Persistent Notification Requirement:</strong><br />
            Android 8.0+ requires that any app running a foreground service display a persistent, non-dismissible notification.
            This notification informs you that the ForegroundMonitorService is running and monitoring your device. You can tap the
            notification to open the App or pause blocking. This notification is a system requirement and cannot be hidden.
          </p>
          <p>
            <strong>System Resource Impact:</strong><br />
            The foreground service uses minimal system resources and should not significantly impact battery life or device performance:
            usage queries occur on a default system polling interval (typically 1–5 seconds), and all processing is handle by
            on-device, low-latency native code rather than cloud requests or network calls.
          </p>
        </div>

        <div class="policy-block">
          <h4>RECEIVE_BOOT_COMPLETED — Device Reboot Recovery</h4>
          <p>
            <strong>System Permission:</strong> android.permission.RECEIVE_BOOT_COMPLETED<br />
            <strong>Feature Implemented:</strong> Automatic monitoring service resumption after device reboot
          </p>
          <p>
            When your device reboots, this permission allows the App to automatically restart the ForegroundMonitorService
            if blocking was enabled before the reboot. This ensures your configured blocking rules remain active across reboots
            without requiring you to manually reopen the App. If you manually stopped blocking before reboot, the service will
            not automatically restart.
          </p>
        </div>

        <div class="policy-block">
          <h4>SCHEDULE_EXACT_ALARM — Daily Midnight Reset Trigger</h4>
          <p>
            <strong>System Permission:</strong> android.permission.SCHEDULE_EXACT_ALARM<br />
            <strong>Feature Implemented:</strong> Time-based local notification and daily counter reset
          </p>
          <p>
            At 12:00 AM (midnight) each day, the App triggers two actions:
            </p>
            <ol class="permission-sublist">
              <li>Your daily puzzle-solve count is reset to 0 for the new day</li>
              <li>Blocking is automatically re-enabled for the new day (if it was previously enabled)</li>
            </ol>
          <p>
            This ensures your daily puzzle goal resets each calendar day and you are not locked in a blocked state indefinitely.
            All state changes occur locally on your device; no timestamp or event information is logged externally.
          </p>
        </div>

        <div class="policy-block">
          <h4>POST_NOTIFICATIONS — Local Reminder Notifications</h4>
          <p>
            <strong>System Permission:</strong> android.permission.POST_NOTIFICATIONS<br />
            <strong>Feature Implemented:</strong> On-device reminder notifications
          </p>
          <p>
            This permission allows the App to send local, on-device reminder notifications to encourage you to complete your
            daily chess puzzle goal. These notifications are:
            </p>
            <ul class="permission-sublist">
              <li>Generated entirely on your device, not fetched from a server</li>
              <li>Based solely on your locally stored puzzle goal and current daily progress</li>
              <li>Never sent to external services, analytics platforms, or messaging systems</li>
              <li>Dismissible at any time and respect your device's notification settings</li>
            </ul>
          <p>
            You can enable or disable puzzle reminder notifications at any time from the App's settings without affecting blocking functionality.
          </p>
        </div>

        <div class="policy-block">
          <h4>VIBRATE / WAKE_LOCK — Notification and Alarm Support</h4>
          <p>
            <strong>System Permissions:</strong> android.permission.VIBRATE, android.permission.WAKE_LOCK<br />
            <strong>Feature Implemented:</strong> Auxiliary support for local notifications and alarms
          </p>
          <p>
            VIBRATE: Allows the device to vibrate when a reminder notification is delivered, enhancing notification perceptibility.<br />
            WAKE_LOCK: Allows the app to hold a partial wake lock during the midnight reset alarm to ensure the alarm triggers even
            if your device's screen is off or in deep sleep. Neither permission collects or transmits any data.
          </p>
        </div>

        <div class="divider"></div>

        <!-- 4b. Local Data Processing Guarantee -->
        <h3>Local Data Processing Guarantee (Google Play Compliance)</h3>
        <div class="policy-block">
          <p>
            <strong>No Data Collection or Transmission:</strong> NoScroll: Chess Screen Time does not collect, log, transmit,
            store on external servers, or share with any third party your app usage history, the names of other apps you use,
            your custom blocked-app list, or your daily puzzle progress. All data processing described in this policy occurs
            <em>exclusively in real-time on your device's local secure storage</em>.
          </p>
          <p>
            <strong>Real-Time Processing Only:</strong> When the ForegroundMonitorService checks whether the current foreground
            app is in your blocked-app list, this entire operation is performed in-memory on your device. The comparison result
            ("blocked" or "not blocked") is not persisted, logged, or exposed beyond the immediate trigger decision. Once the
            check completes, the in-memory state is discarded.
          </p>
          <p>
            <strong>No Persistent App Usage Log:</strong> This App does not maintain any persistent log, cache, or historical
            record of which apps you have opened or when. Each foreground-app check is independent and stateless; the App has
            no memory of your app-opening patterns across sessions.
          </p>
          <p>
            <strong>Exception: Supabase Puzzle Data Only:</strong> The only external data transferred is unauthenticated,
            read-only requests to your Supabase database instance to fetch chess puzzle data (FEN strings, legal moves, ratings).
            These requests contain no information about your device, your app usage, your preferences, or your identity.
          </p>
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
            Because all user data is stored locally on your device and nothing is stored on a server tied to
            your identity, you can delete all App data at any time using either of the following methods:
          </p>
          <ol class="permission-sublist">
            <li><strong>Uninstall the App:</strong> Uninstalling the App from your device automatically deletes all
            locally stored preferences, progress, and configuration from your device's storage.</li>
            <li><strong>Clear App Data via Settings:</strong> On your device, open Settings → Apps → NoScroll: Chess Screen Time →
            Storage → Clear Data. This will immediately delete all locally stored puzzles progress, blocked-app list, theme preferences,
            and any other App-related data from your device.</li>
          </ol>
          <p>
            <strong>Right to Be Forgotten (GDPR):</strong> Since all your data is stored locally on your device and not on
            external servers, your right to be forgotten is automatically satisfied by uninstalling the App or clearing data.
            No external data deletion request to Supabase is required (as no personally identifiable information is ever stored there).
          </p>
          <p>
            <strong>Data Access Requests:</strong> If you want to verify what data the App has stored about you, all such data is
            accessible directly in your device's storage via the App's Settings screen (theme, blocked apps, puzzle goal, etc.) or
            via Android Settings → Apps → NoScroll → Storage & Cache.
          </p>
          <p class="sublink">
            For any privacy-related requests, GDPR data subject access requests, or questions, contact the Developer at
            <a href="mailto:jskarthik45@gmail.com" class="email-link">jskarthik45@gmail.com</a>.
            Responses to legitimate privacy requests will be provided within 30 days.
          </p>
        </div>

        <!-- 10. Data Safety Form Alignment -->
        <div class="policy-block">
          <h4>Google Play Data Safety Form Alignment</h4>
          <p>
            This Privacy Policy is aligned with the Data Safety form submitted to Google Play Console and Google Play's
            2026 "Technical Truth" verification requirements. The following statements are sworn truths:
          </p>
          <ul class="permission-sublist">
            <li><strong>Data Collection:</strong> No personal data, financial data, device identifiers, or PII is collected.
            Only app usage state is processed in real-time and locally on-device (not collected or stored).</li>
            <li><strong>Data Sharing:</strong> No user data is shared with third parties, advertisers, or data brokers.
            Supabase receives only anonymous puzzle-fetch queries. chess.com receives only optional user-initiated API requests.</li>
            <li><strong>Data Deletion:</strong> All data is stored locally and can be deleted immediately by uninstalling the App
            or clearing App data in Settings. No server-side deletion request is required.</li>
            <li><strong>Encryption in Transit:</strong> The Supabase authentication token is encrypted with AES-256 (key stored in
            Android Keystore). All communication with Supabase uses HTTPS.</li>
            <li><strong>User Transparency:</strong> This privacy policy comprehensively lists all permissions requested and explains
            each one's purpose with reference to user-facing features.</li>
          </ul>
        </div>

        <!-- 11. Changes -->
        <div class="policy-block">
          <h4>Changes to This Policy</h4>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in privacy law, user feedback, or App functionality.
            Any material changes will be reflected by an updated "Last updated" date at the top of this page. Minor clarifications
            that do not reduce user privacy may be updated without notice.
          </p>
          <p>
            We recommend reviewing this policy periodically. <strong>Continued use of the App after changes are posted constitutes
            your acceptance of the revised policy.</strong> If you disagree with any changes, you must uninstall the App and
            discontinue use immediately.
          </p>
        </div>

        <!-- 12. Contact & Support -->
        <div class="policy-block">
          <h4>Contact & Support</h4>
          <p>
            <strong>Developer Name:</strong> J S Karthik<br />
            <strong>Developer Email (Privacy & Support):</strong>
            <a href="mailto:jskarthik45@gmail.com" class="email-link">jskarthik45@gmail.com</a><br />
            <strong>Website:</strong>
            <a href="https://clutchchess.com" class="email-link" target="_blank" rel="noopener noreferrer">clutchchess.com</a>
          </p>
          <p>
            If you have questions about this Privacy Policy, concerns about your privacy, requests to access or delete your data,
            or complaints about the App's privacy practices, please contact the Developer at the email address above.
            Privacy requests will be responded to within 30 calendar days.
          </p>
          <p>
            <strong>GDPR Compliance:</strong> If you are a resident of the European Union, European Economic Area, or another
            jurisdiction with data protection laws, you have the right to request access to, correction of, or deletion of your
            personal data. Contact the Developer to exercise these rights.
          </p>
          <p>
            <strong>COPPA Compliance:</strong> This App is not intended for users under 13 years old. We do not knowingly collect
            or use data from children under 13. If you believe a child under 13 has used this App or provided information, please
            contact us immediately and we will take appropriate steps to investigate and comply with COPPA.
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

/* Permission sublist styling */
.permission-sublist {
  margin: 0.75rem 0 0;
  margin-left: 1.5rem;
  font-size: 0.86rem;
  color: #888;
  line-height: 1.7;
}

.permission-sublist li,
.permission-sublist ol {
  margin: 0.35rem 0;
  color: #888;
}

.permission-sublist li {
  color: #888;
}
</style>
