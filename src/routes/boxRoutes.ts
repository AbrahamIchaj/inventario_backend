import { Router } from "express";
import { BoxController } from "../controllers/BoxController";

const router = Router();
const boxController = new BoxController();

const nameController = boxController;

router.get("/", nameController.getAll.bind(nameController));
router.get("/:id", nameController.getById.bind(nameController));
router.post("/", nameController.create.bind(nameController));
router.put("/:id", nameController.update.bind(nameController));
router.delete("/:id", nameController.delete.bind(nameController));

export default router;
