import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

const modifiers = [
  // { name: "offset", options: { offset: [0, 10] } },
  // {
  //   name: "followCursor",
  //   enabled: false,
  //   phase: "main",
  //   fn: (data) => {
  //     console.log("data", data);
  //   },
  // },
  // {
  //   name: "offset",
  //   options: {
  //     offset: ({ placement, reference, popper,  }) => {
  //       console.log('popper', popper)
  //       if (placement === "bottom") {
  //         return [0, 100];
  //       } else {
  //         return [];
  //       }
  //     },
  //   },
  // },
];

export default function App() {
  const [show, setShow] = React.useState(false);

  // console.log('controlled visible', show);

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
      // delayHide: 300,
      // delayShow: 300,
      visible: show,
      onVisibleChange: setShow,
    },
    {
      placement: "bottom",
      modifiers,
    }
  );

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
