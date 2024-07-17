import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();
const categoryController = new CategoryController();

router.get('/categories', categoryController.getCategories);

export default router;
