import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { enumToOptions } from "@/lib/opti/enum-utils";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";

const COLUMN_MAP = {
  "50-50-no-offset": "6/6",
  "33-66": "4/8",
  "66-33": "8/4",
  "25-75": "3/9",
  "75-25": "9/3",
  "42-58": "5/7",
  "58-42": "7/5",
  "33-33-33": "4/4/4 (default)",
  "25-25-25-25": "3/3/3/3",
  "20-20-20-20-20": "5 Column",
} as const;

export type ColumnOptions = keyof typeof COLUMN_MAP;

export const VAlignMap = {
  top: "Top",
  center: "Center",
  bottom: "Bottom",
} as const;

export type VAlignOptions = keyof typeof VAlignMap;

export const ColumnGridColumnComponentType = contentType({
  key: AllComponentTypeKeyMap.ColumnGridColumnComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Column Grid Column`,
  baseType: "_component",
  properties: {
    verticalAlignment: {
      type: "string",
      displayName: "Vertical Alignment",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      enum: enumToOptions(VAlignMap, { displayNameIsValue: true }),
    },
    content: {
      type: "array",
      displayName: "Column Content",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [AllowIn.Column],
      },
    },
  },
});

export const ColumnGridComponentType = contentType({
  key: AllComponentTypeKeyMap.ColumnGridComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Column Grid`,
  baseType: "_component",
  extends: [
    ...AllowIn.Groupings.Common
  ],
  properties: {
    columnControl: {
      type: "string",
      displayName: "Column Control",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      enum: enumToOptions(COLUMN_MAP, { displayNameIsValue: true }),
    },

    columns: {
      type: "array",
      displayName: "Column List",
      description:
        "Columns beyond the number allowed based on the Column Control setting are hidden",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [ColumnGridColumnComponentType],
      },
    },
  },
});
