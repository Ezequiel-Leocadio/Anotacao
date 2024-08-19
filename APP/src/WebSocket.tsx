// WebSocket.js

import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import { getDeviceName } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebSocketContext = createContext(null);

export { WebSocketContext };
const connectLogin = (socket, agente, setor) => {
  socket.emit('storeClientInfo', { agente, setor });
};

const getData = async (tipo) => {
  try {
    const value = await AsyncStorage.getItem('@senha_storage_Key_' + tipo);
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
    const pathname = 'novasenha';

    const filial = await getData('filial');

    const deviceName = await getDeviceName();

    const agente = `${deviceName}_${pathname}__${filial}`;
    connectLogin(socket, agente, '');
  } catch (error) {
    alert(`Erro ${error}`);
  }
}

const WebSocketConst = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function load() {}
    load();
  }, []);

  useEffect(() => {
    async function load() {
      if (!socket) {
        const ip = await getData('ip_server');

        const socketf = io(`http://${ip}:4488`);
        setSocket(socketf);
        // alert('Nova conecção');

        socketf.on('disconnect', () => {
          // conection(socket, login);
          conection(socketf);
          // socket.connect();
          // console.log('Disconnected');
        });

        socketf.on('reconnect', () => {
          conection(socketf);
          // socket.connect();
          // console.log('Reconnecting');
        });
        // conecção de usuario via websocket
        conection(socketf);

        socketf.on('get-message', (msg) => {
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
    <WebSocketContext.Provider value={{ socket, connectLogin }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketConst;
