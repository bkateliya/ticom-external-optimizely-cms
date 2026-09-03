import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageOnlyContracts,
} from "@/components/cms/contracts/common";
import { PropertyTypes } from "@/lib/property-types";
import { CtaLinkListComponentType } from "@/components/cms/components/CtaList/CtaList.model";
import { VideoTranscriptComponentType } from "@/components/cms/components/VideoTranscript/VideoTranscript.model";

export const SingleVideoPageType = contentType({
  key: PageTypeKeyMap.SingleVideoPageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Single Video Page`,
  baseType: "_page",
  extends: CommonPageOnlyContracts,
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
    videoTranscripts: {
      type: "array",
      displayName: "Video Transcripts",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [VideoTranscriptComponentType],
      },
    },
  },
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
