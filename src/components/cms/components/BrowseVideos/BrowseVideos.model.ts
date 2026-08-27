import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const BrowseVideosComponentType = contentType({
  key: AllComponentTypeKeyMap.BrowseVideosComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Browse Videos`,
  baseType: "_component",
  extends: [AllowIn.Prefooter,AllowIn.Section],
  properties: {},
});
