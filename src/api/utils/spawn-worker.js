import { logger } from "../logger/logger.js";

export function spawnWorker(workers, cluster, i) {
  workers[i] = cluster.fork();
  logger.info("New worker spawns: " + i);

  // Optional: Restart worker on exit
  workers[i].on("exit", (code, signal) => {
    
    logger.error("Worker was killed by signal: " + signal)
    logger.error("Worker exited with error code: " + code)
    logger.info("Respawning worker:", i);
    spawnWorker(workers, cluster, i);
  });
};