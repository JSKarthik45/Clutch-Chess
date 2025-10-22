<template>
  <div class="sign-in">
    <div v-if="user" class="user-panel">
      <img v-if="user.user_metadata?.avatar_url" :src="user.user_metadata.avatar_url" alt="avatar" class="avatar" />
      <div class="user-info">
        <div class="user-email">{{ user.email || user.user_metadata?.email || user.user_metadata?.name }}</div>
        <div class="user-id">Name: {{ user.user_metadata.full_name }}</div>
      </div>
      <button class="signout-btn" @click="signOut">Sign out</button>
    </div>

    <!-- role selector: only show when not signed in -->
    <div
      v-if="!user"
      class="d-flex align-items-center mb-2 role-selector"
      role="radiogroup"
      aria-label="Select role"
    >
      <span class="me-3">User</span>

      <!-- whole container is clickable/keyboard accessible -->
      <div
        class="role-toggle d-flex align-items-center justify-content-center position-relative"
        tabindex="0"
        :aria-checked="role === 'admin'"
        @click="toggleRole"
        @keydown.space.prevent="toggleRole"
        @keydown.enter.prevent="toggleRole"
      >
        <!-- semantic radios kept but hidden via Bootstrap -->
        <input id="role-user" type="radio" name="role" class="visually-hidden" value="user" v-model="role" />
        <input id="role-admin" type="radio" name="role" class="visually-hidden" value="admin" v-model="role" />

        <!-- visible square knob -->
        <span class="btn btn-outline-secondary role-knob" :aria-pressed="role === 'admin'"></span>
      </div>

      <span class="ms-3">Admin</span>
    </div>

    <button
      v-if="!user"
      class="google-btn"
      @click="signInWithGoogle"
      :disabled="loading"
      aria-label="Sign in with Google"
    >
      <span class="google-logo" aria-hidden="true">
        <!-- Simple Google G icon (official multi-color G) -->
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path d="M9 3.48c1.69 0 2.86.73 3.52 1.34l2.58-2.5C13.92.83 11.74 0 9 0 5.48 0 2.44 1.8.9 4.46l2.92 2.27C4.5 4.2 6.55 3.48 9 3.48z" fill="#EA4335"/>
            <path d="M17.64 9.2c0-.63-.06-1.24-.18-1.82H9v3.44h4.84c-.21 1.12-.84 2.07-1.8 2.72l2.9 2.25C16.98 14.7 17.64 12.1 17.64 9.2z" fill="#4285F4"/>
            <path d="M3.82 10.73A5.4 5.4 0 0 1 3.5 9c0-.62.11-1.22.32-1.74L.9 4.46A9 9 0 0 0 0 9c0 1.47.36 2.86 1 4.09l2.82-2.36z" fill="#FBBC05"/>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.9-2.25c-.82.55-1.86.88-3.06.88-2.45 0-4.5-1.28-5.56-3.18L.9 13.54C2.44 16.2 5.48 18 9 18z" fill="#34A853"/>
          </g>
        </svg>
      </span>
      <span class="btn-text" v-if="!loading">Sign in with Google</span>
      <span class="btn-text" v-else>Opening Google…</span>
    </button>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- revert: details/summary/pre -->
    <div v-if="user && storedSession" class="mt-2" aria-live="polite">
      <details>
        <summary>Profile Details</summary>
        <pre style="background:#f7f7f7; padding:8px; border-radius:6px;"><strong>Email:</strong> {{ storedSession.email || '—' }}
<strong>Name:</strong> {{ storedSession.name || '—' }}
<strong>Role:</strong> {{ (storedSession.role || 'user').toUpperCase() }}</pre>
      </details>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { supabase } from '../supabase.js'

const loading = ref(false)
const error = ref('')
const user = ref(null)
let authSubscription = null
const STORAGE_KEY = 'supabase_user_session'

// selected role (default user)
const role = ref('user')

function saveToStorage(u) {
  try {
    // store minimal info to recognize the user later
    const payload = {
      id: u?.id ?? null,
      email: u?.email ?? u?.user_metadata?.email ?? null,
      name: u?.user_metadata?.full_name ?? u?.user_metadata?.name ?? null,
      avatar: u?.user_metadata?.avatar_url ?? null,
      role: role.value ?? 'user',
      timestamp: Date.now()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (e) {
    console.warn('saveToStorage failed', e)
  }
}

function clearStorage() {
  try { localStorage.removeItem(STORAGE_KEY) } catch (e) { /* ignore */ }
}

// Toggle handler: toggles role and persist selection
function toggleRole() {
  role.value = role.value === 'user' ? 'admin' : 'user'
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    stored.role = role.value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch (e) { /* ignore */ }
  console.log('Role changed to', role.value)
}

async function fetchUser() {
  try {
    const { data, error: getUserError } = await supabase.auth.getUser()
    if (getUserError) {
      console.warn('getUser error', getUserError)
      return
    }
    user.value = data?.user ?? null
  if (user.value) saveToStorage(user.value)
  } catch (err) {
    console.warn('fetchUser', err)
  }
}

async function signInWithGoogle() {
  loading.value = true
  error.value = ''
  try {
    // Request a provider URL from Supabase and include prompt=select_account so the Google account chooser always appears.
    // We'll redirect the current window to the provider URL so the user can pick the account.
    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          prompt: 'select_account'
        }
      }
    })

    if (signInError) {
      error.value = signInError.message || String(signInError)
      return
    }

    if (data && data.url) {
      // Redirect the current window to the provider URL.
      window.location.href = data.url
    }
  } catch (err) {
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      error.value = signOutError.message || String(signOutError)
      return
    }
    user.value = null
    clearStorage()
  } catch (err) {
    error.value = err?.message || String(err)
  }
}

onMounted(async () => {
  // restore previously selected role from storage
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed?.role) role.value = parsed.role
    }
  } catch (e) { /* ignore parse errors */ }

  // First, process any redirect from the OAuth provider.
  try {
    // Supabase v2: getSessionFromUrl parses the redirect URL and establishes the session.
    const { data: sessionData, error: urlError } = await supabase.auth.getSessionFromUrl({ storeSession: true })
    if (urlError) {
      console.warn('getSessionFromUrl error', urlError)
    }
    if (sessionData?.session?.user) {
      user.value = sessionData.session.user
      saveToStorage(user.value)
    } else {
      // If not a redirect flow or no session, fetch existing user.
      await fetchUser()
    }
  } catch (err) {
    // Not necessarily an error; just continue.
    await fetchUser()
  }

  // Subscribe to auth state changes so we can react when the user signs in or out.
  const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
      user.value = session?.user ?? null
      if (user.value) saveToStorage(user.value)
    }
    if (event === 'SIGNED_OUT') {
      user.value = null
      clearStorage()
    }
  })
  authSubscription = subscription
})

onBeforeUnmount(() => {
  if (authSubscription && typeof authSubscription.unsubscribe === 'function') {
    authSubscription.unsubscribe()
  }
})

const storedSession = computed(() => {
  // depend on user so it updates after sign-in/out
  void user.value
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
})

// keep: human-readable timestamp for the details/pre section
const formattedTimestamp = computed(() => {
  const ts = storedSession.value?.timestamp
  if (!ts) return '—'
  try {
    return new Date(ts).toLocaleString()
  } catch {
    return String(ts)
  }
})
</script>

<style scoped>
.sign-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
}

.user-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-email {
  font-weight: 600;
}

.user-id {
  font-size: 12px;
  color: #555;
}

.google-btn {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  color: #3c4043;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  min-height: 40px;
  padding-left: 12px;
}

.signout-btn {
  background: transparent;
  border: 1px solid #ddd;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.google-logo {
  display: inline-flex;
  width: 18px;
  height: 18px;
}

.btn-text {
  font-weight: 500;
}

.google-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 8px;
  color: #b91c1c;
  font-size: 13px;
}

/* role selector base */
.role-selector { user-select: none; }

/* central toggle container: smaller height, no inner padding */
.role-toggle {
  width: 100px;            /* slightly reduced width */
  height: 34px;           /* reduced height */
  padding: 2px;             /* no padding between box and knob */
  border: 2px solid rgba(0,0,0,0.12);
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
}

/* focus visible (keyboard accessible) */


/* visible square knob */
.role-knob {
  width: 60px;
  height: 28px;
  min-width: 28px;
  border-radius: 6px;
  transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
  padding: 0px;
  margin: 0px; /* ensure no gap */
  display: inline-block;
  background-color: rgb(115, 149, 82);
}

/* default position: left (user) */
.role-knob { transform: translateX(-17px); }

/* admin selected: move knob right and show active look */
.role-knob[aria-pressed="true"] {
  transform: translateX(17px);
  background-color: black;
}

/* remove any gap from bootstrap btn group internals */
.role-toggle .btn { margin: 0; }

/* remove unused profile card styles:
.profile-card, .profile-header, .profile-list, .profile-row { ... }
*/

/* small screens adjust sizes */
@media (max-width: 420px) {
  .role-toggle { width: 66px; height: 30px; }
  .role-knob { width: 32px; height: 26px; min-width: 26px; transform: translateX(-14px); }
  .role-knob[aria-pressed="true"] { transform: translateX(14px); }
}
</style>
