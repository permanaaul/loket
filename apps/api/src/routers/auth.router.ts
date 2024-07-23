// api/routers/auth.router.ts

import { Router } from 'express';
import { check } from 'express-validator';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();
const authController = new AuthController();

router.post('/register', [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('role').notEmpty().withMessage('Role is required'),
  validate
], authController.register);

router.post('/login', [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password').notEmpty().withMessage('Password is required'),
  validate
], authController.login);

router.get('/me', authenticateToken, authController.me);

export default router;
