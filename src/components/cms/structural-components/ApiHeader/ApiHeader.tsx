import Script from "next/script";
import clsx from "clsx";
import { ContentProps } from "@optimizely/cms-sdk";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";

import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { getContextLocale } from "@/lib/utils/server-utils";
import {
  SUBSITE_HEADER_CSS,
  SUBSITE_HEADER_JS,
} from "@/components/ui/ti/TIScriptConstants";

import {
  ApiHeaderComponentType,
  ApiHeaderLevel1ComponentType,
  ApiHeaderLevel2ComponentType,
} from "./ApiHeader.model";

type Level1 = ContentProps<typeof ApiHeaderLevel1ComponentType>;
type Level2 = ContentProps<typeof ApiHeaderLevel2ComponentType>;

/** Fixed brand asset, same URL the live subsite header uses. */
const TI_LOGO = "//www.ti.com/etc/designs/ti/images/ui/ic-logo.svg";

/** Analytics link id the live subsite header stamps on every nav anchor. */
const NAV_LID = "subsiteheader";

/**
 * `url.default` is the relative path with the locale already in it. Never prepend
 * `url.base` — that bakes the current host into the href (see CTALinkElement).
 */
function menuHref(link: Level1["level1URL"] | Level2["level2URL"]) {
  const path = link?.url?.default;
  return path ? normalizeUrl(path) : null;
}

/**
 * The CMS "Open in" dropdown maps to `link.target` (`_blank`, `_self`, …). Pass
 * it straight through to the anchor, and pair `_blank` with `rel` so a new tab
 * can't reach back through `window.opener`.
 */
function linkTarget(link: Level1["level1URL"] | Level2["level2URL"]) {
  const target = link?.target || undefined;
  return {
    target,
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  };
}


export function ApiHeader({
  content,
  parentField,
}: OptiComponentProps<typeof ApiHeaderComponentType>) {
  if (!content) {
    return null;
  }

  const locale = getContextLocale();
  const menus = normalizeGenericArrayToTyped<typeof ApiHeaderLevel1ComponentType>(
    content.level1Menus,
  );

  return (
    <>
      <link rel="stylesheet" href={SUBSITE_HEADER_CSS} precedence="default" />
      <Script src={SUBSITE_HEADER_JS} />

      <header
        id="ti_header"
        className={clsx("ti_header ti_header--responsive", "z-[200]!")}
        data-language={locale}
        {...getPreviewUtils(content).pa(
          [parentField, "level1Menus"].filter(Boolean).join("."),
        )}
      >
        <div className="ti_header-top">
          <a
            className="ti_header-top-logo"
            href={`/${locale}/`}
            data-navtitle="header_logo_link"
            aria-label="Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- TI's own CDN svg, sized by ticom.header.subpage.css */}
            <img alt="Home" src={TI_LOGO} />
          </a>
          <ul className="ti_header-top-llc" role="menu">
            <li className="ti_header-top-llc-item" role="none">
              <ti-login locale={locale} data-di-mask="" data-lid="header-login" />
            </li>
            <li className="ti_header-top-llc-item" role="none">
              <ti-header-llc-sidesheet />
            </li>
          </ul>
        </div>

        <div className="ti_header-bar ti_header-bar--subsite">
          <nav className="ti_header-nav" aria-label="Main navigation">
            {/* Hamburger — tablet and down */}
            <button
              className="ti_header-nav-button ti_header-nav-button--tabletDown js-header-openMobileMenu bg-transparent"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="ti_header-navlist-container"
              role="menuitem"
            >
              <span className="ti_header-icon-menu">Menu</span>
            </button>
            <div
              id="ti_header-navlist-container"
              className="ti_header-navlist-container"
              data-current-page="0"
            >
              <div className="ti_header-navlist-container-top">
                <button
                  id="ti_header-navlist-container-close"
                  className="ti_header-navlist-container-action js-header-closeMobileMenu bg-transparent"
                >
                  Close
                </button>
                <button
                  id="ti_header-navlist-container-previous"
                  className="ti_header-navlist-container-action js-header-previousMobileMenu bg-transparent"
                >
                  Previous Menu
                </button>
              </div>

              <ul className="ti_header-navlist" role="menu">
                {menus.map((menu) => (
                  <Level1Item key={menu._id} content={menu} />
                ))}
              </ul>
            </div>

            {/* Login drawer — phone only */}
            <button
              className="ti_header-nav-button ti_header-nav-button--phoneOnly ti_header-nav-button--right js-header-mobileDrawerButton bg-transparent"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="ti_header-nav-drawer-login"
              role="menuitem"
            >
              <span className="ti_header-icon-login">Login</span>
            </button>
            <div
              id="ti_header-nav-drawer-login"
              className="ti_header-nav-drawer"
              aria-hidden="true"
            >
              <div className="ti_header-nav-drawer-content">
                <ti-login
                  locale={locale}
                  data-lid="header-login"
                  mobile-mode="true"
                  data-di-mask=""
                />
              </div>
            </div>

            {/* Language — phone only, opens the LLC side sheet above */}
            <button
              className="ti_header-nav-button ti_header-nav-button--phoneOnly ti_header-nav-button--right js-header-mobileDrawerButton js-header-llcSideSheetMobileTrigger bg-transparent"
              aria-expanded="false"
            >
              <span className="ti_header-icon-language">Language</span>
            </button>

            <div
              className="ti_header-navlist-overlay js-header-closeMobileMenu"
              aria-hidden="true"
            />
          </nav>
        </div>
      </header>
    </>
  );
}


function Level1Item({ content }: { content: Level1 }) {
  const links = normalizeGenericArrayToTyped<typeof ApiHeaderLevel2ComponentType>(
    content.level2Links,
  );
  const title = content.level1Title;
  const { pa } = getPreviewUtils(content);

  if (!title) {
    return null;
  }

  if (links.length) {
    return (
      <li className="ti_header-navlist-item" role="none">
        <button
          className="ti_header-navlist-item-link bg-transparent"
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded="false"
          {...pa("level1Title")}
        >
          {title}
        </button>
        {/* Must stay the button's immediate next sibling — subpage.js finds it
            with nextElementSibling. */}
        <ul className="ti_header-navlist-sublist" role="menu" aria-hidden="true">
          {links.map((link) => (
            <Level2Item key={link._id} content={link} />
          ))}
        </ul>
      </li>
    );
  }

  const href = menuHref(content.level1URL);

  return (
    <li className="ti_header-navlist-item" role="none">
      {href ? (
        <a
          className="ti_header-navlist-item-link"
          data-lid={NAV_LID}
          data-navtitle={title}
          href={href}
          {...linkTarget(content.level1URL)}
          role="menuitem"
          {...pa("level1Title")}
        >
          {title}
        </a>
      ) : (
        // No URL and no children: `:not(span)` in TI's CSS drops the hover
        // affordance, so a span reads as the non-interactive label it is.
        <span className="ti_header-navlist-item-link" {...pa("level1Title")}>
          {title}
        </span>
      )}
    </li>
  );
}

function Level2Item({ content }: { content: Level2 }) {
  const href = menuHref(content.level2URL);
  const title = content.level2Title;

  if (!title || !href) {
    return null;
  }

  return (
    <li className="ti_header-navlist-subitem">
      <a
        className="ti_header-navlist-subitem-link"
        data-lid={NAV_LID}
        data-navtitle={title}
        href={href}
        {...linkTarget(content.level2URL)}
        role="menuitem"
        {...getPreviewUtils(content).pa("level2Title")}
      >
        {title}
      </a>
    </li>
  );
}
