import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

const modifiers = [{ name: "offset", options: { offset: [10, 10] } }];

export function MutationObserverExample() {
  const {
    tooltipRef,
    getArrowProps,
    getTooltipProps,
    setArrowRef,
    setTooltipRef,
    setTriggerRef,
    visible,
    update,
  } = usePopperTooltip(
    {
      trigger: "click",
    },
    {
      placement: "right",
      modifiers,
    }
  );

  React.useEffect(() => {
    if (tooltipRef == null || update == null) return;

    const observer = new MutationObserver(update);
    observer.observe(tooltipRef, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, [tooltipRef, update]);

  return (
    <>
      <button type="button" ref={setTriggerRef}>
        Reference element
      </button>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <textarea />
          <div
            ref={setArrowRef}
            {...getArrowProps({ className: "tooltip-arrow" })}
          />
        </div>
      )}
    </>
  );
}
