import { Router } from "express";
import { PurchaseDetailController } from "../controllers/PurchaseDetailController";

const router = Router();
const purchaseDetailController = new PurchaseDetailController();

router.get("/", purchaseDetailController.getAll.bind(purchaseDetailController));
router.get("/:id", purchaseDetailController.getById.bind(purchaseDetailController));
router.get("/purchase/:purchaseId", purchaseDetailController.getByPurchaseId.bind(purchaseDetailController));
router.post("/", purchaseDetailController.create.bind(purchaseDetailController));
router.put("/:id", purchaseDetailController.update.bind(purchaseDetailController));
router.delete("/:id", purchaseDetailController.delete.bind(purchaseDetailController));

export default router;