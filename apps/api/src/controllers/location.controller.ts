import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LocationController {
  public async getLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await prisma.location.findMany();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get locations', error: (error as Error).message });
    }
  }
}
