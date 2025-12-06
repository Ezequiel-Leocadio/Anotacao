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
      {/* <KeepAwake /> */}

      <App />
      <StatusBar style="light" translucent={false} backgroundColor="#2e2d2d" />
    </WebSocketProvider>
  );
};

export default Index;
