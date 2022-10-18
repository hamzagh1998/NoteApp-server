import jwt from "jsonwebtoken";

import { logger } from "../logger/logger.js";

import { getChecklists, getChecklist, createChecklis, updateChecklist, deleteChecklist } from "../db/checklist.js";

import { tryToCatch } from "../utils/try-tot-catch.js";


export class ChecklistService {

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

  static async getAllChecklistsService() {
    const [error, checklists] = await tryToCatch(getChecklists, {owner: this.userId});
    if (error) {
      logger.error("Error fetching checklists: " + error);
      return {error: true, code: 500, detail: "Error fetching checklists!"};
    }; return {error: false, code: 200, detail: checklists};
  };

  static async getChecklistDetail(checklistId) {
    const [error, checklist] = await tryToCatch(getChecklist, {_id: checklistId, owner: this.userId});
    if (error) {
      logger.error("Error fetching checklist: " + error);
      return {error: true, code: 500, detail: "Error fetching checklist!" };
    } else if (checklist) {
      return {error: false, code: 200, detail: checklist};
    };return {error: true, code: 404, detail: "Checklist doesn't exists!"};
  };

  static async createChecklistService(payload) {
    if (this.userId !== payload.owner) {
      logger.error("Error creating checklist: Forbidden!")
      return {error: true, code: 403, detail: "Error creating checklist: Forbidden!"};
    };
    const [error, checklist] = await tryToCatch(createChecklis, payload);
    if (error) {
      logger.error("Error creating checklist: " + error);
      return {error: true, code: 500, detail: "Error creating checklist!" };
    };return {error: false, code: 201, detail: checklist};
  };

  static async updateChecklistService(checklistId, payload) {
    if (this.userId !== payload.owner) {
      logger.error("Error updating note: Forbidden!")
      return {error: true, code: 403, detail: "Error updating note: Forbidden!"};
    };
    const [error, note] = await tryToCatch(updateChecklist, {_id: checklistId}, payload);
    if (error) {
      logger.error("Error updating note: " + error);
      return {error: true, code: 500, detail: "Error updating note!"};
    };return {error: false, code: 200, detail: note};
  };

  static async deleteChecklistService(checklistId) {
    const [error, _] = await tryToCatch(deleteChecklist, {_id: checklistId, owner: this.userId});
    if (error) {
      logger.error("Error deleting checklist: " + error);
      return {error: true, code: 500, detail: "Error deleting checklist!" };
    };return {error: false, code: 200, detail: "Checklist deleted successfully!"};
  };

};