import React from "react";
import ReactDOM from "react-dom/client";
// import "./css/index.css";
import "./index.scss";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
