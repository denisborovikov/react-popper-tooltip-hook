import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

const modifiers = [{ name: "offset", options: { offset: [0, 10] } }];

export function OutOfBoundariesExample() {
  const [visibleController, setVisible] = React.useState(true);

  const {
    getArrowProps,
    getTooltipProps,
    setArrowRef,
    setTooltipRef,
    setTriggerRef,
    visible,
    state,
  } = usePopperTooltip(
    { visible: visibleController, onVisibleChange: setVisible },
    {
      modifiers,
    }
  );

  const isReferenceHidden = state?.modifiersData?.hide?.isReferenceHidden;

  React.useEffect(() => {
    if (isReferenceHidden) setVisible(false);
  }, [isReferenceHidden]);

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
          Popper element
          <div
            ref={setArrowRef}
            {...getArrowProps({ className: "tooltip-arrow" })}
          />
        </div>
      )}
    </>
  );
}
