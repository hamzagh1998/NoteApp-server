import cluster from "cluster";
import { cpus } from "os";
import path from "path";
import dotenv from "dotenv";
import ip from "ip";

import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { logger } from "./logger/logger.js";

import { spawnWorker } from "./utils/spawn-worker.js";


const __dirname = path.resolve();

dotenv.config({ path: __dirname + "/src/api/config/.env" });

const PORT = Number(process.env.PORT) || 5000;
const processesNum = cpus().length;

process.env.NODE_ENV === "production"
  ? connectDB(process.env.MONGO_PRO_URL)
  : connectDB("mongodb://localhost:27017/noteapp");  

if (process.env.NODE_ENV === "production") {
  if (cluster.isPrimary) {
    let workers= [];
    
    for (let i=0; i<processesNum; i++) spawnWorker(workers, cluster, i);
  } else {
    app.listen(PORT, () => logger.info("Worker run on port: " +PORT));
  };

} else if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => logger.info("Server run on development mode on port: "+PORT));
} else {
  app.listen(PORT, ip.address(), 
    () => logger.info("Server run on development mode on: "+ip.address()+":"+PORT));
};