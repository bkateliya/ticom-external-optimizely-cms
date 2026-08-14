"use client";

import { useTheme } from "../../context/BrandAndTheme/BrandAndThemeContext";

export type TiProductStatusProps = React.PropsWithChildren & {
  className?: string;
  compact?: boolean;
  status?: number;
  tooltip?: string;
  /** `data-lid` tracking attribute for metrics. */
  dataLid?: string;
};

export function TiProductStatus({
  className,
  compact,
  status,
  tooltip,
  dataLid,
  children,
}: TiProductStatusProps): React.ReactNode {
  const { mode } = useTheme();
  return (
    <ti-product-status
      className={className}
      compact={compact}
      status={status}
      theme={mode}
      tooltip={tooltip}
      data-lid={dataLid}
    >
      {children}
    </ti-product-status>
  );
}
