// LOCAL STUB of @ticom/form-components/react.
// Renders plain, unstyled native elements in place of the real TI design-system
// web components so the app can build and run without the private Artifactory.
// Replace by installing the real package when on the TI network/VPN.
import React from "react";

// Custom (web-component-specific) props that must NOT be forwarded to the DOM,
// otherwise React emits unknown-attribute warnings. They are surfaced as data-*.
const CUSTOM_PROPS = ["appearance", "color", "type", "size", "theme", "iconName", "iconPosition", "orientation"];

function splitProps(props) {
  const dataAttrs = {};
  const rest = {};
  for (const key of Object.keys(props)) {
    if (CUSTOM_PROPS.includes(key)) {
      if (props[key] != null) dataAttrs[`data-${key}`] = props[key];
    } else {
      rest[key] = props[key];
    }
  }
  return { dataAttrs, rest };
}

export const TifButton = React.forwardRef(function TifButton(props, ref) {
  const { href, target, type, children, ...other } = props;
  const { dataAttrs, rest } = splitProps(other);

  if (href) {
    return React.createElement(
      "a",
      { ref, href, target, "data-tif-button": "", ...dataAttrs, ...rest },
      children
    );
  }
  return React.createElement(
    "button",
    {
      ref,
      type: type === "button" || type === "submit" || type === "reset" ? type : "button",
      "data-tif-button": "",
      ...dataAttrs,
      ...rest,
    },
    children
  );
});

export const TifButtonGroup = React.forwardRef(function TifButtonGroup(props, ref) {
  const { children, ...other } = props;
  const { dataAttrs, rest } = splitProps(other);
  return React.createElement(
    "div",
    { ref, "data-tif-button-group": "", ...dataAttrs, ...rest },
    children
  );
});

// The real tif-form renders a <form> whose children sit in a `.tifForm-layout`
// grid. Consumers style that layout through it (`[&_.tifForm-layout]:...`), so
// the wrapper has to exist here too — with the grid display the real
// component's stylesheet would otherwise supply.
export const TifForm = React.forwardRef(function TifForm(props, ref) {
  const { children, className, ...other } = props;
  const { dataAttrs, rest } = splitProps(other);
  return React.createElement(
    "form",
    { ref, className, "data-tif-form": "", ...dataAttrs, ...rest },
    React.createElement(
      "div",
      { className: "tifForm-layout", style: { display: "grid" } },
      children
    )
  );
});

// The real tif-fieldset takes its label / help / hint text from named slots, so
// the stub keeps the slotted children as-is — they render as plain text here.
export const TifFieldset = React.forwardRef(function TifFieldset(props, ref) {
  const { children, ...other } = props;
  const { dataAttrs, rest } = splitProps(other);
  return React.createElement(
    "fieldset",
    { ref, "data-tif-fieldset": "", ...dataAttrs, ...rest },
    children
  );
});

// The real tif-select slots native <option> children into its own control and
// renders `placeholder` as the empty-valued first option.
export const TifSelect = React.forwardRef(function TifSelect(props, ref) {
  const { children, placeholder, ...other } = props;
  const { dataAttrs, rest } = splitProps(other);
  return React.createElement(
    "select",
    { ref, "data-tif-select": "", ...dataAttrs, ...rest },
    placeholder ? React.createElement("option", { value: "" }, placeholder) : null,
    children
  );
});
