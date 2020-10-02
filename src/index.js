import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, registerServiceWorker } from "./services";
import { isIOS, isMacOs, isSafari } from "react-device-detect";
import "./App.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
if (!isSafari && !isIOS && !isMacOs) {
  registerServiceWorker();
}
