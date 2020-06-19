import React from "react";
import "./styles.css";
import { usePopperTooltip } from "./usePopperTooltip";

export function FollowCursorExample() {
  const store = React.useRef();

  const {
    triggerRef,
    tooltipRef,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
    update,
  } = usePopperTooltip({
    trigger: "click",
  });

  React.useEffect(() => {
    if (triggerRef == null) return;

    const tooltipRect = tooltipRef?.getBoundingClientRect() || {};

    function storeMousePosition({ pageX, pageY }) {
      store.current = { pageX, pageY, ...tooltipRect };
      if (update !== null) update();
    }

    triggerRef.addEventListener("mousemove", storeMousePosition);
    return () =>
      triggerRef.removeEventListener("mousemove", storeMousePosition);
  }, [triggerRef, update]);

  function getTransform() {
    if (tooltipRef && store.current) {
      const { pageX, pageY, width, height } = store.current;

      const x =
        pageX + width > window.pageXOffset + document.body.offsetWidth
          ? pageX - width
          : pageX;
      const y =
        pageY + height > window.pageYOffset + document.body.offsetHeight
          ? pageY - height
          : pageY;
      return `translate3d(${x + 10}px, ${y + 10}px, 0`;
    }
  }

  return (
    <>
      <button type="button" ref={setTriggerRef}>
        <br />
        <br />
        Reference element <br />
        <br />
        <br />
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
        </div>
      )}
    </>
  );
}
