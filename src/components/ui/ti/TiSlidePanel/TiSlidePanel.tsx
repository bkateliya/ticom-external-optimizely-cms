"use client";

import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { HtmlElementProps } from "@/lib/ts/react";
import { nanoid } from "nanoid";
import React from "react";
import { TiComponentPropsBase } from "../Common/base";
import { CustomEventHandler, useEventListenerRef } from "../Common/events";

export type SlidePanelChangeEventDetail = {
  slideIndex: number;
};

export interface TiSlidePanelProps
  extends HtmlElementProps, TiComponentPropsBase {
  allowWrap?: boolean;
  mobileAllowSwipe?: boolean;
  showMeter?: boolean;
  children: React.ReactNode;
  tiSlidePanelChange?: CustomEventHandler<SlidePanelChangeEventDetail>;
}
export function TiSlidePanel({
  allowWrap,
  mobileAllowSwipe,
  showMeter,
  children,
  tiSlidePanelChange,
  tiMetricsAction,
  ...props
}: TiSlidePanelProps) {
  const ref = useEventListenerRef({
    tiMetricsAction: tiMetricsAction,
    tiSlidePanelChange: tiSlidePanelChange,
  });

  return (
    <ti-slide-panel
      ref={ref}
      allow-wrap={allowWrap}
      mobile-allow-swipe={mobileAllowSwipe}
      show-meter={showMeter}
      {...props}
    >
      {children}
    </ti-slide-panel>
  );
}

export interface SlidePanelPageProps extends HtmlElementProps {
  headingText?: React.ReactNode;
}

function SlidePanelPage({ headingText, children }: SlidePanelPageProps) {
  const id = nanoid();
  return (
    <div
      className="ti-slide-panel-page"
      role="group"
      aria-roledescription="slide"
      aria-labelledby={id}
    >
      <DynamicHeading>{headingText}</DynamicHeading>
      {children}
    </div>
  );
}
TiSlidePanel.Page = SlidePanelPage;
