/**
 * @format
 */
import "./gesture-handler"; // make sure it's at the top and there's nothing else before it
import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";

AppRegistry.registerComponent(appName, () => App);
