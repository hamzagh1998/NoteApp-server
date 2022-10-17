import admin from "firebase-admin";
// import { initializeApp } from "firebase-admin/app";

import serviceAccount from "./service-account-key.json" assert { type: "json" };

export const firebaseAdmin = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});