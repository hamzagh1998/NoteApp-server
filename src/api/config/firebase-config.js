import admin from "firebase-admin";
import { createRequire } from "module";
// import { initializeApp } from "firebase-admin/app";

const require = createRequire(import.meta.url);
const serviceAccount = require("./service-account-key.json");

export const firebaseAdmin = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});