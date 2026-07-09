"use client";
// Global
import NextLink, { LinkProps } from "next/link";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
  JSX,
  AnchorHTMLAttributes,
} from "react";

// Local
import { CtaProps } from "./CtaButton";
import { IconTypes, SvgIcon, SvgIconSize } from "../SvgIcon";
import { ReplacementToken } from "@/lib/utils/string-utils";
import { usePathname } from "next/navigation";
import { isExternalUrl, parseUrlObject } from "@/lib/utils/link-utils";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";
import clsx from "clsx";
import { TiButton, TiButtonStyle } from "../../ti/TiButton/TiButton";

export type CtaLinkProps = React.PropsWithChildren &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  LinkProps &
  CtaProps & {
    text?: string;
    target?: string;
    title?: string;
    anchor?: string;
    querystring?: string;
    srOnlyText?: string;
    suppressNewTabIcon?: boolean;
    showLinkTextWithChildrenPresent?: boolean;
  };

const CtaLink = forwardRef<HTMLAnchorElement, CtaLinkProps>(
  (originalProps: CtaLinkProps, ref): JSX.Element | null => {
    const {
      onClick,
      children,
      className: extraClassName,
      ctaIconBefore,
      ctaIconAfter,
      ctaVariant = "fill",
      ctaSurface = "onBg",
      ctaSize = "normal",
      href,
      text,
      target,
      title,
      anchor,
      querystring,
      showLinkTextWithChildrenPresent = false,
      srOnlyText,
      suppressNewTabIcon,
      ...props
    } = originalProps;

    const { isReversed } = useTheme();
    const pathname = usePathname();
    const parsedUrl = parseUrlObject(href);
    const urlPathname = parsedUrl?.pathname ?? "";
    const isCurrentPage = urlPathname === pathname;
    const anchorRef = useRef<HTMLAnchorElement | null>(null);
    const [hasImageInDom, setHasImageInDom] = useState<boolean>(false);
    const setAnchorRef = useCallback(
      (node: HTMLAnchorElement | null) => {
        anchorRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<HTMLAnchorElement | null>).current = node;
        }
      },
      [ref],
    );
    useEffect(() => {
      const el = anchorRef.current;
      if (!el) return;
      setHasImageInDom(!!el.querySelector("img"));
    }, [children]);

    const hrefString = parsedUrl?.href ?? "";
    const isExternalDomain = isExternalUrl(hrefString);
    const isMailtoLink = hrefString.trim().toLowerCase().startsWith("mailto:");
    if (!parsedUrl) {
      return <></>;
    }

    const effectiveSuppressNewTabIcon =
      suppressNewTabIcon || hasImageInDom || isMailtoLink;

    const effectiveCtaIconAfter: IconTypes | undefined =
      hasImageInDom || isMailtoLink ? undefined : (ctaIconAfter ?? undefined);

    const className = clsx(extraClassName, 'ti-button-content');

    const style: TiButtonStyle | undefined = isReversed ? 'reversed'
      : ctaVariant === 'fill' ? 'primary'
        : ctaVariant === 'outline' ? "secondary"
          : ctaVariant === 'link' ? "link"
            : ctaVariant === 'ghost' ? "text"
              : undefined;
    // NextLink plays weird with download attribute, so we use a normal <a> tag instead
    if (isCurrentPage) {
      return (
        <TiButton style={style} compact={ctaSize === 'compact'}>
          <a
            {...props}
            className={className}
            data-component="helpers/sitecorewrappers/linkwrapper"
            href={parsedUrl.href}
            onClick={onClick}
            ref={setAnchorRef}
            title={title}
            target={target}
          >
            {ctaIconBefore && (
              <SvgIcon
                className="cta-icon-default"
                icon={ctaIconBefore}
                size="sm"
                aria-hidden="true"
                iconPosition="before"
              />
            )}

            {children}
            <ScreenReaderOnlyTextAndNewTabIcon
              target={target}
              srOnlyText={srOnlyText}
              suppressNewTabIcon={effectiveSuppressNewTabIcon}
              ctaIconSize="sm"
              ctaIcon={effectiveCtaIconAfter}
              isExternalDomain={isExternalDomain}
            />
          </a>
        </TiButton>
      );
    }
    return (
      <TiButton style={style} compact={ctaSize === 'compact'}>
        <NextLink
          {...props}
          className={className}
          data-component="helpers/sitecorewrappers/linkwrapper"
          href={parsedUrl}
          onClick={onClick}
          ref={setAnchorRef}
          target={target}
          title={title}
        >
          {ctaIconBefore && (
            <SvgIcon
              className="cta-icon-default"
              icon={ctaIconBefore}
              size="sm"
              aria-hidden="true"
              iconPosition="before"
            />
          )}
          {text ? <span>{text}</span> : null}
          {children}
          <ScreenReaderOnlyTextAndNewTabIcon
            target={target}
            srOnlyText={srOnlyText}
            suppressNewTabIcon={effectiveSuppressNewTabIcon}
            ctaIconSize="sm"
            ctaIcon={effectiveCtaIconAfter}
            isExternalDomain={isExternalDomain}
          />
        </NextLink>
      </TiButton>
    );
  },
);

CtaLink.displayName = "CtaLink";
export default CtaLink;
function ScreenReaderOnlyTextAndNewTabIcon({
  ctaIconSize = "sm",
  srOnlyText,
  suppressNewTabIcon,
  target,
  ctaIcon,
  isExternalDomain,
}: {
  ctaIconSize?: SvgIconSize;
  srOnlyText?: string;
  suppressNewTabIcon?: boolean;
  target?: string;
  ctaIcon?: IconTypes;
  getDictionaryValue?: (
    key: string,
    fallback?: string,
    tokens?: ReplacementToken[],
  ) => string;
  isExternalDomain?: boolean;
}) {
  const isExternal = !!isExternalDomain;
  const opensInNewTab = target === "_blank";

  // Only show external icon when both conditions are true
  const Icon = ctaIcon ? (
    <SvgIcon icon={ctaIcon} size={ctaIconSize} iconPosition="after" />
  ) : !suppressNewTabIcon && isExternal && opensInNewTab ? (
    <SvgIcon
      viewBox="0 0 24 24"
      icon="new-tab"
      size={ctaIconSize}
      iconPosition="after"
    />
  ) : null;
  const newTabText = "(Opens in a new tab)";
  const srAnnouncement = `${srOnlyText ? srOnlyText : ""}${opensInNewTab ? ` ${newTabText}` : ""
    }`.trim();
  if (!Icon && !srAnnouncement) {
    return <></>;
  }
  return (
    <>
      {Icon}
      {srAnnouncement && (
        <span className="screenReaderText">{srAnnouncement}</span>
      )}
    </>
  );
}
