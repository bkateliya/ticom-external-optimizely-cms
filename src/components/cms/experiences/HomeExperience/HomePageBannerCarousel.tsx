import { HomePageBannerComponentType } from "../../components/HomePageBanner/HomePageBanner.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import {
  GenericContentType,
  normalizeGenericArrayToTyped,
} from "@/lib/utils/content-type-utils";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { getContextData } from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import {
  SlideVisibility,
  TiSlideShow,
} from "@/components/ui/ti/TiSlideshow/TiSlideShow";
import {
  COMMON_PAGINATION_FILTER,
  COMMON_PAGINATION_QUERY,
  getPaginatedResults,
} from "@/lib/graphql/graph-utils";
import { AllComponentTypeKeyMap } from "../../components/keys";
import { cached } from "@/lib/data/opti";
import { HomeExperienceType } from "./HomeExperience.model";
import { appendBynderAssets } from "@/lib/data/bynder";

export async function HomePageBannerCarouselComponent({
  content,
}: OptiComponentProps<typeof HomeExperienceType>): Promise<React.ReactNode> {
  const isPreview = !!getContextData("previewToken");
  if (!content) {
    return null;
  }

  const results = await getPaginatedResults(HOME_PAGE_BANNER_QUERY, {
    now: new Date().toDateString(),
  });

  const keys = results.map((x) => x._metadata.key);
  const slides = normalizeGenericArrayToTyped<
    typeof HomePageBannerComponentType
  >(
    await Promise.all(
      keys.map((key) =>
        cached.getReferencedContent<GenericContentType>({
          key,
        }),
      ),
    ),
  );

  // Because the bynder images aren't on the page object, the cache won't have them yet, so add them to the cache
  await appendBynderAssets(slides);

  return (
    <TiSlideShow
      autoAdvance
      fullBleed
      insetNavigation
      mobileAllowSwipe
      mobileHideChevrons
      showChevrons
      // ti.com runs the home page carousel with label-only navigation: no
      // thumbnail images, just the auto-advance progress bar over each label.
      thumbnailSize="none"
      isPreview={isPreview}
      minSlides={content.homePageBannerMinSlides || 4}
      maxSlides={content.homePageBannerMaxSlides || 5}
      slideElements={slides.map((slide) => ({
        element: (
          <ExtendedOptimizelyComponent
            key={slide._id}
            content={slide}
            parentField="slides"
          />
        ),
        slideVisibility: getSlideVisibility(slide),
      }))}
      sectionClass="-mt-4"
    />
  );
}

export const getSlideVisibility = (
  slide: ContentProps<typeof HomePageBannerComponentType>,
): SlideVisibility => {
  const now = new Date();
  const startDate = slide.startDate ? new Date(slide.startDate) : null;
  const endDate = slide.endDate ? new Date(slide.endDate) : null;
  const expireDate = slide.expireDate ? new Date(slide.expireDate) : null;
  if (startDate && startDate > now) {
    return "NotStarted";
  }
  if (expireDate && expireDate < now) {
    return "Expired";
  }
  if (endDate && endDate < now) {
    return "Ended";
  }
  return "Visible";
};

const HOME_PAGE_BANNER_QUERY = `query(${COMMON_PAGINATION_QUERY}, $now: Date) {
  data: ${AllComponentTypeKeyMap.HomePageBannerComponent}(
    where: {
      _and: [
        { _or: [{ startDate: { exist: false } }, { startDate: { lte: $now } }] }
        { _or: [{ expireDate: { exist: false } }, { expireDate: { gte: $now } }] }
        { showOnHomePage: { eq: true } }
      ]
    }
    ${COMMON_PAGINATION_FILTER}
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;
