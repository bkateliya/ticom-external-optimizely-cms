"use client";

// Global
import { JSX } from "react";

import { UiIcon } from "./SvgIconMapping";
import clsx from "clsx";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";

export type SvgIconSize = "xxs" | "xs" | "s" | "m" | "l" | "xl";
export type SvgIconStyle =
  "primary" | "secondary" | "tertiary" | "success" | "warn" | "error";

export interface SvgIconProps {
  className?: string;
  icon: UiIcon;
  iconStyle?: SvgIconStyle;
  // reversed?: boolean;
  size?: SvgIconSize;
  circle?: boolean;
  disabled?: boolean;
}

const TiSvgIcon = ({
  className,
  icon,
  iconStyle,
  // reversed,
  size,
  circle,
  disabled,
}: SvgIconProps): JSX.Element => {
  const { mode } = useTheme();
  if (!icon) return <></>;

  return (
    <ti-svg-icon
      icon-name={icon}
      appearance={clsx(iconStyle, { reversed: mode === "dark" })}
      {...{ className, size, circle, disabled }}
    ></ti-svg-icon>
  );
};

export default TiSvgIcon;
