import * as React from "react";
import "react-popper-tooltip-hook/src/styles.css";
import { usePopperTooltip } from "react-popper-tooltip-hook";

export function BasicExample() {

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
