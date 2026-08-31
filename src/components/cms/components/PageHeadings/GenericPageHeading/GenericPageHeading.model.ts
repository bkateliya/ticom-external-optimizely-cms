import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../../constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../../contracts/component-contracts/allow-in.model";
import { CtaButtonElementType } from "../../../elements/CTAButton/CTAButton.model";
import { VideoPlayerComponentType } from "../../VideoPlayer/VideoPlayer.model";
import { ImageElementType } from "../../../elements/ImageElement/ImageElement.model";
import { PageHeadingContract } from "@/components/cms/contracts/component-contracts/page-headings.model";

export const GenericPageHeadingComponentType = contentType({
  key: AllComponentTypeKeyMap.GenericPageHeadingComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Generic Page Heading`,
  baseType: "_component",
  extends: [AllowIn.PageHeader, PageHeadingContract],
  properties: {
    primaryCTA: {
      type: "content",
      displayName: "Primary CTA",
      group: PropertyTypes.Content,
      sortOrder: 30,
      allowedTypes: [CtaButtonElementType],
    },
    secondaryCTA: {
      type: "content",
      displayName: "Secondary CTA",
      group: PropertyTypes.Content,
      sortOrder: 40,
      allowedTypes: [CtaButtonElementType],
    },
    background: {
      displayName: "Background",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      isRequired: true,
      sortOrder: 10,
      enum: [
        { value: "white", displayName: "White" },
        { value: "grey", displayName: "Grey (Default)" },
      ],
    },
    media: {
      type: "content",
      displayName: "Media",
      group: PropertyTypes.Content,
      sortOrder: 50,
      allowedTypes: [VideoPlayerComponentType, ImageElementType],
    },
  },
});
