import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const ApplicationCategoryListComponentType = contentType({
  key: AllComponentTypeKeyMap.ApplicationCategoryListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Application Category List`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {},
});
