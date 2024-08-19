import React from 'react';

import createRouter from './routes';

// const PushNotification = require('react-native-push-notification');

export default function App() {
  const Routes = createRouter();
  return <Routes />;
}
