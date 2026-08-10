import { getLocale, getTranslations } from "next-intl/server";
import { FAQSearchBoxComponentType } from "./FAQSearchBox.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { FAQSearchInput } from "./FAQSearchInput";
import { SHARED_ENV_VARS } from "@/lib/env/shared-env";

export async function FAQSearchBox({
  content,
}: OptiComponentProps<typeof FAQSearchBoxComponentType>) {
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
  // The catalog entry carries the localized `langPref` and the `%00` the search
  // term is appended after.
  const searchBaseUrl = t(
    "https://{0}/sitesearch/{1}/docs/universalsearch.tsp?langPref=en-US&nr=25&searchTerm=%00",
    { 0: host, 1: locale },
  );
  const searchPreFilter = t("FAQs,Ordering");

  return (
    <>
      <DynamicHeading className="text-h3 font-light mb-6 text-center">
        {t("Find answers to your ordering questions")}
      </DynamicHeading>
      <FAQSearchInput
        className="mx-auto text-pl-input-element-color"
        placeholder={t("Search ordering FAQs")}
        baseUrl={searchBaseUrl}
        preFilter={searchPreFilter}
      />
    </>
  );
}
