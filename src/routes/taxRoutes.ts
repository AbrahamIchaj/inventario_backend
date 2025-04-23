import { Router } from 'express';
import { TaxController } from '../controllers/TaxController';

const router = Router();
const taxController = new TaxController();

const nameController=taxController ;

router.get('/', nameController.getAll.bind(nameController));
router.get('/:id', nameController.getById.bind(nameController));
router.post('/', nameController.create.bind(nameController));
router.put('/:id', nameController.update.bind(nameController));
router.delete('/:id', nameController.delete.bind(nameController));

export default router;