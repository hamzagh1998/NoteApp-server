import { ChecklistModel } from "../models/checklist.model.js";


export async function getChecklists(filter) {
  return await ChecklistModel.find(filter);
};

export async function getChecklist(filter) {
  return await ChecklistModel.findOne(filter);
};

export function createChecklis(payload) {
  const checklist = new ChecklistModel(payload);
  checklist.save();
  return checklist;
};

export async function updateChecklist(filter, payload) {
  return await ChecklistModel.findOneAndUpdate(filter, payload, {new: true});
};

export async function deleteChecklist(filter) {
  return await ChecklistModel.findOneAndDelete(filter);
};