import { Router } from 'express';
import { RoleController } from '../controllers/RoleController';

const router = Router();
const roleController = new RoleController();

router.get('/', roleController.getAll.bind(roleController));
router.get('/:id', roleController.getById.bind(roleController));
router.post('/', roleController.create.bind(roleController));
router.put('/:id', roleController.update.bind(roleController));
router.delete('/:id', roleController.delete.bind(roleController));

export default router;