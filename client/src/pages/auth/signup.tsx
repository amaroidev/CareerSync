import React, { useMemo, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/careersync-logo.png";
import { signUpWithEmail } from "../../lib/authClient";

// Polished multi-step sign up with professional layout + animations
const steps = [
  "Account",
  "Personal",
  "Academic",
  "Experience",
  "Preferences",
  "Documents",
];

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  pronouns: string;
  location: string;
  educationLevel: string;
  fieldsOfStudy: string[];
  targetUniversities: string[];
  gpa: string;
  transcriptExpanded: boolean;
  testScores: string[];
  hasWorkExperience: boolean;
  workExperience: any[];
  skills: string[];
  certifications: string[];
  portfolio: string;
  opportunityType: string;
  jobType: string;
  locationPreference: string;
  salaryRange: string;
  documents: Record<string, File | undefined>;
};

const initialForm: FormState = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  pronouns: "",
  location: "",
  educationLevel: "",
  fieldsOfStudy: [""],
  targetUniversities: [""],
  gpa: "",
  transcriptExpanded: false,
  testScores: [""],
  hasWorkExperience: false,
  workExperience: [],
  skills: [""],
  certifications: [""],
  portfolio: "",
  opportunityType: "",
  jobType: "",
  locationPreference: "",
  salaryRange: "",
  documents: {},
};

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const SignUp: React.FC = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  // pure check for UI enabling (doesn't set stepError)
  function checkStep(s: number) {
    const validator = validators[s];
    if (!validator) return true;
    const res = validator();
    return res.ok;
  }

  function emailError() {
    if (!form.email) return 'Email is required.';
    const re = /\S+@\S+\.\S+/;
    if (!re.test(form.email)) return 'Enter a valid email address.';
    return '';
  }

  function passwordValidation() {
    if (!form.password) return 'Password is required.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  }

  function confirmPasswordValidation() {
    if (!form.confirmPassword) return 'Please confirm your password.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return '';
  }

  function passwordStrength(pw: string) {
    if (!pw) return { score: 0, label: 'Empty', color: 'bg-red-400' };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-400', 'bg-emerald-600'];
    return { score, label: labels[Math.min(score, labels.length - 1)], color: colors[Math.min(score, colors.length - 1)] };
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // return true if step is valid
  const validators: Record<number, () => { ok: boolean; msg?: string }> = {
    0: () => {
      if (!form.email) return { ok: false, msg: 'Please enter an email.' };
      if (!form.password || !form.confirmPassword) return { ok: false, msg: 'Please fill both password fields.' };
      if (form.password.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };
      if (form.password !== form.confirmPassword) return { ok: false, msg: 'Passwords do not match.' };
      return { ok: true };
    },
    1: () => {
      if (!form.fullName) return { ok: false, msg: 'Please enter your full name.' };
      if (!form.location) return { ok: false, msg: 'Please enter your location.' };
      return { ok: true };
    },
    2: () => ({ ok: !!form.educationLevel, msg: form.educationLevel ? undefined : 'Please select your education level.' }),
    3: () => ({ ok: !!(form.skills && form.skills[0] && form.skills[0].trim()), msg: 'Please add at least one skill.' }),
    4: () => ({ ok: !!form.opportunityType, msg: form.opportunityType ? undefined : 'Please select an opportunity preference.' }),
  };

  function validateStep(s: number) {
    setStepError(null);
    const validator = validators[s];
    if (!validator) return true;
    const res = validator();
    if (!res.ok) setStepError(res.msg || 'Please complete the step');
    return res.ok;
  }

  const progress = useMemo(() => Math.round((step / (steps.length - 1)) * 100), [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    } as any));
  };

  const handleFile = (index: number, file?: File) => {
    setForm((f) => ({ ...f, documents: { ...f.documents, [index]: file } }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    // validate current step before moving forward
    if (step < steps.length - 1) {
      if (!validateStep(step)) return;
      return nextStep();
    }
    // Final submit
    setSubmitting(true);
    // Simple client-side validation
    if (!form.email || !form.password || form.password !== form.confirmPassword) {
      // Minimal feedback — in a real app wire up toast/use-toast
      setSubmitting(false);
      setStep(0);
      setStepError('Please complete your account information before submitting.');
      return;
    }
    try {
      const res = await signUpWithEmail(form.email.trim(), form.password);
      setSubmitting(false);
      if (res.success) {
        setCompleted(true);
        // redirect after brief pause
        setTimeout(() => (window.location.href = '/dashboard'), 900);
      } else {
        // simple feedback: jump to first step and show error
        setStep(0);
        // in real app use toast
        // eslint-disable-next-line no-console
        console.error('signup error', res.error);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('signup err', err);
      setSubmitting(false);
      setStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Visible animated background: large colorful blobs + floating shapes */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        {/* subtle radial vignette for contrast on light backgrounds */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.06) 100%)' }} />

        <motion.div className="absolute rounded-full blur-xl w-96 h-96 md:w-[520px] md:h-[520px]"
          style={{ background: 'radial-gradient(circle at 20% 30%, rgba(6,182,212,0.78), rgba(124,58,237,0.62))', mixBlendMode: 'multiply', filter: 'saturate(120%)' }}
          initial={{ x: -120, y: -40, scale: 0.95 }}
          animate={{ x: -40, y: -100, scale: 1.06, rotate: 12 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        <motion.div className="absolute rounded-full blur-lg w-80 h-80 md:w-[420px] md:h-[420px]"
          style={{ background: 'radial-gradient(circle at 80% 40%, rgba(99,102,241,0.78), rgba(236,72,153,0.62))', mixBlendMode: 'multiply', filter: 'saturate(120%)' }}
          initial={{ x: 160, y: 20, scale: 1 }}
          animate={{ x: 110, y: -20, scale: 1.08, rotate: -8 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        <motion.div className="absolute rounded-full blur-lg w-64 h-64 md:w-[360px] md:h-[360px]"
          style={{ background: 'radial-gradient(circle at 50% 60%, rgba(99,102,241,0.78), rgba(34,211,238,0.62))', mixBlendMode: 'multiply', filter: 'saturate(120%)' }}
          initial={{ x: 20, y: 200, scale: 0.98 }}
          animate={{ x: -10, y: 260, scale: 1.02, rotate: 6 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        {/* Floating card shapes */}
        <motion.div className="absolute rounded-xl shadow-lg bg-white/30 dark:bg-black/20 w-48 h-28"
          style={{ mixBlendMode: 'multiply', opacity: 0.95 }}
          initial={{ x: -220, y: 120, rotate: -8 }}
          animate={{ x: -60, y: 80, rotate: -2 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.div className="absolute rounded-xl shadow-lg bg-white/20 dark:bg-black/10 w-40 h-24"
          style={{ mixBlendMode: 'multiply', opacity: 0.92 }}
          initial={{ x: 320, y: 220, rotate: 6 }}
          animate={{ x: 180, y: 180, rotate: 2 }}
          transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left panel - illustration + copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 px-6"
        >
          <div className="rounded-xl p-8 bg-gradient-to-b from-primary/10 to-transparent bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 shadow-md">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">CareerSync — Your opportunities, intelligently matched</h1>
            <p className="mt-3 text-sm text-muted-foreground">Create a single, professional profile and get tailored scholarships, internships, and jobs — all in one place.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {steps.slice(0, 4).map((s, i) => (
                <div key={s} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-medium shadow-sm">{i + 1}</div>
                  <div>
                    <div className="font-medium">{s}</div>
                    <div className="text-xs text-muted-foreground">Quick, guided input</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-card p-4" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 120 }}>
            {/* Minimal illustrative graphic */}
            <div className="flex items-center gap-4">
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <rect width="84" height="84" rx="18" fill="url(#g)" />
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#7c3aed" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <div className="font-semibold">Built for students & early-career</div>
                <div className="text-sm text-muted-foreground">Fast setup, privacy-first, exportable profile and CV.</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right panel - form card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card className="p-6 md:p-8 shadow-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 max-w-xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={logo} alt="CareerSync" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                <div>
                  <h2 className="text-2xl font-bold">Create your account</h2>
                  <p className="text-sm text-muted-foreground mt-1">Step {step + 1} of {steps.length} — {steps[step]}</p>
                </div>
              </div>
              <div className="w-36">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-primary to-secondary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 80 }} />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <AnimatePresence mode="wait">
                {!completed ? (
                  <motion.div key={step} variants={containerVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.45 }}>
                    {/* Sections */}
                    {step === 0 && (
                      <div className="space-y-4">
                        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" autoFocus required className="shadow-sm" />

                        <div className="relative">
                          <Input name="password" value={form.password} onChange={handleChange} placeholder="Password" type={showPassword ? 'text' : 'password'} required className="shadow-sm" />
                          <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {showPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>

                        <div className="relative">
                          <Input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type={showPassword ? 'text' : 'password'} required className="shadow-sm" />
                          <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {showPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-4">
                        <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required className="shadow-sm" />
                        <Input name="pronouns" value={form.pronouns} onChange={handleChange} placeholder="Preferred Pronouns (Optional)" className="shadow-sm" />
                        <Input name="location" value={form.location} onChange={handleChange} placeholder="Location (City, Country)" required className="shadow-sm" />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium mb-2">Education Level</div>
                          <div className="flex flex-wrap gap-2">
                            {["High School", "Bachelor's", "Master's", "PhD", "Other"].map((level) => (
                              <label key={level} className={`px-3 py-2 rounded-md border cursor-pointer ${form.educationLevel === level ? 'bg-primary text-white border-primary' : 'bg-transparent'}`}>
                                <input type="radio" name="educationLevel" value={level} checked={form.educationLevel === level} onChange={handleChange} className="hidden" />
                                {level}
                              </label>
                            ))}
                          </div>
                        </div>
                        <Input name="fieldsOfStudy" value={form.fieldsOfStudy[0]} onChange={e => setForm(f => ({ ...f, fieldsOfStudy: [e.target.value] }))} placeholder="Field(s) of Study" className="shadow-sm" />
                        <Input name="gpa" value={form.gpa} onChange={handleChange} placeholder="GPA (Optional)" className="shadow-sm" />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Do you have prior work experience?</div>
                          <Checkbox checked={form.hasWorkExperience} onCheckedChange={checked => setForm(f => ({ ...f, hasWorkExperience: !!checked }))} />
                        </div>
                        <Input name="skills" value={form.skills[0]} onChange={e => setForm(f => ({ ...f, skills: [e.target.value] }))} placeholder="Top skills (comma separated)" className="shadow-sm" />
                        <Input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio Link (Optional)" className="shadow-sm" />
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium mb-2">Opportunity Preferences</div>
                          <div className="flex flex-wrap gap-2">
                            {["Scholarships", "Jobs", "Both"].map((type) => (
                              <label key={type} className={`px-3 py-2 rounded-md border cursor-pointer ${form.opportunityType === type ? 'bg-primary text-white border-primary' : 'bg-transparent'}`}>
                                <input type="radio" name="opportunityType" value={type} checked={form.opportunityType === type} onChange={handleChange} className="hidden" />
                                {type}
                              </label>
                            ))}
                          </div>
                        </div>
                        <Input name="salaryRange" value={form.salaryRange} onChange={handleChange} placeholder="Salary/Scholarship expectations (Optional)" className="shadow-sm" />
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-4">
                        <div className="font-medium">Upload Documents (Optional)</div>
                        {[0,1,2].map(i => (
                          <div key={i} className="flex items-center gap-3">
                            <Input type="file" onChange={(e:any) => handleFile(i, e.target.files?.[0])} />
                            <div className="text-sm text-muted-foreground">{form.documents[i]?.name ?? 'No file'}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {stepError && <div className="text-sm text-red-500 mb-3">{stepError}</div>}

                    <div className="flex items-center justify-between mt-6">
                      <Button variant="outline" onClick={prevStep} disabled={step === 0}>
                        Back
                      </Button>
                      <div className="flex items-center gap-3">
                        {step < steps.length - 1 ? (
                          <Button onClick={nextStep} className="flex items-center gap-2">
                            Next
                          </Button>
                        ) : (
                          <Button type="submit" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? 'Creating...' : 'Create Account'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8 text-center">
                    <div className="text-2xl font-bold">Welcome aboard 👋</div>
                    <div className="mt-2 text-sm text-muted-foreground">Your profile has been created. Check your email to verify and get personalized opportunities.</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Sign in link for users who want to go back to sign in */}
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Already have an account? <a href="/signin" className="text-primary underline">Sign in</a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
