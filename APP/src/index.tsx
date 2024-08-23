import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import App from './routes';

import WebSocketProvider, { WebSocketContext } from './WebSocket';

const Index = () => {
  useEffect(() => {
    // SystemNavigationBar.navigationHide();
    // SystemNavigationBar.fullScreen(true);
  }, []);

  return (
    <WebSocketProvider>
      {/* <StatusBar  /> */}
      {/* <KeepAwake /> */}

      <App />
    </WebSocketProvider>
  );
};

export default Index;
