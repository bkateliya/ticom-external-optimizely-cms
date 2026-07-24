import { contentType, contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";

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
    headlineLevel: {
      type: "string",
      displayName: "Heading Level Override",
      description: "Manually set the heading level for this component.  Components inside should adjust if they are not overriden",
      format: "selectOne",
      enum: [
        {
          value: "AUTO",
          displayName: "Automatic"
        },
        {
          value: "2",
          displayName: "H2"
        },
        {
          value: "3",
          displayName: "H3"
        },
        {
          value: "4",
          displayName: "H4"
        },
        {
          value: "5",
          displayName: "H5"
        },
        {
          value: "6",
          displayName: "H6"
        },
        {
          value: "1",
          displayName: "H1 (Use rarely, prefer to use a Hero or Page Title component)"
        },
      ]
    },
    subheadline: {
      type: "string",
      displayName: "Subheadline",
      description: "Subheadline of the component",
      maxLength: 250,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    description: {
      type: "richText",
      displayName: "Description",
      description: "Description of the component",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

export const HeadlineComponentType = contentType({
  key: `${KEY_PREFIX}Headline_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Headline`,
  baseType: "_component",
  extends: [HeadlineContract],
})

export const WithHeadlineContract = contract({
  key: `${KEY_PREFIX}WithHeadline_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}With Headline Contract`,
  properties: {
    headline: {
      type: "content",
      displayName: "Headline Content",
      allowedTypes: [HeadlineComponentType]
    }
  }
})


/** For using contracts as component interfaces. */
export type HeadlineContractContentType = ContractContentType<
  [typeof HeadlineContract]
>;