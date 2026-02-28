// project.routes.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      include: { role: { select: { title: true, slug: true, domain: { select: { name: true } } } } },
    });
    res.json({ success: true, projects });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { role: { include: { domain: true } } },
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) { next(err); }
});

router.post('/:id/submit', authenticate, async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const submission = await prisma.projectSubmission.upsert({
      where: { projectId_userId: { projectId: req.params.id, userId } },
      create: { projectId: req.params.id, userId, status: 'SUBMITTED', progress: 100, submittedAt: new Date(), notes: req.body.notes },
      update: { status: 'SUBMITTED', submittedAt: new Date(), notes: req.body.notes },
    });
    res.json({ success: true, submission });
  } catch (err) { next(err); }
});

router.put('/:id/progress', authenticate, async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const { progress } = req.body;
    const submission = await prisma.projectSubmission.upsert({
      where: { projectId_userId: { projectId: req.params.id, userId } },
      create: { projectId: req.params.id, userId, status: 'IN_PROGRESS', progress },
      update: { progress, status: progress < 100 ? 'IN_PROGRESS' : 'SUBMITTED' },
    });
    res.json({ success: true, submission });
  } catch (err) { next(err); }
});

export default router;
