import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";
import { createPortal } from "react-dom";

const modifiers = [{ name: "offset", options: { offset: [0, 10] } }];

export function PortalExample() {
  const {
    getArrowProps,
    getTooltipProps,
    setArrowRef,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip(
    {
      trigger: "click",
    },
    {
      modifiers,
    }
  );

  return (
    <>
      <button type="button" ref={setTriggerRef}>
        Reference element
      </button>

      {visible &&
        createPortal(
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "tooltip-container" })}
          >
            Popper element
            <div
              ref={setArrowRef}
              {...getArrowProps({ className: "tooltip-arrow" })}
            />
          </div>,
          document.body
        )}
    </>
  );
}
