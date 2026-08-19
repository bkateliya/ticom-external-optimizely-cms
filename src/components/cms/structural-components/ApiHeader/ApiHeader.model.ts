import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";

export const ApiHeaderLevel2ComponentType = contentType({
  key: `${KEY_PREFIX}ApiHeaderLevel2_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Subsite Header Level 2 Link`,
  baseType: "_component",
  properties: {
    level2Title: {
      type: "string",
      displayName: "Level 2 title",
      isRequired: true,
      isLocalized: true,
      group: PropertyTypes.Content,
    },
    level2URL: {
      type: "link",
      displayName: "Level 2 URL",
      description:
        "Required when a Level 2 title is set. Author should navigate to a relative URL.",
      isRequired: true,
      isLocalized: true,
      group: PropertyTypes.Content,
    },
  },
});

export const ApiHeaderLevel1ComponentType = contentType({
  key: `${KEY_PREFIX}ApiHeaderLevel1_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Subsite Header Level 1 Menu`,
  baseType: "_component",
  properties: {
    level1Title: {
      type: "string",
      displayName: "Level 1 title",
      isRequired: true,
      isLocalized: true,
      group: PropertyTypes.Content,
    },
    level1URL: {
      type: "link",
      displayName: "Level 1 URL",
      description:
        "Required if no Level 2 links are authored. Author should navigate to a relative URL.",
      isLocalized: true,
      group: PropertyTypes.Content,
    },
    level2Links: {
      type: "array",
      displayName: "Level 2 links",
      description: "Maximum of 10 Level 2 links may be authored.",
      group: PropertyTypes.Content,
      maxItems: 10,
      items: {
        type: "content",
        allowedTypes: [ApiHeaderLevel2ComponentType],
      },
    },
  },
});

export const ApiHeaderComponentType = contentType({
  key: `${KEY_PREFIX}ApiHeader_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Subsite Header`,
  baseType: "_component",
  properties: {
    level1Menus: {
      type: "array",
      displayName: "Level 1 menus",
      isRequired: true,
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [ApiHeaderLevel1ComponentType],
      },
    },
  },
});
