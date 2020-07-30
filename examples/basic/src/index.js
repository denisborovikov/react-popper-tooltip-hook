import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { usePopperTooltip } from "react-popper-tooltip-hook";

const modifiers = [{ name: "offset", options: { offset: [0, 10] } }];

function App() {
  const {
    getArrowProps,
    getTooltipProps,
    setArrowRef,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip(
    {
      delayHide: 500,
      delayShow: 500,
    },
    {
      placement: "right",
      modifiers,
    }
  );

  return (
    <div className="App">
      <h1>Basic example</h1>

      <button type="button" ref={setTriggerRef}>
        Reference element
      </button>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          Popper element
          <div
            ref={setArrowRef}
            {...getArrowProps({ className: "tooltip-arrow" })}
          />
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
