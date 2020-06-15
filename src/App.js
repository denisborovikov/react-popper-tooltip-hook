import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

export default function App() {
  const [show, setShow] = React.useState(false);

  // console.log(show);

  const {
    getArrowProps,
    getTooltipProps,
    setArrowElRef,
    setTooltipElRef,
    setTriggerElRef,
    visible
  } = usePopperTooltip(
    {
      trigger: 'hover',
      delayHide: 300,
      delayShow: 300,
      visible: show,
      onVisibleChange: setShow,
    },
    {
      placement: "bottom",
      modifiers: [{ name: "offset", options: { offset: [0, 10] } }]
    }
  );

  return (
    <>
      <button type="button" ref={setTriggerElRef}>
        Reference element
      </button>

      {visible && (
        <div
          ref={setTooltipElRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          Popper element
          <div
            ref={setArrowElRef}
            {...getArrowProps({ className: "tooltip-arrow" })}
          />
        </div>
      )}
    </>
  );
}
