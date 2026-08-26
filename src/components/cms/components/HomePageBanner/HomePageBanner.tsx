"use server";

import { HomePageBannerComponentType } from "./HomePageBanner.model";
import { getContextData } from "@optimizely/cms-sdk/react/server";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { tv } from "tailwind-variants";
import { parseHeadlineSize } from "@/components/ui/molecules/Headline/Headline";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import { TifButton } from "@ticom/form-components/react";
import { ButtonAppearance } from "@/components/ui/ti/enums";
import { getLocale } from "next-intl/server";
import { getSlideVisibility } from "../../experiences/HomeExperience/HomePageBannerCarousel";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import { isEditMode } from "@/lib/opti/edit-helpers";

export async function HomePageBannerComponent({
  content,
  parentField,
}: OptiComponentProps<typeof HomePageBannerComponentType>) {
  if (!content) {
    return null;
  }
  const isPreview = !!getContextData("previewToken");

  const startDate = content.startDate ? new Date(content.startDate) : null;
  const endDate = content.endDate ? new Date(content.endDate) : null;
  const isVisible =
    (!startDate || startDate <= new Date()) &&
    (!endDate || endDate >= new Date());

  const { src, thumbnailSrc } = getStandardizedImage(
    content,
    content.backgroundImage,
  );
  const {
    WrappedTextField,
    WrappedHeadingTextField,
    WrappedRichTextField,
    WrappedImageField,
  } = fieldFactory<typeof HomePageBannerComponentType>(content, parentField);

  /*
   * Rendering
   */

  const {
    previewInfo,
    slideContent,
    column,
    text,
    eyebrow,
    heading,
    paragraph,
    featuredColumn,
    featuredImage,
  } = TAILWIND_VARIANTS();

  // The banner fills the viewport below the global header (ti.com drives this
  // with --tiSlide-height rather than an aspect ratio). The CMS edit canvas
  // renders the page in an iframe, so 100dvh refers to the iframe there —
  // pin a fixed height instead (same approach as PremiumMediaHeading).
  const isEditCanvas = isEditMode();
  const slideStyle = {
    "--tiSlide-aspectRatio": "auto",
    "--tiSlide-height": isEditCanvas
      ? "700px"
      : "calc(100dvh - var(--ti-header-height, 0px))",
    "--tiSlide-minHeight": isEditCanvas ? "700px" : "560px",
  } as React.CSSProperties;

  const locale = await getLocale();
  const href = content.link?.url?.default ?? "";
  return (
    <TiSlide
      style={slideStyle}
      thumbnailSrc={thumbnailSrc ?? src ?? ""}
      thumbnailLabel={content.headline ?? undefined}
      backgroundImageSrc={src}
      // TODO validate logic
      data-lid={`promo_hb_mm_${locale}_${content.campaignAlias ? content.campaignAlias : ""}`}
    >
      {isPreview && (
        <div className={previewInfo({ slideVisible: isVisible })}>
          {getSlideVisibility(content)} : Visible from:{" "}
          {startDate?.toLocaleString()} to: {endDate?.toLocaleString()}
        </div>
      )}
      <div className={slideContent()}>
        <div className={column()}>
          <div className={text()}>
            <WrappedTextField as="p" className={eyebrow()} field="eyebrow" />
            <WrappedHeadingTextField
              className={heading()}
              field="headline"
              headingSize={parseHeadlineSize({ content: content })}
            />

            <WrappedRichTextField
              field="description"
              className={paragraph()}
            />

            {href && content.link?.text && (
              <TifButton
                href={href}
                appearance={ButtonAppearance.outline}
                theme="dark"
              >
                {content.link.text}
              </TifButton>
            )}
          </div>
        </div>
        {content.featuredImage && (
          <div className={featuredColumn()}>
            <WrappedImageField
              className={featuredImage()}
              field="featuredImage"
              width={500}
              height={300}
            />
          </div>
        )}
      </div>
    </TiSlide>
  );
}

/**
 * Ports the ti.com `.ti_p-slideContent--largeBanner` rules (from
 * ticom.global.portals.css, which this app doesn't load) onto the theme tokens.
 * The gradient over the background image is supplied by `ti-slide` itself, so
 * there is deliberately no overlay element here.
 */
const TAILWIND_VARIANTS = tv({
  slots: {
    previewInfo: [
      "absolute",
      "inset-x-0",
      "top-0",
      "z-20",
      "text-center",
      "p-4",
      "rounded-md",
      "text-white",
    ],
    // The inline padding reserves the chevron gutter (16 + 40 + 16) and the
    // block-end padding the inset thumbnail nav (92 + 24), so the max width is
    // the 1184px content grid plus a chevron gutter on each side.
    slideContent: [
      "relative",
      "z-10",
      "box-border",
      "mx-auto",
      "flex",
      "h-full",
      "w-full",
      "max-w-[1328px]",
      "flex-col",
      "justify-between",
      "gap-4",
      "px-4",
      "pt-4",
      "pb-[80px]",
      "text-white",
      "md:flex-row",
      "md:justify-start",
      "md:gap-7",
      "md:px-[72px]",
      "md:pt-8",
      "md:pb-[116px]",
    ],
    column: [
      "flex",
      "h-full",
      "min-w-0",
      "grow-0",
      "basis-full",
      "flex-col",
      "items-center",
      "justify-center",
      "md:flex-1",
    ],
    text: ["w-full", "max-w-[874px]", "self-start"],
    eyebrow: [
      "text-sm",
      "font-bold",
      "uppercase",
      "leading-[120%]",
      "tracking-[0.12px]",
      "mb-2",
    ],
    heading: [
      "text-white",
      "text-balance",
      "font-normal",
      "text-[34px]",
      "leading-[48px]",
      "mt-0",
      "mb-6",
      "md:text-[56px]",
      "md:leading-[72px]",
      "md:mb-8",
    ],
    paragraph: [
      "text-balance",
      "font-light",
      "text-[18px]",
      "leading-[28px]",
      "mb-4",
      "md:text-[24px]",
      "md:leading-[32px]",
      "md:mb-8",
    ],
    featuredColumn: [
      "flex",
      "h-full",
      "min-w-0",
      "grow-0",
      "basis-full",
      "items-center",
      "justify-center",
      "md:flex-1",
    ],
    featuredImage: [
      "h-auto",
      "w-auto",
      "max-h-[300px]",
      "max-w-full",
      "object-contain",
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
