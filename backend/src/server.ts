import "dotenv/config";

import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
// import path from "path";
import "express-async-errors";
import "./database";
import { router } from "./routes";
import cors from "cors";
import path from "path";
import { NotaService } from "./services/NotaService";
import { SincronizarController } from "./controllers/SincronizarController";

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use((req, res, next) => {
  console.log(`LOG-INFO:::Acessando url: ${req.url} ${req.method}`);
  req.io = io;

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

const getVisitors = () => {
  const clients = io.sockets.clients().connected;
  const sockets = Object.values(clients);
  // console.log(sockets);
  const filter = sockets.filter((s: any) => s.user !== undefined);
  const users = filter.map((s: any) => ({
    user: s.user,
    ip: s.handshake.address.split(":").pop(),
  }));
  // console.log(users);
  return users;
};

const getSockets = () => {
  const clients = io.sockets.clients().connected;
  const sockets = Object.values(clients);
  return sockets;
};

io.sockets.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    // console.log('user disconnected');
    // socket.disconnect();
    // emitVisitors();
  });

  socket.on("new message", async (data) => {
    //  io.sockets.emit('receive message', data);
    const userObj: any = getVisitors();
    for await (const u of userObj) {
      const uu: any = u;
      io.to(userObj[uu].socket).emit("receive message", data);
    }
  });

  socket.on("send-message", async (data) => {
    try {
      const sockets = getSockets();
      const dataf = JSON.parse(data);
      // console.log(dataf.title);
      const sincronizar = new SincronizarController();
      const edit = await sincronizar.edit(dataf.data);
      // console.log(edit);
      for await (const u of sockets) {
        const uu: any = u;
        io.to(uu.id).emit("get-message", data);
      }
    } catch (error) {
      console.error(error);
    }
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

setInterval(async () => {
  console.log("Executando BACKUP");
  const service = new NotaService();
  service.backupDatabase();
}, 24 * 60 * 60 * 1000); //hora*minutos*segundos*milisegundo

setTimeout(async () => {
  console.log("Executando BACKUP");
  const service = new NotaService();
  service.backupDatabase();
}, 5 * 1000); //segundos*milisegundo
