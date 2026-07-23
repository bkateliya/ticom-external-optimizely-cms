"use client";

import { CustomEventHandler, useEventListenerRef } from "../Common/events";

export type CarouselGap = "small" | "large";
export type CarouselNavigation = "inline" | "below" | "chips" | "none";
export type CarouselTheme = "light" | "dark";

/** Detail payload for the `tiCarouselChange` event. */
export interface TiCarouselChangeEventDetail {
  /** Index of the slide now in view. */
  slideIndex: number;
}

/** A single carousel slide. Its content is wrapped in the neutral div the carousel requires. */
export type CarouselSlide = {
  /** Slide content — e.g. a `TiCard`, `TiSlide`, or any element. */
  content: React.ReactNode;
  /** Title for this slide; used as the label when `navigation="chips"`. */
  title?: string;
};

/**
 * Wrapper for `ti-carousel` — arranges slides in a horizontal track with
 * responsive navigation. Pass slides via the `slides` prop; each is rendered
 * inside the neutral wrapper `<div>` the carousel requires (with
 * `data-carousel-title` applied for chip navigation).
 *
 * `appearance` is intentionally not exposed — it is deprecated upstream in
 * favour of `theme`.
 *
 * @example
 * <TiCarousel
 *   navigation="chips"
 *   slidesPerViewDesktop={1}
 *   slides={[
 *     { title: "First", content: <TiCard appearance="plain-white"><p>One</p></TiCard> },
 *     { title: "Second", content: <TiCard appearance="plain-white"><p>Two</p></TiCard> },
 *   ]}
 * />
 */
export type TiCarouselProps = {
  /** The slides to render. */
  slides: CarouselSlide[];
  /** Spacing preset between slides. Defaults to "small". */
  gap?: CarouselGap;
  /** Which navigation UI to render. Defaults to "inline". */
  navigation?: CarouselNavigation;
  /** Amount of the next slide to reveal when peeking (pixels or a CSS length). */
  peekAmount?: number | string;
  /** Enable peeking on desktop. Tablet/mobile always peek. */
  peekDesktop?: boolean;
  /** Slides in view at once on desktop. Defaults to 3. */
  slidesPerViewDesktop?: number;
  /** Slides in view at once on tablet. Defaults to 2. */
  slidesPerViewTablet?: number;
  /** Slides in view at once on mobile. Defaults to 1. */
  slidesPerViewMobile?: number;
  /** Light or dark theme for navigation controls. Defaults to "light". */
  theme?: CarouselTheme;
  /** Fired when the active slide changes. */
  tiCarouselChange?: CustomEventHandler<TiCarouselChangeEventDetail>;
};

export function TiCarousel({
  slides,
  gap,
  navigation,
  peekAmount,
  peekDesktop,
  slidesPerViewDesktop,
  slidesPerViewTablet,
  slidesPerViewMobile,
  theme,
  tiCarouselChange,
}: TiCarouselProps): React.ReactNode {
  const ref = useEventListenerRef({
    tiCarouselChange: tiCarouselChange,
  });
  return (
    <ti-carousel
      ref={ref}
      gap={gap}
      navigation={navigation}
      peek-amount={peekAmount}
      peek-desktop={peekDesktop}
      slides-per-view-desktop={slidesPerViewDesktop}
      slides-per-view-tablet={slidesPerViewTablet}
      slides-per-view-mobile={slidesPerViewMobile}
      theme={theme}
    >
      {slides.map((slide, i) => (
        <div key={i} data-carousel-title={slide.title}>
          {slide.content}
        </div>
      ))}
    </ti-carousel>
  );
}
