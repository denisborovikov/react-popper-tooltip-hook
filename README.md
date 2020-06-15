# react-popper-tooltip-hook

Experimenting with possible hook API for [react-popper-tooltip](https://github.com/mohsinulhaq/react-popper-tooltip).

[Codesandbox](https://codesandbox.io/s/github/denisborovikov/react-popper-tooltip-hook).
```jsx
const {
  getArrowProps,
  getTooltipProps,
  setArrowElRef,
  setTooltipElRef,
  setTriggerElRef,
  visible,
} = usePopperTooltip(ownProps, popperJsProps);
```

```jsx
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
```
