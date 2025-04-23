import { Router } from 'express';
import { BrandController } from '../controllers/BrandController';

const router = Router();
const brandController = new BrandController();

const nameController=brandController ;

router.get('/', nameController.getAll.bind(nameController));
router.get('/:id', nameController.getById.bind(nameController));
router.post('/', nameController.create.bind(nameController));
router.put('/:id', nameController.update.bind(nameController));
router.delete('/:id', nameController.delete.bind(nameController));

export default router;