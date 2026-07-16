import { ContentProps, ContentTypes } from "@optimizely/cms-sdk";

import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { CmsFieldProps } from "@/lib/ts/field-props";
import { CTAElementType } from "@/components/cms/elements/CTA/CTA.model";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { TifButtonProps } from "../ti/TiButton/TiButton";
import { TifButton } from "@ticom/form-components/react";
import { ButtonAppearance } from "@/components/ui/ti/enums";

type LinkFieldContent = ContentProps<typeof CTAElementType>["link"];

export type LinkFieldProps<TContentType extends ContentTypes.AnyContentType> =
  CmsFieldProps<TContentType, LinkFieldContent> &
  TifButtonProps & {
    renderChildrenIfNoLink?: boolean;
  };

export function LinkField<TContentType extends ContentTypes.AnyContentType>({
  cmsContent: content,
  field,
  parentField,
  renderChildrenIfNoLink,
  ...props
}: LinkFieldProps<TContentType>) {
  if (!content) {
    return renderChildrenIfNoLink ? props.children : null;
  }
  const value = content[field] as LinkFieldContent;

  const { pa } = getPreviewUtils(content);

  return (
    <div {...pa([parentField, "Url"].filter(Boolean).join("."))}>
      <LinkFieldDirect {...props} link={value} appearance={ButtonAppearance.link} />
    </div>
  );
}

export type LinkFieldDirectProps = TifButtonProps & {
  link: LinkFieldContent;
  renderChildrenIfNoLink?: boolean;
};

export function LinkFieldDirect({
  link,
  renderChildrenIfNoLink = false,
  ...props
}: LinkFieldDirectProps) {
  if (!link) {
    return renderChildrenIfNoLink ? props.children : null;
  }

  const href = (link?.url.base ?? "") + (link?.url?.default ?? "");

  if (!href) {
    return renderChildrenIfNoLink ? props.children : null;
  }

  const url = normalizeUrl(href);
  if (!url) {
    return null;
  }
  return (
    <TifButton {...props} />
  );
}
