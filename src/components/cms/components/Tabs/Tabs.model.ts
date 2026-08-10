import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { GeneralTabComponentType } from "./GeneralTab/GeneralTab.model";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";


export const TabsComponentType = contentType({
  key: AllComponentTypeKeyMap.TabsComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Tabs`,
  baseType: "_component",
  properties: {
    allTabsShown: {
      displayName: "Enable All Tabs",
      group: PropertyTypes.Layout,
      description: "Show all tabs",
      type: "boolean",
    },
    autoCollapseMobile: {
      displayName: "Auto collapse on mobile",
      group: PropertyTypes.Layout,
      type: "boolean",
    },
    disableMobile: {
      displayName: "Disable accordian view on mobile",
      group: PropertyTypes.Layout,
      type: "boolean",
    },
    hashSelection: {
      displayName: "Hash selection",
      description: "Allows URL hash selection",
      group: PropertyTypes.Settings,
      type: "boolean",
    },
    tabAppearance : {
      displayName: "Tab appearance",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      isRequired: true,
      enum: [
        { value: "regular", displayName: "Regular" },
        { value: "chip", displayName: "Chip" },
        { value: "cards", displayName: "Cards" },
      ],
    },
    tabsContent: {
      displayName: "Tabs",
      group: PropertyTypes.Content,
      type: "array",
      maxItems: 6,
      items: {
        type: "content",
        allowedTypes: [GeneralTabComponentType],
      },
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
