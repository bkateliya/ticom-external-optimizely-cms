import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../../contracts/component-contracts/allow-in.model";
import { CtaButtonElementType } from "../../../elements/CTAButton/CTAButton.model";
import { StandardImageComponentType } from "../../Image/StandardImage.model";
import { VideoPlayerComponentType } from "../../VideoPlayer/VideoPlayer.model";
import { CtaVideoElementType } from "../../../elements/CTAVideoModal/CTAVideoModal.model";

export const GoldenSourcePageHeadingComponentType = contentType({
  key: AllComponentTypeKeyMap.GoldenSourcePageHeading,
  displayName: `${DISPLAY_NAME_PREFIX}Golden Source Page Heading`,
  baseType: "_component",
  extends: [AllowIn.PageHeader],
  properties: {
    subheadline: {
      type: "richText",
      displayName: "Subheadline",
      description: "Subheadline of the component",
      maxLength: 160,
      group: PropertyTypes.Content,
      isLocalized: true,
      editorSettings: { preset: "minimal" },
    },
    background: {
      displayName: "Section background",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      sortOrder: 10,
      enum: [
        { value: "white", displayName: "White (default)" },
        { value: "grey", displayName: "Grey" },
      ],
    },
    featureAsset: {
      displayName: "Feature asset",
      description: "Add either a Standard Image or a Video Player (Single Video type only — Video Playlist is not supported here)",
      type: "content",
      allowedTypes: [StandardImageComponentType, VideoPlayerComponentType],
      group: PropertyTypes.Appearance,
      sortOrder: 20,
    },
    ctaLinks: {
      displayName: "CTA Links",
      group: PropertyTypes.ComponentConfiguration,
      type: "array",
      maxItems: 2,
      items: {
        type: "content",
        allowedTypes: [CtaButtonElementType, CtaVideoElementType],
      },
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
