import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getAll.bind(productController));
router.get("/:id", productController.getById.bind(productController));
router.post("/", productController.create.bind(productController));
router.put("/:id", productController.update.bind(productController));
router.delete("/:id", productController.delete.bind(productController));

export default router;
