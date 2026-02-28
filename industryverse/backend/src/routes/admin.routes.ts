import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticate, requireAdmin);

router.get('/analytics', async (req, res, next) => {
  try {
    const [users, projects, submissions, domains] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.projectSubmission.groupBy({ by: ['status'], _count: true }),
      prisma.domain.findMany({ include: { _count: { select: { roles: true } } } }),
    ]);
    res.json({ success: true, analytics: { totalUsers: users, totalProjects: projects, submissionsByStatus: submissions, domains } });
  } catch (err) { next(err); }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true, _count: { select: { submissions: true, progress: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, users });
  } catch (err) { next(err); }
});

router.patch('/users/:id/role', async (req, res, next) => {
  try {
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { role: req.body.role } });
    res.json({ success: true, user });
  } catch (err) { next(err); }
});

router.get('/submissions', async (req, res, next) => {
  try {
    const submissions = await prisma.projectSubmission.findMany({
      include: { user: { select: { name: true, email: true } }, project: { select: { title: true } } },
      orderBy: { submittedAt: 'desc' },
    });
    res.json({ success: true, submissions });
  } catch (err) { next(err); }
});

router.put('/submissions/:id/review', async (req, res, next) => {
  try {
    const { status, feedback } = req.body;
    const submission = await prisma.projectSubmission.update({
      where: { id: req.params.id },
      data: { status, feedback, reviewedAt: new Date() },
    });
    res.json({ success: true, submission });
  } catch (err) { next(err); }
});

export default router;
