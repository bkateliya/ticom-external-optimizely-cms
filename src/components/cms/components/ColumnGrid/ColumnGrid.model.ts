import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap, StandaloneComponentTypeKeys } from "../keys";

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
  "20-20-20-20-20": "5 Column",
  "Advanced": "Advanced"
} as const;

export type ColumnOptions = keyof typeof COLUMN_MAP;

export const ColumnGridColumnComponentType = contentType({
  key: AllComponentTypeKeyMap.ColumnGridColumnComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Column Grid Column`,
  baseType: "_component",
  properties: {
    colSpan: {
      type: "integer",
      displayName: "Desktop Column Span (Advanced Only)",
      description: "The number of column subdivisions this takes up",
      group: PropertyTypes.Appearance,
    },
    colSpanTablet: {
      type: "integer",
      displayName: "Tablet Column Span (Advanced Only)",
      description: "The number of column subdivisions this takes up, defaults to full width",
      group: PropertyTypes.Appearance,
    },
    colSpanMobile: {
      type: "integer",
      displayName: "Mobile Column Span (Advanced Only)",
      description: "The number of column subdivisions this takes up, defaults to full width",
      group: PropertyTypes.Appearance,
    },
    content: {
      type: "array",
      displayName: "Column Content",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [...StandaloneComponentTypeKeys],
      },
    },
  }
});

export const ColumnGridComponentType = contentType({
  key: AllComponentTypeKeyMap.ColumnGridComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Column Grid`,
  baseType: "_component",
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
    },
    advancedTotalColumns: {
      type: "integer",
      displayName: "Total Columns Subdivisions (Advanced Only)",
      description: "The total number of column subdivisions.  Normally we use a 12 column grid and we can split it say 3/9 for a sidebr.  But we could set 5 column segments and the first one is double width we could do a 2-1-1-1 with 4 visible columns but the first is double-width. ",
      group: PropertyTypes.Appearance,
    },
    columns: {
      type: "array",
      displayName: "Column List",
      description: "Columns beyond the number allowed based on the Column Control setting are hidden",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [ColumnGridColumnComponentType],
      },
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
