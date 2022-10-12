import { devLogger } from "./dev.logger.js";
import { prodLogger } from "./prod.logger.js";

export const logger = process.env.NODE_ENV === "production" ? prodLogger() : devLogger();
