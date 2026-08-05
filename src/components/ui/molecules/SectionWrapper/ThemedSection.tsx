import { damAssets } from "@optimizely/cms-sdk";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import { getContextData, getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { Themes } from "@/lib/themes";
import clsx from "clsx";
import {
  BackgroundColorSetting,
  BackgroundImageSetting,
  SectionBackgroundContractContentType,
} from "@/components/cms/contracts/component-contracts/section.model";

import { ComponentTheme } from "@/components/ui/ti/enums";

export function ThemedSection({
  content,
  children,
  fullHeight,
  narrow,
}: OptiComponentProps<SectionBackgroundContractContentType> &
  React.PropsWithChildren & {
    /** Optional. Stretch the section to at least a full screen's height. */
    fullHeight?: boolean;
    /** Optional. Constrain the section content to the narrower container width. */
    narrow?: boolean;
  }) {
  if (!content) {
    return null;
  }
  const backgroundColorSetting = normalizeGenericContentToTyped(
    content.background,
    BackgroundColorSetting,
  );
  const backgroundImageSetting = normalizeGenericContentToTyped(
    content.background,
    BackgroundImageSetting,
  );

  const hasBackground = !!(backgroundColorSetting || backgroundImageSetting);

  const theme =
    (backgroundColorSetting?.theme as Themes | undefined) || "custom";
  const mode = backgroundImageSetting?.backgroundTheme as
    ComponentTheme | undefined;

  const backgroundSize = hasBackground
    ? content.backgroundSize || "full"
    : null;


  const isEditCanvas = getContextData("mode") === "edit";

  const fullHeightClassName = fullHeight
    ? clsx(
      isEditCanvas ? "h-screen max-h-[900px]" : "h-screen",
      "flex items-center",
    )
    : undefined;

  // The content is slotted *inside* `ti-slide` (see `BackgroundSlide`) rather
  // than rendered next to it, so the slide's own overlay layer lands between
  // the background image and the content instead of on top of both.
  const body = (
    <BackgroundSlide content={backgroundImageSetting ?? undefined}>
      <ThemeProvider
        theme={theme}
        mode={mode}
        className={clsx("relative w-full", fullHeightClassName)}
      >
        <SectionWrapper narrow={narrow}>{children}</SectionWrapper>
      </ThemeProvider>
    </BackgroundSlide>
  );

  if (backgroundSize === "section") {
    return <div className="container-lg">{body}</div>;
  } else {
    return <div className="w-full">{body}</div>;
  }
}

/**
 * Wraps the section content in a `ti-slide` when the section has a background
 * image. `ti-slide` paints the image, slots the content over it, and renders
 * its own gradient overlay in between — so we deliberately don't add an overlay
 * of our own (that gave a double overlay which also dimmed the content).
 * Without a background image the content passes through untouched.
 */
function BackgroundSlide({
  content,
  children,
}: OptiComponentProps<typeof BackgroundImageSetting> &
  React.PropsWithChildren) {
  if (!content) {
    return children;
  }
  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);
  const imageUrl = src(content.backgroundImage);
  if (!imageUrl) {
    return children;
  }

  // `ti-slide` is configured through CSS custom properties, which
  // `React.CSSProperties` doesn't model on its own.
  const slideStyle: React.CSSProperties &
    Record<`--tiSlide-${string}`, string> = {
    // The section's content decides the height. Left at its default the slide
    // locks to a 16/9 box and `overflow: hidden` on the host clips anything
    // taller than that.
    "--tiSlide-aspectRatio": "auto",
    // `ti-slide`'s overlay is a black gradient by default: a light image needs
    // a white one, and `noOverlay` switches it off entirely.
    ...(content.noOverlay
      ? { "--tiSlide-overlay-background": "none" }
      : content.backgroundTheme === "light"
        ? { "--tiSlide-overlay-background-color-rgb": "255 255 255" }
        : {}),
  };

  return (
    // `thumbnail-src` is only used by slideshow nav, so it stays empty for a
    // lone slide.
    <ti-slide
      style={slideStyle}
      thumbnail-src=""
      thumbnail-label={getAlt(content.backgroundImage) ?? ""}
      background-image-src={imageUrl}
    >
      {children}
    </ti-slide>
  );
}