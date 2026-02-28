'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Briefcase, ChevronDown, Clock, Code, GitBranch, Star, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for Software Engineer role
const roleData = {
  title: 'Software Engineer',
  domain: 'Technology',
  level: 'Entry to Senior',
  avgSalary: '₹8L – ₹45L per year',
  overview: `Software Engineers design, develop, test, and maintain software applications and systems. 
In a corporate environment, SWEs work in cross-functional product teams alongside Product Managers, Designers, and QA to ship features that impact millions of users.
This role demands strong foundations in computer science, excellent problem-solving abilities, and the soft skills to collaborate, communicate technical decisions, and navigate organizational dynamics.`,
  dailyResponsibilities: [
    'Participate in daily stand-ups and sprint planning (15–20 min)',
    'Write and review production-quality code with unit tests',
    'Debug and resolve issues from staging or production environments',
    'Collaborate with PM and design to refine upcoming features',
    'Review pull requests and provide constructive technical feedback',
    'Document technical decisions via RFCs or ADRs',
    'Attend bi-weekly architecture or platform syncs',
  ],
  tools: [
    { name: 'Git / GitHub', category: 'Version Control' },
    { name: 'Jira / Linear', category: 'Project Management' },
    { name: 'VS Code / IntelliJ', category: 'IDE' },
    { name: 'Docker / Kubernetes', category: 'Infrastructure' },
    { name: 'Datadog / Grafana', category: 'Observability' },
    { name: 'Postman', category: 'API Testing' },
    { name: 'Confluence / Notion', category: 'Documentation' },
    { name: 'Slack', category: 'Communication' },
  ],
  workflowBreakdown: [
    { phase: 'Intake & Planning', description: 'Read the product spec, break it into technical tasks, estimate in story points, flag dependencies.', duration: '1–2 days' },
    { phase: 'Design', description: 'Write an RFC/design doc for complex systems; get sign-off from tech leads before coding.', duration: '1–3 days' },
    { phase: 'Implementation', description: 'Write feature code, unit tests, integration tests. Follow code style and branch strategy.', duration: '3–8 days' },
    { phase: 'Code Review', description: 'Open PR, respond to review comments, iterate until approved by 2 engineers.', duration: '1–2 days' },
    { phase: 'QA & Staging', description: 'Deploy to staging, run regression tests, fix bugs found by QA team.', duration: '1–2 days' },
    { phase: 'Production Release', description: 'Canary or blue-green deployment, monitor dashboards, on-call for 24h post-release.', duration: '1 day' },
  ],
  requiredSkills: {
    technical: ['Data Structures & Algorithms', 'System Design', 'TypeScript / Python / Java', 'REST & GraphQL APIs', 'SQL + NoSQL Databases', 'CI/CD pipelines'],
    soft: ['Clear written communication', 'Ability to give/receive feedback', 'Scope estimation', 'Cross-functional collaboration'],
  },
  careerProgression: [
    { level: 'Junior SWE', years: '0–2 years', focus: 'Shipping features with guidance' },
    { level: 'SWE II', years: '2–4 years', focus: 'Owning modules independently' },
    { level: 'Senior SWE', years: '4–7 years', focus: 'Technical design, mentoring' },
    { level: 'Staff SWE', years: '7+ years', focus: 'Cross-team architecture' },
    { level: 'Principal / VP Eng', years: '10+ years', focus: 'Org-level technical strategy' },
  ],
  projects: [
    { id: 'p1', title: 'Design and Build a URL Shortener API', difficulty: 'Intermediate', hours: 12, description: 'Architect a production-ready URL shortening service with analytics.' },
    { id: 'p2', title: 'Microservices Migration Plan', difficulty: 'Advanced', hours: 20, description: 'Plan the decomposition of a monolith into microservices with detailed ADR.' },
    { id: 'p3', title: 'Code Review Simulation', difficulty: 'Beginner', hours: 4, description: 'Review a PR with real code, write structured feedback comments.' },
    { id: 'p4', title: 'System Design: WhatsApp at Scale', difficulty: 'Advanced', hours: 16, description: 'Design a messaging system handling 100M concurrent users.' },
  ],
};

export default function RoleDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = ['overview', 'daily-life', 'tools', 'workflow', 'skills', 'career', 'projects'];

  return (
    <div className="min-h-screen bg-[#080812] text-white">
      {/* Header */}
      <div className="border-b border-white/5 glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/roles" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> All Roles
          </Link>
          <Link href="/assistant" className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300">
            <Zap className="w-3.5 h-3.5" /> Ask AI about this role
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Role header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{roleData.domain}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">{roleData.level}</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">{roleData.title}</h1>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-400" />{roleData.avgSalary}</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-blue-400" />{roleData.projects.length} simulation projects</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto mb-8 border-b border-white/5 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-t-lg capitalize whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-white/40 hover:text-white'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === 'overview' && (
            <div className="max-w-3xl">
              <p className="text-white/70 leading-relaxed text-base whitespace-pre-line">{roleData.overview}</p>
            </div>
          )}

          {activeTab === 'daily-life' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-6">A Typical Day as a {roleData.title}</h2>
              <div className="space-y-3">
                {roleData.dailyResponsibilities.map((item, i) => (
                  <div key={i} className="flex gap-3 glass rounded-xl p-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-6">Tools Used Daily</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roleData.tools.map((tool) => (
                  <div key={tool.name} className="glass rounded-xl p-4 text-center">
                    <div className="font-medium text-sm mb-1">{tool.name}</div>
                    <div className="text-xs text-white/40">{tool.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-6">Real Workflow Breakdown — Feature Delivery Cycle</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />
                <div className="space-y-4">
                  {roleData.workflowBreakdown.map((phase, i) => (
                    <div key={phase.phase} className="flex gap-6 pl-12 relative">
                      <div className="absolute left-2 top-3 w-4 h-4 rounded-full bg-indigo-500 border-2 border-[#080812] z-10 -translate-x-1/2" />
                      <div className="glass rounded-xl p-5 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{phase.phase}</h3>
                          <span className="text-xs text-white/30">{phase.duration}</span>
                        </div>
                        <p className="text-sm text-white/60">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="max-w-3xl grid md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Code className="w-4 h-4 text-blue-400" />Technical Skills</h3>
                <div className="space-y-2">
                  {roleData.requiredSkills.technical.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-purple-400" />Soft Skills</h3>
                <div className="space-y-2">
                  {roleData.requiredSkills.soft.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />{s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'career' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-6">Career Progression Path</h2>
              <div className="space-y-4">
                {roleData.careerProgression.map((step, i) => (
                  <div key={step.level} className="flex gap-4 items-start">
                    <div className="text-center shrink-0 w-20">
                      <div className="text-2xl font-bold text-indigo-400">{i + 1}</div>
                    </div>
                    <div className="glass rounded-xl p-5 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{step.level}</h3>
                        <span className="text-xs text-white/30">{step.years}</span>
                      </div>
                      <p className="text-sm text-white/50">{step.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-6">Simulation Projects</h2>
              <div className="space-y-4">
                {roleData.projects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <div className="glass glass-hover rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium">{project.title}</h3>
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            project.difficulty === 'Beginner' ? 'bg-emerald-400/10 text-emerald-400' :
                            project.difficulty === 'Intermediate' ? 'bg-yellow-400/10 text-yellow-400' :
                            'bg-red-400/10 text-red-400'
                          }`}>{project.difficulty}</span>
                          <span className="text-xs text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" />{project.hours}h</span>
                        </div>
                      </div>
                      <p className="text-sm text-white/50">{project.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
