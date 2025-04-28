import { Router } from "express";
import { SupplierController } from "../controllers/SupplierController";

const router = Router();
const supplierController = new SupplierController();

const nameController = supplierController;

router.get("/", nameController.getAll.bind(nameController));
router.get("/:id", nameController.getById.bind(nameController));
router.post("/", nameController.create.bind(nameController));
router.put("/:id", nameController.update.bind(nameController));
router.delete("/:id", nameController.delete.bind(nameController));

export default router;
