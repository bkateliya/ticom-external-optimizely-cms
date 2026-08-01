import { StandardImageComponentType } from "./StandardImage.model";
import { HeadshotImageComponentType } from "./HeadshotImage.model";
import { ImageItem } from "./Image";
import { ComponentRegistry } from "@/lib/ts/component-props";

export const imageComponentRegistry: ComponentRegistry = {
  [StandardImageComponentType.key]: ImageItem,
  [HeadshotImageComponentType.key]: ImageItem,
};
