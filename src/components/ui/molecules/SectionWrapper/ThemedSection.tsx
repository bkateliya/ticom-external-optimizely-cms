import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { Themes } from "@/lib/themes";
import clsx from "clsx";
import {
  BackgroundColorSetting,
  BackgroundImageSetting,
  BackgroundVideoSetting,
  SectionBackgroundContractContentType,
} from "@/components/cms/contracts/component-contracts/section.model";

import { ComponentTheme } from "@/components/ui/ti/enums";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import { isEditMode } from "@/lib/opti/edit-helpers";
import { getBynderVideoFromContext } from "@/lib/data/bynder";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import { ContentProps } from "@optimizely/cms-sdk";

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
  const backgroundVideoSetting = normalizeGenericContentToTyped(
    content.background,
    BackgroundVideoSetting,
  );

  const hasBackground = !!(
    backgroundColorSetting ||
    backgroundImageSetting ||
    backgroundVideoSetting
  );

  const theme =
    (backgroundColorSetting?.theme as Themes | undefined) || "custom";
  // A background video always keeps `ti-slide`'s default (black) overlay, so
  // its content is treated as sitting on a dark background.
  const mode = backgroundVideoSetting
    ? ComponentTheme.dark
    : (backgroundImageSetting?.backgroundTheme as ComponentTheme | undefined);

  const backgroundSize = hasBackground
    ? content.backgroundSize || "full"
    : null;

  const isEditCanvas = isEditMode();

  const fullHeightClassName = fullHeight
    ? clsx(
        isEditCanvas ? "h-screen max-h-[900px]" : "h-screen",
        "flex items-center",
      )
    : undefined;

  // The content is slotted *inside* `ti-slide` (see `BackgroundSlide`) rather
  // than rendered next to it, so the slide's own overlay layer lands between
  // the background media and the content instead of on top of both.
  const body = (
    <BackgroundSlide
      imageSetting={backgroundImageSetting ?? undefined}
      videoSetting={backgroundVideoSetting ?? undefined}
    >
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
 * image or video. `ti-slide` paints the media, slots the content over it, and
 * renders its own gradient overlay in between — so we deliberately don't add an
 * overlay of our own (that gave a double overlay which also dimmed the
 * content). Without background media the content passes through untouched.
 */
function BackgroundSlide({
  imageSetting,
  videoSetting,
  children,
}: React.PropsWithChildren<{
  imageSetting?: ContentProps<typeof BackgroundImageSetting>;
  videoSetting?: ContentProps<typeof BackgroundVideoSetting>;
}>) {
  if (!imageSetting && !videoSetting) {
    return children;
  }

  const { src: imageSrc, alt } = imageSetting
    ? getStandardizedImage(imageSetting, imageSetting.backgroundImage)
    : { src: undefined, alt: undefined };

  // Bynder videos are resolved from the page-level asset context, the same way
  // Bynder images are (see `findAllBynderAssetsOnPage`).
  const videoSrc = videoSetting?.backgroundVideo
    ? getBynderVideoFromContext(videoSetting.backgroundVideo)?.original
    : undefined;

  if (!imageSrc && !videoSrc) {
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
    // a white one, and `noOverlay` switches it off entirely. A background video
    // is left on the default overlay.
    ...(imageSetting?.noOverlay
      ? { "--tiSlide-overlay-background": "none" }
      : imageSetting?.backgroundTheme === "light"
        ? { "--tiSlide-overlay-background-color-rgb": "255 255 255" }
        : {}),
  };

  return (
    // `thumbnailSrc` is only used by slideshow nav, so it stays empty for a
    // lone slide.
    <TiSlide
      style={slideStyle}
      thumbnailSrc=""
      thumbnailLabel={alt ?? ""}
      backgroundImageSrc={imageSrc}
      backgroundVideoSrc={videoSrc}
      showVideoControls={videoSetting?.videoPlayerControls ?? false}
    >
      {children}
    </TiSlide>
  );
}
