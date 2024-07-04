import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    
    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password, // You should hash the password in a real-world application
        },
      });

      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user', error: (error as Error).message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // In a real-world application, you should verify the password using a hash
      if (user.password !== password) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to login', error: (error as Error).message });
    }
  }
}
