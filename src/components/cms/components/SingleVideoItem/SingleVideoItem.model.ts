import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";
import { PropertyTypes } from "@/lib/property-types";
import { CtaLinkListComponentType } from "@/components/cms/components/CtaList/CtaList.model";

export const SingleVideoItemComponentType = contentType({
  key: AllComponentTypeKeyMap.SingleVideoItemComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Single Video Item`,
  baseType: "_component",
  properties: {
    videoId: {
      type: "string",
      format: "shortString",
      displayName: "Video Id",
      group: PropertyTypes.Content,
      isLocalized: false,
    },
    name: {
      type: "string",
      format: "shortString",
      displayName: "Name",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    shortDescription: {
      type: "string",
      format: "shortString",
      displayName: "Short Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    longDescription: {
      type: "string",
      displayName: "Long Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    ctaLinkList: {
      type: "content",
      displayName: "CTA Link List",
      allowedTypes: [CtaLinkListComponentType],
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    duration: {
      type: "integer",
      displayName: "Duration",
      group: PropertyTypes.Content,
    },
    publishedDate: {
      type: "dateTime",
      displayName: "Published Date",
      group: PropertyTypes.Seo,
      isLocalized: false,
    },
    state: {
      type: "string",
      format: "shortString",
      displayName: "State",
      group: PropertyTypes.Content,
      isLocalized: false,
    },
    thumbnail: {
      type: "string",
      displayName: "Thumbnail",
      group: PropertyTypes.Content,
      isLocalized: false,
    },
    captionLanguages: {
      type: "string",
      format: "shortString",
      displayName: "Caption Languages",
      description: "Comma separated language codes, e.g. en-us, zh-cn, ja-jp",
      group: PropertyTypes.Content,
      isLocalized: false,
    },
  },
});
