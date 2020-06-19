import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

const modifiers = [{ name: "offset", options: { offset: [0, 10] } }];

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
    observer.observe(tooltipRef, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [tooltipRef, update]);

  return (
    <div className="App">
      <h1>Mutation observer</h1>
      <p>Watch for the tooltip size changes. Resize the textarea.</p>

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
    </div>
  );
}