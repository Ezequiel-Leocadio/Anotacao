import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import App from './routes';
// import KeepAwake from 'react-native-keep-awake';

import WebSocketProvider, { WebSocketContext } from './WebSocket';

import SystemNavigationBar from 'react-native-system-navigation-bar';

const Index = () => {
  useEffect(() => {
    // SystemNavigationBar.navigationHide();
    // SystemNavigationBar.fullScreen(true);
  }, []);

  return (
    <WebSocketProvider>
      {/* <StatusBar hidden /> */}
      {/* <KeepAwake /> */}

      <App />
    </WebSocketProvider>
  );
};

export default Index;
