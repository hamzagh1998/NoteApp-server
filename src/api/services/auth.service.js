import { createUser, getUser } from "../db/user.js";
import jwt from "jsonwebtoken";

import { logger } from "../logger/logger.js";

import { tryToCatch } from "../utils/try-tot-catch.js";


export async function AuthService(payload) {
  let user;
  let token;
  let error;
  // check if user already exists
  [error, user] = await tryToCatch(async filter => await getUser(filter), {email: payload.email});
  if (user) {
    token = generateToken({id: user._id, name: user.name, email: user.email, photoUrl: user.photoUrl});

    return {error: false, detail: token};
  } else if (error) {
    logger.error("Error fetching user: " + error);
    return {error: true, detail: "Error fetching user: " + error};
  } else { // create new user
    [error, user] = await tryToCatch(payload => createUser(payload), payload);
    if (error) {
      logger.error("Error creating user: " + error);
      return {error: true, detail: "Error creating new user: " + error};
    };
    logger.info("New user has been created: " + user);
    token = generateToken({id: user._id, name: user.name, email: user.email, photoUrl: user.photoUrl});

    return {error: false, detail: token};
  };

};

function generateToken(data) {
  return jwt.sign(data, process.env.SECRET_KEY);
};