import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const ApplicationSearchBoxComponentType = contentType({
  key: AllComponentTypeKeyMap.ApplicationSearchBoxComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Application Search Box`,
  baseType: "_component",
  extends: [AllowIn.Prefooter],
  properties: {},
});
