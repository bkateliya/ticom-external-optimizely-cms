"use client";
// Global
import { Splide as SplideCore } from "@splidejs/splide";
import { Intersection } from "@splidejs/splide-extension-intersection";
import {
  Splide,
  SplideProps,
  SplideSlide,
  SplideTrack,
} from "@splidejs/react-splide";

import "@splidejs/splide/css";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { useTranslations } from "next-intl";
import { SvgIcon } from "@/components/ui/Atoms/SvgIcon";
import { tv } from "tailwind-variants";
import { CarouselComponentContractContentType } from "@/components/cms/contracts/component-contracts/carousel.model";

const USE_CUSTOM_PAGINATION = true;
const DEFAULT_SPLIDE_INTERVAL = 3000;
const DEFAULT_SPLIDE_SPEED = 300;

export type CarouselWrapperProps =
  OptiComponentProps<CarouselComponentContractContentType> & {
    isPreview: boolean;
    /**
     * The slide elements to display in the carousel.
     * We pass these as props to keep parent and slide components as server components.
     * @param element - The slide element to display.
     * @param isHidden - Whether the slide element is hidden.  In preview mode we have an option to show hidden slides.
     */
    slideElements: { element: React.ReactNode; isHidden: boolean }[];
  };

export function CarouselWrapper({
  content,
  isPreview,
  slideElements,
}: OptiComponentProps<CarouselComponentContractContentType> & {
  isPreview: boolean;
  slideElements: { element: React.ReactNode; isHidden: boolean }[];
}): React.ReactNode {
  const boolAutoPlay = content?.autoPlay ?? false;
  const splideRef = useRef<SplideCore | null>(null);
  const [isPlaying, setIsPlaying] = useState(boolAutoPlay);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { showHiddenSlides, flattenedSlides, PreviewControls } =
    usePreviewControl(isPreview);

  const t = useTranslations();

  useEffect(() => {
    if (!splideRef.current) return;
    if (boolAutoPlay) {
      splideRef.current.Components.Autoplay.play();
    } else {
      splideRef.current.Components.Autoplay.pause();
    }
    setIsPlaying(boolAutoPlay);
  }, [boolAutoPlay, splideRef]);

  if (!content) {
    return null;
  }

  const splideOptions: SplideProps["options"] = {
    autoplay: isPlaying,
    gap: ".02rem",
    arrows: !USE_CUSTOM_PAGINATION,
    intersection: {
      inView: {
        autoplay: isPlaying,
      },
      outView: {
        autoplay: false,
      },
    },
    interval: content?.autoPlayInterval ?? DEFAULT_SPLIDE_INTERVAL,
    pagination: !USE_CUSTOM_PAGINATION,
    perMove: 1,
    perPage: 1,
    rewind: isPlaying,
    speed: DEFAULT_SPLIDE_SPEED,
    type: "slide",
    width: "100%",
    drag: true,
    rewindByDrag: isPlaying,
  };

  /*
   * Event Handers
   */
  const onMove = (_instance: SplideCore, newIndex: number) => {
    setCurrentIndex(newIndex);
  };
  const onMoved = (instance: SplideCore) => {
    setTotalSlides(instance?.length);
  };

  /*
   * Rendering
   */
  const {
    base,
    screenReader,
    slideArrows,
    customPagination,
    actionButtonControl,
    customControlWrapper,
    customPaginationDotsWrapper,
    paginationDots,
    dotStyle,
    carouselPlayPauseStyle,
  } = TAILWIND_VARIANTS();

  const visibleSlideElements = slideElements.filter(
    (slideElement) => !slideElement.isHidden || showHiddenSlides,
  );
  return (
    <section data-component="authorable/shared/lists/carousel">
      <SectionWrapper>
        <div className={base()}>
          {PreviewControls}
          {flattenedSlides || visibleSlideElements.length === 1 ? (
            <>
              {visibleSlideElements.map((slideElement, index) => (
                <div key={index}>{slideElement.element}</div>
              ))}
            </>
          ) : (
            <>
              <Splide
                ref={(ref) => {
                  if (ref?.splide) {
                    splideRef.current = ref.splide;
                  }
                }}
                extensions={{ Intersection }}
                hasTrack={false}
                onMounted={onMoved}
                onMove={onMove}
                onMoved={onMoved}
                options={splideOptions}
              >
                <SplideTrack>
                  {visibleSlideElements.map((slideElement, index) => (
                    <SplideSlide
                      tabIndex={index !== currentIndex ? -1 : 0}
                      aria-hidden={index !== currentIndex}
                      key={index}
                    >
                      {slideElement.element}
                    </SplideSlide>
                  ))}
                </SplideTrack>
              </Splide>
              {USE_CUSTOM_PAGINATION && (
                <CustomPagination
                  splideRef={splideRef}
                  totalSlides={totalSlides}
                  currentIndex={currentIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              )}
            </>
          )}
        </div>
      </SectionWrapper>
    </section>
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

function CustomPagination({
  splideRef,
  totalSlides,
  currentIndex,
  isPlaying,
  setIsPlaying,
}: {
  splideRef: React.RefObject<SplideCore | null>;
  totalSlides: number;
  currentIndex: number;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    customPagination,
    customControlWrapper,
    actionButtonControl,
    customPaginationDotsWrapper,
    paginationDots,
    dotStyle,
    slideArrows,
    screenReader,
    carouselPlayPauseStyle,
  } = TAILWIND_VARIANTS();
  return (
    <div className={customPagination()}>
      <div className={customControlWrapper()}>
        <button
          onClick={() => {
            if (!splideRef.current) return;
            if (isPlaying) {
              splideRef.current.Components.Autoplay.pause();
            } else {
              splideRef.current.Components.Autoplay.play();
            }
            setIsPlaying((prev) => !prev);
          }}
          className={actionButtonControl()}
          aria-label={`${isPlaying ? "carousel-pause" : "carousel-play"}`}
        >
          <span className={screenReader()}>
            {/* {t(isPlaying ? "PlaySlideshow" : "PauseSlideshow")} */}
            {isPlaying ? "Play Slideshow" : "Pause Slideshow"}
          </span>
          <SvgIcon
            className={carouselPlayPauseStyle()}
            icon={isPlaying ? "carousel-pause" : "carousel-play"}
            viewBox={isPlaying ? "8 10 24 24" : "11 12 24 24"}
            fill="none"
            size="s"
          />
        </button>
        <nav role="navigation" aria-label="Carousel Pagination">
          <ul className={customPaginationDotsWrapper()}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <li key={i}>
                <button
                  onClick={() => splideRef.current?.go(i)}
                  className={paginationDots({
                    isActiveSlide: i === currentIndex,
                  })}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <SvgIcon
                    icon={
                      i === currentIndex
                        ? "carousel-active-pagedot"
                        : "carousel-pagedot"
                    }
                    size={i === currentIndex ? "md" : "xxs"}
                    viewBox={i === currentIndex ? "0 0 40 12" : "0 0 12 12"}
                    className={dotStyle({
                      isActiveSlide: i === currentIndex,
                    })}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={slideArrows()}>
        <button
          onClick={() => splideRef.current?.go("<")}
          className={actionButtonControl({
            isArrowDisabled: false, //currentIndex === 0 && !boolAutoLoop,
          })}
          aria-label="carousel-prev"
          disabled={false} //currentIndex === 0 && !boolAutoLoop}
        >
          <SvgIcon icon="carousel-arrow-left" size="s" viewBox="0 0 20 20" />
        </button>
        <button
          onClick={() => splideRef.current?.go(">")}
          className={actionButtonControl({
            isArrowDisabled: false, //currentIndex === totalSlides - 1 && !boolAutoLoop,
          })}
          aria-label="carousel-next"
          disabled={false} //currentIndex === totalSlides - 1 && !boolAutoLoop}
        >
          <SvgIcon icon="carousel-arrow-right" size="s" viewBox="0 0 20 20" />
        </button>
      </div>
    </div>
  );
}

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [
      "w-full",
      //   "overflow-hidden",
      //   "relative",
      //   "flex",
      //   "flex-col",
      //   "md:gap-0",
      //   "gap-spacing-spacing-16",
    ],
    screenReader: ["sr-only"],
    slideArrows: ["flex", "gap-2"],
    customPagination: [
      "pt-component-carousel-utility-bar-padding-top",
      "px-component-carousel-utility-bar-padding-x",
      "flex",
      "justify-between",
      "items-center",
      "self-stretch",
      "min-w-spacing-columns-full-min-width",
      "max-w-spacing-columns-full-max-width",
    ],
    actionButtonControl: [
      "p-2",
      "border",
      "border-component-carousel-utility-bar-button-border",
      "bg-component-carousel-utility-bar-button-bg",
      "text-component-carousel-utility-bar-button-prevnext-icon",
      "hover:border-component-carousel-utility-bar-button-border-hover",
      "hover:bg-component-carousel-utility-bar-button-bg-hover",
      "hover:text-component-carousel-utility-bar-button-prevnext-icon-hover",
      "rounded-full",
      "w-11",
      "h-11",
    ],
    customControlWrapper: ["flex", "gap-spacing-spacing-16", "items-center"],
    customPaginationDotsWrapper: [
      "flex",
      "gap-spacing-spacing-8",
      "items-center",
    ],
    paginationDots: [],
    carouselPlayPauseStyle: [
      "text-component-carousel-utility-bar-button-playpause-icon",
    ],
    dotStyle: [],
  },
  variants: {
    isActiveSlide: {
      true: {
        paginationDots: [
          "w-10",
          "h-6",
          "flex",
          "justify-center",
          "items-center",
        ],
        dotStyle: [
          "!w-10",
          "text-component-carousel-utility-bar-pagination-item-fill-active",
        ],
      },
      false: {
        paginationDots: [
          "w-6",
          "h-6",
          "flex",
          "justify-center",
          "items-center",
        ],
        dotStyle: ["text-component-carousel-utility-bar-pagination-item-fill"],
      },
    },
    isArrowDisabled: {
      true: {
        actionButtonControl: [
          "opacity-50",
          "text-component-carousel-utility-bar-button-icon-disabled",
        ],
      },
    },
  },
});
