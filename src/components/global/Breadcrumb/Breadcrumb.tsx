import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import { getTranslations } from "next-intl/server";
import { tv } from "tailwind-variants";
import { getBreadcrumb } from "./Breadcrumb.utils";
import { JsonLdSchema } from "@/components/ui/Atoms/JsonLd";

/**
 * Breadcrumb:
 *  - Product Family pages  → golden hierarchy from PIM, with parametric sibling
 *    dropdowns (isProducts).
 *  - Application pages      → application hierarchy from PIM, sibling dropdowns
 *    without the parametric icon.
 *  - Everything else / any API failure → automatic CMS-hierarchy breadcrumb.
 *
 * Styling: matches live ti.com's page grid — 1184px content width plus a 28px
 * gutter each side (56px total) gives a 1240px container max-width; content is
 * centered; plain scrollable list on mobile, TI <ti-breadcrumb>
 * Stencil component on desktop. All styling lives in TAILWIND_VARIANTS below.
 */
export async function Breadcrumb() {
  const t = await getTranslations();

  const { isProducts, breadcrumbs } = await getBreadcrumb();

  // If breadcrumb only has Home and no other pages, don't show
  if (breadcrumbs.length <= 1) {
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

  return (
    <nav aria-label="Breadcrumb" className={nav()}>
      <div className={container()}>
        <JsonLdSchema
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              item: item.url,
            })),
          }}
        />
        {/* Mobile: plain, scrollable breadcrumb — no dropdowns (matches live). */}
        <ol className={mobileList()}>
          {breadcrumbs.map((item) => (
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
          {breadcrumbs.map((item, index) => (
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
                    index === breadcrumbs.length - 1 ? "page" : undefined
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
      // Centering, capping (1240px) and the responsive gutter now live in the
      // `container-lg` utility (see app.css); nav only owns vertical spacing.
      // No top margin: TI's header already has a 16px margin-bottom, so the
      // breadcrumb sits flush at the top of <main> — matching live ti.com
      // (breadcrumb top 176px at 1280, i.e. 16px below the red nav).
      nav: ["mb-6", "md:mb-12"],
      container: ["container-lg"],
      // Mobile: single scrollable row with "/" separators (matches live).
      // `!` on m-0/leading-7: on API portal pages ApiHeader loads TI's
      // `ticom.header.subpage.css`, which is a whole-page stylesheet (normalize +
      // Polaris base) delivered unlayered. Unlayered CSS beats every Tailwind
      // utility, so TI's list margins and 20px leading win without the modifier.
      mobileList: [
        "flex",
        "list-none",
        "flex-nowrap",
        "overflow-x-auto",
        "m-0!",
        "mr-6",
        "text-body-md",
        "leading-7!",
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
      // Same reason: TI's global `a` rule sets the link colour and leading.
      mobileLink: [
        "text-pl-text-color-primary!",
        "leading-7!",
        "no-underline",
        "hover:underline",
        "focus:underline",
      ],
      // Desktop: TI Stencil breadcrumb host.
      // `!` because hydration.css sets `ti-breadcrumb { display: flex }` unlayered to
      // stop pre-hydration layout shift; a plain `max-md:hidden` loses to it and both
      // the mobile and desktop breadcrumbs render at once.
      desktop: ["ti_p-breadcrumb", "hidden!", "md:flex!"],
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
