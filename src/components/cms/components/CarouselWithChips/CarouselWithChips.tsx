import { CarouselWithChipsComponentType } from "./CarouselWithChips.model";
import { SlideWithCardComponentType } from "../SlideWithCard/SlideWithCard.model";
import { SlideWithCardComponent } from "../SlideWithCard/SlideWithCard";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { TiCarousel } from "@/components/ui/ti/TiCarousel/TiCarousel";

export function CarouselWithChipsComponent({
  content,
}: OptiComponentProps<typeof CarouselWithChipsComponentType>) {
  if (!content) {
    return null;
  }

  const slides = normalizeGenericArrayToTyped(
    content.slides,
    SlideWithCardComponentType,
  );

  if (slides.length === 0) {
    return null;
  }

  return (
    <TiCarousel
      navigation="chips"
      slidesPerViewDesktop={1}
      slidesPerViewTablet={1}
      peekDesktop
      slides={slides.map((slide) => ({
        title: slide.chipLabel ?? undefined,
        content: <SlideWithCardComponent key={slide._id} content={slide} />,
      }))}
    />
  );
}
