"use client";

import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { HtmlElementProps } from "@/lib/ts/react";
import React from "react";
import { useTheme } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { tv } from "tailwind-variants";
import { CustomEventHandler, useEventListenerRef } from "../Common/events";
import { useIsEditMode } from "@/components/ui/context/OptiContext";
import { TiImage } from "../TiImages/TiImage/TiImage";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";

export type ScrollingStorySubTextColor = "red" | "black";


const styles = tv({
  slots: {
    eyebrow: "mb-2 text-[14px] leading-[20px] font-normal uppercase",

    headline: [
      "mb-0 text-[28px] leading-[36px] md:text-[34px] md:leading-[40px]",
      "font-semibold text-pl-text-color-secondary",
    ],
    slide: [
      "ti_p-scrollingStory",
      "mb-12 block h-auto",
      "md:mb-0 md:flex md:h-[var(--_contentHeight,100%)] md:flex-col md:justify-start",
      "min-[940px]:pb-[var(--_contentPaddingBottomSize)]",
      "xl:justify-end",
      "[&_ti-image[data-injected]]:mb-6 md:[&_ti-image[data-injected]]:mb-0",
    ],
    label:
      "mb-6 text-[34px] leading-[40px] font-thin text-[var(--tiScrollingStory-label-text-color)]",
    title:
      "mb-4 text-[24px] leading-[32px] font-semibold text-balance text-[var(--tiScrollingStory-title-text-color)]",
    description: [
      "mb-6 text-[16px] leading-[24px] text-pretty",
      "text-[var(--tiScrollingStory-paragraph-color)]",
      "last-of-type:mb-0 [&>p:last-of-type]:mb-0",
    ],
  },
  variants: {
    subTextColor: {
      red: { eyebrow: "text-pl-text-color-accent" },
      black: { eyebrow: "text-pl-text-color-primary" },
    },
  },
});

export interface TiScrollingStoryProps extends HtmlElementProps {
  slideChanged?: CustomEventHandler<number>;
  subText?: string | null;
  subTextColor?: ScrollingStorySubTextColor;
  sectionHeadline?: string | null;
  children: React.ReactNode;
}
export function TiScrollingStory({
  subText,
  subTextColor = "red",
  sectionHeadline,
  children,
  slideChanged,
  ...props
}: TiScrollingStoryProps) {
  const { mode } = useTheme();
  const { eyebrow, headline } = styles({ subTextColor });

  const ref = useEventListenerRef({
    slideChanged: slideChanged,
  });

  const innerContent = (
    <>
      <div slot="section-title">
        <div className={eyebrow()}>{subText}</div>
        {sectionHeadline ? (
          <DynamicHeading className={headline()}>
            {sectionHeadline}
          </DynamicHeading>
        ) : null}
      </div>
      {/* Story headlines sit one level below the section headline (h2 -> h3) */}
      <HeadingLevelContext headingLevel="increment">
        {children}
      </HeadingLevelContext>
    </>
  );
  if (useIsEditMode()) {
    return (
      <div>
        <strong>Scrolling story displayed as flat list in edit mode</strong>
        {innerContent}
      </div>
    );
  }
  return (
    <ti-scrolling-story ref={ref} theme={mode} {...props}>
      {innerContent}
    </ti-scrolling-story>
  );
}

export interface ScrollingStorySlideProps extends Omit<
  HtmlElementProps,
  "title"
> {
  highlight: string | React.ReactNode | null;
  title: string | React.ReactNode | null;
  description: string | React.ReactNode | null;
  imgSrc?: string;
  imgAlt?: string;

  ctaList?: React.ReactNode;
}

export function TiScrollingStorySlide({
  highlight,
  title,
  description,
  imgSrc,
  imgAlt,
  ctaList,
}: ScrollingStorySlideProps) {
  const isEdit = useIsEditMode();
  const { slide, label, title: titleClass, description: descriptionClass } =
    styles();

  return (
    <section data-slide data-img-src={imgSrc} data-img-alt={imgAlt}>
      <div className={slide()}>
        <div className={label()}>{highlight}</div>
        <DynamicHeading className={titleClass()}>{title}</DynamicHeading>
        <div className={descriptionClass()}>{description}</div>
        {ctaList}
        {/* In edit mode we need to directly render the image because
            we aren't using ti-scrolling-story */}
        {isEdit && imgSrc ? (
          <>
            <TiImage src={imgSrc} alt={imgAlt} />
          </>
        ) : null}
      </div>
    </section>
  );
}
