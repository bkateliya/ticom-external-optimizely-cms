import { ContentTypes, damAssets } from "@optimizely/cms-sdk";

import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { CmsFieldProps } from "@/lib/ts/field-props";
import { InferredContentReference } from "@/lib/ts/field-props";
import EnhancedNextImage from "../Atoms/EnhancedNextImage/EnhancedNextImage";
import { ImageProps } from "next/image";

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

  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);
  const logoUrl = value ? src(value) : null;
  if (!logoUrl) {
    return null;
  }

  return (
    <EnhancedNextImage
      src={logoUrl}
      alt={getAlt(value) ?? ""}
      {...props}
      {...pa([parentField, field].filter(Boolean).join("."))}
    />
  );
}
