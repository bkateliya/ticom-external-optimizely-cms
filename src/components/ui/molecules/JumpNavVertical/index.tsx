// TODO Fix this instead of disabling
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TiSideNav } from "@/components/ui/ti/TiSideNav/TiSideNav";
import { TiStickyHeader } from "@/components/ui/ti/TiStickyHeader/TiStickyHeader";
import { TiNavbar } from "@/components/ui/ti/TiNavbar/TiNavbar";
import { useTranslations } from "next-intl";

const FOOTER_SELECTOR = "#tiResponsiveFooter";
const STICKY_TOP_OFFSET = 16;
const BOTTOM_GAP = 24;
const UNPINNED_STYLE = { position: "", top: "", left: "", width: "" };

interface JumpNavVerticalProps {
  stickyBehavior: "vertical" | "horizontal";
}
export function JumpNavVertical({ stickyBehavior }: JumpNavVerticalProps) {
  const t = useTranslations();
  // Vertical pins the side nav in place; Horizontal swaps to the sticky bar.
  const isHorizontal = stickyBehavior !== "vertical";
  const [hasTargets, setHasTargets] = useState(false);
  const [stickyHeaderVisible, setStickyHeaderVisible] = useState(false);
  const lastClickedHashRef = useRef<string | null>(null);

  // Using our own scroll tracking + position:fixed here instead of CSS
  // sticky, because an ancestor further up has overflow:hidden and that
  // breaks position:sticky.
  const verticalWrapperRef = useRef<HTMLDivElement>(null);
  const verticalInnerRef = useRef<HTMLDivElement>(null);
  const [verticalWrapperHeight, setVerticalWrapperHeight] = useState<number>();

  // Side nav is hidden below md, so there's nothing to pin on mobile.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // TiSideNav's autoPopulate scans [navbar-id] and builds/highlights the
  // items itself; we only need to know whether there's anything to show.
  useEffect(() => {
    setHasTargets(document.querySelectorAll("[navbar-id]").length > 0);
  }, []);

  const scrollToHash = useCallback((hash: string) => {
    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Checks whether the side nav has scrolled past the top offset, and uses
  // that for both Vertical's pin and Horizontal's swap to the bar. We
  // position the bar ourselves instead of letting it stick itself
  const updatePinPosition = useCallback(() => {
    const inner = verticalInnerRef.current;
    const wrapper = verticalWrapperRef.current;
    if (!inner) return;

    let showStickyBar = isMobile;
    let pinStyle = UNPINNED_STYLE;

    if (!isMobile && wrapper) {
      const rect = wrapper.getBoundingClientRect();

      if (isHorizontal) {
        // Swap to the sticky bar only once the nav has fully scrolled
        // past the offset, not as soon as its top edge reaches it.
        showStickyBar = rect.bottom <= STICKY_TOP_OFFSET;
      } else if (rect.top <= STICKY_TOP_OFFSET) {
        const footer = document.querySelector<HTMLElement>(FOOTER_SELECTOR);
        const navHeight = inner.getBoundingClientRect().height || rect.height;
        const top = footer
          ? Math.min(
              STICKY_TOP_OFFSET,
              footer.getBoundingClientRect().top - navHeight - BOTTOM_GAP,
            )
          : STICKY_TOP_OFFSET;
        pinStyle = {
          position: "fixed",
          top: `${top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
        };
      }
    }

    setStickyHeaderVisible(showStickyBar);
    Object.assign(inner.style, pinStyle);
  }, [isHorizontal, isMobile]);

  useEffect(() => {
    function syncWithHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      lastClickedHashRef.current = hash;
      scrollToHash(hash);
    }

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, [scrollToHash]);

  // Footer loads late and shifts the layout, so re-scroll once it's there.
  useEffect(() => {
    let done = false;

    function checkFooter() {
      if (done) return;
      const footer = document.querySelector<HTMLElement>(FOOTER_SELECTOR);
      if (footer && footer.offsetHeight > 0) {
        done = true;
        const hash =
          lastClickedHashRef.current ?? window.location.hash.replace("#", "");
        if (hash) {
          setTimeout(() => scrollToHash(hash), 100);
        }
        observer.disconnect();
        clearInterval(interval);
      }
    }

    const observer = new MutationObserver(checkFooter);
    observer.observe(document.body, { childList: true, subtree: true });
    const interval = setInterval(checkFooter, 1000);
    checkFooter();

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [scrollToHash]);

  // Reserve space for the pinned nav so the page doesn't jump when it goes
  // fixed. Kept in sync via ResizeObserver instead of a one-time read, since
  // the nav's real height isn't known until its items finish rendering.
  useEffect(() => {
    const inner = verticalInnerRef.current;
    if (!inner) return;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      // Ignore while hidden on mobile, where height collapses to 0.
      if (height > 0) {
        setVerticalWrapperHeight(height);
      }
    });
    observer.observe(inner);
    return () => observer.disconnect();
  }, [hasTargets]);

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      updatePinPosition();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
    // hasTargets has to stay in the deps — the ref isn't attached until
    // hasTargets is true and the component actually renders something.
  }, [updatePinPosition, hasTargets]);

  if (!hasTargets) {
    return null;
  }

  const showStickyBar = stickyHeaderVisible;

  return (
    <>
      <div
        ref={verticalWrapperRef}
        className="hidden md:block"
        style={
          verticalWrapperHeight !== undefined
            ? { height: verticalWrapperHeight }
            : undefined
        }
      >
        <div
          ref={verticalInnerRef}
          style={
            isHorizontal && showStickyBar ? { display: "none" } : undefined
          }
        >
          <TiSideNav
            autoPopulate
            ariaLabel={t("On this page")}
            menuTitle={t("On this page")}
          />
        </div>
      </div>
      {(isHorizontal || isMobile) && (
        <div
          style={
            showStickyBar
              ? { position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }
              : { display: "none" }
          }
        >
          <TiStickyHeader>
            <TiNavbar dataLid="chapternav" />
          </TiStickyHeader>
        </div>
      )}
    </>
  );
}
