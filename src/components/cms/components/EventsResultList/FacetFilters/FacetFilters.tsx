"use client";

import { useId, useRef } from "react";
import { TifCheckbox, TifCheckboxGroup } from "@ticom/form-components/react";
import { tv } from "tailwind-variants";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import type {
  FacetChangeHandler,
  FacetGroup,
  FacetLayout,
  SelectedFacets,
} from "./facet-filters.types";

export interface FacetFiltersProps {
  facets: FacetGroup[];
  selectedFacets: SelectedFacets;
  onFacetChange: FacetChangeHandler;
  /** Heading above the panels, in the rail and as the dialog title. */
  refineByLabel: string;
  /** Phone-only button that opens the dialog. */
  filterActionLabel: string;
}

/**
 * Desktop left rail plus the phone-only dialog. Both views read the same
 * `selectedFacets`, so the two checkbox sets stay in sync for free — AEM had to
 * do that by hand.
 */
export function FacetFilters(props: FacetFiltersProps) {
  return (
    <>
      <FacetSidebar {...props} />
      <FacetDialog {...props} />
    </>
  );
}

/** Desktop left rail. Hidden on phones, where the dialog below takes over. */
export function FacetSidebar({
  facets,
  selectedFacets,
  onFacetChange,
  refineByLabel,
}: FacetFiltersProps) {
  return (
    <aside className={sidebar()}>
      <DynamicHeading className={sidebarHeading()}>
        {refineByLabel}
      </DynamicHeading>
      <HeadingLevelContext headingLevel="increment">
        <FacetPanels
          facets={facets}
          selectedFacets={selectedFacets}
          onFacetChange={onFacetChange}
        />
      </HeadingLevelContext>
    </aside>
  );
}

/**
 * Phone-only trigger and its fullscreen dialog, mirroring AEM's
 * `u-show-only-on-phone` block.
 */
export function FacetDialog({
  facets,
  selectedFacets,
  onFacetChange,
  refineByLabel,
  filterActionLabel,
}: FacetFiltersProps) {
  // `ti-dialog` opens imperatively (AEM: `getElementById(...).open()`).
  const dialogRef = useRef<HTMLElement & { open?: () => void }>(null);

  return (
    <div className={mobileFilters()}>
      {/* The real `ti-button`, not `TiButton` — that wraps the form-components
          stub, which renders an unstyled native button. */}
      <ti-button
        type="button"
        appearance="secondary"
        className={filterTrigger()}
        onClick={() => dialogRef.current?.open?.()}
      >
        {filterActionLabel}
      </ti-button>

      {/* Header, close button and scrolling all come from the component. */}
      <ti-dialog ref={dialogRef} modal fullscreen mobile-edgetoedge="">
        <h2 slot="title">{refineByLabel}</h2>
        <HeadingLevelContext headingLevel="increment">
          <FacetPanels
            layout="dialog"
            facets={facets}
            selectedFacets={selectedFacets}
            onFacetChange={onFacetChange}
          />
        </HeadingLevelContext>
      </ti-dialog>
    </div>
  );
}

type FacetPanelsProps = {
  facets: FacetGroup[];
  selectedFacets: SelectedFacets;
  onFacetChange: FacetChangeHandler;
  layout?: FacetLayout;
};

export function FacetPanels({
  facets,
  selectedFacets,
  onFacetChange,
  layout,
}: FacetPanelsProps) {
  return (
    <div className={panels()}>
      {facets.map((facet) => (
        <FacetGroupPanel
          key={facet.id}
          facet={facet}
          selected={selectedFacets[facet.id] ?? new Set()}
          onChange={onFacetChange}
          layout={layout}
        />
      ))}
    </div>
  );
}

export function FacetGroupPanel({
  facet,
  selected,
  onChange,
  layout,
}: {
  facet: FacetGroup;
  selected: Set<string>;
  onChange: FacetChangeHandler;
  layout?: FacetLayout;
}) {
  const headingId = useId();
  // Only the row spacing differs between the rail and the dialog.
  const { panelBody, optionList, optionRow } = TAILWIND_VARIANTS({ layout });

  return (
    <div role="group" aria-labelledby={headingId} className={panel()}>
      <DynamicHeading id={headingId} className={panelHeading()}>
        {facet.label}
      </DynamicHeading>
      <div className={panelBody()}>
        <TifCheckboxGroup
          orientation="vertical"
          density="comfortable"
          size="sm"
        >
          {facet.options.map((option) => (
            <TifCheckbox
              key={option.value}
              appearance="checkbox"
              labelPosition="right"
              theme="light"
              className={optionCheckbox()}
              value={option.value}
              checked={selected.has(option.value)}
              data-lid={`${facet.label.toLowerCase()}-${option.displayName.toLowerCase()}`}
              data-navtitle="filter checked"
              onTiCheckboxChange={(e) =>
                onChange(facet.id, e.detail.value, e.detail.checked)
              }
            >
              {option.displayName}
            </TifCheckbox>
          ))}
        </TifCheckboxGroup>
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────

// Values measured on the live `ti_aem-eventFilter` — portals.css isn't loaded
// here, so every rule is ported to Tailwind.
// twMerge is off: it drops `text-label` / `text-body-md`, reading the theme's
// named font sizes as a text colour that the colour class then overrides.
const TAILWIND_VARIANTS = tv(
  {
    slots: {
      // Live is a 357px left rail; the rail and dialog swap at AEM's phone
      // breakpoint.
      sidebar: "hidden w-full shrink-0 md:block md:w-[357px]",
      mobileFilters: "md:hidden",
      // `u-fullWidth-only-on-phone`; the red outline is the component's own.
      filterTrigger: "block w-full",
      // 20px/300 (`u-header-4` on live), 12px down to the first panel.
      sidebarHeading: "mb-3 text-h5 font-light text-pl-text-color-primary",
      panels: "flex flex-col gap-4",
      // `u-boxShadow-1`, square corners.
      panel: "bg-pl-container-background-color-primary shadow-1",
      // `m-0` for the same reason AEM sets `u-margin-0`: app.css gives every
      // bare h3 a 24px bottom margin, which would push the first row down.
      panelHeading:
        "m-0 bg-pl-container-background-color-secondary p-4 text-body-md font-semibold leading-5 text-pl-text-color-primary",
      panelBody: "",
      optionList: "flex list-none flex-col",
      optionRow: "",
      // Everything inside the box is the component's own shadow DOM; the host
      // only needs to span the row so a tap beside the label still toggles it
      // (its `:host` rule is `width: fit-content`, which this overrides).
      optionCheckbox: "w-full",
    },
    variants: {
      // The dialog trades the panel's box padding for full-bleed rows, so a tap
      // anywhere across the row hits the checkbox.
      layout: {
        rail: { panelBody: "p-4", optionList: "gap-3" },
        dialog: {
          panelBody: "py-3",
          optionList: "gap-1",
          optionRow: "px-4 py-1",
        },
      },
    },
    defaultVariants: { layout: "rail" },
  },
  { twMerge: false },
);
const {
  sidebar,
  sidebarHeading,
  mobileFilters,
  filterTrigger,
  panels,
  panel,
  panelHeading,
  optionCheckbox,
} = TAILWIND_VARIANTS();
