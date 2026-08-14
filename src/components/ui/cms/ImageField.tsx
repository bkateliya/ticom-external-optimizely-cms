import { ContentTypes } from "@optimizely/cms-sdk";

import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { CmsFieldProps } from "@/lib/ts/field-props";
import { InferredContentReference } from "@/lib/ts/field-props";
import EnhancedNextImage from "../Atoms/EnhancedNextImage/EnhancedNextImage";
import { ImageProps } from "next/image";
import { getStandardizedImage } from "@/lib/utils/image-utils";

export type ImageFieldProps<TContentType extends ContentTypes.AnyContentType> =
  CmsFieldProps<TContentType, InferredContentReference> &
    Omit<ImageProps, "src" | "alt">;

export function ImageField<TContentType extends ContentTypes.AnyContentType>({
  cmsContent: content,
  field,
  parentField,
  ...props
}: ImageFieldProps<TContentType>) {
  if (!content) {
    return null;
  }
  const { pa } = getPreviewUtils(content);
  const value = content[field] as InferredContentReference;

  const { src, alt } = getStandardizedImage(content, value);

  if (!src) {
    return null;
  }

  return (
    <EnhancedNextImage
      src={src}
      alt={alt ?? ""}
      {...props}
      {...pa([parentField, field].filter(Boolean).join("."))}
    />
  );
}
