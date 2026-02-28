'use client';

import { motion } from 'framer-motion';
import { Users, FolderKanban, BookOpen, BarChart3, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const stats = [
  { label: 'Total Users', value: '1,247', icon: Users, change: '+23 this week', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Active Projects', value: '384', icon: FolderKanban, change: '+41 this week', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Modules Live', value: '96', icon: BookOpen, change: '8 domains', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { label: 'Submissions', value: '2,193', icon: BarChart3, change: '+156 this week', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

const recentSubmissions = [
  { id: '1', user: 'Priya Nair', project: 'REST API Architecture', status: 'SUBMITTED', time: '2h ago' },
  { id: '2', user: 'Rahul Menon', project: 'Financial Model Series A', status: 'COMPLETED', time: '4h ago' },
  { id: '3', user: 'Arjun Shah', project: 'Product Roadmap Q1', status: 'REJECTED', time: '6h ago' },
  { id: '4', user: 'Sneha Joshi', project: 'Marketing GTM Strategy', status: 'SUBMITTED', time: '8h ago' },
];

const recentUsers = [
  { id: '1', name: 'Priya Nair', email: 'priya@example.com', joined: '2 days ago', projects: 3, role: 'STUDENT' },
  { id: '2', name: 'Rahul Menon', email: 'rahul@example.com', joined: '3 days ago', projects: 5, role: 'STUDENT' },
  { id: '3', name: 'Admin User', email: 'admin@industryverse.io', joined: '1 month ago', projects: 0, role: 'ADMIN' },
];

const tabs = ['Overview', 'Users', 'Submissions', 'Roles', 'Analytics'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-[#080812] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-60 glass border-r border-white/5 z-40 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold">Admin Panel</span>
          </div>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                activeTab === tab ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <Link href="/dashboard" className="block text-xs text-white/30 hover:text-white/60 px-3 py-2 transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </aside>

      <main className="ml-60 p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Manage IndustryVerse platform</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                <div className={`text-xs mt-1 ${stat.color}`}>{stat.change}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Submissions */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-5">Recent Submissions</h2>
              <div className="space-y-3">
                {recentSubmissions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{sub.user}</p>
                      <p className="text-xs text-white/40">{sub.project}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        sub.status === 'COMPLETED' ? 'bg-emerald-400/10 text-emerald-400' :
                        sub.status === 'REJECTED' ? 'bg-red-400/10 text-red-400' :
                        'bg-yellow-400/10 text-yellow-400'
                      }`}>{sub.status}</span>
                      <span className="text-xs text-white/30">{sub.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View all submissions →</button>
            </div>

            {/* Recent Users */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-5">Recent Users</h2>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-white/30">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === 'ADMIN' ? 'bg-purple-400/10 text-purple-400' : 'bg-blue-400/10 text-blue-400'}`}>
                        {user.role}
                      </span>
                      <p className="text-xs text-white/30 mt-1">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View all users →</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 glass rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              {['Add New Role', 'Create Module', 'Add Project', 'Export Users', 'View Analytics'].map((action) => (
                <button key={action} className="px-4 py-2 text-sm glass rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
