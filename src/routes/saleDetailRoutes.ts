import { Router } from "express";
import { SaleDetailController } from "../controllers/SaleDetailController";

const router = Router();
const saleDetailController = new SaleDetailController();

router.get("/", saleDetailController.getAll.bind(saleDetailController));
router.get("/:id", saleDetailController.getById.bind(saleDetailController));
router.get("/sale/:saleId", saleDetailController.getBySaleId.bind(saleDetailController));
router.post("/", saleDetailController.create.bind(saleDetailController));
router.put("/:id", saleDetailController.update.bind(saleDetailController));
router.delete("/:id", saleDetailController.delete.bind(saleDetailController));

export default router;