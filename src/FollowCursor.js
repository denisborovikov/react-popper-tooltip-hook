import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

export function FollowCursor() {
  const mousePos = React.useRef();

  // const modifiers = React.useMemo(
  //   () => [
  //     {
  //       name: "offset",
  //       options: {
  //         offset: ({ reference, popper }) => {
  //           return [
  //             mousePos.current?.y - reference.y,
  //             mousePos.current?.x - reference.x,
  //           ];
  //         },
  //       },
  //     },
  //   ],
  //   []
  // );

  const {
    triggerRef,
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
      trigger: "hover",
      // delayHide: 300,
      // delayShow: 300,
    },
    {
      placement: "right",
    }
  );

  React.useLayoutEffect(() => {
    if (triggerRef == null || update == null) return;

    function storeMousePosition({ pageX, pageY }) {
      mousePos.current = { pageX, pageY };
      update();
    }

    triggerRef.addEventListener("mousemove", storeMousePosition);
    return () =>
      triggerRef.removeEventListener("mousemove", storeMousePosition);
  }, [triggerRef, update]);

  function getTransform() {
    if (tooltipRef && mousePos.current) {
      const { width, height } = tooltipRef.getBoundingClientRect();

      const { pageX, pageY } = mousePos.current;
      const x =
        pageX + width > window.pageXOffset + document.body.offsetWidth
          ? pageX - width
          : pageX;
      const y =
        pageY + height > window.pageYOffset + document.body.offsetHeight
          ? pageY - height
          : pageY;
      return `translate3d(${x}px, ${y}px, 0`;
    }
  }

  return (
    <>
      <button type="button" ref={setTriggerRef}>
        Reference element
      </button>

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: "tooltip-container",
            style: { transform: getTransform() },
          })}
        >
          Popper element
          <div
            ref={setArrowRef}
            {...getArrowProps({
              className: "tooltip-arrow",
            })}
          />
        </div>
      )}
    </>
  );
}
