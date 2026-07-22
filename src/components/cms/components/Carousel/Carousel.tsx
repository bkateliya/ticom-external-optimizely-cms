import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";

import {
  CarouselComponentType,
  CarouselItemComponentType,
  CarouselSlideComponentType,
} from "./Carousel.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { normalizeUrl } from "@/lib/utils/link-utils";
import {
  CarouselGap,
  CarouselNavigation,
  CarouselSlide,
  TiCarousel,
} from "@/components/ui/ti/TiCarousel/TiCarousel";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import { TiCard } from "@/components/ui/ti/TiCard/TiCard";

type LinkValue = { text?: string; url?: { base?: string; default?: string } } | undefined;

function linkHref(link: LinkValue): string | undefined {
  const raw = (link?.url?.base ?? "") + (link?.url?.default ?? "");
  return normalizeUrl(raw) || undefined;
}

export function CarouselComponent({
  content,
}: OptiComponentProps<typeof CarouselComponentType>) {
  if (!content) {
    return null;
  }

  const { src } = getPreviewUtils(content);

  const slides: CarouselSlide[] = (content.carouselSlides ?? [])
    .map((item): CarouselSlide | null => {
      const slide = normalizeGenericContentToTyped<typeof CarouselSlideComponentType>(
        item,
        CarouselSlideComponentType
      );
      if (slide) {
        const href = linkHref(slide.link as LinkValue);
        return {
          title: slide.title || undefined,
          content: (
            <TiSlide
              thumbnailSrc={
                (slide.thumbnailImage ? src(slide.thumbnailImage) : "") || ""
              }
              backgroundImageSrc={
                (slide.backgroundImageSrc ? src(slide.backgroundImageSrc) : undefined) ||
                undefined
              }
              backgroundVideoSrc={
                (slide.backgroundVideoSrc ? src(slide.backgroundVideoSrc) : undefined) ||
                undefined
              }
            >
              <div className="ti_p-slideContent">
                <div className="ti_p-slideContent-column">
                  <div className="ti_p-slideContent-text">
                    {slide.title && (
                      <h3 className="ti_p-slideContent-title">{slide.title}</h3>
                    )}
                    {slide.subTitle && (
                      <p className="ti_p-slideContent-paragraph">{slide.subTitle}</p>
                    )}
                    {href && slide.link?.text && (
                      <ti-button className="ti_p-slideContent-cta" appearance="reversed">
                        <a href={href}>{slide.link.text}</a>
                      </ti-button>
                    )}
                  </div>
                </div>
              </div>
            </TiSlide>
          ),
        };
      }

      const cardItem = normalizeGenericContentToTyped<typeof CarouselItemComponentType>(
        item,
        CarouselItemComponentType
      );
      if (cardItem) {
        const href = linkHref(cardItem.link as LinkValue);
        const titleText = cardItem.title || cardItem.link?.text;
        return {
          title: cardItem.title || undefined,
          content: (
            <TiCard appearance="plain-white">
              {href ? (
                <a slot="title" href={href}>
                  {titleText}
                </a>
              ) : (
                titleText && <h3 slot="title">{titleText}</h3>
              )}
            </TiCard>
          ),
        };
      }

      return null;
    })
    .filter((s): s is CarouselSlide => s !== null);

  return (
    <TiCarousel
      navigation={
        (content.navigationMode as CarouselNavigation | undefined) || undefined
      }
      gap={(content.gap as CarouselGap | undefined) || undefined}
      peekAmount={content.peekAmount ?? undefined}
      peekDesktop={content.peekDesktop ?? undefined}
      slidesPerViewDesktop={content.slidesPerViewDesktop ?? undefined}
      slidesPerViewTablet={content.slidesPerViewTablet ?? undefined}
      slidesPerViewMobile={content.slidesPerViewMobile ?? undefined}
      slides={slides}
    />
  );
}
