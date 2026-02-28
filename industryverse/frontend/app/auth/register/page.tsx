'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';

const perks = [
  'Access 36 professional role simulations',
  'Complete real-world corporate projects',
  'AI-powered career guidance',
  'Earn skill badges for your portfolio',
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080812] flex items-center justify-center p-6 grid-pattern">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center"
      >
        {/* Left - value prop */}
        <div className="hidden md:block">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">IndustryVerse</span>
          </Link>
          <h1 className="text-3xl font-bold mb-4">Start your journey into the corporate world</h1>
          <p className="text-white/50 mb-8">Free access to professional role simulations, real projects, and AI mentorship.</p>
          <div className="space-y-3">
            {perks.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - form */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-1">Create your account</h2>
          <p className="text-white/40 text-sm mb-6">Free to start. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Arjun Sharma' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { key: 'password', label: 'Password', type: 'password', placeholder: 'Min. 8 characters' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">{label}</label>
                <input
                  type={type}
                  value={(form as any)[key]}
                  onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>
            ))}

            {error && (
              <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Creating account...' : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-xs text-white/20 mt-4 text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="mt-4 text-center text-sm text-white/40">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300">Sign in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
