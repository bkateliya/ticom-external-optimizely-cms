import {
  HomePageHeroComponentType,
  HomePageHeroSlideComponentType,
} from "./HomePageHero.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { getContextData } from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import { getEnumOrUndefinedForAuto } from "@/lib/opti/enum-utils";
import { TiSlideShow } from "@/components/ui/ti/TiSlideshow/TiSlideShow";

export function HomePageHeroComponent({
  content,
}: OptiComponentProps<
  typeof HomePageHeroComponentType
>): React.ReactNode {
  const isPreview = !!getContextData("previewToken");
  if (!content) {
    return null;
  }

  const slides = normalizeGenericArrayToTyped<
    typeof HomePageHeroSlideComponentType
  >(content?.slides ?? []);

  return (
    <TiSlideShow
      autoAdvance={!!content.autoAdvance}
      slideDuration={content.slideDuration || undefined}
      hideNavigation={!!content.hideNavigation}
      thumbnailSize={getEnumOrUndefinedForAuto(content.thumbnailSize)}
      insetNavigation
      mobileAllowSwipe
      mobileHideChevrons
      showChevrons
      showPauseButton
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
  slide: ContentProps<typeof HomePageHeroSlideComponentType>,
) => {
  const startDate = slide.startDate ? new Date(slide.startDate) : null;
  const endDate = slide.endDate ? new Date(slide.endDate) : null;
  return (
    (!startDate || startDate <= new Date()) &&
    (!endDate || endDate >= new Date())
  );
};