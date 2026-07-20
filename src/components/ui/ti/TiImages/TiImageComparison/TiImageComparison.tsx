"use client";

import { useTheme } from "../../../context/BrandAndTheme/BrandAndThemeContext";

import { ComponentTheme } from "@/components/ui/ti/enums";
import { TiImage, TiImageProps } from "./TiImage";

/** Image slot content: the props for a ti-image (slot is set internally). */
export type TiImageComparisonImage = Omit<TiImageProps, "slot">;

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
    /** Optional label rendered over the left image. */
    leftLabel?: React.ReactNode;
    /** Optional label rendered over the right image. */
    rightLabel?: React.ReactNode;
    /** Optional figcaption rendered below the comparison. */
    caption?: React.ReactNode;
}

export function TiImageComparison({
    disableMousewheel,
    tiAriaLabel,
    theme,
    leftImage,
    rightImage,
    leftLabel,
    rightLabel,
    caption,
}: TiImageComparisonProps) {

    const { mode } = useTheme();

    const resolvedTheme = theme || mode;

    return (
        <ti-image-comparison
            disable-mousewheel={disableMousewheel}
            ti-aria-label={tiAriaLabel}
            theme={resolvedTheme}
        >

            <TiImage slot="left-image" {...leftImage} />
            {leftLabel != null && <span slot="left-label">{leftLabel}</span>}
            <TiImage slot="right-image" {...rightImage} />
            {rightLabel != null && <span slot="right-label">{rightLabel}</span>}
            {caption != null && <p slot="caption">{caption}</p>}
        </ti-image-comparison>
    );
}
