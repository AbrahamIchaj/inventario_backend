import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

const nameController = userController;

router.get("/", nameController.getAll.bind(nameController));
router.get("/:id", nameController.getById.bind(nameController));
router.post("/", nameController.create.bind(nameController));
router.put("/:id", nameController.update.bind(nameController));
router.delete("/:id", nameController.delete.bind(nameController));

export default router;
