import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";

export const VideoTranscriptComponentType = contentType({
  key: AllComponentTypeKeyMap.VideoTranscriptComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Video Transcript`,
  baseType: "_component",
  properties: {
    languageCode: {
      type: "string",
      format: "shortString",
      displayName: "Language Code",
      group: PropertyTypes.Content,
      isLocalized: false,
    },
    transcript: {
      type: "string",
      displayName: "Transcript",
      group: PropertyTypes.Content,
      isLocalized: false,
    },
    json: {
      type: "string",
      displayName: "Json",
      group: PropertyTypes.Content,
      isLocalized: false,
    },
  },
});
