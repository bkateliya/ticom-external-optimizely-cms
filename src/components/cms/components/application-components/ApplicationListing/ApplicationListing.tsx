import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import { getContext } from "@optimizely/cms-sdk/react/server";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";

const rowClassMap = [
  "grid-rows-0",
  "grid-rows-1",
  "grid-rows-2",
  "grid-rows-3",
  "grid-rows-4",
  "grid-rows-5",
  "grid-rows-6",
  "grid-rows-7",
  "grid-rows-8",
];
export async function ApplicationListing() {
  const { application, applicationInfo } = getContext() ?? {};
  const t = await getTranslations();

  if (!applicationInfo?.children.length) {
    return null;
  }
  const totalRows = Math.ceil(applicationInfo.children.length / 3);

  let level: "root" | "market" | "sector" | "category";

  // We can't really simplify this because if there is both
  if (application?.categoryId) {
    level = "category";
  } else if (application?.sectorId) {
    level = "sector";
  } else if (application?.marketId) {
    level = "market";
  } else {
    level = "root";
  }

  return (
    <div data-length={applicationInfo.children.length} data-rows={totalRows}>
      <ul className={clsx("grid grid-flow-col gap-4", rowClassMap[totalRows])}>
        {applicationInfo?.children.map((topLevelLink) => {
          const showChildren =
            (level === "sector" || level === "root") &&
            topLevelLink.children.length;

          if (!showChildren) {
            if (!topLevelLink.appUrl) {
              return null;
            }
            return (
              <li
                key={topLevelLink.childId}
                className="u-padding-vertical-4 has-no-children u-margin-0"
              >
                <a
                  href={topLevelLink.appUrl}
                  className="u-header-5 u-color-teal5"
                  data-lid={`browseapplications-${topLevelLink.sectionName}`}
                  data-navtitle="learn-more"
                >
                  {topLevelLink.sectionName}
                </a>
              </li>
            );
          }

          return (
            <li key={topLevelLink.childId} className="u-padding-0 u-margin-0">
              <div
                className="collapsible js-collapsible js-collapsible-anchor u-margin-0 "
                data-lid={`browseapplications-${topLevelLink.sectionName}`}
              >
                {/* <!--collapsible item--> */}
                <div
                  className="collapsible-item js-collapsible-item"
                  id="{{uniqueID}}"
                >
                  {/* <!--collapsible trigger--> */}
                  <div className="collapsible-item-trigger js-collapsible-trigger u-header-5 u-color-teal5 u-padding-vertical-4 u-padding--0 ti_p-iconText u-fullWidth">
                    <span>{topLevelLink.sectionName}</span>
                    <span className="ti_p-iconText-icon u-margin-left-4">
                      <div className="ti_icon mod-size-s mod-color2 u-margin-0">
                        <TiSvgIcon icon="chevron-down" />
                      </div>
                    </span>
                  </div>
                  {/* <!--collapsible content--> */}
                  <div className="collapsible-item-content js-collapsible-content u-margin-0 ">
                    <ul className="u-list-unstyled u-divide-y mod-extra-padding mod-no-top-line mod-no-bottom-line u-margin-0 u-line-height-2">
                      {topLevelLink.children.map((link) => {
                        if (!link.appUrl) {
                          return null;
                        }
                        return (
                          <li key={link.childId}>
                            <a
                              href={link.appUrl}
                              className="u-color-teal5"
                              data-lid={`browseapplications-${link.sectionName}`}
                              data-navtitle="learn-more"
                            >
                              {link.sectionName}
                            </a>
                          </li>
                        );
                      })}
                      {topLevelLink.appUrl && (
                        <li className="ti_aem-application-CategoriesListing-learnmore">
                          <a
                            href={topLevelLink.appUrl ?? ""}
                            className="u-color-teal5 u-font-weight-heavy"
                            data-lid={`browseapplications-learn-more${topLevelLink.sectionName}`}
                            data-navtitle="learn-more"
                          >
                            <ti-svg-icon size="s" appearance="secondary">
                              arrow-right
                            </ti-svg-icon>
                            <span>{t("Learn more")}</span>
                          </a>
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
    </div>
  );
}
