import * as React from "react";
import "./styles.css";
import { createPortal } from "react-dom";
import { usePopperTooltip } from "./usePopperTooltip";
import { canUseDOM } from "./utils";

const defaultProps = {
  closeOnReferenceHidden: true,
  defaultTooltipShown: false,
  delayHide: 0,
  delayShow: 0,
  // followCursor: false,
  onVisibilityChange: () => {},
  placement: "right",
  portalContainer: canUseDOM() ? document.body : null,
  trigger: "hover",
  usePortal: canUseDOM(),
  mutationObserverOptions: {
    attributes: true,
    childList: true,
    subtree: true,
  },
  modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
};

function TooltipTrigger({
  children,
  tooltip,
  defaultTooltipShown,
  onVisibilityChange,
  tooltipShown,
  delayShow,
  delayHide,
  placement,
  trigger,
  getTriggerRef,
  closeOnReferenceHidden,
  usePortal,
  portalContainer,
  // followCursor,
  modifiers,
  mutationObserverOptions,
}) {
  const {
    // arrowRef,
    // tooltipRef,
    triggerRef,
    getArrowProps,
    getTooltipProps,
    setArrowRef,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip(
    {
      trigger,
      delayHide,
      delayShow,
      initialVisible: defaultTooltipShown,
      onVisibleChange: onVisibilityChange,
      visible: tooltipShown,
      closeOnReferenceHidden,
      mutationObserverOptions,
    },
    {
      placement,
      modifiers,
    }
  );

  const reference = children({
    getTriggerProps: (v) => v,
    triggerRef: setTriggerRef,
  });

  const popper = tooltip({
    arrowRef: setArrowRef,
    tooltipRef: setTooltipRef,
    getArrowProps,
    getTooltipProps,
    placement,
  });

  React.useEffect(() => {
    getTriggerRef(triggerRef);
  }, [triggerRef, getTriggerRef]);

  return (
    <>
      {reference}
      {visible
        ? usePortal
          ? createPortal(popper, portalContainer)
          : popper
        : null}
    </>
  );
}

TooltipTrigger.defaultProps = defaultProps;

const Tooltip = ({
  arrowRef,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
  placement,
}) => (
  <div
    {...getTooltipProps({
      ref: tooltipRef,
      className: "tooltip-container",
      /* your props here */
    })}
  >
    <div
      {...getArrowProps({
        ref: arrowRef,
        className: "tooltip-arrow",
        "data-placement": placement,
        /* your props here */
      })}
    />
    Hello, World!
  </div>
);

const Trigger = ({ getTriggerProps, triggerRef }) => (
  <span
    {...getTriggerProps({
      ref: triggerRef,
      className: "trigger",
      /* your props here */
    })}
  >
    Click Me!
  </span>
);

export function RenderPropsExample() {
  return (
    <div className="App">
      <h1>Render prop example</h1>

      <TooltipTrigger
        placement="right"
        trigger="click"
        tooltip={Tooltip}
        getTriggerRef={(e) => console.log(e)}
      >
        {Trigger}
      </TooltipTrigger>
    </div>
  );
}
