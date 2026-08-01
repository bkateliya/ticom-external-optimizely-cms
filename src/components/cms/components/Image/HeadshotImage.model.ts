import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { ImageBaseContract } from "../../contracts/component-contracts/image.model";
import { AllComponentTypeKeyMap } from "../keys";

export const HeadshotImageComponentType = contentType({
  key: AllComponentTypeKeyMap.HeadshotImageComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Headshot Image`,
  baseType: "_component",
  extends: [ImageBaseContract],
});
