"use client";

import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { HtmlElementProps } from "@/lib/ts/react";
import React from "react";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";
import clsx from "clsx";
import { CustomEventHandler, useEventListenerRef } from "../Common/events";

export type ScrollingStorySubTextColor = "red" | "black";

export interface TiScrollingStoryProps extends HtmlElementProps {
  slideChanged?: CustomEventHandler<number>;
  subText?: string;
  subTextColor?: ScrollingStorySubTextColor;
  sectionHeadline?: string;
  children: React.ReactNode;
}
export function TiScrollingStory({
  subText,
  subTextColor,
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
  return (
    <ti-scrolling-story ref={ref} theme={mode} {...props}>
      <div slot="section-title" className="ti_p-scrollingStory-sectionTitle">
        <div
          className={clsx(
            "ti_p-scrollingStory-sectionTitle-subtext u-margin-bottom-2 u-font-size-2 u-line-height-2",
            {
              "text-red": subTextColor === "red",
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
    </ti-scrolling-story>
  );
}

export interface ScrollingStorySlideProps extends HtmlElementProps {
  highlight: string;
  title: string;
  description: string;
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
      </div>
    </section>
  );
}
TiScrollingStory.Slide = TiScrollingStorySlide;
