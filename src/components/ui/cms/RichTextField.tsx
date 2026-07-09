import { CmsFieldProps } from "@/lib/ts/field-props";
import { ContentTypes } from "@optimizely/cms-sdk";
import { RichText, RichTextProps } from "@optimizely/cms-sdk/react/richText";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";

type RichTextFieldContent = { json: RichTextProps["content"] } | null;

export type RichTextFieldProps<
  TContentType extends ContentTypes.AnyContentType,
> = CmsFieldProps<TContentType, RichTextFieldContent> &
  Omit<RichTextProps, "content">;

export function RichTextField<
  TContentType extends ContentTypes.AnyContentType,
>({
  cmsContent: content,
  field,
  parentField,
  ...props
}: RichTextFieldProps<TContentType>) {
  const { pa } = getPreviewUtils(content);
  const value = content[field] as RichTextFieldContent;
  if (!value?.json) {
    return null;
  }
  return (
    <RichText
      content={value?.json}
      {...pa([parentField, field].filter(Boolean).join("."))}
      {...props}
    />
  );
}
