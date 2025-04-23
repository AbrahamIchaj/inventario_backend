import { Router } from 'express';
import { RoleController } from '../controllers/RoleController';

const router = Router();
const roleController = new RoleController();
const nameController = roleController ;

router.get('/', nameController.getAll.bind(nameController));
router.get('/:id', nameController.getById.bind(nameController));
router.post('/', nameController.create.bind(nameController));
router.put('/:id', nameController.update.bind(nameController));
router.delete('/:id', nameController.delete.bind(nameController));

export default router;