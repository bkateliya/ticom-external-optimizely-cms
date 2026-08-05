import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { DestinationTypeType } from "../../data/DestinationType.model";

export const SelectionToolComponentType = contentType({
  key: AllComponentTypeKeyMap.SelectionToolComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Selection Tool`,
  baseType: "_component",
  properties: {
    destinationId: {
      type: "string",
      displayName: "Destination ID",
      group: PropertyTypes.Content,
    },
    destinationTypeRef: {
      type: "contentReference",
      allowedTypes: [DestinationTypeType],
      displayName: "Destination Type",
      group: PropertyTypes.Content,
    },
    destinationType: {
      displayMode: "hidden",
      type: "string",
      displayName: "[Obsolete] Destination Type",
      group: PropertyTypes.Content,
    },
    selectionLID: {
      displayMode: "hidden",
      type: "string",
      displayName: "[Obsolete] Selection LID",
      group: PropertyTypes.Content,
    },
  },
});
