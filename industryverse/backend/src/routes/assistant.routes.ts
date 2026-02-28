import { Router } from 'express';
import { chat, getHistory, clearSession } from '../controllers/assistant.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
router.use(authenticate);
router.post('/chat', chat);
router.get('/history', getHistory);
router.delete('/session/:sessionId', clearSession);

export default router;
