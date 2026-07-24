import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import { getContextData } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import { tv } from "tailwind-variants";
import {
  BreadcrumbEntry,
  getApplicationBreadcrumb,
  getProductFamilyBreadcrumb,
} from "./Breadcrumb.utils";

/**
 * Breadcrumb:
 *  - Product Family pages  → golden hierarchy from PIM, with parametric sibling
 *    dropdowns (isProducts).
 *  - Application pages      → application hierarchy from PIM, sibling dropdowns
 *    without the parametric icon.
 *  - Everything else / any API failure → automatic CMS-hierarchy breadcrumb.
 *
 * Styling: matches live ti.com's page grid (content centered, capped at 1184px,
 * responsive gutter); plain scrollable list on mobile, TI <ti-breadcrumb>
 * Stencil component on desktop. All styling lives in TAILWIND_VARIANTS below.
 */
export async function Breadcrumb() {
  const t = await getTranslations();

  const contextBreadcrumb = getContextData("breadcrumb") ?? [];
  let finalBreadcrumb: BreadcrumbEntry[] | null = null;
  let isProducts = false;

  try {
    const familyId = getContextData("productFamily")?.familyId;
    if (familyId) {
      isProducts = true;
      finalBreadcrumb = await getProductFamilyBreadcrumb(familyId);
    }

    const applicationId = getContextData("application")?.applicationId; //"11060";
    if (applicationId) {
      finalBreadcrumb = await getApplicationBreadcrumb(applicationId);
    }
  } catch (error) {
    console.error(
      "Breadcrumb: PIM API failed, using automatic breadcrumb",
      error,
    );
    isProducts = false;
  }
  if (!finalBreadcrumb) {
    finalBreadcrumb = contextBreadcrumb;
  }
  // If breadcrumb only has Home and no other pages, don't show
  if (finalBreadcrumb.length <= 1) {
    return null;
  }

  const {
    nav,
    container,
    mobileList,
    mobileItem,
    mobileLink,
    desktop,
    desktopCurrent,
    dropdown,
    dropdownItem,
    parametricLink,
    parametricIconLink,
    parametricIcon,
    dropdownLink,
  } = TAILWIND_VARIANTS();

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: finalBreadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: item.url,
    })),
  }).replace(/</g, "\\u003c");

  return (
    <nav aria-label="Breadcrumb" className={nav()}>
      <div className={container()}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        {/* Mobile: plain, scrollable breadcrumb — no dropdowns (matches live). */}
        <ol className={mobileList()}>
          {finalBreadcrumb.map((item) => (
            <li key={item.url} className={mobileItem()}>
              {item.asSpan ? (
                <span aria-current="page">{item.title}</span>
              ) : (
                <a href={item.url} className={mobileLink()}>
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ol>

        {/* Desktop: TI Stencil breadcrumb, with sibling dropdowns (parametric
            icon only on product families). Hidden on mobile. */}
        <ti-breadcrumb className={desktop()} data-lid="breadcrumb">
          {finalBreadcrumb.map((item, index) => (
            <ti-breadcrumb-section
              key={item.url}
              data-lid={`breadcrumb_${index}-${item.titleEN ?? item.title}`}
              label={item.title}
              bid={index}
              is-home={index === 0}
              // Non-zero `size` is what makes the dropdown menu appear.
              size={item.siblings?.length}
            >
              {item.asSpan ? (
                <span
                  slot="trigger"
                  className={desktopCurrent()}
                  data-navtitle={`breadcrumb_${index}-${item.titleEN ?? item.title}`}
                  id={`ti-breadcrumb-section-${index}`}
                >
                  {item.title}
                </span>
              ) : (
                <a
                  slot="trigger"
                  data-navtitle={`breadcrumb_${index}-${item.titleEN ?? item.title}`}
                  id={`ti-breadcrumb-section-${index}`}
                  href={item.url}
                  aria-current={
                    index === finalBreadcrumb.length - 1 ? "page" : undefined
                  }
                >
                  {item.title}
                </a>
              )}
              {item.siblings?.length ? (
                <ul role="menu" className={dropdown()}>
                  {item.siblings.map((sibling, sibIndex) => (
                    <li
                      role="presentation"
                      key={sibling.url}
                      className={dropdownItem()}
                    >
                      {isProducts ? (
                        <span className={parametricLink()}>
                          <a
                            className={parametricIconLink()}
                            // Special logic for parametric products
                            href={sibling.url + "/products"}
                            id={`ti-breadcrumb-section-pf-${index}-item-${sibIndex + 1}`}
                            title={t("Product selection table")}
                            data-navtitle={`pf_${sibling.titleEN}`}
                          >
                            <TiSvgIcon
                              icon="parametric-filter"
                              size="s"
                              className={parametricIcon()}
                            />
                          </a>
                        </span>
                      ) : null}
                      <a
                        className={dropdownLink()}
                        id={`ti-breadcrumb-section-${index}-item-${sibIndex + 1}`}
                        href={sibling.url ?? ""}
                        data-navtitle={sibling.titleEN}
                      >
                        {sibling.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </ti-breadcrumb-section>
          ))}
        </ti-breadcrumb>
      </div>
    </nav>
  );
}

const TAILWIND_VARIANTS = tv(
  {
    slots: {
      // Match live ti.com's page grid: responsive side gutter (16px mobile /
      // 28px tablet+) with the content centered and capped at 1184px on desktop.
      nav: ["mt-6", "mb-6", "px-4", "md:mb-12", "md:px-[28px]"],
      container: ["mx-auto", "max-w-[1184px]"],
      // Mobile: single scrollable row with "/" separators (matches live).
      mobileList: [
        "flex",
        "list-none",
        "flex-nowrap",
        "overflow-x-auto",
        "text-body-md",
        "leading-7",
        "text-pl-text-color-primary",
        "md:hidden",
      ],
      mobileItem: [
        "flex",
        "whitespace-nowrap",
        "before:w-6",
        "before:shrink-0",
        "before:self-start",
        "before:text-center",
        "before:text-pl-text-color-secondary-contrast",
        "before:content-['/']",
        "first:before:content-none",
      ],
      mobileLink: [
        "text-pl-text-color-primary",
        "no-underline",
        "hover:underline",
        "focus:underline",
      ],
      // Desktop: TI Stencil breadcrumb host.
      desktop: ["ti_p-breadcrumb", "max-md:hidden"],
      desktopCurrent: ["text-body-md", "leading-7"],
      // Desktop parametric sibling dropdown (classes styled by portals-parity CSS
      // + these utilities).
      dropdown: [
        "ti-breadcrumb-section",
        "ti-breadcrumb-section--parametric-icons",
        "relative",
        "m-0",
        "-ml-2",
        "list-none",
        "p-0",
      ],
      dropdownItem: ["flex", "break-inside-avoid", "pb-4"],
      parametricLink: [
        "ti-breadcrumb-parametric-link",
        "relative",
        "mr-3",
        "flex-none",
        "pr-3",
        "after:absolute",
        "after:right-0",
        "after:top-0",
        "after:h-[calc(100%_+_16px)]",
        "after:w-px",
        "after:bg-pl-text-color-secondary-contrast",
        "after:content-['']",
      ],
      parametricIconLink: ["group", "inline-flex"],
      parametricIcon: ["opacity-[0.65]", "group-hover:opacity-100"],
      dropdownLink: [
        "ti-breadcrumb-section-link",
        "block",
        "max-w-[420px]",
        "whitespace-normal",
        "p-0",
        "text-body-md",
        "text-[#555]",
        "no-underline",
        "hover:underline",
        "focus:underline",
      ],
    },
    // Disable tailwind-merge: our custom font-size tokens (text-body-md) and color
    // utilities (text-[#555] / text-pl-*) both start with `text-`, so merge would
    // wrongly treat them as conflicting and drop the font size. No variants here,
    // so there's nothing to merge anyway.
  },
  { twMerge: false },
);
