import { Router } from 'express';
import { PaymentMethodController } from '../controllers/PaymentMethodController';

const router = Router();
const paymentmethodController = new PaymentMethodController();

const nameController=paymentmethodController ;

router.get('/', nameController.getAll.bind(nameController));
router.get('/:id', nameController.getById.bind(nameController));
router.post('/', nameController.create.bind(nameController));
router.put('/:id', nameController.update.bind(nameController));
router.delete('/:id', nameController.delete.bind(nameController));

export default router;