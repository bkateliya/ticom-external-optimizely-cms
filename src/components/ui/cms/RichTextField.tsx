import { CmsFieldProps } from "@/lib/ts/field-props";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { ContentTypes } from "@optimizely/cms-sdk";
import { ElementRendererProps, LinkElement, RichText, RichTextProps } from "@optimizely/cms-sdk/react/richText";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import NextLink from 'next/link';

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
      elements={{
        link: LinkRenderer
      }}
    />
  );
}

  const LinkRenderer = ({ children, attributes, element }: ElementRendererProps) => {

    const linkElement = element as LinkElement;
    const href = normalizeUrl(linkElement.url);
    if (!href) {
      return null;
    }
    const linkProps = {
      href: href,
      target: linkElement.target,
      rel: linkElement.rel,
      title: linkElement.title,
    };

    const mergedProps = {
      ...attributes,
      ...linkProps,
    };
    return <NextLink {...mergedProps}>{children}</NextLink>;
  };