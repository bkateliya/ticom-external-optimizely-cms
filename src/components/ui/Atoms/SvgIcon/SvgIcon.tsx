// Global
import { JSX } from 'react';

import { UiIcon } from './SvgIconMapping';

export type SvgIconSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

export interface SvgIconProps {
  className?: string;
  icon: UiIcon;
  size?: SvgIconSize;
  circle?: boolean;
  disabled?: boolean;
}

const SvgIcon = ({
  className,
  icon,
  size,
  circle,
  disabled

}: SvgIconProps): JSX.Element => {

  if (!icon) return <></>;

  return <ti-svg-icon icon-name={icon} {...{ className, size, circle, disabled }}></ti-svg-icon>
};

export default SvgIcon;
