import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import { getContextData } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import { BreadcrumbEntry, getApplicationBreadcrumb, getProductFamilyBreadcrumb } from "./Breadcrumb.utils";


export async function Breadcrumb() {
  const breadcrumb = getContextData("breadcrumb") ?? [];

  let finalBreadcrumb: BreadcrumbEntry[] = breadcrumb;
  let lastSpan = true;
  let isProducts = false;

  const familyId = getContextData("productFamily")?.familyId;
  if (familyId) {
    lastSpan = false;
    isProducts = true;
    finalBreadcrumb = await getProductFamilyBreadcrumb(familyId);
  }

  const applicationId = getContextData("application")?.applicationId; //"11060";
  if (applicationId) {
    lastSpan = false;
    finalBreadcrumb = await getApplicationBreadcrumb(applicationId);
  }

  return (
    <SectionWrapper>
      <ti-breadcrumb
        className="ti_p-breadcrumb visible! md:collapse!"
        data-lid="breadcrumb"
      >
        <StaticBreadcrumbSections
          breadcrumb={finalBreadcrumb}
          lastAsSpan={lastSpan}
          isProducts={isProducts}
          mobile={true}
        />
      </ti-breadcrumb>

      <ti-breadcrumb
        className="ti_p-breadcrumb collapse! md:visible!"
        data-lid="breadcrumb"
      >
        <StaticBreadcrumbSections
          breadcrumb={finalBreadcrumb}
          lastAsSpan={lastSpan}
          isProducts={isProducts}
          mobile={false}
        />
      </ti-breadcrumb>
    </SectionWrapper>
  );
}

async function StaticBreadcrumbSections({
  breadcrumb,
  lastAsSpan,
  isProducts,
  mobile,
}: {
  breadcrumb: BreadcrumbEntry[];
  lastAsSpan: boolean;
  isProducts: boolean;
  mobile: boolean;
}) {
  const t = await getTranslations();
  return (
    <>
      {breadcrumb.map((item, index) => {
        return (
          <ti-breadcrumb-section
            key={item.url}
            data-lid={`breadcrumb_${index}-${item.titleEN ?? item.title}`}
            label={item.title}
            bid={index}
            is-home={index === 0}
            // This determines if dropdown menu appears
            size={!mobile && item.siblings?.length}
          >
            {lastAsSpan && index === breadcrumb.length - 1 ? (
              <span
                slot="trigger"
                className="text-body-md/[28px]"
                data-navtitle={`breadcrumb_${index}-${item.titleEN ?? item.title}`}
                id={`ti-breadcrumb-section-${index}`}
              >
                {item.title}
              </span>
            ) : (
              <>
                <a
                  slot="trigger"
                  data-navtitle={`breadcrumb_${index}-${item.titleEN ?? item.title}`}
                  id={`ti-breadcrumb-section-${index}`}
                  href={item.url}
                >
                  {item.title}
                </a>
                {!mobile && item.siblings?.length ? (
                  <ul
                    role="menu"
                    //   slot="content"
                    className="ti-breadcrumb-section ti-breadcrumb-section--parametric-icons"
                  >
                    {item.siblings.map((sibling, sibIndex) => (
                      <li role="presentation" key={sibling.url}>
                        {isProducts ? (
                          <span className="ti-breadcrumb-parametric-link">
                            <a
                              href={
                                sibling.url?.replace(
                                  "overview.html",
                                  "products.html",
                                ) ?? ""
                              }
                              id={`ti-breadcrumb-section-pf-${index}-item-${sibIndex + 1}`}
                              title={t("Product selection table")}
                              data-navtitle={`pf_${sibling.titleEN}`}
                            >
                              <TiSvgIcon icon="parametric-filter" size="s" />
                            </a>
                          </span>
                        ) : null}
                        <a
                          className="ti-breadcrumb-section-link"
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
              </>
            )}
          </ti-breadcrumb-section>
        );
      })}
    </>
  );
}
