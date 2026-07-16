import { damAssets } from "@optimizely/cms-sdk";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import Image from "next/image";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
// import { BackgroundColorSetting, BackgroundImageSetting } from "@components/";
import { Themes } from "@/lib/themes";
import clsx from "clsx";
import { BackgroundColorSetting, BackgroundImageSetting, SectionBackgroundContractContentType } from "@/components/cms/contracts/component-contracts/section.model";

import { ComponentTheme } from "@/components/ui/ti/enums";

export function ThemedSection({
  content,
  children
}: OptiComponentProps<SectionBackgroundContractContentType> & React.PropsWithChildren) {
  if (!content) {
    return null;
  }
  const backgroundColorSetting = normalizeGenericContentToTyped(content.background, BackgroundColorSetting);
  const backgroundImageSetting = normalizeGenericContentToTyped(content.background, BackgroundImageSetting);

  const hasBackground = !!(backgroundColorSetting || backgroundImageSetting)

  const theme = (backgroundColorSetting?.theme as Themes | undefined) || 'custom';
  const mode = (backgroundImageSetting?.backgroundTheme) as ComponentTheme | undefined;

  const backgroundSize = hasBackground ? content.backgroundSize || 'full' : null;

  let childContent = null;
  if (backgroundSize === 'full') {
    childContent = <>
      <BackgroundImage content={backgroundImageSetting ?? undefined} />
      <SectionWrapper>{children}</SectionWrapper>
    </>
  } else if (backgroundSize === 'section') {
    childContent = <div>
      <SectionWrapper>
        <BackgroundImage content={backgroundImageSetting ?? undefined} />
        <div className="px-10 w-full">{children}</div>
      </SectionWrapper>
    </div>
  } else {
    childContent = <SectionWrapper>{children}</SectionWrapper>;
  }
  return (
    <ThemeProvider theme={theme} mode={mode} className="relative">
      {childContent}
    </ThemeProvider>
  );
}


function BackgroundImage({ content }: OptiComponentProps<typeof BackgroundImageSetting>) {

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
    "self-stretch",)


  const overlayClassName = clsx(
    "absolute",
    "inset-0",
    "object-cover",
    "w-full",
    "h-full",
    "overflow-hidden",
    content.backgroundTheme === 'light' ? 'bg-white' : 'bg-black',
    "bg-cover",
    "left-0",
    "top-0",
    "opacity-60",
    "self-stretch",)
  return <div>
    <Image
      priority
      className={className}
      src={imageUrl}
      alt={getAlt(content.backgroundImage) ?? ""}
      width={680}
      height={540}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
    />
    {content.noOverlay ? null : <div className={overlayClassName}></div>}
  </div>
}