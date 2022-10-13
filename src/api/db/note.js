import { NoteModel } from "../models/note.model.js";


export async function getNotes(filter) {
  return await NoteModel.find(filter);
};

export async function getNote(filter) {
  return await NoteModel.findOne(filter);
};

export function createNote(payload) {
  const note = new NoteModel(payload);
  note.save();
  return note;
};

export async function updateNote(filter, payload) {
  return await NoteModel.findOneAndUpdate(filter, payload, {new: true});
};

export async function deleteNote(filter) {
  return await NoteModel.findOneAndDelete(filter);
};