import { Router } from "express";

import { AuthController } from "./auth.controller.js";


const AuthRouter = Router();

AuthRouter.post("/signin", AuthController);

export { AuthRouter };
