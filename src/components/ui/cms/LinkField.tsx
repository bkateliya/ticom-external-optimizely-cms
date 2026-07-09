import { ContentProps, ContentTypes } from "@optimizely/cms-sdk";

import CtaLink, { CtaLinkProps } from "@/components/ui/Atoms/Cta/CtaLink";
import { CtaIcons, CtaSurface } from "@/components/ui/Atoms/Cta/CtaButton";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { CmsFieldProps } from "@/lib/ts/field-props";
import { CTAElementType } from "@/components/cms/elements/CTA/CTA.model";

type LinkFieldContent = ContentProps<typeof CTAElementType>["link"];

export type LinkFieldProps<TContentType extends ContentTypes.AnyContentType> =
  CmsFieldProps<TContentType, LinkFieldContent> &
    Omit<CtaLinkProps, "content" | "text" | "href"> & {
      ctaSurface?: CtaSurface;
      iconAlignment?: "Left" | "Right";
      icon?: CtaIcons;
      hideLinkText?: boolean;
      renderChildrenIfNoLink?: boolean;
    };

export function LinkField<TContentType extends ContentTypes.AnyContentType>({
  cmsContent: content,
  field,
  parentField,
  ctaSurface = "onBg",
  ctaVariant = "fill",
  iconAlignment = "Left",
  icon = undefined,
  hideLinkText = false,
  renderChildrenIfNoLink = false,
  ...props
}: LinkFieldProps<TContentType>) {
  if (!content) {
    return renderChildrenIfNoLink ? props.children : null;
  }
  const value = content[field] as LinkFieldContent;

  const { pa } = getPreviewUtils(content);

  return (
    <div {...pa([parentField, "Url"].filter(Boolean).join("."))}>
      <LinkFieldDirect
        link={value}
        ctaSurface={ctaSurface}
        ctaVariant={ctaVariant}
        iconAlignment={iconAlignment}
        icon={icon}
        hideLinkText={hideLinkText}
        renderChildrenIfNoLink={renderChildrenIfNoLink}
        {...props}
      />
    </div>
  );
}

export type LinkFieldDirectProps = Omit<
  CtaLinkProps,
  "content" | "text" | "href"
> & {
  link: LinkFieldContent;
  ctaSurface?: CtaSurface;
  iconAlignment?: "Left" | "Right";
  icon?: CtaIcons;
  hideLinkText?: boolean;
  renderChildrenIfNoLink?: boolean;
};

export function LinkFieldDirect({
  link,
  ctaSurface = "onBg",
  ctaVariant = "fill",
  iconAlignment = "Left",
  icon = undefined,
  hideLinkText = false,
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
  return (
    <CtaLink
      href={href}
      text={hideLinkText ? "" : (link?.text ?? "")}
      ctaSurface={ctaSurface}
      ctaVariant={ctaVariant}
      ctaIconBefore={iconAlignment === "Left" ? (icon as CtaIcons) : undefined}
      ctaIconAfter={iconAlignment === "Right" ? (icon as CtaIcons) : undefined}
      {...props}
    />
  );
}
