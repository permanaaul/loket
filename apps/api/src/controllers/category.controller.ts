import { Request, Response } from 'express';
import prisma from '@/utils/prismaClient';

export class CategoryController {
  public async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Failed to get categories',
          error: (error as Error).message,
        });
    }
  }
}
