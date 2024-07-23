import { Request, Response } from 'express';
import prisma from '@/utils/prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const secretKey = 'your_secret_key'; 
export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { username, email, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role,
        },
      });

      res.status(200).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to register user',
        error: (error as Error).message,
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        secretKey,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to login',
        error: (error as Error).message,
      });
    }
  }

  public async me(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const decoded: any = jwt.verify(token, secretKey);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({
        message: 'User retrieved successfully',
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get user',
        error: (error as Error).message,
      });
    }
  }
}
