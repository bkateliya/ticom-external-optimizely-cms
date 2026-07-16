"use server";

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
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";

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
    heading,
    subHeadline,
    gradientOverlay,
    slideContent,
    wrapper,
  } = TAILWIND_VARIANTS();

  return (
    <TiSlide thumbnailSrc={imageUrl ?? ""} thumbnailLabel={headline.headline ?? undefined} backgroundImageSrc={imageUrl}>
      <div className={gradientOverlay()} />
      {isPreview && (
        <div className={previewInfo({ slideVisible: isVisible })}>
          Visible from: {startDate?.toLocaleString()} to:{" "}
          {endDate?.toLocaleString()}
        </div>
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
              field="description"
            />
          </div>
          <CtaList content={content} parentField={parentField} />
        </div>
      </div>
    </TiSlide>
  );
}

// TODO clean up theses styles.  Some of theses classes don't exist.
const TAILWIND_VARIANTS = tv({
  slots: {
    previewInfo: ["text-center", "p-4", "rounded-md", "text-white", "z-1", "relative"],
    base: [
      "text-white",
    ],
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
