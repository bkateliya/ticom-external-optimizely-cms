"use client";

import { useTheme } from "../../../context/BrandAndTheme/BrandAndThemeContext";

import { ComponentTheme } from "@/components/ui/ti/enums";
import { CustomEventHandler, useEventListenerRef } from "../../Common/events";
import { TiImage, TiImageProps } from "./TiImage";
import { tv } from "tailwind-variants";

/** Image slot content: the props for a ti-image (slot is set internally). */
export type TiImageComparisonImage = Omit<TiImageProps, "slot">;

/** Detail payload for the `tiImageComparisonChange` event. */
export interface TiImageComparisonChangeEventDetail {
  /** Divider position as a percentage (0–100) from the left edge. */
  position: number;
}

export interface TiImageComparisonProps {
  /** Disable mousewheel behavior on the divider. */
  disableMousewheel?: boolean;
  /** Aria label for the comparison slider. */
  tiAriaLabel?: string;
  theme?: ComponentTheme;
  /** Image shown on the left of the divider. */
  leftImage: TiImageComparisonImage;
  /** Image shown on the right of the divider. */
  rightImage: TiImageComparisonImage;
  /** Optional label rendered under the left image. */
  leftLabel?: React.ReactNode;
  /** Optional label rendered under the right image. */
  rightLabel?: React.ReactNode;
  /** Optional text overlaid on the left image. */
  leftOverlay?: React.ReactNode;
  /** Optional text overlaid on the right image. */
  rightOverlay?: React.ReactNode;
  /** Optional caption rendered below the comparison. May contain paragraphs. */
  caption?: React.ReactNode;
  /** Fired when the comparison divider moves. */
  tiImageComparisonChange?: CustomEventHandler<TiImageComparisonChangeEventDetail>;
}

const captionStyles = tv({
  variants: {
    mode: {
      light: "",
      dark: "[&_*]:text-white",
    },
  },
});

const overlayStyles = tv({
  base: "text-[34px] text-white text-shadow-[1px_1px_5px_#000]",
  variants: {
    side: {
      left: "font-semibold",
      right: "font-semibold",
    },
  },
});

function toCaptionMode(mode: ComponentTheme) {
  return mode === ComponentTheme.dark ? "dark" : "light";
}

export function TiImageComparison({
  disableMousewheel,
  tiAriaLabel,
  theme,
  leftImage,
  rightImage,
  leftLabel,
  rightLabel,
  leftOverlay,
  rightOverlay,
  caption,
  tiImageComparisonChange,
}: TiImageComparisonProps) {
  const { mode } = useTheme();

  const resolvedTheme = theme || mode;

  const ref = useEventListenerRef({
    tiImageComparisonChange: tiImageComparisonChange,
  });

  return (
    <ti-image-comparison
      ref={ref}
      disable-mousewheel={disableMousewheel}
      ti-aria-label={tiAriaLabel}
      theme={resolvedTheme}
    >
      <TiImage slot="left-image" {...leftImage} />
      {leftLabel != null && <span slot="left-label">{leftLabel}</span>}
      {leftOverlay != null && (
        <div
          slot="left-overlay-image"
          className={overlayStyles({ side: "left" })}
        >
          {leftOverlay}
        </div>
      )}
      <TiImage slot="right-image" {...rightImage} />
      {rightLabel != null && <span slot="right-label">{rightLabel}</span>}
      {rightOverlay != null && (
        <div
          slot="right-overlay-image"
          className={overlayStyles({ side: "right" })}
        >
          {rightOverlay}
        </div>
      )}

      {caption != null && (
        <div
          slot="caption"
          className={captionStyles({ mode: toCaptionMode(resolvedTheme) })}
        >
          {caption}
        </div>
      )}
    </ti-image-comparison>
  );
}
