import express from 'express';
import { ConcertController } from '../controllers/concert.controller';
import { authorize } from '../middleware/role.middleware';

const router = express.Router();
const concertController = new ConcertController();

router.get('/', concertController.getConcerts); // Remove redundant '/concerts'
router.get('/:id', concertController.getConcertById);
router.post('/', authorize(['ADMIN']), concertController.createConcert);

export default router;
