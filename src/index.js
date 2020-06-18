import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { FollowCursor } from "./FollowCursor";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <h2>Basic example</h2>
    <App />
    <h2>Follow cursor example</h2>
    <FollowCursor />
  </React.StrictMode>,
  rootElement
);
