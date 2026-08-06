import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { getContext } from "@optimizely/cms-sdk/react/server";
import { getLocale, getTranslations } from "next-intl/server";
import { FAQSearchBoxComponentType } from "./FAQSearchBox.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { FAQSearchInput } from "./FAQSearchInput";

const SEARCH_URL_KEY =
    "https://{0}/sitesearch/{1}/docs/universalsearch.tsp?langPref=en-US&nr=25&searchTerm=%00";

export async function FAQSearchBox({
    content,
}: OptiComponentProps<typeof FAQSearchBoxComponentType>) {
    if (!content) {
        return null;
    }

    const t = await getTranslations();
    const locale = await getLocale();

    // The catalog entry carries the localized `langPref` and the `%00` the search
    // term is appended after.
    const localizedUrl = t(SEARCH_URL_KEY, { 0: "", 1: locale });
    // Search lives on the legacy TI stack, so the host comes from the CMS site
    // (same source as the canonical tag) rather than the catalog's `https://{0}`,
    // which would force https on a http dev host. Empty outside a site context,
    // e.g. CMS preview, leaving a host-relative URL.
    const host = getContext()?.siteBaseUrl?.replace(/\/$/, "") ?? "";
    const searchBaseUrl =
        host + localizedUrl.slice(localizedUrl.indexOf("/sitesearch"));
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
