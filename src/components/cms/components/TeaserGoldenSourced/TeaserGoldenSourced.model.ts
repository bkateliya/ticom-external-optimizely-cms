import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";

export const ApplicationSelectionToolComponentType = contentType({
  key: AllComponentTypeKeyMap.ApplicationSelectionToolComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Teaser Golden Sourced - Application Selection Tool`,
  baseType: "_component",
  extends: [...AllowIn.Groupings.Common],
  properties: {},
});

export const ReferenceDesignSearchComponentType = contentType({
  key: AllComponentTypeKeyMap.ReferenceDesignSearchComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Teaser Golden Sourced - Reference Design Search`,
  baseType: "_component",
  extends: [...AllowIn.Groupings.Common],
  properties: {},
});
