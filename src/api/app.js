import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { AuthRouter } from "./routers/auth/auth.router.js";

const app = express();

const __dirname = path.resolve();

// middlewares
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
);
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/src/public"));

// Routes
app.use("/api/auth", AuthRouter);
app.get("/", (_, res) => res.statusCode(200).send("Hello There!"));

export { app };
