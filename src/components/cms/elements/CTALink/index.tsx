import { CTA_LINK_ICONS, CtaLinkElementType } from "./CTALink.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getUrlFileName, normalizeUrl } from "@/lib/utils/link-utils";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import type { UiIcon } from "@/components/ui/ti/TiSvgIcon/SvgIconMapping";

type Props = OptiComponentProps<typeof CtaLinkElementType>;

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
export function CTALinkElement({ content }: Props) {
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
  const icon = (content.Icon ?? CTA_LINK_ICONS.standard) as UiIcon | "none";

  // The CMS "Open in" dropdown maps to `link.target` (`_blank`, `_self`, …).
  const target = content.link?.target || undefined;

  return (
    <a
      // The download api route gets around the download attribute only working same-domain
      href={content.IsDownload ? `/api/download?url=${encodeURI(url)}` : url}
      target={target}
      download={content.IsDownload ? getUrlFileName(url) : undefined}
      className="inline-flex items-center gap-1 text-body-md text-pl-link-color-primary no-underline hover:underline"
      data-cta-link
    >
      {icon === "none" ? null : (
        <TiSvgIcon
          icon={icon}
          size="s"
          className="fill-current [--ti-svg-icon-fill-color:currentColor]"
        />
      )}
      {content.link?.text}
    </a>
  );
}
