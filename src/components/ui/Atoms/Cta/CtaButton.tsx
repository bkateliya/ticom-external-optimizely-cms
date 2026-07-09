// Global
import React, { ButtonHTMLAttributes, forwardRef, JSX } from "react";

// Local
import { SvgIcon } from "@/components/ui/Atoms/SvgIcon";
import { TiButton, TiButtonStyle } from "../../ti/TiButton/TiButton";
import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";

// Values
export const CtaVariantValues = ["fill", "outline", "ghost", "link"] as const;
export const CtaIconValues = [
  "arrow-right",
  "arrow-dash-right",
  "download",
] as const;
export const CtaVisibilityValues = ["hidden", "visible"] as const;
export const CtaSizeValues = ["normal", "compact"] as const;

export type CtaVariants = (typeof CtaVariantValues)[number];
export type CtaVariantsWithAuto = CtaVariants | "auto";
export type CtaIcons = (typeof CtaIconValues)[number];
export type CtaVisibility = (typeof CtaVisibilityValues)[number];
export type CtaSizes = (typeof CtaSizeValues)[number];

export type CtaSurface = "onBg" | "onSurface" | "onCard";
export type CtaSurfaceColor = "onBg" | "onSurface" | "onSurfaceAlternate";

type CtaPropsBase = {
  ctaVariant?: CtaVariants | "custom";
  ctaSurface?: CtaSurface;
  ctaIconBefore?: CtaIcons;
  ctaIconAfter?: CtaIcons;
  ctaVisibility?: CtaVisibility;
  ctaSize?: CtaSizes;
};

// ctaComponentClass is optional for custom buttons
type CtaPropsCustom = CtaPropsBase & {
  ctaVariant: "custom";
};

export type CtaPropsNormal = CtaPropsBase & {
  ctaVariant?: CtaVariants;
  ctaSurface: CtaSurface;
};

export type CtaProps = CtaPropsCustom | CtaPropsNormal;

export type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  CtaProps &
  React.PropsWithChildren & {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text?: string;
  };

const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  (
    {
      className,
      ctaVariant = "fill",
      ctaSurface = "onBg",
      ctaIconBefore,
      ctaIconAfter,
      ctaSize = "normal",
      disabled,
      onClick,
      text,
      children,
      ...rest
    }: CtaButtonProps,
    ref,
  ): JSX.Element | null => {
    /*
     * RENDERING
     */


    const { isReversed } = useTheme();
    // If no content is present, don't print
    if (!text && !children) return <></>;

    const style: TiButtonStyle | undefined = isReversed ? 'reversed'
      : ctaVariant === 'fill' ? 'primary'
        : ctaVariant === 'outline' ? "secondary"
          : ctaVariant === 'link' ? "link"
            : ctaVariant === 'ghost' ? "text"
              : undefined;
    return (
      <TiButton style={style} compact={ctaSize === 'compact'}>
        <button
          {...rest}
          // className={ctaClass}
          disabled={disabled}
          onClick={onClick}
          ref={ref}
        >
          {ctaIconBefore && (
            <SvgIcon
              icon={ctaIconBefore}
              size="sm"
              viewBox="0 0 24 24"
              iconPosition="before"
            />
          )}
          {text}
          {children}
          {ctaIconAfter && (
            <SvgIcon
              className="cta-icon-default"
              icon={ctaIconAfter}
              size="sm"
              viewBox="0 0 24 24"
              iconPosition="after"
            />
          )}
        </button>
      </TiButton>
    );
  },
);

CtaButton.displayName = "CtaButton";

export default CtaButton;
