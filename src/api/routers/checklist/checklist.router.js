import { Router } from "express";

import { ChecklistController } from "./checklist.controller.js";


const ChecklistRouter = Router();

ChecklistRouter.get("/", ChecklistController.getAllChecklists);
ChecklistRouter.get("/:id", ChecklistController.getChecklistDetail);
ChecklistRouter.post("/", ChecklistController.createChecklist);
ChecklistRouter.put("/:id", ChecklistController.updateChecklist);
ChecklistRouter.delete("/:id", ChecklistController.deleteChecklist);

export { ChecklistRouter };