"use server";

import { HomePageHeroSlideComponentType } from "./HomePageHero.model";
import {
  getContextData,
  getPreviewUtils,
} from "@optimizely/cms-sdk/react/server";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { tv } from "tailwind-variants";
import { parseHeadlineLevel } from "@/components/ui/molecules/Headline/Headline";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import NextLink from "next/link";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";
import { getLocale } from "next-intl/server";

export async function HomePageHeroSlideComponent({
  content,
  parentField,
}: OptiComponentProps<typeof HomePageHeroSlideComponentType>) {
  if (!content) {
    return null;
  }
  const isPreview = !!getContextData("previewToken");

  const startDate = content.startDate ? new Date(content.startDate) : null;
  const endDate = content.endDate ? new Date(content.endDate) : null;
  const isVisible =
    (!startDate || startDate <= new Date()) &&
    (!endDate || endDate >= new Date());

  const { src } = getPreviewUtils(content);

  const imageUrl = src(content.backgroundImage);

  const {
    WrappedTextField,
    WrappedHeadingTextField,
    WrappedRichTextField,
    // WrappedImageField,
  } = fieldFactory<typeof HomePageHeroSlideComponentType>(content, parentField);

  /*
   * Rendering
   */

  const {
    previewInfo,
    base,
    eyebrow,
    heading,
    subHeadline,
    gradientOverlay,
    slideContent,
    wrapper,
  } = TAILWIND_VARIANTS();

  const locale = getLocale();
  const href = content.link?.url?.default ?? "";
  return (
    <TiSlide
      thumbnailSrc={imageUrl ?? ""}
      thumbnailLabel={content.headline ?? undefined}
      backgroundImageSrc={imageUrl}
      // TODO validate logic
      data-lid={`promo_hb_mm_${locale}_${content.campaignAlias ? content.campaignAlias : ""}`}
    >
      <div className={gradientOverlay()} />
      {isPreview && (
        <div className={previewInfo({ slideVisible: isVisible })}>
          Visible from: {startDate?.toLocaleString()} to:{" "}
          {endDate?.toLocaleString()}
        </div>
      )}
      <div className={slideContent()}>
        <div className={base()}>
          <NextLink href={href}>
            <div className={wrapper()}>
              <WrappedTextField as="p" className={eyebrow()} field="eyebrow" />
              <WrappedHeadingTextField
                className={heading()}
                field="headline"
                headingLevel={parseHeadlineLevel({ content: content })}
              />

              <WrappedTextField
                className={subHeadline()}
                as="p"
                field="subheadline"
              />
              <WrappedRichTextField field="description" />
              <TiButton>{content.link?.text}</TiButton>
            </div>
            {/* <div>
              <WrappedImageField field="featuredImage" width={150} height={100}/>
            </div> */}
          </NextLink>
        </div>
      </div>
    </TiSlide>
  );
}

// TODO clean up theses styles.  Some of theses classes don't exist.
const TAILWIND_VARIANTS = tv({
  slots: {
    previewInfo: [
      "text-center",
      "p-4",
      "rounded-md",
      "text-white",
      "z-1",
      "relative",
    ],
    base: ["text-white", "w-full"],
    cta: [],
    eyebrow: [
      "text-sm",
      "font-bold",
      "text-uppercase",
      "leading-[120%]",
      "letter-spacing-0.12px",
    ],
    heading: [
      "text-5xl",
      "font-bold",
      "md:leading-[48px]",
      "leading-[38px]",
      "line-clamp-1",
    ],
    subHeadline: [
      "text-3xl",
      "font-bold",
      "md:leading-[48px]",
      "leading-[38px]",
    ],
    gradientOverlay: [
      "absolute",
      "top-0",
      // "z-10",
      "bg-gradient-to-r",
      "from-black",
      "from-30%",
      "to-transparent",
      "w-full",
      "h-full",
    ],
    slideContent: [
      "p-16",
      "relative",
      "flex",
      "w-full",
      "z-10",
      "md:box-border",
      "md:text-left",
      "h-full",
      "overflow-auto",
      "items-stretch",
      "justify-start",
      "md:items-center",
    ],
    wrapper: [
      "flex",
      "flex-col",
      "gap-component-carousel-content-spacing-vertical",
    ],
  },
  variants: {
    slideVisible: {
      true: {
        previewInfo: ["bg-success"],
      },
      false: {
        previewInfo: ["bg-error"],
      },
    },
  },
});
