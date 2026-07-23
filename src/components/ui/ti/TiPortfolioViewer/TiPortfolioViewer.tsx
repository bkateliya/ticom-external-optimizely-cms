"use client";

import { HtmlElementProps } from "@/lib/ts/react";
import { TiComponentPropsBase } from "../Common/base";
import { useEventListenerRef } from "../Common/events";
import { useContextLocale } from "../../context/OptiContext";

export interface TiStickyHeaderProps
  extends HtmlElementProps, TiComponentPropsBase {
  svgUrl: string;
}
export function TiPortfolioViewer({
  svgUrl,
  tiMetricsAction,
  ...props
}: TiStickyHeaderProps) {
  const locale = useContextLocale();

  const ref = useEventListenerRef({
    tiMetricsAction: tiMetricsAction,
  });

  return (
    <ti-portfolio-viewer
      ref={ref}
      svg-url={svgUrl}
      locale={locale}
      {...props}
    ></ti-portfolio-viewer>
  );
}
