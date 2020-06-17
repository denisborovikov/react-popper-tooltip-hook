# react-popper-tooltip-hook

Experimenting with possible hook API for [react-popper-tooltip](https://github.com/mohsinulhaq/react-popper-tooltip).

[Codesandbox](https://codesandbox.io/s/github/denisborovikov/react-popper-tooltip-hook).

```jsx
const {
  arrowRef,
  tooltipRef,
  triggerRef,
  getArrowProps,
  getTooltipProps,
  setArrowRef,
  setTooltipRef,
  setTriggerRef,
  visible,
  ...popperProps
} = usePopperTooltip(ownProps, popperJsProps);
```

```jsx
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
```
