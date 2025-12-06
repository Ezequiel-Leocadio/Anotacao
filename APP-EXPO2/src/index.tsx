import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import App from "./routes";
import "./css.css";

import WebSocketProvider, { WebSocketContext } from "./WebSocket";

const Index = () => {
  useEffect(() => {
    // SystemNavigationBar.navigationHide();
    // SystemNavigationBar.fullScreen(true);
  }, []);

  return (
    <WebSocketProvider>
      <StatusBar style="light" />

      {/* <KeepAwake /> */}

      <App />
    </WebSocketProvider>
  );
};

export default Index;
