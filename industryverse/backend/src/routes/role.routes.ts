import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const { domain, search } = req.query;
    const roles = await prisma.industryRole.findMany({
      where: {
        ...(domain && { domain: { slug: domain as string } }),
        ...(search && { title: { contains: search as string, mode: 'insensitive' } }),
      },
      include: {
        domain: { select: { name: true, slug: true, color: true } },
        _count: { select: { projects: true, modules: true } },
      },
    });
    res.json({ success: true, roles });
  } catch (err) { next(err); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const role = await prisma.industryRole.findUnique({
      where: { slug: req.params.slug },
      include: {
        domain: true,
        modules: { orderBy: { order: 'asc' } },
        projects: { select: { id: true, title: true, difficulty: true, estimatedHours: true, description: true } },
      },
    });
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
    res.json({ success: true, role });
  } catch (err) { next(err); }
});

router.post('/', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const role = await prisma.industryRole.create({ data: req.body });
    res.status(201).json({ success: true, role });
  } catch (err) { next(err); }
});

router.put('/:id', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const role = await prisma.industryRole.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, role });
  } catch (err) { next(err); }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res, next) => {
  try {
    await prisma.industryRole.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Role deleted' });
  } catch (err) { next(err); }
});

export default router;
