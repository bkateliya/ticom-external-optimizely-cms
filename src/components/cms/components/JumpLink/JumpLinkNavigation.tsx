"use client";

import { OptiComponentProps } from "@/lib/ts/component-props";
import {
  JumpLinkNavigationComponentType,
  JumpLinkNavigationHorizontalComponentType,
} from "./JumpLinkNavigation.model";
import { JumpNavVertical } from "@/components/ui/molecules/JumpNavVertical";
import { TiStickyHeader } from "@/components/ui/ti/TiStickyHeader/TiStickyHeader";
import { TiNavbar } from "@/components/ui/ti/TiNavbar/TiNavbar";
import { useJumpLinkStickyBehavior } from "./JumpLinkStickyBehaviorContext";

export function JumpLinkNavigationComponent({}: OptiComponentProps<
  typeof JumpLinkNavigationComponentType
>) {
  const stickyBehavior = useJumpLinkStickyBehavior();
  return <JumpNavVertical stickyBehavior={stickyBehavior} />;
}

// ti-navbar auto-populates its items from every [navbar-id] target on the page
// and ti-sticky-header handles the in-flow-then-sticky behaviour itself, so this
// mirrors the live drChapterNavigation markup with no scroll/active-state JS.
export function JumpLinkNavigationHorizontalComponent({}: OptiComponentProps<
  typeof JumpLinkNavigationHorizontalComponentType
>) {
  return (
    <TiStickyHeader>
      <TiNavbar dataLid="chapternav" />
    </TiStickyHeader>
  );
}
