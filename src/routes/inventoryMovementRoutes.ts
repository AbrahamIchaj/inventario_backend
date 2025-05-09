import { Router } from "express";
import { InventoryMovementController } from "../controllers/InventoryMovementController";

const router = Router();
const inventoryMovementController = new InventoryMovementController();

router.get("/", inventoryMovementController.getAll.bind(inventoryMovementController));
router.get("/:id", inventoryMovementController.getById.bind(inventoryMovementController));
router.post("/", inventoryMovementController.create.bind(inventoryMovementController));
router.put("/:id", inventoryMovementController.update.bind(inventoryMovementController));
router.delete("/:id", inventoryMovementController.delete.bind(inventoryMovementController));

export default router;