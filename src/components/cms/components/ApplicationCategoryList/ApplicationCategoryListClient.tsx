"use client";

import { useId, useMemo, useState } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { tv } from "tailwind-variants";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";

export interface CategoryChildLink {
  id: number;
  text: string;
  lid: string;
  href: string;
}

export interface CategoryLink extends Omit<CategoryChildLink, "href"> {
  /** A group heading can exist without a landing page of its own. */
  href: string | null;
  children: CategoryChildLink[];
}

// Values measured on the live `ti_aem-application-CategoriesListing` — portals.css
// isn't loaded here, so the AEM class names are analytics hooks only.
// twMerge is off: it drops `text-h6` / `text-body-md`, reading the theme's named
// font sizes as a text colour that the colour class then overrides.
const style = tv(
  {
    slots: {
      header: "mb-6 md:mb-8 flex items-baseline justify-between gap-4",
      // text-h3 is 28px/300 on desktop, the live heading size (h2 is 34px).
      heading: "m-0 text-h3 font-light text-pl-text-color-primary",
      // Tailwind's preflight is off (assets/app.css), so buttons keep their UA chrome.
      buttonReset:
        "m-0 cursor-pointer appearance-none bg-transparent [font-family:inherit]",
      expandAll:
        "border-0 px-0 py-2 text-body-md leading-5 text-pl-link-color-primary hover:underline",
      columns: "grid w-full grid-cols-1 md:grid-cols-3 md:gap-x-14",
      column: "m-0 list-none p-0",
      // Shared by the flat rows and the group triggers: 16px/600 teal + hairline.
      rowLabel: "text-h6 font-semibold leading-5 text-pl-link-color-primary",
      // Explicit sides: `border-0` + `border-b` set the same property.
      rowRule:
        "border-x-0 border-t-0 border-b border-b-pl-border-color-tertiary",
      flatItem: "has-no-children m-0 py-4",
      groupItem: "m-0 p-0",
      group: "transition-[margin-bottom] duration-300 ease-out",
      trigger: "flex w-full items-start gap-2 px-0 py-4 text-left",
      chevron:
        "ti_p-iconText-icon ml-4 flex size-5 shrink-0 items-center justify-center transition-transform duration-300 ease-out",
      panel: "grid transition-[grid-template-rows] duration-300 ease-out",
      panelInner: "min-h-0 overflow-hidden",
      childList: "m-0 list-none divide-y divide-pl-border-color-tertiary p-0",
      childItem: "m-0 pt-[15px] pb-4",
      childLink:
        "text-body-md leading-5 text-pl-link-color-primary no-underline hover:underline",
      learnMoreLink:
        "text-body-md font-semibold leading-5 text-pl-link-color-primary no-underline hover:underline",
    },
  },
  { twMerge: false },
);
const s = style();

interface Props {
  /** Pre-split into the three AEM columns. */
  columns: [CategoryLink[], CategoryLink[], CategoryLink[]];
  heading: string;
  expandAllLabel: string;
  collapseAllLabel: string;
  learnMoreLabel: string;
}

// Owns the heading row too, because "Expand all" drives the collapsibles in all
// three columns at once (AEM did it from `accordions.js`).
export function ApplicationCategoryListClient({
  columns,
  heading,
  expandAllLabel,
  collapseAllLabel,
  learnMoreLabel,
}: Props) {
  const uid = useId();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const collapsibleIds = useMemo(
    () =>
      columns
        .flat()
        .filter((link) => link.children.length)
        .map((link) => link.id),
    [columns],
  );

  // AEM flipped the label once every item happened to be open, however it was opened.
  const allExpanded =
    collapsibleIds.length > 0 &&
    collapsibleIds.every((id) => expandedIds.includes(id));

  function toggle(id: number) {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((open) => open !== id) : [...prev, id],
    );
  }

  return (
    <div className="w-full">
      <div className={s.header()}>
        <DynamicHeading className={s.heading()}>
          {/* Fixed hash — GoldenSourcePageHeading's CTA button sails to it. */}
          <a
            id="aem-application-Browse"
            className="ti_aem-application-CategoriesListing-anchor"
          />
          {heading}
        </DynamicHeading>

        {/* Hidden below two collapsibles, as in `accordions.js`. */}
        {collapsibleIds.length > 1 && (
          <button
            type="button"
            className={clsx(s.buttonReset(), s.expandAll())}
            onClick={() => setExpandedIds(allExpanded ? [] : collapsibleIds)}
            data-lid="browseapplications-expand-all"
          >
            {allExpanded ? collapseAllLabel : expandAllLabel}
          </button>
        )}
      </div>

      <div className={s.columns()}>
        {columns.map((column, index) => (
          <ul key={index} className={s.column()}>
            {column.map((link) => {
              if (!link.children.length) {
                return (
                  <li key={link.id} className={clsx(s.flatItem(), s.rowRule())}>
                    <NextLink
                      href={link.href ?? ""}
                      className={clsx(
                        s.rowLabel(),
                        "no-underline hover:underline",
                      )}
                      data-lid={`browseapplications-${link.lid}`}
                      data-navtitle="learn-more"
                    >
                      {link.text}
                    </NextLink>
                  </li>
                );
              }

              const isExpanded = expandedIds.includes(link.id);
              const panelId = `${uid}-${link.id}`;

              return (
                <li key={link.id} className={s.groupItem()}>
                  {/* The 48px only applies while open, as on the live site. */}
                  <div className={clsx(s.group(), isExpanded && "mb-12")}>
                    <button
                      type="button"
                      className={clsx(
                        s.buttonReset(),
                        s.trigger(),
                        s.rowRule(),
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => toggle(link.id)}
                      data-lid={`browseapplications-${link.lid}`}
                    >
                      <span className={s.rowLabel()}>{link.text}</span>
                      <span
                        className={clsx(
                          s.chevron(),
                          isExpanded && "rotate-180",
                        )}
                      >
                        <TiSvgIcon
                          icon="chevron-down"
                          size="s"
                          iconStyle="secondary"
                        />
                      </span>
                    </button>
                    <div
                      id={panelId}
                      inert={!isExpanded}
                      className={clsx(
                        s.panel(),
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className={s.panelInner()}>
                        <ul className={s.childList()}>
                          {link.children.map((child) => (
                            <li key={child.id} className={s.childItem()}>
                              <NextLink
                                href={child.href}
                                className={s.childLink()}
                                data-lid={`browseapplications-${child.lid}`}
                                data-navtitle="learn-more"
                              >
                                {child.text}
                              </NextLink>
                            </li>
                          ))}

                          {link.href && (
                            <li
                              className={clsx(
                                s.childItem(),
                                "ti_aem-application-CategoriesListing-learnmore",
                              )}
                            >
                              <NextLink
                                href={link.href}
                                className={s.learnMoreLink()}
                                data-lid={`browseapplications-learn-more${link.lid}`}
                                data-navtitle="learn-more"
                              >
                                <TiSvgIcon
                                  icon="arrow-right"
                                  size="s"
                                  iconStyle="secondary"
                                />{" "}
                                <span>{learnMoreLabel}</span>
                              </NextLink>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
