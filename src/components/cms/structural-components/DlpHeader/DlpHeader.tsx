import NextLink from "next/link";
import clsx from "clsx";

import { getContextLocale } from "@/lib/utils/server-utils";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { TiStickyHeader } from "@/components/ui/ti/TiStickyHeader/TiStickyHeader";
import { TiNavbar } from "@/components/ui/ti/TiNavbar/TiNavbar";

/** Fixed DLP brand mark, ported from the AEM source — not a CMS field, same treatment as ApiHeader's TI_LOGO. */
const DLP_LOGO =
  "https://www.ti.com/content/dam/ticom/images/identities/ti-brand/ti-dlp-logo-hz-1c-white.svg";

/**
 * Showcase header for DLP-branded pages (TXI-546). Selected via the
 * `SiteSettings.header` override, same mechanism as MainHeader/ApiHeader.
 *
 * The nav bar is intentionally empty: `ti-navbar` collects its own items from
 * `[navbar-id]` anchors dropped anywhere on the page via Jump Link Target
 * components (same mechanism JumpLinkNavigation's "chapternav" already uses) —
 * the requirements doc routes menu authoring through that existing component,
 * not through fields here.
 *
 * ponytail: skips the AEM source's pre-hydration `visibility` masking on the
 * logo/LLC widget (flash-of-unstyled-content polish, not a functional
 * requirement) — add if visual QA on the VM shows a noticeable flash.
 */
export function DlpHeader() {
  const locale = getContextLocale();

  return (
    <header
      data-language={locale}
      className="h-[102px] bg-black text-pl-text-color-primary-contrast max-md:h-[50px]"
    >
      <div className="mx-auto flex h-[50px] max-w-lg items-center justify-between gap-4 px-7 max-md:border-b max-md:border-pl-element-color-secondary max-md:pr-0 max-md:pl-4">
        <div className="w-[350px] -translate-x-5">
          <NextLink
            href={`/${locale}/`}
            className="flex h-[50px] w-full items-center"
            data-navtitle="header_logo_link"
            data-lid="header_logo_link_home"
            aria-label="Home"
          >
            <span className="block w-full">
              <TiImage src={DLP_LOGO} alt="Home" />
            </span>
          </NextLink>
        </div>

        <div
          className={clsx(
            "flex h-full shrink-0 items-center border-x border-pl-element-color-secondary",
            "has-[ti-header-llc-sidesheet:hover]:bg-pl-element-color-secondary",
            "has-[ti-header-llc-sidesheet:focus]:bg-pl-element-color-secondary",
          )}
        >
          <ti-header-llc-sidesheet
            className={clsx(
              "h-full text-pl-text-color-primary",
              "[--tiHeader-llcSidesheet-button-text-color:white]",
              "[--tiHeader-llcSidesheet-countryCurrency-display:none]",
              "[--tiHeader-llcSidesheet-button-paddingInline:var(--spacing-4)]",
              "max-md:[--tiHeader-llcSidesheet-preview-display:none]",
            )}
          />
        </div>
      </div>

      <div className="h-[52px] [--_tiNavbar-borderColor:var(--pl-element-color-secondary)] [--tiStickyHeader-margin-block:0px] max-md:hidden">
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
