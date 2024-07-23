// concert.controller.ts
import { Request, Response } from 'express';
import prisma from '@/utils/prismaClient';

export class ConcertController {
  public async getConcerts(req: Request, res: Response): Promise<void> {
    const { category, location } = req.query;

    try {
      const concerts = await prisma.concert.findMany({
        where: {
          ...(category ? { category: { name: category as string } } : {}),
          ...(location ? { location: { name: location as string } } : {}),
        },
        include: {
          category: true,
          location: true,
        },
      });
      res.status(200).json(concerts);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Failed to get concerts',
          error: (error as Error).message,
        });
    }
  }

  public async getConcertById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const concert = await prisma.concert.findUnique({
        where: { id: Number(id) },
        include: {
          category: true,
          location: true,
          concertTickets: {
            include: {
              ticketType: true,
            },
          },
        },
      });

      if (!concert) {
        res.status(404).json({ message: 'Concert not found' });
        return;
      }

      res.status(200).json(concert);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Failed to get concert',
          error: (error as Error).message,
        });
    }
  }

  public async createConcert(req: Request, res: Response): Promise<void> {
    const { name, imageUrl, date, locationId, categoryId } = req.body;

    if (!name || !imageUrl || !date || !locationId || !categoryId) {
      res.status(400).json({ message: 'Invalid data' });
      return;
    }

    try {
      const concert = await prisma.concert.create({
        data: {
          name,
          imageUrl,
          date: new Date(date),
          locationId,
          categoryId,
        },
      });

      res.status(201).json(concert);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Failed to create concert',
          error: (error as Error).message,
        });
    }
  }
}
