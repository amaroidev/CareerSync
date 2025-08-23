import supabase from './supabaseClient';

type SignInResult = { success: boolean; error?: string; redirect?: string };

const MOCK_KEY = 'careerSync_demo_user';

export async function signInWithEmail(email: string, password: string): Promise<SignInResult> {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    // store session token in localStorage as a simple client-side session
    try {
      const token = (data.session as any)?.access_token;
      if (token) localStorage.setItem('cs_token', token);
    } catch {}
    return { success: true };
  }

  // fallback mock
  const stored = localStorage.getItem(MOCK_KEY);
  if (stored) {
    const u = JSON.parse(stored);
    if (u.email === email && u.password === password) {
      localStorage.setItem('cs_token', 'demo-token');
      return { success: true };
    }
  }
  return { success: false, error: 'Invalid credentials (demo).' };
}

export async function signInWithProvider(provider: string): Promise<SignInResult> {
  if (supabase) {
    try {
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined;
      const { data, error } = await supabase.auth.signInWithOAuth({ provider: provider as any, options: { redirectTo } });
      if (error) return { success: false, error: error.message };
      // Supabase sometimes returns a url to redirect the browser to
      const url = (data as any)?.url;
      if (url) return { success: true, redirect: url };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message ?? 'OAuth failed' };
    }
  }

  // demo fallback: simulate a provider login
  localStorage.setItem('cs_token', 'demo-token');
  return { success: true };
}

export async function signUpWithEmail(email: string, password: string): Promise<SignInResult> {
  if (supabase) {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return { success: false, error: error.message };
      // note: supabase signUp may require email confirmation
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message ?? 'Sign up failed' };
    }
  }

  // mock sign-up
  localStorage.setItem(MOCK_KEY, JSON.stringify({ email, password }));
  localStorage.setItem('cs_token', 'demo-token');
  return { success: true };
}

export function signOut() {
  try { localStorage.removeItem('cs_token'); } catch {}
  if (supabase) supabase.auth.signOut();
}

export function isAuthenticated() {
  return !!localStorage.getItem('cs_token');
}
