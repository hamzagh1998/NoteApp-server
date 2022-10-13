import { Router } from "express";

import { NoteController } from "./note.controller.js";

const NoteRouter = Router();

NoteRouter.get("/", NoteController.getAllNotes);
NoteRouter.get("/:id", NoteController.getNoteDetail);
NoteRouter.post("/", NoteController.createNote);
NoteRouter.put("/:id", NoteController.updateNote);
NoteRouter.delete("/:id", NoteController.deleteNote);

export { NoteRouter };