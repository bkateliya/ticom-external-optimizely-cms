// Global
import clsx from 'clsx';
import React, { JSX } from 'react';

import styles from './SvgIcons.module.scss';
import { IconMapping } from './SvgIconMapping';

/**
 * Standardize SVG icons on a 48x48 grid to allow
 * for consistent use across the project
 *
 * Icon contents should be stored in the icons subdirectory
 * using the naming scheme 'icon--[name].tsx'
 */

export type SvgIconSize = 'xxs' | 'xs' | 's' | 'sm' | 'sm-plus-12' | 'md' | 'em' | 'lg' | 'xl';

export type SVGFill = 'currentColor' | 'none';

export type IconPosition = 'none' | 'before' | 'after';

export interface SvgIconProps {
  className?: string;
  fill?: SVGFill; // The "fill" attribute must be applied to individual <path /> tags in order to be effective. Applying it to <svg /> does nothing.
  icon: IconTypes;
  size?: SvgIconSize;
  viewBox?: string; // This could pretty easily be hard coded as the "size" attribute is doing the hard work here.
  title?: string;
  'aria-hidden'?: 'true' | 'false' | boolean;
  /** The position of the icon relative to the text.
   * This is used to prevent the icon from moving to a separate line when the text wraps.
   */
  iconPosition?: IconPosition;
}

export type IconTypes = keyof typeof IconMapping;

const SvgIcon = ({
  className,
  fill = 'currentColor',
  icon,
  size = 'sm',
  viewBox = '0 0 24 24',
  title,
  'aria-hidden': ariaHidden,
  iconPosition = 'none',
}: SvgIconProps): JSX.Element => {
  const IconContent = IconMapping[icon];

  if (!icon) return <></>;

  // Spacer elements are used to offset the negative margin we're using when icon is placed
  // before or after text to prevent the icon from moving to a separate line when the text wraps.
  return (
    <>
      {iconPosition === 'before' && <span className={styles.spacer}></span>}
      <svg
        className={clsx(
          className,
          styles.svgIcon,
          styles[size],
          iconPosition !== 'none' && styles[iconPosition]
        )}
        fill={fill}
        viewBox={viewBox}
        data-icon={icon}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={ariaHidden}
      >
        {title && <title>{title}</title>}
        <IconContent />
      </svg>
      {iconPosition === 'after' && <span className={styles.spacer}></span>}
    </>
  );
};

export default React.memo(SvgIcon);
