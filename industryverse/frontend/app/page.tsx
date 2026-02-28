'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Brain, Building2, ChartBar, Code2, Sparkles, Star, TrendingUp, Users, Zap, CheckCircle, Globe } from 'lucide-react';
import { useRef } from 'react';

const domains = [
  { id: 'technology', name: 'Technology', icon: Code2, color: 'from-blue-500 to-cyan-400', roles: 12, description: 'Software Engineering, Product, Data Science, DevOps' },
  { id: 'business', name: 'Business', icon: Building2, color: 'from-emerald-500 to-teal-400', roles: 10, description: 'Strategy, Operations, Marketing, Sales' },
  { id: 'finance', name: 'Finance', icon: ChartBar, color: 'from-yellow-500 to-orange-400', roles: 8, description: 'Investment Banking, FP&A, Risk, Accounting' },
  { id: 'corporate-skills', name: 'Corporate Skills', icon: Brain, color: 'from-purple-500 to-pink-400', roles: 6, description: 'Leadership, Communication, Project Management' },
];

const features = [
  { icon: Globe, title: 'Real Industry Simulation', description: 'Work on actual corporate projects mirroring Fortune 500 workflows and methodologies.' },
  { icon: Brain, title: 'AI-Powered Guidance', description: 'Context-aware AI assistant that understands your role and provides expert-level mentorship.' },
  { icon: TrendingUp, title: 'Career Progression Paths', description: 'Visualize complete career trajectories with skill requirements at each level.' },
  { icon: Zap, title: 'Hands-On Projects', description: 'Submit deliverables, get feedback, and build a portfolio of real work.' },
  { icon: Users, title: '36 Professional Roles', description: 'Across 4 major domains covering the full spectrum of corporate careers.' },
  { icon: Star, title: 'Skill Badges', description: 'Earn verifiable badges as you complete modules and projects.' },
];

const stats = [
  { value: '36+', label: 'Professional Roles' },
  { value: '150+', label: 'Simulation Projects' },
  { value: '4', label: 'Industry Domains' },
  { value: 'AI', label: 'Powered Assistant' },
];

const testimonials = [
  { name: 'Arjun Sharma', role: 'IIM Ahmedabad, MBA', text: 'IndustryVerse gave me the context I was missing. I walked into my internship already understanding how investment banking actually works.' },
  { name: 'Priya Nair', role: 'BITS Pilani, CS', text: 'The tech role simulations are incredibly detailed. Working through a real product roadmap project changed how I approach system design.' },
  { name: 'Rahul Menon', role: 'SRCC, Finance', text: 'The FP&A simulation had me building actual financial models. Nothing else prepares you like this.' },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#080812] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">IndustryVerse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="/roles" className="hover:text-white transition-colors">Explore Roles</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/assistant" className="hover:text-white transition-colors">AI Assistant</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link href="/auth/register" className="text-sm bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-lg font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 grid-pattern">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Corporate Simulation Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Understand the Industry
            <br />
            <span className="gradient-text">Before You Enter It</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A corporate simulation ecosystem where students explore industries, understand professional roles,
            complete real-world projects, and get AI-powered career guidance — before day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/auth/register"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all duration-300 glow-purple"
            >
              Start Exploring Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/roles"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass glass-hover rounded-xl font-medium"
            >
              Browse 36 Roles
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-9 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Domains Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Four Domains, Infinite Careers</h2>
          <p className="text-white/50 max-w-xl mx-auto">Explore professional roles across the industries that power the modern economy.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/roles?domain=${domain.id}`}>
                <div className="group glass glass-hover rounded-2xl p-8 h-full cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <domain.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{domain.name}</h3>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">{domain.roles} roles</span>
                  </div>
                  <p className="text-sm text-white/50">{domain.description}</p>
                  <div className="mt-6 flex items-center gap-1 text-sm text-indigo-400 group-hover:gap-2 transition-all">
                    Explore roles <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-indigo-950/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Prepare</h2>
            <p className="text-white/50 max-w-xl mx-auto">Purpose-built for students who want real preparation, not surface-level content.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Students Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Enter the Industry?</h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">Join thousands of students who are building real corporate experience before graduation.</p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all glow-purple"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold">IndustryVerse</span>
          </div>
          <p className="text-sm text-white/30">© 2024 IndustryVerse. Built for the next generation of professionals.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
