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

  if (backgroundSize === "section") {
    return (
      <div className="container-lg">
        <div className="relative">
          <BackgroundImage content={backgroundImageSetting ?? undefined} />
          <ThemeProvider
            theme={theme}
            mode={mode}
            className={clsx("relative w-full", fullHeightClassName)}
          >
            <SectionWrapper narrow={narrow}>{children}</SectionWrapper>
            {/* <div className="w-full">{children}</div> */}
          </ThemeProvider>
        </div>
      </div>
    );
  } else {
    return (
      // `relative` here is the positioned ancestor the absolute background image
      // needs — without it the image escapes to <body> instead of filling the
      // section (full-width: image spans the section's full width).
      <div className="relative w-full">
        <BackgroundImage content={backgroundImageSetting ?? undefined} />
        <ThemeProvider
          theme={theme}
          mode={mode}
          className={clsx("relative", fullHeightClassName)}
        >
          <SectionWrapper narrow={narrow}>{children}</SectionWrapper>
        </ThemeProvider>
      </div>
    );
  }
}

function BackgroundImage({
  content,
}: OptiComponentProps<typeof BackgroundImageSetting>) {
  if (!content) {
    return;
  }
  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);
  const imageUrl = src(content.backgroundImage);
  if (!imageUrl) {
    return null;
  }

  const className = clsx(
    "absolute",
    "inset-0",
    "w-full",
    "h-full",
    "overflow-hidden",
    "left-0",
    "top-0",
    "self-stretch",
  );

  const overlayClassName = clsx(
    "absolute",
    "inset-0",
    "object-cover",
    "w-full",
    "h-full",
    "overflow-hidden",
    content.backgroundTheme === "light" ? "bg-white" : "bg-black",
    "bg-cover",
    "left-0",
    "top-0",
    "opacity-60",
    "self-stretch",
  );
  return (
    <div>
      {/* `ti-slide` renders the background layer itself; `thumbnail-src` is
          only used by slideshow nav, so it stays empty for a lone slide. */}
      <ti-slide
        className={className}
        thumbnail-src=""
        thumbnail-label={getAlt(content.backgroundImage) ?? ""}
        background-image-src={imageUrl}
      />

      {content.noOverlay ? null : <div className={overlayClassName}></div>}
    </div>
  );
}
