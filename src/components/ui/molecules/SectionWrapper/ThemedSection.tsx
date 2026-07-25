import { damAssets } from "@optimizely/cms-sdk";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
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
import EnhancedNextImage from "../../Atoms/EnhancedNextImage/EnhancedNextImage";

export function ThemedSection({
  content,
  children,
}: OptiComponentProps<SectionBackgroundContractContentType> &
  React.PropsWithChildren) {
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

  if (backgroundSize === "section") {
    return (
      <div className="container mx-auto">
        <div className="-mx-10 relative">
          <BackgroundImage content={backgroundImageSetting ?? undefined} />
          <ThemeProvider
            theme={theme}
            mode={mode}
            className="relative px-10 w-full"
          >
            <SectionWrapper>{children}</SectionWrapper>
            {/* <div className="w-full">{children}</div> */}
          </ThemeProvider>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <BackgroundImage content={backgroundImageSetting ?? undefined} />
        <ThemeProvider theme={theme} mode={mode} className="relative">
          <SectionWrapper>{children}</SectionWrapper>
        </ThemeProvider>
      </>
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
    "object-cover",
    "w-full",
    "h-full",
    "overflow-hidden",
    "bg-center",
    "bg-cover",
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
      <EnhancedNextImage
        className={className}
        src={imageUrl}
        alt={getAlt(content.backgroundImage) ?? ""}
      />
      {content.noOverlay ? null : <div className={overlayClassName}></div>}
    </div>
  );
}
