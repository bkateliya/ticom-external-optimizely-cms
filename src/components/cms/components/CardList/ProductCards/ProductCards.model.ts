import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "src/components/cms/constants.mjs";

export const ProductCardsComponentType = contentType({
  key: `${KEY_PREFIX}ProductCards_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}ProductCards`,
  baseType: "_component",
  properties: {
    currency: {
      type: "string",
      displayName: "Currency",
      group: "content",
      format: "selectOne",
      
      enum: [
        { value: "ALL", displayName: "All" },
        { value: "CAD", displayName: "Canadian Dollar" },
        { value: "USD", displayName: "US Dollar" },
      ],
    },
    isNew: {
      type: "string",
      displayName: "New Flag",
      group: "content",
      format: "selectOne",
      enum: [
        { value: "ALL", displayName: "All" },
        { value: "TRUE", displayName: "Yes" },
        { value: "FALSE", displayName: "No" },
      ],
    },
  },
});
