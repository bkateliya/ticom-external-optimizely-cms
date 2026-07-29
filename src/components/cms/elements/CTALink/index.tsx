import { CTA_LINK_ICONS, CTALinkElementType } from "./CTALink.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { getUrlFileName, normalizeUrl } from "@/lib/utils/link-utils";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import type { UiIcon } from "@/components/ui/ti/TiSvgIcon/SvgIconMapping";

type Props = OptiComponentProps<typeof CTALinkElementType>;

/**
 * Inline-link CTA. Renders a plain anchor with a leading `ti-svg-icon`, matching
 * TI.com's `ctaWithIcon` and the video Resources list:
 *
 *   <a class="ti_p-iconText">  →  inline-flex, link-color-primary, no underline,
 *                                 no padding/border/background, 18px icon
 *                                 (mod-size-s) with a 4px gap
 *
 * Live measures 14px/20px, which is `text-body-md` here (body-sm is 12px).
 *
 * Deliberately not a TifButton: that component is for CTAs the author can style
 * as a button, which this one never is. `sectionCtaLink` on live uses a trailing
 * chevron and a bold label instead — pending a UX call on standardising it.
 */
export function CTALinkElement({ content, parentField }: Props) {
  if (!content) {
    return null;
  }

  /* `url.default` is the relative path, locale included — verified against a real
     internally-picked page, which returns `/en-us/about-ti/` with `url.base` set to
     the environment origin. Don't prepend `base` (as LinkField does): that bakes the
     current host into the href. normalizeUrl handles the locale segment. */
  const href = content.link?.url?.default ?? "";

  if (!href) {
    return null;
  }

  const url = normalizeUrl(href);

  if (!url) {
    return null;
  }

  // The CMS has no default value for properties, so the standard icon is applied here.
  const icon = (content.Icon ?? CTA_LINK_ICONS.standard) as UiIcon;
  const isDownload = icon === CTA_LINK_ICONS.download;

  const { pa } = getPreviewUtils(content);

  return (
    <a
      {...pa([parentField, "link"].filter(Boolean).join("."))}
      // The download api route gets around the download attribute only working same-domain
      href={isDownload ? `/api/download?url=${encodeURI(url)}` : url}
      download={isDownload ? getUrlFileName(url) : undefined}
      className="inline-flex items-center gap-1 text-body-md text-pl-link-color-primary no-underline"
      data-cta-link
    >
      <TiSvgIcon icon={icon} size="s" />
      {content.link?.text}
    </a>
  );
}
