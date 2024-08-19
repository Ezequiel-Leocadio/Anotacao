import "dotenv/config";

import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
// import path from "path";
import "express-async-errors";
import "./database";
import { router } from "./routes";
import cors from "cors";
import path from "path";

const app = express();
const server = require("http").Server(app);

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use((req, res, next) => {
  console.log(`LOG-INFO:::Acessando url: ${req.url} ${req.method}`);
  next();
});

app.use("/files", express.static(path.resolve(__dirname, "..", "upload")));
app.use(router);

// Middiewares de Erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof Error) {
    return res.json({
      message: err.message,
      success: false,
    });
  }

  return res.json({
    message: `Internal Server Error ${err}`,
    success: false,
  });
});

// Capturar Erros Não Tratados
process.on("uncaughtException", async (err, source) => {
  console.error(`uncaughtException ${err} ${source}`);
});

// Capturar Warns
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection ${err}`);
});

const port = 3131;
server.listen(port, () => {
  console.log("Server is Running " + port);
});
