import { ref, computed, readonly } from 'vue'
import { supabase } from '../supabase.js'

// Reactive state (singleton pattern)
const user = ref(null)
const role = ref('user')
const loading = ref(true)
const initialized = ref(false)

const STORAGE_KEY = 'supabase_user_session'

/**
 * Composable for authentication state management.
 * Provides reactive user, role, and auth utilities across the app.
 */
export function useAuth() {
  // Computed getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === 'admin')
  const isUser = computed(() => role.value === 'user')

  // Get stored session from localStorage
  function getStoredSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  // Save session to localStorage
  function saveSession(u, userRole) {
    try {
      const payload = {
        id: u?.id ?? null,
        email: u?.email ?? u?.user_metadata?.email ?? null,
        name: u?.user_metadata?.full_name ?? u?.user_metadata?.name ?? null,
        avatar: u?.user_metadata?.avatar_url ?? null,
        role: userRole ?? 'user',
        timestamp: Date.now()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch (e) {
      console.warn('saveSession failed', e)
    }
  }

  // Clear all auth storage
  function clearSession() {
    try {
      const exactKeys = [STORAGE_KEY, 'supabase.auth.token', 'supabase.session']
      const prefixes = ['sb-']

      const wipe = (store) => {
        if (!store) return
        for (const k of exactKeys) {
          try { store.removeItem(k) } catch { /* ignore */ }
        }
        for (let i = store.length - 1; i >= 0; i--) {
          const key = store.key(i)
          if (!key) continue
          if (prefixes.some(p => key.startsWith(p))) {
            try { store.removeItem(key) } catch { /* ignore */ }
          }
        }
      }

      wipe(localStorage)
      wipe(sessionStorage)
    } catch { /* ignore */ }
  }

  // Set role and persist
  function setRole(newRole) {
    role.value = newRole
    const stored = getStoredSession()
    if (stored) {
      stored.role = newRole
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    }
  }

  // Initialize auth state
  async function initAuth() {
    if (initialized.value) return

    loading.value = true

    // Restore role from storage
    const stored = getStoredSession()
    if (stored?.role) {
      role.value = stored.role
    }

    try {
      // Try to get session from URL (OAuth redirect)
      const { data: sessionData } = await supabase.auth.getSessionFromUrl({ storeSession: true })
      if (sessionData?.session?.user) {
        user.value = sessionData.session.user
        saveSession(user.value, role.value)
      } else {
        // Fetch existing user
        const { data } = await supabase.auth.getUser()
        user.value = data?.user ?? null
        if (user.value) saveSession(user.value, role.value)
      }
    } catch {
      // Fallback: try getUser
      try {
        const { data } = await supabase.auth.getUser()
        user.value = data?.user ?? null
      } catch { /* ignore */ }
    }

    // Subscribe to auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        user.value = session?.user ?? null
        if (user.value) saveSession(user.value, role.value)
      }
      if (event === 'SIGNED_OUT') {
        user.value = null
        role.value = 'user'
        clearSession()
      }
    })

    initialized.value = true
    loading.value = false
  }

  // Sign in with Google OAuth
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: { prompt: 'select_account' }
      }
    })

    if (error) throw error
    if (data?.url) {
      window.location.href = data.url
    }
  }

  // Sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
    role.value = 'user'
    clearSession()
  }

  return {
    // State (readonly to prevent external mutation)
    user: readonly(user),
    role: readonly(role),
    loading: readonly(loading),
    
    // Computed
    isAuthenticated,
    isAdmin,
    isUser,
    
    // Methods
    initAuth,
    signInWithGoogle,
    signOut,
    setRole,
    getStoredSession,
  }
}
