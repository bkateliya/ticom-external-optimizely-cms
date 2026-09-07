import { SlideshowComponentType } from "./Slideshow.model";
import { SlideWithImageComponentType } from "../SlideWithImage/SlideWithImage.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { TiSlideShow } from "@/components/ui/ti/TiSlideshow/TiSlideShow";
import { getContextData } from "@optimizely/cms-sdk/react/server";

export function SlideshowComponent({
  content,
}: OptiComponentProps<typeof SlideshowComponentType>) {
  if (!content) {
    return null;
  }

  const slides = normalizeGenericArrayToTyped(
    content.slides,
    SlideWithImageComponentType,
  );

  if (slides.length === 0) {
    return null;
  }

  const isPreview = !!getContextData("previewToken");

  return (
    <TiSlideShow
      isPreview={isPreview}
      autoAdvance
      thumbnailSize="large"
      slideElements={slides.map((slide) => ({
        element: (
          <ExtendedOptimizelyComponent
            key={slide._id}
            content={slide}
            parentField="slides"
          />
        ),
        slideVisibility: "Visible",
      }))}
    />
  );
}
