// module.routes.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';
const r1 = Router();
const prisma = new PrismaClient();

r1.get('/', async (req, res, next) => {
  try {
    const modules = await prisma.module.findMany({ orderBy: { order: 'asc' }, include: { role: { select: { title: true } } } });
    res.json({ success: true, modules });
  } catch (err) { next(err); }
});

r1.post('/', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const module = await prisma.module.create({ data: req.body });
    res.status(201).json({ success: true, module });
  } catch (err) { next(err); }
});

r1.put('/:id/complete', authenticate, async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const progress = await prisma.userProgress.upsert({
      where: { id: `${userId}-${req.params.id}` },
      create: { userId, moduleId: req.params.id, completed: true, progress: 100, completedAt: new Date() },
      update: { completed: true, progress: 100, completedAt: new Date() },
    });
    res.json({ success: true, progress });
  } catch (err) { next(err); }
});

export default r1;
