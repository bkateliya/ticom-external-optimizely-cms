import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";

export const ApplicationStoryComponentType = contentType({
  key: AllComponentTypeKeyMap.ApplicationStoryComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Application Story`,
  baseType: "_component",
  properties: {
    headline: {
      type: "string",
      displayName: "Headline",
      description: "Headline",
      maxLength: 200,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    description: {
      type: "richText",
      displayName: "Description",
      isRequired: true,
      description: "Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

export const FeaturedApplicationComponentType = contentType({
  key: AllComponentTypeKeyMap.FeaturedApplicationComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Featured Application`,
  baseType: "_component",
  properties: {
    innerComponents: {
      type: "array",
      displayName: "Content",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [ApplicationStoryComponentType],
      },
    },
  },
});

export const EventFolderType = contentType({
  key: AllComponentTypeKeyMap.FeaturedApplicationFolder,
  displayName: `${DISPLAY_NAME_PREFIX}Featured Application Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", FeaturedApplicationComponentType],
});
