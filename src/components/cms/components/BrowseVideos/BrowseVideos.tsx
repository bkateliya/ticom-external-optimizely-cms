import NextLink from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { BrowseVideosComponentType } from "./BrowseVideos.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { BrowseVideosSearchInput } from "./BrowseVideosSearchInput";
import { SHARED_ENV_VARS } from "@/lib/env/shared-env";
import { toLangPref } from "@/constants/locales";
import { getApplication, getSilos } from "@/lib/api/cms-api";
import { DEFAULT_APPLICATION_ID } from "@/lib/api/normalized/applications";

interface BrowseLink {
  href: string;
  /** Localized label — also the value the search is pre-filtered on. */
  text: string;
  /** Analytics link id, which stays English (`data-lid`). */
  lid: string;
}

/**
 * AEM's `URLHelper.urlEncode` — `URLEncoder.encode(s, "UTF-8")` with `+` put
 * back to `%20`. It escapes five characters `encodeURIComponent` leaves alone;
 * the rest already agree.
 */
function urlEncode(value: string) {
  return encodeURIComponent(value).replace(
    /[!'()~]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/**
 * Prefooter "Browse videos" block: a video search field, a link to the full
 * video library, and the top-level product families / MSE markets, each linking
 * into universal search pre-filtered to that category's videos.
 *
 * None of it is authorable — the headline is fixed and the two lists come from
 * PIM. Ported from AEM's `browseVideoCategories.html`, except that the Coveo
 * search box is replaced by a `ti-search-field` that redirects, following the
 * FAQSearchBox pattern.
 */
export async function BrowseVideos({
  content,
}: OptiComponentProps<typeof BrowseVideosComponentType>) {
  if (!content) {
    return null;
  }

  const t = await getTranslations();
  const locale = await getLocale();

  // Remove the https://
  const host = SHARED_ENV_VARS.NEXT_PUBLIC_TICOM_BASE_DOMAIN.replace(
    /https?:\/\//,
    "",
  );

  // Serves as both the `langPref` search parameter and the `Content-Language`
  // the PIM API localizes off.
  const language = toLangPref(locale);

  // The catalog entries carry the localized video facet values; the search term
  // is appended by the client field.
  const searchUrl = t(
    "//{0}/sitesearch/{1}/docs/universalsearch.tsp?langPref={2}&preFilter=videos_Video,Video%20series",
    { 0: host, 1: locale, 2: language },
  );
  const viewAllUrl = t(
    "https://{0}/sitesearch/en-us/docs/universalsearch.tsp?langPref=en-US&searchTerm=%00&preFilter=latestVideo",
    { 0: host },
  );

  const [products, applications] = await Promise.all([
    getProductLinks(host, language),
    getApplicationLinks(host, language),
  ]);

  return (
    <div className="w-full">
      <DynamicHeading className="text-h3 font-light mb-6">
        {t("Browse videos")}
      </DynamicHeading>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
        <BrowseVideosSearchInput
          className="w-full max-w-[440px] text-pl-input-element-color"
          placeholder={t("Search")}
          baseUrl={searchUrl}
        />
        <NextLink
          href={viewAllUrl}
          data-lid="recentlyuploaded-view-all"
          data-navtitle="watch-video"
          className="text-body-md text-pl-link-color-primary no-underline hover:underline"
        >
          {t("View all videos")}
        </NextLink>
      </div>

      <HeadingLevelContext headingLevel="increment">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {products.length > 0 && (
            <div className="md:col-span-9">
              <DynamicHeading className="heading-text-h5">
                {t("Products")}
              </DynamicHeading>
              {/* AEM's `u-columnCount-3`: multi-column, so the list reads down
                  each column rather than across the rows. */}
              <BrowseLinkList
                links={products}
                className="sm:columns-2 lg:columns-3"
              />
            </div>
          )}
          {applications.length > 0 && (
            <div className="md:col-span-3">
              <DynamicHeading className="heading-text-h5">
                {t("Applications")}
              </DynamicHeading>
              <BrowseLinkList links={applications} />
            </div>
          )}
        </div>
      </HeadingLevelContext>
    </div>
  );
}

function BrowseLinkList({
  links,
  className,
}: {
  links: BrowseLink[];
  className?: string;
}) {
  return (
    <ul className={`columns-1 gap-x-8 list-none ${className ?? ""}`}>
      {links.map((link) => (
        <li key={link.href} className="break-inside-avoid mb-2">
          <NextLink
            href={link.href}
            data-lid={`browsevideos-${link.lid}`}
            data-navtitle="learn-more"
            className="text-body-md text-pl-link-color-primary no-underline hover:underline"
          >
            {link.text}
          </NextLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * Top-level families in the product tree (AEM's `siloLinks`). The endpoint
 * returns the whole silo list, so the roots are the entries whose parent is not
 * itself a silo. Order is the service's own — it is already alphabetical.
 */
async function getProductLinks(
  host: string,
  language: string,
): Promise<BrowseLink[]> {
  const t = await getTranslations();
  try {
    const silos = await getSilos(language);
    const familyIds = new Set(
      silos.map((silo) => silo.familyId).filter(Boolean),
    );

    return silos
      .filter((silo) => !familyIds.has(silo.parentId))
      .map((silo) => {
        // The service double-encodes ampersands ("Audio, haptics &amp; piezo").
        const name = silo.familyName.replace(/&amp;/g, "&");
        return {
          text: name,
          lid: silo.enFamilyName.replace(/&amp;/g, "&"),
          href: t(
            "https://{0}/sitesearch/en-us/docs/universalsearch.tsp?langPref=en-US&searchTerm=%00&preFilter=products_{1}",
            { 0: host, 1: urlEncode(name) },
          ),
        };
      });
  } catch (error) {
    console.error("Get Product Silos CMS API failed", error);
    return [];
  }
}

/**
 * The markets within the MSE (AEM's `appLinks`) — the roots of the hierarchy,
 * i.e. the nodes with no parent. The application id is only there because the
 * endpoint demands one; the response carries the whole tree either way.
 */
async function getApplicationLinks(
  host: string,
  language: string,
): Promise<BrowseLink[]> {
  const t = await getTranslations();
  try {
    const { AppHierarchyList } = await getApplication(
      DEFAULT_APPLICATION_ID,
      language,
    );

    // Strictly 0, not "no parent" — AEM unboxes `parentAppId` to compare, so a
    // null-parented node would blow up there and cannot be a real market.
    return AppHierarchyList.filter((market) => market.parentAppId === 0).map(
      (market) => ({
        text: market.sectionName,
        lid: market.enSectionName,
        href: t(
          "https://{0}/sitesearch/en-us/docs/universalsearch.tsp?langPref=en-US&searchTerm=%00&preFilter=applications_{1}",
          { 0: host, 1: urlEncode(market.sectionName) },
        ),
      }),
    );
  } catch (error) {
    console.error("Get Application CMS API failed", error);
    return [];
  }
}
