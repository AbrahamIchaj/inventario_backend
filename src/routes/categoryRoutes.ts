import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();
const categoryController = new CategoryController();

const nameController = categoryController ;

router.get('/', nameController.getAll.bind(nameController));
router.get('/:id', nameController.getById.bind(nameController));
router.post('/', nameController.create.bind(nameController));
router.put('/:id', nameController.update.bind(nameController));
router.delete('/:id', nameController.delete.bind(nameController));


export default router;