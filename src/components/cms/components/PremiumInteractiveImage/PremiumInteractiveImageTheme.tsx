"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useTheme } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { ComponentTheme } from "@/components/ui/ti/enums";


const darkModeVars: React.CSSProperties & Record<`--ti-${string}`, string> = {
  "--ti-pin-background-color": "transparent",
  "--ti-pin-background-color-hover": "var(--pl-button-reversed-color)",
  "--ti-pin-background-color-selected": "var(--pl-button-reversed-color)",
  "--ti-pin-text-color": "var(--pl-button-reversed-text-color)",
  "--ti-pin-text-color-hover": "var(--pl-button-reversed-text-color-hover)",
  "--ti-pin-text-color-selected": "var(--pl-button-reversed-text-color-hover)",
  "--ti-pin-label-color": "var(--pl-button-reversed-color)",
  "--ti-pin-label-color-hover": "var(--pl-button-reversed-color-hover)",
  "--ti-pin-label-color-selected": "var(--pl-button-reversed-color-hover)",
  "--ti-pin-circle-color-selected": "#f45555",
  "--ti-pin-circle-border-color-selected": "var(--pl-element-color-contrast)",
  "--ti-slide-panel-icon-fill-color": "var(--pl-text-color-primary-contrast)",
  "--ti-slide-panel-icon-hover-fill-color": "var(--pl-text-color-secondary-contrast)",
  "--ti-slide-panel-icon-disabled-fill-color": "var(--pl-element-color-contrast-disabled)",
};

/** Cast for the one public method `ti-slide-panel` exposes beyond its props. */
type SlidePanelElement = HTMLElement & { setSlide(index: number): Promise<void> };

 
function usePinToPanelWiring(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    const panel = container?.querySelector("ti-slide-panel") as
      | SlidePanelElement
      | undefined;
    if (!container || !panel) {
      return;
    }

    const pages = Array.from(panel.children) as HTMLElement[];

    const syncFromVisiblePage = () => {
      const visibleIndex = pages.findIndex(
        (page) => getComputedStyle(page).display !== "none",
      );
      if (visibleIndex < 0) {
        return;
      }

      container.querySelectorAll("ti-pin").forEach((pin) => {
        pin.toggleAttribute(
          "selected",
          pin.getAttribute("data-target-panel") === String(visibleIndex),
        );
      });

      // Swapping just the digit (not the whole string) keeps whatever the
      // vendor localizes around it ("of 7", "von 7", "の7", ...).
      const counterSpan = panel.shadowRoot?.querySelector(
        ".ti-slide-panel-rangeCount span",
      );
      if (counterSpan?.textContent) {
        counterSpan.textContent = counterSpan.textContent.replace(
          /\d+/,
          String(visibleIndex + 1),
        );
      }

      const [prevButton, nextButton] =
        panel.shadowRoot?.querySelectorAll(".ti-slide-panel-button") ?? [];
      prevButton?.toggleAttribute("disabled", visibleIndex === 0);
      nextButton?.toggleAttribute("disabled", visibleIndex === pages.length - 1);
    };

    const onPinClick = (event: MouseEvent) => {
      const pin = (event.target as HTMLElement).closest("ti-pin");
      const targetPanel = pin?.getAttribute("data-target-panel");
      if (!pin || !targetPanel) {
        return;
      }
      panel.setSlide(Number(targetPanel));
    };

    container.addEventListener("click", onPinClick);

    // Fires for the pin-driven change above (setSlide sets the same inline
    // style internally) AND the panel's own chevron navigation.
    const observer = new MutationObserver(syncFromVisiblePage);
    pages.forEach((page) =>
      observer.observe(page, { attributes: true, attributeFilter: ["style"] }),
    );

    return () => {
      container.removeEventListener("click", onPinClick);
      observer.disconnect();
    };
  }, [containerRef]);
}

export function PremiumInteractiveImageTheme({
  children,
}: React.PropsWithChildren) {
  const { mode } = useTheme();
  const isDark = mode === ComponentTheme.dark;
  const containerRef = useRef<HTMLDivElement>(null);
  usePinToPanelWiring(containerRef);

  return (
    <div
      ref={containerRef}
      style={isDark ? darkModeVars : undefined}
      className={clsx(
        isDark && [
          "[&_p]:text-pl-text-color-primary-contrast",
          "[&_a]:text-pl-link-color-tertiary",
          "[&_[data-pii-page-lower]]:border-pl-divider-color-secondary-contrast",
        ],
      )}
    >
      {children}
    </div>
  );
}
