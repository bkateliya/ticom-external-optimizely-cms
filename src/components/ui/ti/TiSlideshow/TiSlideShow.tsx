"use client";
// Global
import { useState } from "react";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";
import React from "react";

export const ThumbnailSizeOptions = ["large", "none", "small"] as const;

export type ThumbnailSize = typeof ThumbnailSizeOptions[number];

export type TiSlideShowProps = {
  isPreview: boolean;
  /**Property for enabling auto-advance timer feature */
  autoAdvance?: boolean;
  /**	Hide and disable the thumbnail navigation entirely when true. */
  hideNavigation?: boolean;
  /**When true, positions the thumbnail navigation inset over the slideshow canvas. */
  insetNavigation?: boolean;
  /**Property to allow swipe action on mobile */
  mobileAllowSwipe?: boolean;
  /** When true, hides the chevron navigation buttons on mobile viewports even if showChevrons is true. */
  mobileHideChevrons?: boolean;
  /**Enables chevron navigation buttons overlaying the slideshow canvas. */
  showChevrons?: boolean;
  /**	Shows the pause/play button when true. */
  showPauseButton?: boolean;
  /**Property to set default slide duration for auto-advance */
  slideDuration?: number;
  /**	Property for thumbnail size, small or large. */
  thumbnailSize?: ThumbnailSize

  /**
   * The slide elements to display in the carousel.
   * We pass these as props to keep parent and slide components as server components.
   * @param element - The slide element to display.
   * @param isHidden - Whether the slide element is hidden.  In preview mode we have an option to show hidden slides.
   */
  slideElements: { element: React.ReactNode; isHidden: boolean }[];
};

export function TiSlideShow({
  isPreview,
  autoAdvance,
  hideNavigation,
  insetNavigation,
  mobileAllowSwipe,
  mobileHideChevrons,
  showChevrons,
  showPauseButton,
  slideDuration,
  thumbnailSize,
  slideElements,
}: TiSlideShowProps): React.ReactNode {

  const { showHiddenSlides, flattenedSlides, PreviewControls } =
    usePreviewControl(isPreview);

  const { mode } = useTheme();

  const visibleSlideElements = slideElements.filter(
    (slideElement) => !slideElement.isHidden || showHiddenSlides,
  );
  return (
    <section data-component="authorable/shared/lists/carousel">
      <SectionWrapper>
        {PreviewControls}
        {flattenedSlides || visibleSlideElements.length === 1 ? (
          <>
            {visibleSlideElements.map((slideElement, index) => (
              <div className="w-full" key={index}>{slideElement.element}</div>
            ))}
          </>
        ) : (

          <ti-slideshow
            auto-advance={autoAdvance}
            hide-navigation={hideNavigation}
            inset-navigation={insetNavigation}
            mobile-allow-swipe={mobileAllowSwipe}
            mobile-hide-chevrons={mobileHideChevrons}
            show-chevrons={showChevrons}
            show-pause-button={showPauseButton}
            slide-duration={slideDuration}
            thumbnail-size={thumbnailSize}
            theme={mode}
          >
            {
              visibleSlideElements.map((slideElement, index) => (
                <React.Fragment key={index}>
                  {slideElement.element}
                </React.Fragment>
              ))
            }
          </ti-slideshow>

        )}
      </SectionWrapper>
    </section >
  );
}

function usePreviewControl(isPreview: boolean) {
  const [showHiddenSlides, setShowHiddenSlides] = useState(false);
  const [flattenedSlides, setFlattenedSlides] = useState<boolean>(false);

  if (!isPreview) {
    return {
      showHiddenSlides: false,
      flattenedSlides: false,
      PreviewControls: null,
    };
  }
  return {
    showHiddenSlides,
    flattenedSlides,
    PreviewControls: (
      <div className="flex gap-2">
        <label className="p-2 flex gap-2">
          <input
            type="checkbox"
            checked={showHiddenSlides}
            onChange={() => setShowHiddenSlides(!showHiddenSlides)}
          />
          Show Hidden Slides
        </label>

        <label className="p-2 flex gap-2">
          <input
            type="checkbox"
            checked={flattenedSlides}
            onChange={() => setFlattenedSlides(!flattenedSlides)}
          />
          Flatten Slides
        </label>
      </div>
    ),
  };
}
