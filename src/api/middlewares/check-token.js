import jwt from "jsonwebtoken";

import { tryToCatch } from "../utils/try-tot-catch.js";

export async function checkToken(req, res, next) {
  if (!req.headers.authorization) 
    return res.status(403).json({error: true, detail: "Unauthorized!"});

  const token = req.headers.authorization.split(" ")[1];

  console.log(token);

  const [error, _] = await tryToCatch(jwt.verify, token, process.env.SECRET_KEY);
  
  if (!token || error) 
    return res.status(403).json({error: true, detail: "Unauthorized!"});

  req.body.token = token;
  next();
};