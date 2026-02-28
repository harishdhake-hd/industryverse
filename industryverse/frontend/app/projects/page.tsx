'use client';

import { motion } from 'framer-motion';
import { Clock, Search, CheckCircle2, Circle, Play, ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const projects = [
  { id: '1', title: 'Design and Build a URL Shortener API', role: 'Software Engineer', domain: 'Technology', difficulty: 'Intermediate', hours: 12, status: 'IN_PROGRESS', progress: 65, description: 'Architect a production-ready URL shortening service with caching, analytics, and rate limiting.' },
  { id: '2', title: 'Financial Model — Series A Startup', role: 'FP&A Analyst', domain: 'Finance', difficulty: 'Advanced', hours: 20, status: 'IN_PROGRESS', progress: 30, description: 'Build a 3-statement financial model, cap table, and investor deck for a SaaS startup.' },
  { id: '3', title: 'Product Roadmap Q1 2025', role: 'Product Manager', domain: 'Technology', difficulty: 'Intermediate', hours: 10, status: 'NOT_STARTED', progress: 0, description: 'Define product strategy, write PRDs, and prioritize a feature roadmap using RICE scoring.' },
  { id: '4', title: 'GTM Strategy — B2B SaaS Launch', role: 'Marketing Manager', domain: 'Business', difficulty: 'Intermediate', hours: 14, status: 'COMPLETED', progress: 100, description: 'Develop a full go-to-market strategy including ICP, channels, messaging, and launch plan.' },
  { id: '5', title: 'Investment Banking Pitch Deck — M&A', role: 'IB Analyst', domain: 'Finance', difficulty: 'Advanced', hours: 24, status: 'NOT_STARTED', progress: 0, description: 'Prepare an M&A teaser and CIM for a mid-market acquisition. Includes valuation and deal structure.' },
  { id: '6', title: 'Kubernetes Migration Plan', role: 'DevOps Engineer', domain: 'Technology', difficulty: 'Advanced', hours: 16, status: 'SUBMITTED', progress: 100, description: 'Plan and document the migration of a monolith application to a Kubernetes cluster on AWS EKS.' },
];

const difficultyColor: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-400/10',
  Intermediate: 'text-yellow-400 bg-yellow-400/10',
  Advanced: 'text-red-400 bg-red-400/10',
};

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  NOT_STARTED: { label: 'Not Started', icon: Circle, color: 'text-white/30' },
  IN_PROGRESS: { label: 'In Progress', icon: Play, color: 'text-blue-400' },
  SUBMITTED: { label: 'Submitted', icon: CheckCircle2, color: 'text-yellow-400' },
  COMPLETED: { label: 'Completed', icon: CheckCircle2, color: 'text-emerald-400' },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter || p.difficulty === filter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#080812] text-white">
      <div className="border-b border-white/5 glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">IndustryVerse</Link>
          <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors">Dashboard →</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Simulation Projects</h1>
          <p className="text-white/50">Real corporate projects. Submit deliverables. Build your portfolio.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'IN_PROGRESS', 'NOT_STARTED', 'COMPLETED', 'Advanced'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${filter === f ? 'bg-indigo-600 text-white' : 'glass text-white/50 hover:text-white'}`}
              >
                {f === 'all' ? 'All' : f.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project, i) => {
            const status = statusConfig[project.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="group glass glass-hover rounded-2xl p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[project.difficulty]}`}>
                        {project.difficulty}
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />{status.label}
                      </span>
                    </div>

                    <h3 className="font-semibold mb-2 flex-1">{project.title}</h3>
                    <p className="text-xs text-white/50 mb-4 leading-relaxed">{project.description}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
                      <span>{project.role}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.hours}h</span>
                    </div>

                    {/* Progress */}
                    {project.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-white/30 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 bg-white/5 rounded-md text-white/40">{project.domain}</span>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
