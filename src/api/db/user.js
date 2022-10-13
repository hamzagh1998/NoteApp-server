import { UserModel } from "../models/user.model.js";


export async function getUser(filter) {
  return await UserModel.findOne(filter);
};

export function createUser(payload) {
  const user = new UserModel(payload);
  user.save();
  return user;
};
