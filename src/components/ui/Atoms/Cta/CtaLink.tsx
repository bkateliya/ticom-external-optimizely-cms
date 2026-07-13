"use client";
// Global
import NextLink, { LinkProps } from "next/link";
import React, {
  forwardRef,
  JSX,
  AnchorHTMLAttributes,
} from "react";

// Local
import { CtaProps } from "./CtaButton";
import { IconTypes, SvgIcon, SvgIconSize } from "../SvgIcon";
import { ReplacementToken } from "@/lib/utils/string-utils";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";
import clsx from "clsx";
import { TiButton, TiButtonStyle } from "../../ti/TiButton/TiButton";
import { normalizeUrl } from "@/lib/utils/link-utils";

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


    const className = clsx(extraClassName, 'ti-button-content');

    const style: TiButtonStyle | undefined = isReversed ? 'reversed'
      : ctaVariant === 'fill' ? 'primary'
        : ctaVariant === 'outline' ? "secondary"
          : ctaVariant === 'link' ? "link"
            : ctaVariant === 'ghost' ? "text"
              : undefined;

    return (
      <TiButton style={style} compact={ctaSize === 'compact'}>
        <NextLink
          {...props}
          className={className}
          data-component="helpers/sitecorewrappers/linkwrapper"
          href={href}
          onClick={onClick}
          target={target}
          title={title}
          ref={ref}
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
            suppressNewTabIcon={suppressNewTabIcon}
            ctaIconSize="sm"
            ctaIcon={ctaIconAfter}
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
}) {
  const opensInNewTab = target === "_blank";

  // Only show external icon when both conditions are true
  const Icon = ctaIcon ? (
    <SvgIcon icon={ctaIcon} size={ctaIconSize} iconPosition="after" />
  ) : !suppressNewTabIcon && opensInNewTab ? (
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
