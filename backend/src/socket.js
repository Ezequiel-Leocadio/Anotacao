import "dotenv/config";

// import BotController from './controllers/BotController';

const express = require("express");
const { Router } = require("express");

// const path = require('path');
const cors = require("cors");
// const bodyParser = require('body-parser');

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

// #### Inico  Envio de Menssagem Via Socket Problemas Notas
app.use((req, res, next) => {
  req.io = io;
  next();
});

const router = Router();

router.post("/emit", async (req, res) => {
  try {
    const { msg } = req.body;

    try {
      const sockets = getSockets();

      for await (const u of sockets) {
        io.to(u.id).emit("qrcode", msg);
      }
    } catch (error) {
      console.log(error);
    }

    // req.io.emit("qrcode", { msg });

    return res.json({ success: true, message: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
});

app.use(router);

// ## Fim Mensagem

// statusLogin();

const getVisitors = () => {
  const clients = io.sockets.clients().connected;
  const sockets = Object.values(clients);
  // console.log(sockets);
  const filter = sockets.filter((s) => s.user !== undefined);
  const users = filter.map((s) => ({
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

const emitVisitorsChat = async () => {
  try {
    const userObj = getVisitors();
    const sockets = getSockets();
    for await (const u of sockets) {
      io.to(u.id).emit("atualizar_usuarios_chat", userObj);
    }
  } catch (error) {
    console.log(error);
  }

  // io.sockets.emit('atualizar_usuarios', getVisitors());
  // io.emit('visitors', getVisitors());
};

const emitVisitors = async () => {
  try {
    const userObj = getVisitors();
    const sockets = getSockets();
    // console.log(sockets);
    for await (const u of sockets) {
      // console.log(u.setor);

      io.to(u.id).emit("atualizar_usuarios", userObj);
    }
  } catch (error) {
    console.log(error);
  }

  // io.sockets.emit('atualizar_usuarios', getVisitors());
  // io.emit('visitors', getVisitors());
};

setInterval(async () => {
  // console.log("timeout");
  await emitVisitors();
}, 1000);

// const disconnectAll = () => {
//   Object.keys(io.sockets.sockets).forEach((s) => {
//     io.sockets.sockets[s].disconnect(true);
//   });
// };

io.sockets.on("connection", (socket) => {
  console.log("a user connected");
  // emitVisitors();

  socket.on("get_usuarios", () => {
    console.log("Get_users");
    emitVisitors();
    emitVisitorsChat();
  });

  socket.on("storeClientInfo", (data) => {
    const { agente, setor } = data;

    // if (user !== undefined) {
    console.log("storeClientInfo", agente || data);
    socket.user = agente || data;
    socket.setor = setor || "setor";
    emitVisitors();
    // }
  });

  socket.on("disconnect", () => {
    // console.log('user disconnected');
    // socket.disconnect();
    // emitVisitors();
  });

  socket.on("new message", async (data) => {
    //  io.sockets.emit('receive message', data);
    const userObj = getVisitors();
    for await (const u of userObj) {
      io.to(userObj[u].socket).emit("receive message", data);
    }
  });

  socket.on("senddata", async (data) => {
    try {
      const sockets = getSockets();
      console.log(data);
      // for await (const u of sockets) {
      //   io.to(u.id).emit('get-message', data);
      // }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("send-message", async (data) => {
    try {
      const sockets = getSockets();
      console.log(data);
      for await (const u of sockets) {
        io.to(u.id).emit("get-message", data);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("getonlocation", async (data) => {
    const sockets = getSockets();
    for await (const u of sockets) {
      io.to(u.id).emit("onlocation", data);
    }
  });

  socket.on("setonlocation", async (data) => {
    console.log(data);
    const sockets = getSockets();
    for await (const u of sockets) {
      io.to(u.id).emit("locationmotorista", data);
    }
  });
});

const port = 4141;
server.listen(port, () => {
  console.log(`Running server on from port:::::::${port}`);
});
setTimeout(() => {
  // getVisitors();
}, 5000);
