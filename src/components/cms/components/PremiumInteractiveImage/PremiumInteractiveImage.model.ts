import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { CtaLinkListComponentType } from "@/components/cms/components/CtaList/CtaList.model";
import type { PinLinePath } from "@/components/ui/ti/TiImages/TiImageMap/TiPin";

const PANEL_PATH_OPTIONS = [
  { value: "up", displayName: "Up" },
  { value: "up right", displayName: "Up right" },
  { value: "up left", displayName: "Up left" },
  { value: "right up", displayName: "Right up" },
  { value: "left up", displayName: "Left up" },
  { value: "left", displayName: "Left" },
  { value: "right", displayName: "Right" },
  { value: "down right", displayName: "Down right" },
  { value: "down left", displayName: "Down left" },
  { value: "left down", displayName: "Left down" },
  { value: "right down", displayName: "Right down" },
  { value: "down", displayName: "Down" },
] satisfies { value: PinLinePath; displayName: string }[];

export const PremiumInteractiveImagePanelComponentType = contentType({
  key: AllComponentTypeKeyMap.PremiumInteractiveImagePanelComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Premium Interactive Image Panel`,
  baseType: "_component",
  properties: {
    panelTitle: {
      type: "string",
      displayName: "Panel Title",
      maxLength: 50,
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 10,
      isLocalized: true,
    },
    panelPinX: {
      type: "integer",
      displayName: "Panel Pin X (as percentage)",
      minimum: 0,
      maximum: 100,
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 20,
    },
    panelPinY: {
      type: "integer",
      displayName: "Panel Pin Y (as percentage)",
      minimum: 0,
      maximum: 100,
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 30,
    },
    panelPath: {
      type: "string",
      format: "selectOne",
      displayName: "Panel Path",
      isRequired: false,
      group: PropertyTypes.Content,
      sortOrder: 40,
      enum: PANEL_PATH_OPTIONS,
    },
    panelPinLength: {
      type: "integer",
      displayName: "Panel Pin Length (as pixel)",
      minimum: 0,
      isRequired: false,
      group: PropertyTypes.Content,
      sortOrder: 50,
    },
    panelPinHeight: {
      type: "integer",
      displayName: "Panel Pin Height (as pixel)",
      minimum: 0,
      isRequired: false,
      group: PropertyTypes.Content,
      sortOrder: 60,
    },
    panelDescription: {
      type: "string",
      displayName: "Panel Description",
      description: "Max 300 characters, 400 with expansion",
      maxLength: 400,
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 70,
      isLocalized: true,
    },
    panelMainCTALink: {
      type: "content",
      displayName: "Panel Main CTA Link",
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 80,
      allowedTypes: [CtaLinkElementType],
    },
    panelSubtitle: {
      type: "string",
      displayName: "Panel Subtitle",
      isRequired: false,
      group: PropertyTypes.Content,
      sortOrder: 90,
      isLocalized: true,
    },
    panelAdditionalLinks: {
      type: "content",
      displayName: "Panel Additional Links",
      description: "Maximum of 3 links",
      isRequired: false,
      group: PropertyTypes.Content,
      sortOrder: 100,
      allowedTypes: [CtaLinkListComponentType],
    },
  },
});

export const PremiumInteractiveImageComponentType = contentType({
  key: AllComponentTypeKeyMap.PremiumInteractiveImageComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Premium Interactive Image`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    componentIntro1: {
      type: "string",
      displayName: "Component Intro 1",
      description: "Max 300 characters, 400 with expansion",
      maxLength: 400,
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 10,
      isLocalized: true,
    },
    componentIntro2: {
      type: "string",
      displayName: "Component Intro 2",
      maxLength: 75,
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 20,
      isLocalized: true,
    },
    imageName: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 30,
    },
    panels: {
      type: "array",
      displayName: "Panels",
      isRequired: false,
      group: PropertyTypes.Content,
      sortOrder: 40,
      maxItems: 7,
      items: {
        type: "content",
        allowedTypes: [PremiumInteractiveImagePanelComponentType],
      },
    },
  },
});
