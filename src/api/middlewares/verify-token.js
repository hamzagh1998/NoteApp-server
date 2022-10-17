import { firebaseAdmin } from "../config/firebase-config.js";

import { tryToCatch } from "../utils/try-tot-catch.js";

export async function verifyToken(req, res, next) {
  if (!req.headers.authorization) 
    return res.status(403).json({error: true, detail: "Unauthorized!"});
    
  const token = req.headers.authorization.split(" ")[1];

  const [error, decodeValue] = await tryToCatch(token => firebaseAdmin.auth().verifyIdToken(token), token);
  if (error) {
    console.log("Internal server error: " + error);
    return res.status(500).json({error: true, detail: "Internal server error!"});
  } else if (decodeValue) {
    return next();
  } else {
    return res.status(401).json({error: true, detail: "Unauthorized!"});
  };
};