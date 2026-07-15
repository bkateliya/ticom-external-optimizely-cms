import {
  TimedHeroBannerSlideshowComponentType,
  TimedHeroBannerComponentType,
} from "./TimedHeroBanner.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { CarouselWrapper } from "../../../ui/molecules/Carousel/CarouselWrapper";
import { getContextData } from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";

export function TimedHeroBannerCarouselComponent({
  content,
}: OptiComponentProps<
  typeof TimedHeroBannerSlideshowComponentType
>): React.ReactNode {
  const isPreview = !!getContextData("previewToken");
  if (!content) {
    return null;
  }

  const slides = normalizeGenericArrayToTyped<
    typeof TimedHeroBannerComponentType
  >(content?.slides ?? []);

  return (
    <CarouselWrapper
      content={content}
      isPreview={isPreview}
      slideElements={slides.map((slide) => ({
        element: (
          <ExtendedOptimizelyComponent
            key={slide._id}
            content={slide}
            parentField="slides"
          />
        ),
        isHidden: !slideIsVisible(slide),
      }))}
    />
  );
}

const slideIsVisible = (
  slide: ContentProps<typeof TimedHeroBannerComponentType>,
) => {
  const startDate = slide.startDate ? new Date(slide.startDate) : null;
  const endDate = slide.endDate ? new Date(slide.endDate) : null;
  return (
    (!startDate || startDate <= new Date()) &&
    (!endDate || endDate >= new Date())
  );
};
