import React from "react";
import { usePopper } from "react-popper";
import { useControlledProp, useGetLatest } from "./utils";

const emptyObj = {};

export function usePopperTooltip(
  ownOptions = emptyObj,
  popperOptions = emptyObj
) {
  const {
    delayHide,
    delayShow,
    trigger,
    visible: visibleControlled,
    initialVisible,
    onVisibleChange,
  } = ownOptions;

  const [triggerElRef, setTriggerElRef] = React.useState(null);
  const [tooltipElRef, setTooltipElRef] = React.useState(null);
  const [arrowElRef, setArrowElRef] = React.useState(null);
  const [visible, setVisible] = useControlledProp({
    initial: initialVisible,
    value: visibleControlled,
    onChange: onVisibleChange,
  });

  // const a = React.useRef();
  // console.log(a.current === setVisible);
  // a.current = setVisible;

  const timer = React.useRef();

  const getLatest = useGetLatest({
    visible,
    triggerElRef,
    tooltipElRef,
    arrowElRef,
  });

  const isTriggeredBy = React.useCallback(
    (event) => {
      return (
        trigger === event || (Array.isArray(trigger) && trigger.includes(event))
      );
    },
    [trigger]
  );

  // We update the arrow modifier with an arrow element ref.
  const options = React.useMemo(() => {
    let includesArrowModifier = false;
    const modifiers =
      popperOptions.modifiers?.map((modifier) => {
        if (modifier.name === "arrow") {
          includesArrowModifier = true;
          return {
            ...modifier,
            options: {
              ...modifier.options,
              element: arrowElRef,
            },
          };
        }

        return modifier;
      }) || [];

    return {
      ...popperOptions,
      modifiers: includesArrowModifier
        ? modifiers
        : modifiers.concat({ name: "arrow", options: { element: arrowElRef } }),
    };
  }, [popperOptions, arrowElRef]);

  const { styles, attributes } = usePopper(triggerElRef, tooltipElRef, options);

  const hideTooltip = React.useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), delayHide);
  }, [delayHide, setVisible]);

  const showTooltip = React.useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(true), delayShow);
  }, [delayShow, setVisible]);

  const toggleTooltip = React.useCallback(() => {
    const { visible } = getLatest();
    if (visible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  }, [getLatest, hideTooltip, showTooltip]);

  // Handle click outside
  React.useEffect(() => {
    const handleStart = (event) => {
      const { tooltipElRef, triggerElRef } = getLatest();
      const target = event.target;
      if (target instanceof Node) {
        if (
          tooltipElRef != null &&
          !tooltipElRef.contains(target) &&
          !triggerElRef.contains(target)
        ) {
          hideTooltip();
        }
      }
    };

    document.addEventListener("touchstart", handleStart);
    document.addEventListener("mousedown", handleStart);

    return () => {
      document.removeEventListener("touchstart", handleStart);
      document.removeEventListener("mousedown", handleStart);
    };
  }, [getLatest, hideTooltip, isTriggeredBy]);

  // Timer clean-up
  React.useEffect(() => clearTimeout(timer.current), []);

  // Trigger: click
  React.useEffect(() => {
    if (triggerElRef == null || !isTriggeredBy("click")) return;

    triggerElRef.addEventListener("click", toggleTooltip);
    return () => triggerElRef.removeEventListener("click", toggleTooltip);
  }, [triggerElRef, isTriggeredBy, toggleTooltip]);

  // Trigger: focus
  React.useEffect(() => {
    if (triggerElRef == null || !isTriggeredBy("focus")) return;

    triggerElRef.addEventListener("focus", showTooltip);
    triggerElRef.addEventListener("blur", hideTooltip);
    return () => {
      triggerElRef.removeEventListener("focus", showTooltip);
      triggerElRef.removeEventListener("blur", hideTooltip);
    };
  }, [triggerElRef, isTriggeredBy, showTooltip, hideTooltip]);

  // Trigger: hover the trigger
  React.useEffect(() => {
    if (triggerElRef == null || !isTriggeredBy("hover")) return;

    triggerElRef.addEventListener("mouseenter", showTooltip);
    triggerElRef.addEventListener("mouseleave", hideTooltip);
    return () => {
      triggerElRef.removeEventListener("mouseenter", showTooltip);
      triggerElRef.removeEventListener("mouseleave", hideTooltip);
    };
  }, [triggerElRef, isTriggeredBy, showTooltip, hideTooltip]);

  // Trigger: hover the tooltip
  React.useEffect(() => {
    if (tooltipElRef == null || !isTriggeredBy("hover")) return;

    tooltipElRef.addEventListener("mouseenter", showTooltip);
    tooltipElRef.addEventListener("mouseleave", hideTooltip);
    return () => {
      tooltipElRef.removeEventListener("mouseenter", showTooltip);
      tooltipElRef.removeEventListener("mouseleave", hideTooltip);
    };
  }, [tooltipElRef, isTriggeredBy, showTooltip, hideTooltip]);

  const getTooltipProps = React.useCallback(
    (args) => {
      return {
        ...args,
        style: { ...styles.popper, ...args?.style },
        ...attributes.popper,
      };
    },
    [attributes, styles]
  );

  const getArrowProps = React.useCallback(
    (args) => {
      return {
        ...args,
        style: { ...styles.arrow, ...args?.style },
        ...attributes.arrow,
      };
    },
    [attributes, styles]
  );

  return {
    getArrowProps,
    getTooltipProps,
    setArrowElRef,
    setTooltipElRef,
    setTriggerElRef,
    visible,
  };
}
