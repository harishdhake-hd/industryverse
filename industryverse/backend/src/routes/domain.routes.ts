// domain.routes.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const domains = await prisma.domain.findMany({
      include: { _count: { select: { roles: true } } },
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, domains });
  } catch (err) { next(err); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const domain = await prisma.domain.findUnique({
      where: { slug: req.params.slug },
      include: { roles: { select: { id: true, title: true, slug: true, overview: true, _count: { select: { projects: true, modules: true } } } } },
    });
    if (!domain) return res.status(404).json({ success: false, message: 'Domain not found' });
    res.json({ success: true, domain });
  } catch (err) { next(err); }
});

router.post('/', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const domain = await prisma.domain.create({ data: req.body });
    res.status(201).json({ success: true, domain });
  } catch (err) { next(err); }
});

export default router;
