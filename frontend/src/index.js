import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import SidePadding from "./CommonComponents/SidePadding";

import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SidePadding>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SidePadding>
);
registerServiceWorker();