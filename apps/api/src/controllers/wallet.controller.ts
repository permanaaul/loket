import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class WalletController {
  public async topUpWallet(req: Request, res: Response): Promise<void> {
    const { userId, amount } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { wallet: { increment: amount } },
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to top up wallet', error: (error as Error).message });
    }
  }
}
