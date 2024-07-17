// concert.router.ts
import express from 'express';
import { ConcertController } from '../controllers/concert.controller';
import { authorize } from '../middleware/role.middleware';

const router = express.Router();
const concertController = new ConcertController();

router.get('/concerts', concertController.getConcerts);
router.get('/concerts/:id', concertController.getConcertById);
router.post('/concerts', authorize(['ADMIN']), concertController.createConcert);

export default router;
