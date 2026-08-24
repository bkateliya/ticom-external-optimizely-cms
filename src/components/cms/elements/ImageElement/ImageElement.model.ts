import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { ImageBaseContract } from "../../contracts/component-contracts/image.model";

export const ImageElementType = contentType({
  key: `${KEY_PREFIX}Image_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}Image`,
  baseType: "_component",
  extends: [ImageBaseContract],
  compositionBehaviors: ["elementEnabled"],
  properties: {},
});
