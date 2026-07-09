"use server";
import { damAssets } from "@optimizely/cms-sdk";

import Image from "next/image";
import { TimedHeroBannerComponentType } from "./TimedHeroBanner.model";
import {
  getContextData,
  getPreviewUtils,
} from "@optimizely/cms-sdk/react/server";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { tv } from "tailwind-variants";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { HeadlineComponentType } from "../../contracts/component-contracts/headline.model";
import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";
import { parseHeadlineLevel } from "@/components/ui/molecules/Headline/Headline";

export async function TimedHeroBannerComponent({
  content,
  parentField,
}: OptiComponentProps<typeof TimedHeroBannerComponentType>) {
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
  const { getAlt } = damAssets(content);
  const imageUrl = src(content.bannerImage);

  const headline = normalizeGenericContentToTyped<typeof HeadlineComponentType>(content.headline);

  const { WrappedTextField, WrappedHeadingTextField, WrappedRichTextField } = fieldFactory<
    typeof HeadlineComponentType
  >(headline, parentField);

  /*
   * Rendering
   */

  const {
    previewInfo,
    base,
    eyebrow,
    ctaButtons,
    descriptionText,
    heading,
    subHeadline,
    imageWrapper,
    gradientOverlay,
    slide,
    slideContent,
    slideMedia,
    wrapper,
  } = TAILWIND_VARIANTS();

  return (
    <div data-component="authorable/shared/lists/carouselitem">
      {isPreview && (
        <div className={previewInfo({ slideVisible: isVisible })}>
          Visible from: {startDate?.toLocaleString()} to:{" "}
          {endDate?.toLocaleString()}
        </div>
      )}
      <div className={slide()}>
        <div className={slideMedia()}>
          {imageUrl && (
            <>
              <Image
                className={imageWrapper()}
                src={imageUrl}
                alt={getAlt(content.bannerImage) ?? ""}
                width={680}
                height={540}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
              <div className={gradientOverlay()} />
            </>
          )}
          <div className={slideContent()}>
            <div className={base()}>
              <div className={wrapper()}>
                <WrappedTextField
                  as="p"
                  className={eyebrow()}
                  field="eyebrow"
                />
                <WrappedHeadingTextField
                  className={heading()}
                  field="headline"
                  headingLevel={parseHeadlineLevel({ content: headline })}
                />

                <WrappedTextField
                  className={subHeadline()}
                  as="p"
                  field="subheadline"
                />
                <WrappedRichTextField
                  className={descriptionText()}
                  field="description"
                />
              </div>
              <CtaList content={content} parentField={parentField} ctaSurface="onBg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO clean up theses styles.  Some of theses classes don't exist.
const TAILWIND_VARIANTS = tv({
  slots: {
    previewInfo: ["text-center", "p-4", "rounded-md", "text-white"],
    base: [
      "text-white",
      // "slide-content-inner",
      // "flex",
      // "w-full",
      // "md:max-w-[548px]",
      // "shrink-0",
      // "self-stretch",
      // "mr-spacing-spacing-16",
      // "md:mx-spacing-spacing-40",
      // "md:my-spacing-spacing-48",
      // "flex-col",
      // "items-start",
      // "justify-center",
      // "px-component-carousel-content-padding-x",
      // "py-component-carousel-content-padding-y",
      // "md:rounded-border-radius-container-l2",
      // "md:border-component-hero-copy-border-width",
      // "md:border-component-carousel-color-content-border",
      // "bg-component-carousel-color-content-surface",
      // "gap-component-carousel-buttons-margin-top",
    ],
    cta: [],
    descriptionText: [
      "carousel-rich-text",
      "text-component-carousel-color-body",
      "font-typography-body-font-family",
      "text-typography-body-large-font-size",
      "font-normal",
      "leading-[27px]",
      "line-clamp-3",
    ],
    ctaButtons: [
      "flex",
      "flex-col",
      "gap-spacing-spacing-12",
      "md:flex-row",
      "w-full",
      "md:w-auto",
    ],
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
    imageWrapper: [
      "relative",
      "md:absolute",
      "inset-0",
      "object-cover",
      "w-full",
      "overflow-hidden",
      "md:rounded-[12px]",
      "aspect-video",
      "bg-center",
      "bg-cover",
      "left-0",
      "top-0",
      "xl:h-[550px]",
      "md:h-[470px]",
      "self-stretch",
    ],
    gradientOverlay: [
      "absolute",
      "top-0",
      "z-10",
      "bg-gradient-to-r",
      "from-black",
      "from-30%",
      // "via-black",
      "to-transparent",
      // "h-[70vh]",
      // "lg:h-[80vh]",
      "w-full",
      "h-full",
    ],
    slide: [
      "flex",
      "md:justify-center",
      "xl:h-[550px]",
      "md:min-h-[470px]",
      "flex-col",
      "relative",
    ],
    slideContent: [
      "slide-content",
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
    slideMedia: ["slide-media", "h-full", "flex", "flex-col", "md:min-h-full"],
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
