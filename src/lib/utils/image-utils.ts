import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { BynderImage, getBynderImageFromContext } from "../data/bynder";
import { InferredContentReference } from "../ts/field-props";
import { ContentProps, damAssets } from "@optimizely/cms-sdk";
import { OptimizelyContentProps } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ImageBaseContractContentType } from "@/components/cms/contracts/component-contracts/image.model";

/**
 * Add known image presets here
 * */
export type ImagePreset = "192x192";

export interface StandardizedImage {
  imageType: "bynder" | "optimizely";
  src: string;
  thumbnailSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  bynderImage?: BynderImage;
}

export interface BynderImageOptions {
  preset?: ImagePreset;
}

export function getStandardizedImageFromContract(
  content: ContentProps<ImageBaseContractContentType>,
  options?: BynderImageOptions,
): StandardizedImage {
  const result = getStandardizedImage(content, content.bynderImage, options);

  return {
    ...result,
    alt: content.altText || result.alt,
  };
}

export function getStandardizedImage(
  content: OptimizelyContentProps,
  imageField: InferredContentReference,
  { preset }: BynderImageOptions = {},
): StandardizedImage {
  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  const bynderImage = getBynderImageFromContext(imageField);
  if (bynderImage) {
    // BynderImage's fields are a hand-written cast over the Graph response, so
    // they are not as non-null as they claim: Graph returns null for any the
    // asset doesn't have. Default here so callers get the string they expect.
    return {
      imageType: "bynder",
      src: preset
        ? getBynderTransformUrl(bynderImage, preset)
        : bynderImage.original,
      thumbnailSrc: src(imageField) || "",
      alt: bynderImage.property_alt_text,
      width: bynderImage._imageMetadata.width,
      height: bynderImage._imageMetadata.height,
      bynderImage,
    };
  }
  return {
    imageType: "optimizely",
    src: src(imageField) || "",
    alt: getAlt(imageField),
  };
}

/**
 * Builds a Bynder DAT preset URL from the base transform URL Optimizely Graph
 * returns (".../transform/{id}/{filename}"), inserting the named preset
 * (e.g. "195x195") configured in the Bynder portal right after "/transform/".
 */
function getBynderTransformUrl(img: BynderImage, preset: ImagePreset): string {
  return img.transformBaseUrl.replace("/transform/", `/transform/${preset}/`);
}
