import * as React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

const modifiers = [{ name: "offset", options: { offset: [0, 10] } }];

export function OutOfBoundariesExample() {
  const {
    getArrowProps,
    getTooltipProps,
    setArrowRef,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip(
    { closeOnReferenceHidden: true },
    {
      modifiers,
    }
  );

  return (
    <div className="App">
      <h1>Out of boundaries</h1>
      <p>
        Close the tooltip if the reference element is out of the viewport.
        Scroll the page down.
      </p>

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
