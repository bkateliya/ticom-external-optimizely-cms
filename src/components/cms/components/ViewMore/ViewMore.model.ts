import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { PropertyTypes } from "@/lib/property-types";

export const ViewMoreComponentType = contentType({
  key: AllComponentTypeKeyMap.ViewMoreComponent,
  displayName: `${DISPLAY_NAME_PREFIX}View More`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    expandActionLabel: {
      type: "string",
      displayName: "Expand action label",
      group: PropertyTypes.Content,
      isRequired: true,
      isLocalized: true,
    },
    collapseActionLabel: {
      type: "string",
      displayName: "Collapse action label",
      group: PropertyTypes.Content,
      isRequired: true,
      isLocalized: true,

    },
    collapsedHeight: {
      type: "string",
      format: "selectOne",
      displayName: "Collapsed height",
      group: PropertyTypes.Content,
      isRequired: true,
      sortOrder:10,
      enum: [
        {
          value: "-3",
          displayName: "-3",
        },
        {
          value: "-2",
          displayName: "-2",
        },
        {
          value: "-1",
          displayName: "-1",
        },
        {
          value: "0",
          displayName: "0",
        },
        {
          value: "1",
          displayName: "1",
        },
        {
          value: "2",
          displayName: "2",
        },
        {
          value: "3",
          displayName: "3",
        },
      ],
    },
  },
});
