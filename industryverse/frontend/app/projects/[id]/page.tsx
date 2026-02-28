'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, CheckSquare, Square, Clock, Upload, FileText, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const projectData = {
  id: '1',
  title: 'Design and Build a URL Shortener API',
  role: 'Software Engineer',
  domain: 'Technology',
  difficulty: 'Intermediate',
  estimatedHours: 12,
  description: 'In this simulation, you are a backend engineer at a growing startup. Your team has been tasked with building an internal URL shortener service — similar to Bit.ly — to support marketing campaigns and track link performance.',
  requirementDoc: `## Project Requirements: URL Shortener API

### Background
Your marketing team needs a custom URL shortener to track campaign performance and control branding. The solution must be production-ready, scalable to 10M+ monthly requests, and maintainable by the team.

### Functional Requirements
1. **URL Shortening**: Generate a unique 6-character short code for any valid URL
2. **Redirect**: Resolve short URLs and redirect to the original URL
3. **Analytics**: Track click count, timestamps, and referrers per short URL
4. **Expiry**: Support optional expiration dates on short links
5. **Custom slugs**: Allow users to specify a custom short code (if available)
6. **Rate limiting**: Prevent abuse by limiting requests per IP

### Non-Functional Requirements
- Response time < 100ms for redirects
- 99.9% uptime SLA
- Support for 10,000 concurrent users
- RESTful API with OpenAPI/Swagger documentation

### Out of Scope
- User authentication (use a single API key for now)
- Frontend/UI (API only)
- Multi-tenancy`,

  implementationPlan: [
    { step: 1, title: 'System Design Document', description: 'Write a design doc covering data model, API endpoints, caching strategy, and infrastructure choices. Get sign-off.' },
    { step: 2, title: 'Database Schema', description: 'Design the PostgreSQL schema for URLs, clicks, and rate limits. Use appropriate indexes.' },
    { step: 3, title: 'Core API Endpoints', description: 'Implement POST /shorten, GET /:code (redirect), GET /analytics/:code endpoints.' },
    { step: 4, title: 'Caching Layer', description: 'Implement Redis caching for hot URLs to achieve sub-100ms redirect response time.' },
    { step: 5, title: 'Rate Limiting', description: 'Add rate limiting middleware using a sliding window algorithm.' },
    { step: 6, title: 'Testing', description: 'Write unit and integration tests. Achieve >80% test coverage.' },
    { step: 7, title: 'Documentation', description: 'Write OpenAPI spec and a README with setup instructions.' },
  ],
  deliverables: [
    { id: 'd1', text: 'System Design Document (1-2 pages)' },
    { id: 'd2', text: 'Database schema with migrations' },
    { id: 'd3', text: 'Working API code on GitHub (public repo)' },
    { id: 'd4', text: 'Unit + integration tests (>80% coverage)' },
    { id: 'd5', text: 'OpenAPI/Swagger documentation' },
    { id: 'd6', text: 'README with setup and design decisions' },
    { id: 'd7', text: 'Load test results (optional bonus)' },
  ],
  skills: ['REST API Design', 'PostgreSQL', 'Redis', 'System Design', 'Testing'],
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('overview');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const progress = Math.round((checkedItems.size / projectData.deliverables.length) * 100);

  const handleSubmit = () => {
    if (checkedItems.size >= 3) setSubmitted(true);
  };

  const tabs = ['overview', 'requirements', 'implementation', 'deliverables', 'submit'];

  return (
    <div className="min-h-screen bg-[#080812] text-white">
      <div className="border-b border-white/5 glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/projects" className="flex items-center gap-2 text-white/50 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4" /> Projects
          </Link>
          <Link href="/assistant" className="text-sm text-indigo-400 hover:text-indigo-300">Ask AI for help →</Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{projectData.domain}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400">{projectData.difficulty}</span>
            <span className="text-xs text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" />{projectData.estimatedHours}h estimate</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{projectData.title}</h1>
          <p className="text-white/50 text-sm">{projectData.role}</p>

          {/* Progress bar */}
          <div className="mt-6 glass rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Deliverables Progress</span>
              <span className="text-indigo-400 font-medium">{checkedItems.size}/{projectData.deliverables.length} completed</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto mb-8 border-b border-white/5 pb-px">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-t-lg capitalize whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-white/40 hover:text-white'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <h2 className="font-semibold mb-3 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-yellow-400" />Project Brief</h2>
                <p className="text-white/70 text-sm leading-relaxed">{projectData.description}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h2 className="font-semibold mb-3">Skills You'll Practice</h2>
                <div className="flex flex-wrap gap-2">
                  {projectData.skills.map((s) => (
                    <span key={s} className="text-sm px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="font-semibold">Requirement Document</h2>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-white/70 text-sm leading-relaxed font-sans">{projectData.requirementDoc}</pre>
              </div>
            </div>
          )}

          {activeTab === 'implementation' && (
            <div className="space-y-4">
              <h2 className="font-semibold mb-4">Step-by-Step Implementation Plan</h2>
              {projectData.implementationPlan.map((step) => (
                <div key={step.step} className="glass rounded-xl p-5 flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-bold shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-sm">{step.title}</h3>
                    <p className="text-sm text-white/50">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-400" /> Deliverables Checklist
              </h2>
              <p className="text-sm text-white/40 mb-6">Check off each deliverable as you complete it.</p>
              <div className="space-y-3">
                {projectData.deliverables.map((item) => {
                  const checked = checkedItems.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                        checked ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-white/3 border border-white/5 hover:border-white/15'
                      }`}
                    >
                      {checked
                        ? <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                        : <Square className="w-5 h-5 text-white/20 shrink-0" />
                      }
                      <span className={`text-sm ${checked ? 'text-emerald-300 line-through decoration-emerald-400/50' : 'text-white/70'}`}>
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'submit' && (
            <div className="max-w-2xl">
              {submitted ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="glass rounded-2xl p-12 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold mb-2">Project Submitted!</h2>
                  <p className="text-white/50 text-sm">Your submission is under review. You'll receive feedback within 48 hours.</p>
                  <Link href="/projects" className="mt-6 inline-block text-sm text-indigo-400 hover:text-indigo-300">
                    ← Browse more projects
                  </Link>
                </motion.div>
              ) : (
                <div className="glass rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="w-5 h-5 text-indigo-400" />
                    <h2 className="font-semibold">Submit Project</h2>
                  </div>

                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-indigo-300">
                    {checkedItems.size < 3
                      ? `Complete at least 3 deliverables to submit. You've completed ${checkedItems.size}.`
                      : `Great! You've completed ${checkedItems.size} deliverables. You're ready to submit.`
                    }
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">Submission Notes (optional)</label>
                    <textarea
                      value={submissionNotes}
                      onChange={(e) => setSubmissionNotes(e.target.value)}
                      placeholder="Share links to your GitHub repo, any design decisions you made, or challenges you faced..."
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-indigo-500/50 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={checkedItems.size < 3}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-medium text-sm transition-colors"
                  >
                    Submit for Review
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
