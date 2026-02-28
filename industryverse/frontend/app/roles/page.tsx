'use client';

import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Clock, BookOpen, Code2, Building2, ChartBar, Brain } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const domains = [
  { id: 'all', name: 'All Domains', icon: null, color: '' },
  { id: 'technology', name: 'Technology', icon: Code2, color: 'text-blue-400' },
  { id: 'business', name: 'Business', icon: Building2, color: 'text-emerald-400' },
  { id: 'finance', name: 'Finance', icon: ChartBar, color: 'text-yellow-400' },
  { id: 'corporate-skills', name: 'Corporate Skills', icon: Brain, color: 'text-purple-400' },
];

const roles = [
  // Technology
  { id: '1', slug: 'software-engineer', title: 'Software Engineer', domain: 'technology', domainColor: 'blue', overview: 'Design, build, and maintain software systems and applications at scale.', skills: ['TypeScript', 'System Design', 'DSA', 'CI/CD'], modules: 8, projects: 12, level: 'Entry–Senior' },
  { id: '2', slug: 'product-manager', title: 'Product Manager', domain: 'technology', domainColor: 'blue', overview: 'Own the product vision, roadmap, and delivery from ideation to launch.', skills: ['Roadmapping', 'Analytics', 'Agile', 'Stakeholder Mgmt'], modules: 7, projects: 10, level: 'Mid–Senior' },
  { id: '3', slug: 'data-scientist', title: 'Data Scientist', domain: 'technology', domainColor: 'blue', overview: 'Extract insights from large datasets to drive business decisions.', skills: ['Python', 'ML/AI', 'SQL', 'Statistics'], modules: 9, projects: 8, level: 'Entry–Senior' },
  { id: '4', slug: 'devops-engineer', title: 'DevOps Engineer', domain: 'technology', domainColor: 'blue', overview: 'Bridge development and operations to enable rapid, reliable software delivery.', skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'], modules: 6, projects: 7, level: 'Mid–Senior' },
  // Business
  { id: '5', slug: 'strategy-consultant', title: 'Strategy Consultant', domain: 'business', domainColor: 'emerald', overview: 'Help organizations solve complex business problems and drive transformation.', skills: ['Problem Solving', 'Slide Decks', 'Excel', 'Communication'], modules: 8, projects: 9, level: 'Entry–Senior' },
  { id: '6', slug: 'marketing-manager', title: 'Marketing Manager', domain: 'business', domainColor: 'emerald', overview: 'Lead campaigns, brand strategy, and growth initiatives.', skills: ['GTM Strategy', 'Analytics', 'Brand', 'CRM'], modules: 6, projects: 8, level: 'Mid–Senior' },
  { id: '7', slug: 'operations-analyst', title: 'Operations Analyst', domain: 'business', domainColor: 'emerald', overview: 'Optimize business processes, reduce costs, and improve efficiency.', skills: ['Process Mapping', 'SQL', 'Lean/Six Sigma', 'Data Analysis'], modules: 7, projects: 8, level: 'Entry–Mid' },
  // Finance
  { id: '8', slug: 'investment-banking-analyst', title: 'Investment Banking Analyst', domain: 'finance', domainColor: 'yellow', overview: 'Work on M&A, IPOs, and capital market transactions for major corporations.', skills: ['Financial Modeling', 'Excel', 'Pitch Decks', 'Valuation'], modules: 10, projects: 12, level: 'Entry–Associate' },
  { id: '9', slug: 'financial-analyst', title: 'FP&A Analyst', domain: 'finance', domainColor: 'yellow', overview: 'Drive financial planning, budgeting, and forecasting for business decisions.', skills: ['Excel', 'SQL', 'Forecasting', 'Variance Analysis'], modules: 8, projects: 9, level: 'Entry–Senior' },
  { id: '10', slug: 'risk-analyst', title: 'Risk Analyst', domain: 'finance', domainColor: 'yellow', overview: 'Identify, assess, and mitigate financial and operational risks.', skills: ['Risk Models', 'Compliance', 'Statistics', 'Reporting'], modules: 7, projects: 7, level: 'Entry–Mid' },
  // Corporate Skills
  { id: '11', slug: 'project-manager', title: 'Project Manager', domain: 'corporate-skills', domainColor: 'purple', overview: 'Lead cross-functional teams to deliver projects on time, budget, and scope.', skills: ['PMP', 'Agile', 'Risk Mgmt', 'Stakeholder Comms'], modules: 8, projects: 10, level: 'Mid–Senior' },
  { id: '12', slug: 'business-analyst', title: 'Business Analyst', domain: 'corporate-skills', domainColor: 'purple', overview: 'Bridge business needs and technical solutions through requirements analysis.', skills: ['Requirements', 'UML', 'SQL', 'Process Mapping'], modules: 7, projects: 8, level: 'Entry–Mid' },
];

const colorMap: Record<string, string> = {
  blue: 'border-blue-500/20 bg-blue-500/5',
  emerald: 'border-emerald-500/20 bg-emerald-500/5',
  yellow: 'border-yellow-500/20 bg-yellow-500/5',
  purple: 'border-purple-500/20 bg-purple-500/5',
};

const tagColorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
  purple: 'bg-purple-500/10 text-purple-400',
};

export default function RolesPage() {
  const [activeDomain, setActiveDomain] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = roles.filter(role => {
    const matchDomain = activeDomain === 'all' || role.domain === activeDomain;
    const matchSearch = search === '' || role.title.toLowerCase().includes(search.toLowerCase());
    return matchDomain && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#080812] text-white">
      {/* Header */}
      <div className="border-b border-white/5 glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">IndustryVerse</Link>
          <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors">Dashboard →</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Explore Professional Roles</h1>
          <p className="text-white/50">Deep-dive into 36 roles across 4 industry domains.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          {/* Domain tabs */}
          <div className="flex gap-2 flex-wrap">
            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setActiveDomain(domain.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all ${
                  activeDomain === domain.id
                    ? 'bg-indigo-600 text-white'
                    : 'glass text-white/50 hover:text-white'
                }`}
              >
                {domain.icon && <domain.icon className={`w-3.5 h-3.5 ${domain.color}`} />}
                {domain.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-white/30 mb-6">{filtered.length} roles found</p>

        {/* Roles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/roles/${role.slug}`}>
                <div className={`group border rounded-2xl p-6 h-full cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${colorMap[role.domainColor]}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg leading-tight">{role.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-2 ${tagColorMap[role.domainColor]}`}>
                      {role.domain.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed mb-5">{role.overview}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {role.skills.map((skill) => (
                      <span key={skill} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/50">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{role.modules} modules</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{role.projects} projects</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
