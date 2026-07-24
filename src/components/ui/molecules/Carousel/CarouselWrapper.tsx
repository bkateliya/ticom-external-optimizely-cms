"use client";
// Global
import { useState } from "react";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";

export const CarouselGapOptions = ["small", "large"] as const;
export type CarouselGap = typeof CarouselGapOptions[number];

export const CarouselNavigationOptions = ["below", "chips", "inline", "none"] as const;
export type CarouselNavigation = typeof CarouselNavigationOptions[number];

export type CarouselWrapperProps = {
  isPreview: boolean;
  gap?: CarouselGap;
  navigation?: CarouselNavigation;
  peekAmount?: string | number;
  peekDesktop?: boolean;
  slidesPerViewDesktop?: number;
  slidesPerViewTablet?: number;
  slidesPerViewMobile?: number;

  /**
   * The slide elements to display in the carousel.
   * We pass these as props to keep parent and slide components as server components.
   * @param element - The slide element to display.
   * @param isHidden - Whether the slide element is hidden.  In preview mode we have an option to show hidden slides.
   */
  slideElements: { element: React.ReactNode; isHidden: boolean }[];
};

export function CarouselWrapper({
  isPreview,
  gap,
  navigation,
  peekAmount,
  peekDesktop,
  slidesPerViewDesktop,
  slidesPerViewTablet,
  slidesPerViewMobile,
  slideElements,
}: CarouselWrapperProps): React.ReactNode {

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
              <div key={index}>{slideElement.element}</div>
            ))}
          </>
        ) : (

          <ti-carousel
            gap={gap}
            navigation={navigation}
            peek-amount={peekAmount}
            peek-desktop={peekDesktop}
            slides-per-view-desktop={slidesPerViewDesktop}
            slides-per-view-tablet={slidesPerViewTablet}
            slides-per-view-mobile={slidesPerViewMobile}
            theme={mode}
          >
            {visibleSlideElements.map((slideElement, index) => (
              <div key={index}>
                <ti-card
                >
                  {slideElement.element}
                </ti-card>
              </div>
            ))}
          </ti-carousel>

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
