import { Router } from "express";

import { ChecklistController } from "./checklist.controller.js";


const checklistRouter = Router();

checklistRouter.get("/", ChecklistController.getAllChecklists);
checklistRouter.get("/:id", ChecklistController.getChecklistDetail);
checklistRouter.post("/", ChecklistController.createChecklist);
checklistRouter.put("/:id", ChecklistController.updateChecklist);
checklistRouter.delete("/:id", ChecklistController.deleteChecklist);

export { checklistRouter };