'use client';

import { motion } from 'framer-motion';
import { BookOpen, Trophy, Zap, Clock, TrendingUp, ChevronRight, Star, Activity } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

const mockStats = [
  { label: 'Completed Modules', value: '12', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Active Projects', value: '3', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Badges Earned', value: '7', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { label: 'Hours Invested', value: '48', icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

const mockProjects = [
  { id: '1', title: 'Product Roadmap Q1 2025', role: 'Product Manager', status: 'IN_PROGRESS', progress: 65, difficulty: 'Intermediate' },
  { id: '2', title: 'Financial Model — Series A Startup', role: 'Financial Analyst', status: 'IN_PROGRESS', progress: 30, difficulty: 'Advanced' },
  { id: '3', title: 'REST API Architecture Design', role: 'Backend Engineer', status: 'SUBMITTED', progress: 100, difficulty: 'Intermediate' },
];

const mockActivities = [
  { action: 'Completed module', target: 'Agile Methodology', time: '2 hours ago' },
  { action: 'Started project', target: 'Financial Model — Series A', time: '5 hours ago' },
  { action: 'Earned badge', target: 'Tech Explorer', time: '1 day ago' },
  { action: 'Joined role', target: 'Product Manager', time: '2 days ago' },
];

const mockBadges = [
  { name: 'Tech Explorer', icon: '🚀', earned: true },
  { name: 'Finance Pro', icon: '💰', earned: true },
  { name: 'Team Player', icon: '🤝', earned: false },
  { name: 'Project Master', icon: '🏆', earned: false },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#080812]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/5 z-40 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">IndustryVerse</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: 'Dashboard', href: '/dashboard', icon: Activity, active: true },
            { label: 'Role Explorer', href: '/roles', icon: TrendingUp },
            { label: 'My Projects', href: '/projects', icon: Zap },
            { label: 'AI Assistant', href: '/assistant', icon: Star },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <div className="text-sm font-medium">{user?.name || 'Student'}</div>
              <div className="text-xs text-white/40">Student</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'Student'} 👋</h1>
            <p className="text-white/40 mt-1">Here's your progress at a glance.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {mockStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5"
              >
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Active Projects</h2>
                <Link href="/projects" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {mockProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-sm">{project.title}</h3>
                      <p className="text-xs text-white/40 mt-0.5">{project.role}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      project.status === 'SUBMITTED' ? 'bg-emerald-400/10 text-emerald-400' :
                      'bg-indigo-400/10 text-indigo-400'
                    }`}>
                      {project.status === 'SUBMITTED' ? 'Submitted' : 'In Progress'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40">{project.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar widgets */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="glass rounded-2xl p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" /> Badges
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {mockBadges.map((badge) => (
                    <div
                      key={badge.name}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl ${
                        badge.earned ? 'bg-white/5 border border-white/10' : 'opacity-30 bg-white/[0.02]'
                      }`}
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-xs text-center text-white/60">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="glass rounded-2xl p-5">
                <h2 className="font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {mockActivities.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <div>
                        <p className="text-xs text-white/70">
                          <span>{a.action}: </span>
                          <span className="text-indigo-400">{a.target}</span>
                        </p>
                        <p className="text-xs text-white/30 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
