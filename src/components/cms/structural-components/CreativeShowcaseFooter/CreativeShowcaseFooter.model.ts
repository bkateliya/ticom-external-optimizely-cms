import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { LinkElementType } from "../../elements/Link/Link.model";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";

export const CreativeShowcaseFooterComponentType = contentType({
  key: `${KEY_PREFIX}CreativeShowcaseFooter_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Custom Site Footer`,
  baseType: "_component",
  properties: {
    importantInformation: {
      type: "richText",
      displayName: "Important Information",
      group: PropertyTypes.Content,
      editorSettings: {
        preset: "minimal",
      },
    },
    footerLinks: {
      type: "array",
      displayName: "Footer Links",
      group: PropertyTypes.Content,
      sortOrder: 10,
      items: {
        type: "content",
        allowedTypes: [LinkElementType],
      },
    },
    copyrightLinkText: {
      type: "link",
      displayName: "Copyright Link",
      group: PropertyTypes.Content,
      sortOrder: 30,
    },
    copyrightSuffixText: {
      type: "string",
      displayName: "Copyright Suffix Text",
      sortOrder: 40,
      ...SoftDeleteProperties,
    },
  },
});
