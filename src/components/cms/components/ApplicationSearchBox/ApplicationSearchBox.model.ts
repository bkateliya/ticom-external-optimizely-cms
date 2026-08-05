import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";

export const ApplicationSearchBoxComponentType = contentType({
  key: AllComponentTypeKeyMap.ApplicationSearchBoxComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Application Search Box`,
  baseType: "_component",
  properties: {},
});
