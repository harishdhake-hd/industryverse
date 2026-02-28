import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    (req as any).userId = decoded.userId;
    (req as any).userRole = decoded.role;
    next();
  } catch (err) {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).userRole !== 'ADMIN') {
    return next(new AppError('Admin access required', 403));
  }
  next();
};
