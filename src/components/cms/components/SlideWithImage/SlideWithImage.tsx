import { SlideWithImageComponentType } from "./SlideWithImage.model";
import { ImageElementType } from "@/components/cms/elements/ImageElement/ImageElement.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { getBynderImageFromContext } from "@/lib/data/bynder";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { getStandardizedImageFromContract } from "@/lib/utils/image-utils";
import { Themes } from "@/lib/themes";
import { tv } from "tailwind-variants";


const BACKGROUND_THEME_MAP: Record<string, Themes> = {
  white: "theme-white",
  grey: "theme-grey",
  darkGrey: "theme-dark-grey",
  black: "theme-black",
  red: "theme-red-gradient",
};

export function SlideWithImageComponent({
  content,
}: OptiComponentProps<typeof SlideWithImageComponentType>) {
  if (!content) {
    return null;
  }

  const tabThumbnail = getBynderImageFromContext(content.tabThumbnail);
  const slideImage = normalizeGenericContentToTyped(
    content.slideImage,
    ImageElementType,
  );
  const backgroundImageSrc = slideImage
    ? getStandardizedImageFromContract(slideImage).src
    : undefined;

  const theme = backgroundImageSrc
    ? "theme-black"
    : BACKGROUND_THEME_MAP[content.background ?? "white"];

  const { root, column } = slideWithImage();

  return (
    <TiSlide
      thumbnailSrc={tabThumbnail?.transformBaseUrl ?? ""}
      thumbnailLabel={content.tabLabel ?? undefined}
      backgroundImageSrc={backgroundImageSrc ?? undefined}

      style={
        {
          "--tiSlide-aspectRatio": "auto",
          ...(backgroundImageSrc
            ? {}
            : { "--tiSlide-overlay-background": "none" }),
        } as React.CSSProperties & Record<`--tiSlide-${string}`, string>
      }
    >
      <ThemeProvider
        theme={theme}
        className={root({ hasBackgroundImage: !!backgroundImageSrc })}
      >
        <div className={column()}>
          <ExtendedOptimizelyComponent content={content.slideContent} />
        </div>
      </ThemeProvider>
    </TiSlide>
  );
}

const slideWithImage = tv({
  slots: {
    root: "flex p-4 md:p-8",
    column: "flex flex-col items-center justify-center md:flex-1",
  },
  variants: {
    hasBackgroundImage: {
      // ThemeProvider always paints its own solid background — turn it off
      // so ti-slide's photo shows through instead.
      true: { root: "bg-transparent!" },
    },
  },
});
