import jwt from "jsonwebtoken";

import { logger } from "../logger/logger.js";

import { getNotes, getNote, createNote, updateNote, deleteNote } from "../db/note.js";

import { tryToCatch } from "../utils/try-tot-catch.js";

export class NoteService {

  userId = null

  static async getUserId(token) {
    const [error, decode] = await tryToCatch(token => jwt.verify(token, process.env.SECRET_KEY), token);
    if (error) {
      logger.error("Failed to verify token: " + error);
      return {error: true, detail: "Failed to verify token!"};
    }; 
    this.userId = decode.id;
    return {error: false};
  };

  static async getAllNotesService() {
    const [error, notes] = await tryToCatch(filter => getNotes(filter), {owner: this.userId});
    if (error) {
      logger.error("Error fetching notes: " + error);
      return {error: true, code: 500, detail: "Error fetching notes!"};
    }; return {error: false, code: 200, detail: notes};
  };

  static async getNoteDetailService(noteId) {
    const [error, note] = await tryToCatch(neteId => getNote({_id: neteId, owner: this.userId}), noteId);
    if (error) {
      logger.error("Error fetching note: " + error);
      return {error: true, code: 500, detail: "Error fetching note!" };
    } else if (note) {
      return {error: true, code: 200, detail: note};
    };return {error: false, code: 404, detail: "Note doesn't exists"};
  };

  static async createNoteService(payload) {
    if (this.userId !== payload.owner) {
      logger.error("Error creating note: Forbidden!")
      return {error: true, code: 403, detail: "Error creating note: Forbidden!"};
    };
    const [error, note] = await tryToCatch(payload => createNote(payload), payload);
    if (error) {
      logger.error("Error creating note: " + error);
      return {error: true, code: 500, detail: "Error creating note!" };
    };return {error: false, code: 201, detail: note};
  };

  static async updateNoteService(noteId, payload) {
    if (this.userId !== payload.owner) {
      logger.error("Error updating note: Forbidden!")
      return {error: true, code: 403, detail: "Error updating note: Forbidden!"};
    };
    const [error, note] = await tryToCatch(payload => updateNote({_id: noteId}, payload), payload);
    if (error) {
      logger.error("Error updating note: " + error);
      return {error: true, code: 500, detail: "Error updating note!"};
    };return {error: false, code: 200, detail: note};
  };

  static async deleteNoteService(noteId) {
    const [error, _] = await tryToCatch(filter => deleteNote(filter), {_id: noteId, owner: this.userId});
    if (error) {
      logger.error("Error deleting note: " + error);
      return {error: true, code: 500, detail: "Error deleting note!" };
    };return {error: false, code: 200, detail: "Note deleted successfully"};
  };
  
};
