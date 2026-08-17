import { getLocale, getTranslations } from "next-intl/server";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { getSilos } from "@/lib/api/cms-api";
import { SHARED_ENV_VARS } from "@/lib/env/shared-env";
import {
  GenericContentType,
  normalizeGenericArrayToTyped,
} from "@/lib/utils/content-type-utils";
import { PartnerResourceFilterComponentType } from "./PartnerResourceFilter.model";
import { PartnerResourceFilterOptionComponentType } from "./PartnerResourceFilterOption.model";
import { PartnerResourceFilterForm } from "./PartnerResourceFilterForm";

function optionTexts(items: GenericContentType[] | undefined | null) {
  return normalizeGenericArrayToTyped(
    items,
    PartnerResourceFilterOptionComponentType,
  )
    .map((option) => option.OptionText?.trim())
    .filter((text): text is string => !!text);
}

async function getProductCategories(): Promise<string[]> {
  try {
    const silos = await getSilos();

    return (silos ?? [])
      .map((silo) => silo.familyName?.replace(/&amp;/g, "&").trim())
      .filter((name): name is string => !!name)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error("Get Product Silos CMS API failed", error);
    return [];
  }
}

export async function PartnerResourceFilter({
  content,
}: OptiComponentProps<typeof PartnerResourceFilterComponentType>) {
  if (!content) {
    return null;
  }

  const t = await getTranslations();
  const locale = await getLocale();
  const productCategories = await getProductCategories();

  const host = SHARED_ENV_VARS.NEXT_PUBLIC_TICOM_BASE_DOMAIN.replace(
    /https?:\/\//,
    "",
  );
  const searchBaseUrl = t(
    "https://{0}/sitesearch/{1}/docs/universalsearch.tsp?langPref=en-US&nr=25&searchTerm=%00",
    { 0: host, 1: locale },
  );
  const provider = t("Partner companies");
  const viewAllUrl = `${searchBaseUrl}&preFilter=designResourceProvider_${encodeURIComponent(provider)}`;

  return (
    <SectionWrapper>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
        <DynamicHeading className="text-h3 font-light">
          {t("Find partner resources and/or companies")}
        </DynamicHeading>
        <a
          href={viewAllUrl}
          className="text-body-md text-pl-link-color-primary no-underline hover:underline"
        >
          {t("View all partner resources")}
        </a>
      </div>
      <div className="rounded-[2px] border border-[#e8e8e8] bg-[#f7f7f7] p-8 max-sm:px-6 max-sm:py-6">
        <PartnerResourceFilterForm
          baseUrl={searchBaseUrl}
          provider={provider}
          placeholderLabel={t("Select")}
          submitLabel={t("Find resources")}
          fields={[
            {
              facet: "products",
              label: t("Product category"),
              options: productCategories,
            },
            {
              facet: "designResources",
              label: t("Resource category"),
              options: optionTexts(content.resourceCategory),
            },
            {
              facet: "partnerRegions",
              label: t("Region"),
              options: optionTexts(content.region),
            },
          ]}
        />
      </div>
    </SectionWrapper>
  );
}
