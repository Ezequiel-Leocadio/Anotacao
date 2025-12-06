// WebSocket.js

import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataUrl } from "./services/data";

const WebSocketContext = createContext(null);

export { WebSocketContext };
const connectLogin = (socket, agente, setor) => {
  socket.emit("storeClientInfo", { agente, setor });
};

const getData = async (tipo) => {
  try {
    const value = await AsyncStorage.getItem("@senha_storage_Key_" + tipo);
    if (value !== null) {
      return value;
    }
    return 0;
  } catch (e) {
    return 0;
  }
};

async function conection(socket) {
  try {
    const pathname = "notas";

    const deviceName = Device.modelName;

    const agente = `${deviceName}_${pathname}`;
    connectLogin(socket, agente, "");
  } catch (error) {
    alert(`Erro ${error}`);
  }
}

const WebSocketConst = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const sendMessage = ({ data, message }) => {
    if (socket) {
      socket.emit("send-message", JSON.stringify({ data, message }));
    }
    // dispatch(updateChatLog(payload));
  };

  useEffect(() => {
    async function load() {}
    load();
  }, []);

  useEffect(() => {
    async function load() {
      if (!socket) {
        const url: any = await getDataUrl();
        if (!url) {
          return;
        }
        // const ip = await getData("ip_server");
        console.log(url);
        const socketf = io(url);
        setSocket(socketf);
        // alert('Nova conecção');

        socketf.on("disconnect", () => {
          // conection(socket, login);
          conection(socketf);
          // socket.connect();
          // console.log('Disconnected');
        });

        socketf.on("reconnect", () => {
          conection(socketf);
          // socket.connect();
          // console.log('Reconnecting');
        });
        // conecção de usuario via websocket
        conection(socketf);

        socketf.on("get-message", (msg) => {
          const payload = JSON.parse(msg);
        });
      }
    }
    load();

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, connectLogin, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketConst;
