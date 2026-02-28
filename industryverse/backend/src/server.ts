import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import domainRoutes from './routes/domain.routes';
import roleRoutes from './routes/role.routes';
import moduleRoutes from './routes/module.routes';
import projectRoutes from './routes/project.routes';
import assistantRoutes from './routes/assistant.routes';
import adminRoutes from './routes/admin.routes';

// Middleware
import { errorHandler } from './middlewares/error.middleware';
import { notFound } from './middlewares/notFound.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('combined'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 IndustryVerse API running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;
