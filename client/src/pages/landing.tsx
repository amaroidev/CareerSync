import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Target, TrendingUp, Sparkles, Moon, Sun, ArrowRight, Search, ListTodo, FileText, MessageSquare, BarChart2, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { PageTransition, StaggeredContainer, StaggeredItem } from "@/components/shared/PageTransition";
import React, { useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import logo from "../assets/careersync-logo.png";
import InteractiveKanban from "@/components/InteractiveKanban";

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  // parallax state for the hanging glass panel
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  function handleParallaxMove(e: React.MouseEvent) {
    if (!parallaxRef.current) return;
    const rect = parallaxRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    // dampen movement
    setParallax({ x: Math.max(-1, Math.min(1, relX)), y: Math.max(-1, Math.min(1, relY)) });
  }

  function resetParallax() {
    setParallax({ x: 0, y: 0 });
  }
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Unified Opportunity Discovery",
      description: "Search jobs, scholarships, and internships in one place with AI-powered matching."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Application Tracking",
      description: "Kanban-style board to track your applications from saved to accepted."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Profile Management",
      description: "Comprehensive profile with academic, professional, and document management."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Smart Analytics",
      description: "Track your progress and get insights to improve your application success rate."
    }
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        {/* Decorative background orbs - Adjusted positioning and opacity */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-primary/30 to-transparent" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-15 bg-gradient-to-br from-primary/20 to-transparent" />
        </div>

        {/* Enhanced Navbar with Tabs */}
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logo} alt="CareerSync" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                <span className="font-semibold">CareerSync</span>
              </div>
              <nav className="hidden md:flex items-center h-full">
                <div className="flex h-full">
                  {['Home', 'Features', 'Pricing', 'Testimonials', 'About'].map((item) => (
                    item === 'About' ? (
                      <Link key={item} href="/about" className="h-full px-4 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent hover:border-foreground/20">
                        {item}
                      </Link>
                    ) : (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="h-full px-4 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent hover:border-foreground/20"
                      >
                        {item}
                      </a>
                    )
                  ))}
                </div>
              </nav>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </Button>
                <Button size="sm" className="gap-2" asChild>
                  <a href="/signin" data-testid="button-login">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            {/* Mobile Navigation Tabs */}
            <div className="md:hidden flex overflow-x-auto py-2 hide-scrollbar">
              <div className="flex space-x-1">
                {['Home', 'Features', 'Pricing', 'Testimonials'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-12">
          <motion.div
            className="grid lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" /> New: Unified search across jobs and scholarships
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img src={logo} alt="CareerSync logo" className="w-20 h-20 rounded-full shadow-lg" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Navigate your career with confidence
                </h1>
              </div>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl">
                Discover opportunities, track applications, and showcase your profile — all in one beautifully simple workspace.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="gap-2" onClick={() => (window.location.href = '/signup')}>
                  Start free <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                  See how it works
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { k: "+10k", v: "opportunities" },
                  { k: "98%", v: "uptime" },
                  { k: "<2m", v: "setup" },
                ].map((s) => (
                  <div key={s.k} className="rounded-lg border border-border bg-card p-4">
                    <div className="text-xl font-semibold">{s.k}</div>
                    <div className="text-xs text-muted-foreground capitalize">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: hanging glassy kanban demo */}
            <div className="relative">
              <motion.div
                ref={parallaxRef}
                onMouseMove={handleParallaxMove}
                onMouseLeave={resetParallax}
                className="relative -translate-y-6 md:-translate-y-10 rounded-3xl p-6 bg-white/6 dark:bg-black/30 backdrop-blur-md border border-white/5 shadow-2xl ring-1 ring-white/5 overflow-hidden"
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1, x: parallax.x * 6, rotate: parallax.x * 1 }}
                whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(2,6,23,0.45)' }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* subtle inner glow / backdrop */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                  <div className="absolute -inset-6 rounded-3xl blur-3xl opacity-30 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay" />
                </div>
                <InteractiveKanban />
              </motion.div>

              <motion.div
                className="absolute -right-10 -bottom-8 rounded-xl shadow-2xl overflow-hidden"
                initial={{ rotate: -6, opacity: 0 }}
                animate={{ rotate: -2 + parallax.x * 3, opacity: 0.95, x: parallax.x * -12, y: parallax.y * -6 }}
                transition={{ duration: 0.9 }}
                aria-hidden
              >
                <div className="w-56 h-36 bg-gradient-to-br from-indigo-500/70 to-sky-400/50 blur-md opacity-60" />
              </motion.div>

              <div className="absolute top-4 right-6">
                <Link href="/signup">
                  <Button size="sm" className="shadow-md">Explore demo</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trusted by */}
        <section id="logos" className="container mx-auto px-4 mb-16">
          <div className="rounded-xl glass overflow-hidden border-gradient">
            <div className="whitespace-nowrap flex items-center gap-10 p-6 animate-marquee">
              {(() => {
                const brands = ['Google', 'OpenAI', 'Microsoft', 'Apple', 'Meta', 'Stripe', 'Shopify', 'NASA'];
                const expanded = brands.concat(brands.map((b) => `${b}-dup`));
                return expanded.map((brand) => (
                  <span key={brand} className="text-sm uppercase tracking-widest text-muted-foreground">{brand.replace('-dup','')}</span>
                ));
              })()}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="container mx-auto px-4 mb-16">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Loved by students and professionals
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: 'CareerSync simplified my entire job hunt.', a: 'Aisha • New Grad' },
              { q: 'From chaos to clarity. The kanban is brilliant.', a: 'Marco • Career Switcher' },
              { q: 'The analytics helped me iterate and win offers.', a: 'Jin • Data Analyst' },
            ].map((t, idx) => (
              <motion.div
                key={t.a}
                className="glass rounded-xl p-6 hover:glow transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <p className="text-foreground mb-4">“{t.q}”</p>
                <p className="text-sm text-muted-foreground">{t.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-4 mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Simple pricing, powerful outcomes
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$0', desc: 'Everything to get moving', features: ['Unified search', 'Basic tracking', 'Profile'] },
              { name: 'Pro', price: '$9/mo', desc: 'Level up your search', features: ['Advanced filters', 'Analytics', 'Document vault'] },
              { name: 'Team', price: '$29/mo', desc: 'Collaborate and scale', features: ['Shared boards', 'Team insights', 'Priority support'] },
            ].map((p, idx) => (
              <motion.div
                key={p.name}
                className={`rounded-2xl border border-border bg-card p-6 ${idx === 1 ? 'primary-gradient text-primary-foreground' : 'glass'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <span className="text-2xl font-bold">{p.price}</span>
                </div>
                <p className={`mb-5 ${idx === 1 ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{p.desc}</p>
                <ul className="space-y-2 mb-6">
          {p.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${idx === 1 ? 'text-primary-foreground' : 'text-green-500'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={idx === 1 ? 'secondary' : 'default'} className="w-full" onClick={() => (window.location.href = idx === 0 ? '/signup' : '/signin')}>
                  {idx === 0 ? 'Get started' : 'Go Pro'}
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features">
          <StaggeredContainer className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" delay={0.1}>
          {features.map((feature) => (
            <StaggeredItem key={feature.title}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50">
                  <CardHeader>
                    <motion.div 
                      className="flex justify-center mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
        </section>

        {/* Benefits Section */}
        <motion.div 
          className="container mx-auto px-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl shadow-lg p-8 mb-16 transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-8 text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose CareerSync?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">For Students & Job Seekers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Find opportunities tailored to your profile and goals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Never miss a deadline with smart notifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Organize applications with our intuitive tracking system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Build a comprehensive profile showcasing your achievements</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Universal search across jobs and scholarships</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Drag-and-drop application status management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Secure document storage and management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Progress tracking and analytics dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* badge removed per request — keeping heading and description only */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience CareerSync in Action</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Explore how our platform transforms your job search with these key features.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Organize Applications', description: 'Organize and track all your applications in one place', icon: <ListTodo className="w-6 h-6 text-emerald-500" />, color: 'from-emerald-500/10 to-emerald-500/5' },
                  { title: 'Resume Builder', description: 'Create professional resumes that stand out to employers', icon: <FileText className="w-6 h-6 text-purple-500" />, color: 'from-purple-500/10 to-purple-500/5' },
                  { title: 'Interview Prep', description: 'Practice with common questions and get personalized feedback', icon: <MessageSquare className="w-6 h-6 text-amber-500" />, color: 'from-amber-500/10 to-amber-500/5' },
                  { title: 'Networking', description: 'Connect with professionals and expand your network', icon: <Users className="w-6 h-6 text-rose-500" />, color: 'from-rose-500/10 to-rose-500/5' },
                  { title: 'Analytics', description: 'Track your progress and optimize your job search', icon: <BarChart2 className="w-6 h-6 text-indigo-500" />, color: 'from-indigo-500/10 to-indigo-500/5' },
                  { title: 'Universal Search', description: 'Find jobs and scholarships with one powerful search', icon: <Search className="w-6 h-6 text-sky-500" />, color: 'from-sky-500/10 to-sky-500/5' },
                ].map((feature) => (
                  <motion.div
                    key={feature.title}
                    className={`p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 bg-gradient-to-br ${feature.color} hover:shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-background/80 flex items-center justify-center mb-4 border border-border/30">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.div 
          className="container mx-auto px-4 text-center pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4 text-foreground"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Sync Your Career?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of students and professionals who are advancing their careers with CareerSync.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/signup'}
              data-testid="button-cta-login"
            >
              Start Your Journey Today
            </Button>
          </motion.div>
        </motion.div>
        {/* Enhanced Footer */}
        <footer className="bg-card border-t border-border mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="CareerSync" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                  <span className="font-semibold text-lg">CareerSync</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Your all-in-one platform for job searching, application tracking, and career growth.
                </p>
                <div className="flex gap-2 items-center">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" asChild>
                    <a href="https://github.com/amaroidev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <span className="sr-only">GitHub</span>
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted/10 text-sm font-semibold">
                        <FaGithub className="h-4 w-4" aria-hidden />
                      </span>
                    </a>
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" asChild>
                    <a href="https://linkedin.com/in/richardkwakuopoku982" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <span className="sr-only">LinkedIn</span>
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted/10 text-sm font-semibold">
                        <FaLinkedin className="h-4 w-4" aria-hidden />
                      </span>
                    </a>
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" asChild>
                    <a href="https://instagram.com/richie_roi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <span className="sr-only">Instagram</span>
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted/10 text-sm font-semibold">
                        <FaInstagram className="h-4 w-4" aria-hidden />
                      </span>
                    </a>
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" asChild>
                    <a href="https://twitter.com/roi_richie" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <span className="sr-only">Twitter</span>
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted/10 text-sm font-semibold">
                        <FaTwitter className="h-4 w-4" aria-hidden />
                      </span>
                    </a>
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" asChild>
                    <a href="https://wa.me/233508597910" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <span className="sr-only">WhatsApp</span>
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-muted/10 text-sm font-semibold">
                        <FaWhatsapp className="h-4 w-4" aria-hidden />
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Features</a></li>
                  <li><a href="#pricing" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Pricing</a></li>
                  <li><a href="#testimonials" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">About Us</Link></li>
                  <li><Link href="/careers" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Careers</Link></li>
                  <li><Link href="/blog" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Stay Updated</h4>
                <p className="text-muted-foreground text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} CareerSync. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cookie Policy</Link>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-end gap-2">
              <p className="text-muted-foreground text-sm">Made by <a href="https://roidev.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">roidev</a></p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
