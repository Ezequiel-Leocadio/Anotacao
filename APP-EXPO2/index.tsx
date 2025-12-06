import "@expo/metro-runtime"; // Necessary for Fast Refresh on Web
import { registerRootComponent } from "expo";

import App from "./src/index";

registerRootComponent(App);
