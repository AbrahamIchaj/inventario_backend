import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

const router = Router();
const customerController = new CustomerController();

const nameController = customerController;

router.get("/", nameController.getAll.bind(nameController));
router.get("/:id", nameController.getById.bind(nameController));
router.post("/", nameController.create.bind(nameController));
router.put("/:id", nameController.update.bind(nameController));
router.delete("/:id", nameController.delete.bind(nameController));

export default router;
