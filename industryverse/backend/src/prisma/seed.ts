import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding IndustryVerse database...');

  // Create admin user
  const adminHash = await bcrypt.hash('admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@industryverse.io' },
    update: {},
    create: {
      email: 'admin@industryverse.io',
      name: 'IndustryVerse Admin',
      passwordHash: adminHash,
      role: Role.ADMIN,
    },
  });

  // Create demo student
  const studentHash = await bcrypt.hash('student123!', 12);
  const student = await prisma.user.upsert({
    where: { email: 'demo@industryverse.io' },
    update: {},
    create: {
      email: 'demo@industryverse.io',
      name: 'Demo Student',
      passwordHash: studentHash,
      role: Role.STUDENT,
    },
  });

  // Create domains
  const domains = await Promise.all([
    prisma.domain.upsert({
      where: { slug: 'technology' },
      update: {},
      create: { name: 'Technology', slug: 'technology', description: 'Software, product, data, and infrastructure roles', icon: 'Code2', color: '#3b82f6' },
    }),
    prisma.domain.upsert({
      where: { slug: 'business' },
      update: {},
      create: { name: 'Business', slug: 'business', description: 'Strategy, operations, marketing, and sales roles', icon: 'Building2', color: '#10b981' },
    }),
    prisma.domain.upsert({
      where: { slug: 'finance' },
      update: {},
      create: { name: 'Finance', slug: 'finance', description: 'Investment banking, FP&A, risk, and accounting roles', icon: 'ChartBar', color: '#f59e0b' },
    }),
    prisma.domain.upsert({
      where: { slug: 'corporate-skills' },
      update: {},
      create: { name: 'Corporate Skills', slug: 'corporate-skills', description: 'Cross-domain professional and leadership skills', icon: 'Brain', color: '#8b5cf6' },
    }),
  ]);

  const techDomain = domains[0];
  const bizDomain = domains[1];
  const finDomain = domains[2];

  // Create roles
  const sweRole = await prisma.industryRole.upsert({
    where: { slug: 'software-engineer' },
    update: {},
    create: {
      domainId: techDomain.id,
      title: 'Software Engineer',
      slug: 'software-engineer',
      overview: 'Design, build, and maintain scalable software systems in cross-functional product teams.',
      dailyResponsibilities: JSON.stringify([
        'Daily stand-ups and sprint ceremonies',
        'Writing and reviewing production code',
        'Debugging and resolving production issues',
        'Collaborating with PM and design',
        'Documenting technical decisions',
      ]),
      toolsUsed: JSON.stringify(['Git', 'Jira', 'VS Code', 'Docker', 'Datadog', 'Postman']),
      workflowBreakdown: JSON.stringify([
        { phase: 'Planning', description: 'Break features into tasks, estimate in story points' },
        { phase: 'Design', description: 'Write RFC for complex systems, get review' },
        { phase: 'Implementation', description: 'Code with tests, follow style guide' },
        { phase: 'Code Review', description: 'Open PR, address comments' },
        { phase: 'Release', description: 'Deploy via CI/CD, monitor dashboards' },
      ]),
      requiredSkills: JSON.stringify(['Data Structures', 'System Design', 'TypeScript', 'REST APIs', 'SQL']),
      careerProgression: JSON.stringify([
        { level: 'Junior SWE', years: '0-2' },
        { level: 'SWE II', years: '2-4' },
        { level: 'Senior SWE', years: '4-7' },
        { level: 'Staff SWE', years: '7+' },
      ]),
      avgSalary: '₹8L – ₹45L',
      experienceLevel: 'Entry to Senior',
    },
  });

  // Create projects for SWE
  await prisma.project.upsert({
    where: { id: 'proj-url-shortener' },
    update: {},
    create: {
      id: 'proj-url-shortener',
      roleId: sweRole.id,
      title: 'Design and Build a URL Shortener API',
      description: 'Build a production-ready URL shortening service with analytics and rate limiting.',
      requirementDoc: '## Requirements\n\nBuild a URL shortener with redirect, analytics, and rate limiting...',
      implementationPlan: JSON.stringify([
        { step: 1, title: 'System Design', description: 'Write design doc with data model and API design' },
        { step: 2, title: 'Database Schema', description: 'Design PostgreSQL schema' },
        { step: 3, title: 'Core API', description: 'Implement POST /shorten and GET /:code' },
      ]),
      deliverablesChecklist: JSON.stringify([
        'System Design Document',
        'Database schema',
        'Working API code on GitHub',
        'Tests with >80% coverage',
        'README',
      ]),
      difficulty: 'Intermediate',
      estimatedHours: 12,
      skills: JSON.stringify(['REST API Design', 'PostgreSQL', 'Redis', 'System Design']),
    },
  });

  // Badges
  await Promise.all([
    prisma.badge.upsert({
      where: { name: 'Tech Explorer' },
      update: {},
      create: { name: 'Tech Explorer', description: 'Explored your first tech role', icon: '🚀', criteria: JSON.stringify({ type: 'role_view', domain: 'technology' }) },
    }),
    prisma.badge.upsert({
      where: { name: 'First Project' },
      update: {},
      create: { name: 'First Project', description: 'Started your first simulation project', icon: '🎯', criteria: JSON.stringify({ type: 'project_start', count: 1 }) },
    }),
    prisma.badge.upsert({
      where: { name: 'Finance Pro' },
      update: {},
      create: { name: 'Finance Pro', description: 'Completed a finance simulation project', icon: '💰', criteria: JSON.stringify({ type: 'project_complete', domain: 'finance' }) },
    }),
  ]);

  console.log('✅ Seeding complete!');
  console.log('   Admin: admin@industryverse.io / admin123!');
  console.log('   Demo:  demo@industryverse.io / student123!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
