"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TiSideNav } from "@/components/ui/ti/TiSideNav/TiSideNav";
import { TiSideNavItem } from "@/components/ui/ti/TiSideNavItem/TiSideNavItem";
import { TiStickyHeader } from "@/components/ui/ti/TiStickyHeader/TiStickyHeader";
import { TiNavbar } from "@/components/ui/ti/TiNavbar/TiNavbar";
import { useTranslations } from "next-intl";

interface JumpLinkItem {
  hash: string;
  label: string;
  element: HTMLElement;
}

// Matches the reference TI.com verticalChapterNav behaviour: an item is
// "active" once its anchor crosses the top 40% of the viewport.
const ACTIVE_TRIGGER_RATIO = 0.4;
const FOOTER_SELECTOR = "#tiResponsiveFooter";

export function JumpLinkNavigationComponent() {
  const t = useTranslations();
  const [items, setItems] = useState<JumpLinkItem[]>([]);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const [stickyHeaderVisible, setStickyHeaderVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastClickedHashRef = useRef<string | null>(null);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[navbar-id]"),
    ).filter((el) => el.getAttribute("data-chapter-eligible") !== "false");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(
      elements
        .map((el) => ({
          hash: el.getAttribute("navbar-id") ?? "",
          label:
            el.getAttribute("navbar-name") ||
            el.getAttribute("navbar-id") ||
            "",
          element: el,
        }))
        .filter((item) => item.hash),
    );
  }, []);

  const scrollToHash = useCallback((hash: string) => {
    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleItemClick = useCallback((hash: string) => {
    lastClickedHashRef.current = hash;
    setActiveHash(hash);
  }, []);

  // Active item follows scroll position: closest anchor to the top 40% of the viewport.
  useEffect(() => {
    if (!items.length) return;

    function updateActiveOnScroll() {
      const viewportTrigger = window.innerHeight * ACTIVE_TRIGGER_RATIO;
      let closestHash: string | null = null;
      let minDistance = Infinity;

      items.forEach(({ hash, element }) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportTrigger && rect.bottom > 0) {
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            closestHash = hash;
          }
        }
      });

      if (!closestHash && window.scrollY < 10) {
        closestHash = items[0].hash;
      }

      if (!closestHash) {
        let minBottomDistance = Infinity;
        items.forEach(({ hash, element }) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom <= 0) {
            const distance = Math.abs(rect.bottom);
            if (distance < minBottomDistance) {
              minBottomDistance = distance;
              closestHash = hash;
            }
          }
        });
      }

      if (closestHash) {
        setActiveHash(closestHash);
      }
    }

    updateActiveOnScroll();
    window.addEventListener("scroll", updateActiveOnScroll);
    return () => window.removeEventListener("scroll", updateActiveOnScroll);
  }, [items]);

  // URL hash navigation activates the matching item and scrolls to it.
  useEffect(() => {
    function syncWithHash() {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      lastClickedHashRef.current = hash;
      setActiveHash(hash);
      scrollToHash(hash);
    }

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, [scrollToHash]);

  // Once the footer has finished loading, re-adjust scroll so the active
  // anchor still lines up (the footer's late layout shift can throw it off).
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
          setTimeout(() => {
            scrollToHash(hash);
            setActiveHash(hash);
          }, 100);
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

  // Sticky top nav appears once the side nav has scrolled out of view.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStickyHeaderVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <>
      <div ref={sentinelRef} />
      <TiSideNav ariaLabel={t("On this page")} menuTitle={t("On this page")}>
        {items.map(({ hash, label }) => (
          <TiSideNavItem
            key={hash}
            href={`#${hash}`}
            navTitle={hash}
            active={hash === activeHash}
            onClick={() => handleItemClick(hash)}
          >
            {label}
          </TiSideNavItem>
        ))}
      </TiSideNav>
      <div style={{ display: stickyHeaderVisible ? undefined : "none" }}>
        <TiStickyHeader>
          <TiNavbar dataLid="chapternav" />
        </TiStickyHeader>
      </div>
    </>
  );
}
