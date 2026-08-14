import { PropertyTypes } from "@/lib/property-types";
import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { AllComponentTypeKeyMap } from "../keys";

/** Child content type, contains one benefit and one description */
export const KeyCustomerMessageItemComponentType = contentType({
  key: AllComponentTypeKeyMap.KeyCustomerMessageItemComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Key Customer Message Item`,
  baseType: "_component",
  properties: {
    benefit: {
      type: "string",
      displayName: "Benefit",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    description: {
      type: "string",
      displayName: "Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

/** Main content type, contains an array of KeyCustomerMessageItems */
export const KeyCustomerMessagesComponentType = contentType({
  key: AllComponentTypeKeyMap.KeyCustomerMessagesComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Key Customer Messages`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    messages: {
      type: "array",
      displayName: "Messages",
      group: PropertyTypes.Content,
      minItems: 2,
      maxItems: 4,
      items: {
        type: "component",
        contentType: KeyCustomerMessageItemComponentType,
      },
    },
  },
});
