import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";

export const FAQSearchBoxComponentType = contentType({
  key: AllComponentTypeKeyMap.FAQSearchBoxComponent,
  displayName: `${DISPLAY_NAME_PREFIX}FAQ Search Box`,
  baseType: "_component",
  properties: {},
});
