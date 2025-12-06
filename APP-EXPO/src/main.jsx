import "@expo/metro-runtime"; // Necessary for Fast Refresh on Web

import { registerRootComponent } from 'expo';
import Index from "./index";




function App() {

  return <Index />;
}

registerRootComponent(App); 




