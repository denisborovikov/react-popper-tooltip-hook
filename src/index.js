import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { FollowCursorExample } from "./FollowCursor";
import { MutationObserverExample } from "./MutationObserver";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <h2>Basic example</h2>
    <App />
    <h2>Follow cursor example</h2>
    <FollowCursorExample />
    <h2>Mutation observer</h2>
    <p>Resize the textarea</p>
    <MutationObserverExample />
  </React.StrictMode>,
  rootElement
);
