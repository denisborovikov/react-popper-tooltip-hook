import * as React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

export function BasicExample() {
  const modifiers = [{ name: "offset", options: { offset: [0, 10] } }];

  const {
    getArrowProps,
    getTooltipProps,
    setArrowRef,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip(
    {},
    {
      placement: "top",
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
