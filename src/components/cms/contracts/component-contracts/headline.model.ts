import { contentType, contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";

/** Most of the time you will want to use @see WithHeadlineContract  */
export const HeadlineContract = contract({
  key: `${KEY_PREFIX}Headline_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Headline Contract`,
  properties: {
    eyebrow: {
      type: "string",
      displayName: "Eyebrow",
      description: "Eyebrow of the component",
      maxLength: 50,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    headline: {
      type: "string",
      displayName: "Headline",
      description: "Headline of the component",
      maxLength: 250,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    description: {
      type: "richText",
      displayName: "Subheadline",
      description: "Extra rich text content",
      group: PropertyTypes.Content,
      isLocalized: true,
    },

    subheadline: {
      type: "string",
      displayName: "[Obsolete] Subheadline",
      description: "Subheadline of the component",
      maxLength: 250,
      isLocalized: true,

      ...SoftDeleteProperties,
    },

    /** This is actually Headline Size now, not Headline Level. */
    headlineLevel: {
      type: "string",
      displayName: "Headline Size Override",
      description:
        "Override the visual size of the headline.  By default is is based on the heading level.  The heading level is automatically determined",
      format: "selectOne",
      enum: [
        {
          value: "AUTO",
          displayName: "Automatic",
        },
        {
          value: "1",
          displayName: "3XL (H1)",
        },
        {
          value: "2",
          displayName: "2XL (H2)",
        },
        {
          value: "3",
          displayName: "XL (H3)",
        },
        {
          value: "4",
          displayName: "Large (H4)",
        },
        {
          value: "5",
          displayName: "Medium (H5)",
        },
        {
          value: "6",
          displayName: "Regular (H6)",
        },
      ],

      group: PropertyTypes.Appearance,
    },
  },
});

export const HeadlineComponentType = contentType({
  key: `${KEY_PREFIX}Headline_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Headline`,
  baseType: "_component",
  extends: [HeadlineContract],
});

export const WithHeadlineContract = contract({
  key: `${KEY_PREFIX}WithHeadline_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}With Headline Contract`,
  properties: {
    headline: {
      type: "content",
      displayName: "Headline Content",
      allowedTypes: [HeadlineComponentType],
    },
  },
});

/** For using contracts as component interfaces. */
export type HeadlineContractContentType = ContractContentType<
  [typeof HeadlineContract]
>;
