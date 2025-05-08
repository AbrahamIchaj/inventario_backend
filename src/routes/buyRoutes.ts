import { Router } from "express";
import { BuyController } from "../controllers/BuyController";

const router = Router();
const buyController = new BuyController();

const nameController = buyController;

router.get("/", nameController.getAll.bind(nameController));
router.get("/:id", nameController.getById.bind(nameController));
router.post("/", nameController.create.bind(nameController));
router.put("/:id", nameController.update.bind(nameController));
router.delete("/:id", nameController.delete.bind(nameController));

export default router;
