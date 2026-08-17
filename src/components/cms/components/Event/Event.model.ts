import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const EventComponentType = contentType({
  key: AllComponentTypeKeyMap.EventComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Event`,
  baseType: "_component",
  properties: {
    title: {
      type: "string",
      displayName: "Title",
      description: "Event title",
      maxLength: 300,
      group: PropertyTypes.Content,
      isLocalized: true,
    },    
    description: {
      type: "richText",
      displayName: "Description",
      isRequired: true,
      description: "Event description",
      group: PropertyTypes.Content,
      isLocalized: true
    },
    bynderImage: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      isRequired: true,
      group: PropertyTypes.Content    
    },
  },
});

export const EventFolderType = contentType({
  key: AllComponentTypeKeyMap.EventFolder,
  displayName: `${DISPLAY_NAME_PREFIX}Event Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", EventComponentType],
});