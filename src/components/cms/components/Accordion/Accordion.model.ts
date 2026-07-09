import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { DEFAULT_VALUE } from "@/lib/utils/default-utils";
import { SectionContacts } from "../../contracts/component-contracts/section.model";
import { PreambleContracts } from "../../contracts/component-contracts/preamble.model";

export const AccordionPanelComponentType = contentType({
  key: `${KEY_PREFIX}AccordionPanel_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Accordion Panel`,
  baseType: "_component",
  properties: {
    title: { type: "string", displayName: "Title" },
    content: { type: "richText", displayName: "Content" },
    isExpanded: {
      type: "boolean",
      displayName: "Is Expanded",
      description: "Whether this panel is expanded by default",
      group: PropertyTypes.Appearance,
    },
  },
});

export const AccordionComponentType = contentType({
  key: `${KEY_PREFIX}Accordion_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Accordion`,
  baseType: "_component",
  extends: PreambleContracts,
  properties: {
    accordionPanels: {
      displayName: "Accordion Panels",
      group: PropertyTypes.Content,

      type: "array",
      items: {
        type: "content",
        allowedTypes: [AccordionPanelComponentType],
      },
    },
    appearance: {
      displayName: "Minimal Appearance",
      group: PropertyTypes.Appearance,

      type: "string",
      format: "selectOne",
      enum: [
        { value: DEFAULT_VALUE, displayName: "Default" },
        { value: "minimal", displayName: "Minimal" },
      ],
    },
    autoCollapse: {
      type: "boolean",
      displayName: "Auto Collapse",
      description: "Controls whether the accordion will automatically collapse open panels if a panel is open, giving it the ‘accordion’ behaviour. NOTE: This means that the accordion won’t have expand / collapse all since they are not applicable in this case. false means multiple panels can be open at the same time, and you get expand all and collapse all buttons. true means that only one panel can be open at a time, and the accordion will automatically open only the first panel onload. Opening another panel will close the current panel.",
      group: PropertyTypes.Appearance,
    },
    autoScroll: {
      type: "boolean",
      displayName: "Auto Scroll",
      description: "Causes the panel being opened to automatically smooth scroll into view. Note: only applies when using autoCollapse",
      group: PropertyTypes.Appearance,
    },
    size: {
      displayName: "Size",
      group: PropertyTypes.Appearance,

      type: "string",
      format: "selectOne",
      enum: [
        { value: DEFAULT_VALUE, displayName: "Default" },
        { value: "lg", displayName: "Large" },
      ],
    },
  },
  compositionBehaviors: ["sectionEnabled"],
});
