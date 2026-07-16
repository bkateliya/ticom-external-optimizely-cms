import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { SectionContacts } from "../../contracts/component-contracts/section.model";
import { componentTypes } from "../../components/types";
import { PropertyTypes } from "@/lib/property-types";

const COLUMN_MAP = {
  "100": "Full Width (default)",
  "50-50-no-offset": "6/6",
  "33-66": "4/8",
  "66-33": "8/4",
  "25-75": "3/9",
  "75-25": "9/3",
  "42-58": "5/7",
  "58-42": "7/5",
  "33-33-33": "4/4/4",
  "25-25-25-25": "3/3/3/3",
} as const;

export type ColumnOptions = keyof typeof COLUMN_MAP;

export const GeneralSectionComponentType = contentType({
  key: `${KEY_PREFIX}GeneralSection_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}General Section`,
  baseType: "_component",
  extends: SectionContacts,
  properties: {
    columnControl: {
      type: "string",
      displayName: "Column Control",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      enum: Object.keys(COLUMN_MAP).map((x) => {
        const typedKey = x as keyof typeof COLUMN_MAP;
        return ({ value: typedKey, displayName: COLUMN_MAP[typedKey] });
      }),
      // [
      //   { value: "100", displayName: "Full Width (default)" },
      //   { value: "50-50-no-offset", displayName: "6/6" },
      //   { value: "33-66", displayName: "4/8" },
      //   { value: "66-33", displayName: "8/4" },
      //   { value: "25-75", displayName: "3/9" },
      //   { value: "75-25", displayName: "9/3" },
      //   { value: "42-58", displayName: "5/7" },
      //   { value: "58-42", displayName: "7/5" },
      //   { value: "33-66", displayName: "4/8" },
      //   { value: "33-33-33", displayName: "4/4/4" },
      //   { value: "25-25-25-25", displayName: "3/3/3/3" },
      // ]
    },
    content: {
      type: "array",
      displayName: "Column 1 Content",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [...componentTypes],
      },
    },
    content2: {
      type: "array",
      displayName: "Column 2 Content (If applicable)",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [...componentTypes],
      },
    },
    content3: {
      type: "array",
      displayName: "Column 3 Content (If applicable)",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [...componentTypes],
      },
    },
    content4: {
      type: "array",
      displayName: "Column 4 Content (If applicable)",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [...componentTypes],
      },
    },
  },
  compositionBehaviors: ["sectionEnabled"],
});
