import React from "react";
import ReactDOM from "react-dom";

import { BasicExample } from "./Basic";
import { PortalExample } from "./Portal";
import { FollowCursorExample } from "./FollowCursor";
import { MutationObserverExample } from "./MutationObserver";
import { OutOfBoundariesExample } from "./OutOfBoundaries";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: "200vh" }}>
      <h2>Basic example</h2>
      <BasicExample />
      <h2>React portal example</h2>
      <PortalExample />
      <h2>Follow cursor example</h2>
      <FollowCursorExample />
      <h2>Mutation observer</h2>
      <p>Resize the textarea</p>
      <MutationObserverExample />
      <h2>Out of boundaries</h2>
      <p>
        Close the tooltip if the reference element is out of the viewport. Scroll the page
        down.
      </p>
      <OutOfBoundariesExample />
    </div>
  </React.StrictMode>,
  rootElement
);
