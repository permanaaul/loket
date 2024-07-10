// apps/api/src/routers/someProtected.router.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default router;
