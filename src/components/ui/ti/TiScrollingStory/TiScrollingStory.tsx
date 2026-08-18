"use client";

import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { HtmlElementProps } from "@/lib/ts/react";
import React from "react";
import { useTheme } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import clsx from "clsx";
import { CustomEventHandler, useEventListenerRef } from "../Common/events";
import { useIsEditMode } from "@/components/ui/context/OptiContext";
import { TiImage } from "../TiImages/TiImage/TiImage";

export type ScrollingStorySubTextColor = "red" | "black";

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

  const ref = useEventListenerRef({
    slideChanged: slideChanged,
  });

  // TODO: Replace css classes with appropriate Tailwind styles
  const innerContent = (
    <>
      <div slot="section-title" className="ti_p-scrollingStory-sectionTitle">
        <div
          className={clsx(
            "ti_p-scrollingStory-sectionTitle-subtext u-margin-bottom-2 u-font-size-2 u-line-height-2",
            {
              "text-pl-text-color-accent": subTextColor === "red",
            },
          )}
        >
          {subText}
        </div>
        {sectionHeadline ? (
          <DynamicHeading className="ti_p-scrollingStory-sectionTitle-header">
            {sectionHeadline}
          </DynamicHeading>
        ) : null}
      </div>
      {children}
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
  // TODO: Replace css classes with appropriate Tailwind styles
  return (
    <section data-slide data-img-src={imgSrc} data-img-alt={imgAlt}>
      <div className="ti_p-scrollingStory">
        <div className="ti_p-scrollingStory-label">{highlight}</div>
        <DynamicHeading className="ti_p-scrollingStory-title">
          {title}
        </DynamicHeading>
        <div className="ti_p-scrollingStory-paragraph">{description}</div>
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
