import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { DEFAULT_VALUE } from "@/lib/utils/default-utils";
import { AllComponentTypeKeyMap } from "../keys";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";
import { WithHeadlineContract } from "@/components/cms/contracts/component-contracts/headline.model";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";

export const AccordionPanelComponentType = contentType({
  key: AllComponentTypeKeyMap.AccordionPanelComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Accordion Panel`,
  baseType: "_component",
  properties: {
    title: { type: "string", displayName: "Title" },
    innerComponents: {
      type: "array",
      displayName: "Content",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [AllowIn.Accordion],
      },
    },
    content: {
      type: "richText",
      displayName: "Content",      
      ...SoftDeleteProperties,
    },
    isExpanded: {
      type: "boolean",
      displayName: "Is Expanded",
      description: "Whether this panel is expanded by default",
      ...SoftDeleteProperties,
    },
  },
});

export const AccordionComponentType = contentType({
  key: AllComponentTypeKeyMap.AccordionComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Accordion`,
  baseType: "_component",
  extends: [WithHeadlineContract, ...AllowIn.Groupings.NonAccordion],
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
      description:
        "Controls whether the accordion will automatically collapse open panels if a panel is open, giving it the ‘accordion’ behaviour. NOTE: This means that the accordion won’t have expand / collapse all since they are not applicable in this case. false means multiple panels can be open at the same time, and you get expand all and collapse all buttons. true means that only one panel can be open at a time, and the accordion will automatically open only the first panel onload. Opening another panel will close the current panel.",

      ...SoftDeleteProperties,
    },
    autoScroll: {
      type: "boolean",
      displayName: "Auto Scroll",
      description:
        "Causes the panel being opened to automatically smooth scroll into view. Note: only applies when using autoCollapse",
      ...SoftDeleteProperties,
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
});
