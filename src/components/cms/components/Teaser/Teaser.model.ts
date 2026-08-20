import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";
import { HeadlineContract } from "@/components/cms/contracts/component-contracts/headline.model";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const TeaserComponentType = contentType({
  key: AllComponentTypeKeyMap.TeaserComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Teaser`,
  baseType: "_component",
  compositionBehaviors: ["sectionEnabled"],
  // Section + prefooter only, not the Common grouping: the teaser must sit
  // directly in a Section, never in a column/tab/accordion.
  extends: [HeadlineContract, AllowIn.Section, AllowIn.Prefooter],
  properties: {
    image: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      group: PropertyTypes.Content,
    },
    teaserDescription: {
      type: "richText",
      displayName: "Description",
      group: PropertyTypes.Content,
      editorSettings: { preset: "expanded" },
      isLocalized: true,
    },
    cta: {
      type: "content",
      displayName: "CTA",
      group: PropertyTypes.Content,
      allowedTypes: [CtaButtonElementType, CtaLinkElementType],
      isRequired: true,
    },
  },
});
