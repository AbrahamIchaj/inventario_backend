import { Router } from "express";
import { BranchController } from "../controllers/BranchController";

const router = Router();
const branchController = new BranchController();

const nameController = branchController;

router.get("/", nameController.getAll.bind(nameController));
router.get("/:id", nameController.getById.bind(nameController));
router.post("/", nameController.create.bind(nameController));
router.put("/:id", nameController.update.bind(nameController));
router.delete("/:id", nameController.delete.bind(nameController));

export default router;
