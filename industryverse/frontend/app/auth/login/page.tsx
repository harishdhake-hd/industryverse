'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Connect to API: await api.auth.login({ email, password })
      // For demo: simulate redirect
      await new Promise(r => setTimeout(r, 1000));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080812] flex items-center justify-center p-6 grid-pattern">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">IndustryVerse</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-white/40 text-sm">Sign in to continue your learning journey</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder:text-white/25 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/40">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300">
              Create one free
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
