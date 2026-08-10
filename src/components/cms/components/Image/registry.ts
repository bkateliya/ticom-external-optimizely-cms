import { StandardImageComponentType } from "./StandardImage.model";
import { HeadshotImageComponentType } from "./HeadshotImage.model";
import { HeadshotImageView, StandardImageView } from "./Image";
import { ComponentRegistry } from "@/lib/ts/component-props";

export const imageComponentRegistry: ComponentRegistry = {
  [StandardImageComponentType.key]: StandardImageView,
  [HeadshotImageComponentType.key]: HeadshotImageView,
};
