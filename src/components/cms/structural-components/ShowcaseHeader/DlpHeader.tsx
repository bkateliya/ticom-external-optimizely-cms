import NextLink from "next/link";
import { tv } from "tailwind-variants";

import { getContextLocale } from "@/lib/utils/server-utils";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { TiStickyHeader } from "@/components/ui/ti/TiStickyHeader/TiStickyHeader";
import { TiNavbar } from "@/components/ui/ti/TiNavbar/TiNavbar";

/** Fixed DLP brand mark, ported from the AEM source — not a CMS field, same treatment as ApiHeader's TI_LOGO. */
const DLP_LOGO =
  "https://www.ti.com/content/dam/ticom/images/identities/ti-brand/ti-dlp-logo-hz-1c-white.svg";

/**
 * Showcase header for DLP-branded pages (TXI-546), selected via the
 * `SiteSettings.header` override like MainHeader/ApiHeader.
 *
 * `ti-navbar` is left empty on purpose: it collects its own items from
 * `[navbar-id]` anchors that Jump Link Target components drop on the page
 * (the same mechanism JumpLinkNavigation's "chapternav" uses), so menu
 * authoring happens there, not through fields here.
 */
export function DlpHeader() {
  const locale = getContextLocale();

  const {
    header,
    topBar,
    logoWrap,
    logoLink,
    logoInner,
    llcWrap,
    llcSidesheet,
    navBar,
  } = TAILWIND_VARIANTS();

  return (
    <header data-language={locale} className={header()}>
      <div className={topBar()}>
        <div className={logoWrap()}>
          <NextLink
            href={`/${locale}/`}
            className={logoLink()}
            data-navtitle="header_logo_link"
            data-lid="header_logo_link_home"
            aria-label="Home"
          >
            <span className={logoInner()}>
              <TiImage src={DLP_LOGO} alt="Home" />
            </span>
          </NextLink>
        </div>

        <div className={llcWrap()}>
          <ti-header-llc-sidesheet className={llcSidesheet()} />
        </div>
      </div>

      <div className={navBar()}>
        <TiStickyHeader disableAnimation>
          <TiNavbar
            header
            scrollOffset={56}
            stickyMarginBottom={24}
            pageWidth="1240px"
            ariaLabel="TI DLP navigation"
          />
        </TiStickyHeader>
      </div>
    </header>
  );
}

const TAILWIND_VARIANTS = tv({
  slots: {
    // 102px total = 50px brand bar + 52px navbar; mobile drops the navbar.
    header: [
      "h-[102px]",
      "bg-black",
      "text-pl-text-color-primary-contrast",
      "max-md:h-[50px]",
    ],
    topBar: [
      "mx-auto",
      "flex",
      "h-[50px]",
      "max-w-lg",
      "items-center",
      "justify-between",
      "gap-4",
      "px-7",
      "max-md:border-b",
      "max-md:border-pl-element-color-secondary",
      "max-md:pr-0",
      "max-md:pl-4",
    ],
    logoWrap: ["w-[350px]", "-translate-x-5"],
    logoLink: ["flex", "h-[50px]", "w-full", "items-center"],
    logoInner: ["block", "w-full"],
    // Hover/focus highlight is driven by the nested Stencil element's own
    // states, so it has to be a `has-[...]` selector on the wrapper.
    llcWrap: [
      "flex",
      "h-full",
      "shrink-0",
      "items-center",
      "border-x",
      "border-pl-element-color-secondary",
      "has-[ti-header-llc-sidesheet:hover]:bg-pl-element-color-secondary",
      "has-[ti-header-llc-sidesheet:focus]:bg-pl-element-color-secondary",
    ],
    // TI's LLC side-sheet is themed through its own custom properties, not
    // classes — hence the arbitrary `[--tiHeader-*]` values.
    llcSidesheet: [
      "h-full",
      "text-pl-text-color-primary",
      "[--tiHeader-llcSidesheet-button-text-color:white]",
      "[--tiHeader-llcSidesheet-countryCurrency-display:none]",
      "[--tiHeader-llcSidesheet-button-paddingInline:var(--spacing-4)]",
      "max-md:[--tiHeader-llcSidesheet-preview-display:none]",
    ],
    navBar: [
      "h-[52px]",
      "[--_tiNavbar-borderColor:var(--pl-element-color-secondary)]",
      "[--tiStickyHeader-margin-block:0px]",
      "max-md:hidden",
    ],
  },
});
