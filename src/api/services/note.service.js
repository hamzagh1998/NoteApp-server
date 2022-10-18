import jwt from "jsonwebtoken";

import { logger } from "../logger/logger.js";

import { getNotes, getNote, createNote, updateNote, deleteNote } from "../db/note.js";

import { tryToCatch } from "../utils/try-tot-catch.js";


export class NoteService {

  userId = null

  static async getUserId(token) {
    const [error, decode] = await tryToCatch(jwt.verify, token, process.env.SECRET_KEY);
    if (error) {
      logger.error("Failed to verify token: " + error);
      return {error: true, detail: "Failed to verify token!"};
    }; 
    this.userId = decode.id;
    return {error: false};
  };

  static async getAllNotesService() {
    const [error, notes] = await tryToCatch(getNotes, {owner: this.userId});
    if (error) {
      logger.error("Error fetching notes: " + error);
      return {error: true, code: 500, detail: "Error fetching notes!"};
    }; return {error: false, code: 200, detail: notes};
  };

  static async getNoteDetailService(noteId) {
    const [error, note] = await tryToCatch(getNote, {_id: noteId, owner: this.userId});
    if (error) {
      logger.error("Error fetching note: " + error);
      return {error: true, code: 500, detail: "Error fetching note!" };
    } else if (note) {
      return {error: false, code: 200, detail: note};
    };return {error: true, code: 404, detail: "Note doesn't exists!"};
  };

  static async createNoteService(payload) {
    if (this.userId !== payload.owner) {
      logger.error("Error creating note: Forbidden!")
      return {error: true, code: 403, detail: "Error creating note: Forbidden!"};
    };
    const [error, note] = await tryToCatch(createNote, payload);
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
    const [error, note] = await tryToCatch(updateNote, {_id: noteId}, payload);
    if (error) {
      logger.error("Error updating note: " + error);
      return {error: true, code: 500, detail: "Error updating note!"};
    };return {error: false, code: 200, detail: note};
  };

  static async deleteNoteService(noteId) {
    const [error, _] = await tryToCatch(deleteNote, {_id: noteId, owner: this.userId});
    if (error) {
      logger.error("Error deleting note: " + error);
      return {error: true, code: 500, detail: "Error deleting note!" };
    };return {error: false, code: 200, detail: "Note deleted successfully!"};
  };
  
};
