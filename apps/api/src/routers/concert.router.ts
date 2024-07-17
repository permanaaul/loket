import { Router } from 'express';
import { ConcertController } from '../controllers/concert.controller';

const router = Router();
const concertController = new ConcertController();

router.get('/concerts', concertController.getConcerts); // Rute ini seharusnya menangani GET /api/concerts
router.get('/concerts/:id', concertController.getConcertById);
router.post('/concerts', concertController.createConcert);

export default router;
