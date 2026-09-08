import { SingleVideoItemComponentType } from "@/components/cms/components/SingleVideoItem/SingleVideoItem.model";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";
import { DEFAULT_LOCALE, toGraphLocale } from "@/constants/locales";
import {
  COMMON_PAGINATION_FILTER,
  COMMON_PAGINATION_QUERY,
  getPaginatedResults,
  ResultWithKey,
} from "@/lib/graphql/graph-utils";
import { ContentProps } from "@optimizely/cms-sdk";

// Editorial rule: always show 12 videos. Local-language videos (newest to
// oldest) fill the slots first; if there aren't 12, the newest English videos
// not already shown fill the remainder.
const DISPLAY_COUNT = 12;

type SingleVideoItemResult = ResultWithKey &
  ContentProps<typeof SingleVideoItemComponentType>;

export async function getRecentVideos(locale: string) {
  const localGraphLocale = toGraphLocale(locale);
  const localVideos = await getSingleVideoItems(localGraphLocale);

  if (localVideos.length >= DISPLAY_COUNT) {
    return localVideos.slice(0, DISPLAY_COUNT);
  }

  const englishGraphLocale = toGraphLocale(DEFAULT_LOCALE);
  if (englishGraphLocale === localGraphLocale) {
    return localVideos;
  }

  const englishVideos = await getSingleVideoItems(englishGraphLocale);
  const localKeys = new Set(localVideos.map((video) => video._metadata.key));
  const fillVideos = englishVideos.filter(
    (video) => !localKeys.has(video._metadata.key),
  );

  return [...localVideos, ...fillVideos].slice(0, DISPLAY_COUNT);
}

async function getSingleVideoItems(graphLocale: string) {
  return getPaginatedResults<SingleVideoItemResult>(RECENT_VIDEO_ITEM_QUERY, {
    locale: graphLocale,
  });
}

const RECENT_VIDEO_ITEM_QUERY = `query GetRecentVideoItems($locale: String, ${COMMON_PAGINATION_QUERY}) {
  data: ${AllComponentTypeKeyMap.SingleVideoItemComponent}(
    where: { _metadata: { locale: { eq: $locale } } }
    orderBy: { publishedDate: DESC }
    ${COMMON_PAGINATION_FILTER}
  ) {
    items {
      _metadata {
        key
      }
      videoId
      name
      shortDescription
      longDescription
      duration
      publishedDate
      state
      thumbnail
      captionLanguages
      ctaLinkList {
        _metadata {
          key
        }
      }
    }
    cursor
  }
}`;
