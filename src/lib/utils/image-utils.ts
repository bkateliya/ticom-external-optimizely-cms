import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { getBynderImageFromContext } from "../data/bynder";
import { InferredContentReference } from "../ts/field-props";
import { damAssets } from "@optimizely/cms-sdk";
import { OptimizelyContentProps } from "@/components/ui/cms/ExtendedOptimizelyComponent";

export interface StandardizedImage {
  imageType: "bynder" | "optimizely";
  src: string;
  thumbnailSrc?: string;
  alt: string;
  width?: number;
  height?: number;
}

export function getStandardizedImage(
  content: OptimizelyContentProps,
  imageField: InferredContentReference,
): StandardizedImage {
  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  const bynderImage = getBynderImageFromContext(imageField);
  if (bynderImage) {
    return {
      imageType: "bynder",
      src: bynderImage.original,
      thumbnailSrc: src(imageField) || "",
      alt: bynderImage.property_alt_text,
      width: bynderImage._imageMetadata.width,
      height: bynderImage._imageMetadata.height,
    };
  }
  return {
    imageType: "optimizely",
    src: src(imageField) || "",
    alt: getAlt(imageField),
  };
}
