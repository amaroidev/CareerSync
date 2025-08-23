import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import { motion } from "framer-motion";
import logo from "../../assets/careersync-logo.png";
import { signInWithEmail } from "../../lib/authClient";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await signInWithEmail(email.trim(), password);
      setLoading(false);
      if (res.success) {
        // navigate to dashboard
        window.location.href = '/dashboard';
      } else {
        setError(res.error || 'Sign in failed.');
      }
    } catch (err: any) {
      setError(err?.message ?? "Sign in failed. Try again.");
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await (await import('../../lib/authClient')).signInWithProvider(provider);
      setLoading(false);
      if (res.redirect) {
        window.location.href = res.redirect;
        return;
      }
      if (res.success) {
        window.location.href = '/dashboard';
      } else {
        setError(res.error || 'Social sign in failed');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Social sign in failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Visible animated background: large colorful blobs + floating cards */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        {/* subtle radial vignette to increase contrast on light backgrounds */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.06) 100%)' }} />

        <motion.div className="absolute rounded-full blur-xl w-96 h-96 md:w-[520px] md:h-[520px]"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.78), rgba(6,182,212,0.62))', mixBlendMode: 'multiply', filter: 'saturate(120%)' }}
          initial={{ x: -140, y: -60, scale: 0.95 }}
          animate={{ x: -40, y: -120, scale: 1.05, rotate: 10 }}
          transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        <motion.div className="absolute rounded-full blur-lg w-80 h-80 md:w-[420px] md:h-[420px]"
          style={{ background: 'radial-gradient(circle at 70% 40%, rgba(52,211,153,0.72), rgba(6,182,212,0.62))', mixBlendMode: 'multiply', filter: 'saturate(120%)' }}
          initial={{ x: 160, y: 0, scale: 1 }}
          animate={{ x: 100, y: -40, scale: 1.08, rotate: -8 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        <motion.div className="absolute rounded-full blur-lg w-64 h-64 md:w-[360px] md:h-[360px]"
          style={{ background: 'radial-gradient(circle at 50% 60%, rgba(236,72,153,0.72), rgba(249,115,22,0.56))', mixBlendMode: 'multiply', filter: 'saturate(120%)' }}
          initial={{ x: 20, y: 200, scale: 0.98 }}
          animate={{ x: -10, y: 260, scale: 1.02, rotate: 6 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        {/* Floating card shapes for more depth (keep subtle but darker) */}
        <motion.div className="absolute rounded-xl shadow-lg bg-white/30 dark:bg-black/20 w-48 h-28"
          style={{ mixBlendMode: 'multiply', opacity: 0.95 }}
          initial={{ x: -200, y: 120, rotate: -8 }}
          animate={{ x: -60, y: 80, rotate: -2 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.div className="absolute rounded-xl shadow-lg bg-white/20 dark:bg-black/10 w-40 h-24"
          style={{ mixBlendMode: 'multiply', opacity: 0.92 }}
          initial={{ x: 300, y: 220, rotate: 6 }}
          animate={{ x: 180, y: 180, rotate: 2 }}
          transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="px-6 md:px-12">
          <div className="rounded-xl p-8 bg-gradient-to-b from-primary/10 to-transparent bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 shadow-md">
            <h1 className="text-3xl font-extrabold">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to access your personalized opportunities, saved applications, and profile.</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-white/60 dark:bg-white/5 border">
                <div className="text-sm font-semibold">Saved matches</div>
                <div className="text-xs text-muted-foreground mt-1">View recommendations tailored to your profile.</div>
              </div>
              <div className="p-3 rounded-lg bg-white/60 dark:bg-white/5 border">
                <div className="text-sm font-semibold">Quick apply</div>
                <div className="text-xs text-muted-foreground mt-1">One-click apply to compatible roles and scholarships.</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card className="p-6 md:p-8 shadow-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <img src={logo} alt="CareerSync" className="w-12 h-12 rounded-full object-cover shadow-sm" />
              <div>
                <h2 className="text-2xl font-bold">Sign in to CareerSync</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter your account details below.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleSocialSignIn('google')} className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-4 h-4 mr-2"><path fill="currentColor" d="M488 261.8c0-17.8-1.6-35-4.7-51.8H249v98.1h134.8c-5.7 31-23.1 57.3-49.4 75v62h79.8c46.7-43 73.8-106.3 73.8-183.3z"/></svg>
                  Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialSignIn('github')} className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4 mr-2"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-2.9 0-5.2-1.6-5.2-3.6 0-2 2.3-3.6 5.2-3.6 2.9 0 5.2 1.6 5.2 3.6zM..."/></svg>
                  GitHub
                </Button>
              </div>

              <div className="relative text-center text-xs text-muted-foreground">or continue with email</div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoFocus required />

                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox checked={remember} onCheckedChange={(c)=> setRemember(!!c)} />
                    Remember me
                  </label>
                  <a href="/forgot-password" className="text-sm text-primary underline">Forgot?</a>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoadingSpinner />
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>

              <div className="text-sm text-muted-foreground text-center mt-2">
                Don't have an account? <a href="/signup" className="text-primary underline">Create one</a>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
