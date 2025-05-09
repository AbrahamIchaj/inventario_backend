import { Router } from "express";
import { SaleController } from "../controllers/SaleController";

const router = Router();
const saleController = new SaleController();

router.get("/", saleController.getAll.bind(saleController));
router.get("/:id", saleController.getById.bind(saleController));
router.post("/", saleController.create.bind(saleController));
router.put("/:id", saleController.update.bind(saleController));
router.post("/:id/cancel", saleController.cancel.bind(saleController));

export default router;
