import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { ScrollingStorySubTextColor } from "@/components/ui/ti/TiScrollingStory/TiScrollingStory";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";
import {
  CtaListContract,
  CtaListOverrideLinksOnly,
} from "../../contracts/component-contracts/cta-list.model";

export const ScrollingStoryVerticalContentComponentType = contentType({
  key: AllComponentTypeKeyMap.ScrollingStoryVerticalContent,
  displayName: `${DISPLAY_NAME_PREFIX}Vertical Scrolling Story Content`,
  baseType: "_component",
  extends: [ImageBaseContract, CtaListContract],
  properties: {
    ...CtaListOverrideLinksOnly,
    highlight: {
      type: "richText",
      displayName: "Story Highlight",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    title: {
      type: "richText",
      displayName: "Story Headline",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    description: {
      type: "richText",
      displayName: "Story Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

export const ScrollingStoryVerticalComponentType = contentType({
  key: AllComponentTypeKeyMap.ScrollingStoryVertical,
  displayName: `${DISPLAY_NAME_PREFIX}Vertical Scrolling Story`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    subText: {
      type: "string",
      displayName: "Eyebrow",
      maxLength: 150,
      group: PropertyTypes.Content,
    },
    subTextColor: {
      displayName: "Eyebrow text color",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      enum: [
        { value: "red", displayName: "Red (default)" },
        { value: "black", displayName: "Black" },
      ] satisfies { value: ScrollingStorySubTextColor; displayName: string }[],
    },
    sectionHeadline: {
      type: "string",
      displayName: "Headline",
      maxLength: 150,
      group: PropertyTypes.Content,
    },
    stories: {
      displayName: "Stories",
      group: PropertyTypes.Content,
      type: "array",
      minItems: 2,
      maxItems: 10,
      items: {
        type: "content",
        allowedTypes: [ScrollingStoryVerticalContentComponentType],
      },
    },
  },
});
