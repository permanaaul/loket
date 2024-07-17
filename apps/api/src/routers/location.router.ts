import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';

const router = Router();
const locationController = new LocationController();

router.get('/locations', locationController.getLocations);

export default router;
