"use client";
import { createContext, useContext } from "react";

export type JumpLinkStickyBehavior = "vertical" | "horizontal";

// Vertical pinning only makes sense within layouts that opt into it (e.g. the
// article page's column layout); everywhere else defaults to the horizontal
// swap-to-bar behaviour.
const JumpLinkStickyBehaviorContext =
  createContext<JumpLinkStickyBehavior>("horizontal");

export const JumpLinkStickyBehaviorProvider =
  JumpLinkStickyBehaviorContext.Provider;

export function useJumpLinkStickyBehavior() {
  return useContext(JumpLinkStickyBehaviorContext);
}
