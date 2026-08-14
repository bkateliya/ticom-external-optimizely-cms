import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "src/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";

export const GeneralTabComponentType = contentType({
  key: AllComponentTypeKeyMap.GeneralTabComponent,
  displayName: `${DISPLAY_NAME_PREFIX}General Tab`,
  baseType: "_component",
  properties: {
    tabName: {
      type: "string",
      displayName: "Tab Name",
      description: "Name of current tab",
      group: PropertyTypes.Content,
      isLocalized: true,
      isRequired: true,
    },
    tabId: {
      type: "string",
      displayName: "Tab ID",
      description: "ID used for anchor linking",
      group: PropertyTypes.Content,
      isLocalized: false,
      isRequired: true,
    },
    tabContent: {
      type: "array",
      displayName: "Section Content",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [AllowIn.Tab],
      },
    },
  },
});
