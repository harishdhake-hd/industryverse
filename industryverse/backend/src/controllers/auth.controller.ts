import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/error.middleware';

const prisma = new PrismaClient();

const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      throw new AppError('All fields are required', 400);
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new AppError('Email already registered', 409);

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, name, passwordHash },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    await prisma.activityLog.create({
      data: { userId: user.id, action: 'USER_REGISTERED', entity: 'User', entityId: user.id },
    });

    const token = generateToken(user.id, user.role);
    res.status(201).json({ success: true, token, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError('Invalid credentials', 401);

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new AppError('Invalid credentials', 401);

    await prisma.activityLog.create({
      data: { userId: user.id, action: 'USER_LOGIN', entity: 'User', entityId: user.id },
    });

    const token = generateToken(user.id, user.role);
    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, token, user: safeUser });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).userId },
      select: {
        id: true, email: true, name: true, role: true,
        avatarUrl: true, bio: true, createdAt: true,
        badges: { include: { badge: true } },
        _count: { select: { progress: true, submissions: true } },
      },
    });
    if (!user) throw new AppError('User not found', 404);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, bio, avatarUrl } = req.body;
    const user = await prisma.user.update({
      where: { id: (req as any).userId },
      data: { name, bio, avatarUrl },
      select: { id: true, email: true, name: true, bio: true, avatarUrl: true, role: true },
    });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: (req as any).userId } });
    if (!user) throw new AppError('User not found', 404);

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) throw new AppError('Current password is incorrect', 401);

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};
