import { getLocale, getTranslations } from "next-intl/server";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { getSilos } from "@/lib/api/cms-api";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";
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
  parentField,
}: OptiComponentProps<typeof PartnerResourceFilterComponentType>) {
  if (!content) {
    return null;
  }

  const { WrappedHeadingTextField } = fieldFactory<
    typeof PartnerResourceFilterComponentType
  >(content, parentField);

  const t = await getTranslations();
  const locale = await getLocale();
  const productCategories = await getProductCategories();

  const host = SERVER_ENV_VARS.TICOM_BASE_DOMAIN.replace(
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
    <SectionWrapper className="[&_.space-y-4]:space-y-0">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <WrappedHeadingTextField
          field="headline"
          className="text-h3 font-light"
        />
        <a
          href={viewAllUrl}
          className="text-body-md text-pl-link-color-primary no-underline hover:underline mb-6 md:mb-0 md:mt-2"
        >
          {t("View all partner resources")}
        </a>
      </div>
      <div className="border border-pl-border-color-tertiary bg-pl-container-background-color-secondary p-4 md:p-8">
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
