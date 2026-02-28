// user.routes.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middlewares/auth.middleware';
const router = Router();
const prisma = new PrismaClient();

router.get('/dashboard', authenticate, async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const [user, submissions, progress, activities] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, include: { badges: { include: { badge: true } } } }),
      prisma.projectSubmission.findMany({ where: { userId }, include: { project: { select: { title: true, difficulty: true } } }, orderBy: { updatedAt: 'desc' }, take: 5 }),
      prisma.userProgress.findMany({ where: { userId, completed: true }, include: { module: true, role: true } }),
      prisma.activityLog.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 10 }),
    ]);
    const stats = {
      completedModules: progress.filter(p => p.moduleId).length,
      completedProjects: submissions.filter(s => s.status === 'COMPLETED').length,
      ongoingProjects: submissions.filter(s => s.status === 'IN_PROGRESS').length,
      badges: user?.badges.length || 0,
    };
    res.json({ success: true, user, stats, submissions, activities });
  } catch (err) { next(err); }
});

export default router;
