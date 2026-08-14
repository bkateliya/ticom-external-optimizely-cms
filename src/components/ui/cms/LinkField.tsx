import { ContentProps, ContentTypes } from "@optimizely/cms-sdk";

import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { CmsFieldProps } from "@/lib/ts/field-props";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { TifButtonProps } from "../ti/TiButton/TiButton";
import { TifButton } from "@ticom/form-components/react";
import { TiSvgIcon } from "../ti/TiSvgIcon";
import { UiIcon } from "../ti/TiSvgIcon/SvgIconMapping";

type LinkFieldContent = ContentProps<typeof CtaButtonElementType>["link"];

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
      <LinkFieldDirect {...props} link={value} />
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
  if (props.appearance) {
    return <TifButton {...props} />;
  }

  return (
    <a
      href={url}
      className="inline-flex items-center gap-1 text-body-md text-pl-link-color-primary no-underline"
      data-cta-link
    >
      {props.iconName ? (
        <TiSvgIcon icon={props.iconName as UiIcon} size="s" />
      ) : null}
      {link?.text}
    </a>
  );
}
