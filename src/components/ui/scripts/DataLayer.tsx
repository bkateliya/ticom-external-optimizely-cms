import { CommonPageContractType } from "@/components/cms/contracts/common";
import { getPageHeading } from "@/lib/data/opti";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getContext } from "@optimizely/cms-sdk/react/server";
import Script from "next/script";

export async function DataLayer({
  content,
  locale,
}: {
  content: OptiComponentProps<CommonPageContractType>["content"];
  locale: string;
}) {
  const {
    application,
    applicationInfo,
    productFamily,
    familyInfo,
    breadcrumb,
  } = getContext() ?? {};
  const pageHeading = getPageHeading(content);

  const tiPageName = convertToUnicode(
    `${application ? applicationInfo?.enSectionName : productFamily ? familyInfo?.enFamilyName : pageHeading?.pageHeadline} ${locale}`,
  );
  // Combination of tab name (livesite value) and region.  This will be derived as defined in the Web Metrics Component story.
  // Ex: tiPageName = "Operational amplifiers \u0028op amps\u0029 en-us";

  const contentGroup =
    (application
      ? applicationInfo?.ancestors
          .toReversed()
          .map((x) => convertToUnicode(x.enSectionName))
      : productFamily
        ? familyInfo?.ancestors
            .toReversed()
            .map((x) => convertToUnicode(x.enFamilyName))
        : breadcrumb?.map((x) => convertToUnicode(x.titleEN))) ?? [];
  const tiContentGroup = `/${contentGroup.join("/")}/`;
  // Retrieved via service call using compVariationID, familyID, and tabID
  // This needs to correctly account for handling terms that contain ‘/’ like ‘AC/DC’ to add a separator to the field isn’t parsed incorrectly as it is today by the analytics code which splits on ‘/’
  // Use familyID to call the family category hierarchy names for the tiContentGroup
  // Ex: tiContentGroup = "/Analog and Mixed-Signal/amplifiers/operational amplifiers \u0028op amps\u0029/";

  const tiProductPathID = productFamily
    ? `/${familyInfo?.ancestors
        .toReversed()
        .map((x) => x.familyId)
        .join("/")}/`
    : "";
  // Retrieved via service call using compVariationID, familyID, and tabID
  // Ex: tiProductPathID = "/57/1293/";

  const tiAppsPathID = application
    ? `/${applicationInfo?.ancestors
        .toReversed()
        .map((x) => x.childId)
        .join("/")}/`
    : "";
  // Retrieved via service call using compVariationID, applicaionID, and tabID
  // Ex: tiAppsPathId = "/307/22420/";

  const tiPageTranslationStatus = locale;
  // Indicates the language of the page – not the URL path but the language the page is translated
  // This should be for pages that are translated and published
  // Ex: tiPageTranslationStatus = “zh-cn”

  const tiTemplate = "";
  // top level category of page type
  // we want to keep this consistent to the values set today
  // Ex: tiTemplate = "application portfolio";

  const tiCMS_Template = "";
  // template being used for the content/page.   There could be multiple tiCMS_Template values under a tiTemplate
  // ex: tiCMS_Template = "applications overview";

  const data = {
    tiPageName,
    tiContentGroup,
    tiProductPathID,
    tiAppsPathID,
    tiPageTranslationStatus,
    tiTemplate,
    tiCMS_Template,
  };
  return (
    <>
      <Script id="DataLayer">{`
            ${Object.keys(data)
              .map(
                (x) => `
                window.${x}="${data[x as keyof typeof data]}";`,
              )
              .join("")}
            
            window.metrics = window.metrics ?? {};
            metrics.namespace = metrics.namespace ?? {};
                   ${Object.keys(data)
                     .map(
                       (x) => `
                metrics.namespace.${x}="${data[x as keyof typeof data]}";`,
                     )
                     .join("")}
      `}</Script>
      <Script
        src={`${SERVER_ENV_VARS.TICOM_BASE_DOMAIN}/assets/js/headerfooter/analytics.js`}
        type="text/javascript"
        // Ensure this loads after variables are populated.
        strategy="lazyOnload"
      ></Script>
    </>
  );
}

// Ported from AEM code
function convertToUnicode(str: string | null | undefined) {
  return encodeURIComponent(str ?? "");
//   let replacedValue = str;

//   //   console.log("before encoding " + replacedValue);

//   if (replacedValue) {
//     replacedValue = replacedValue.replaceAll("&gt;", "\\u003E");
//     replacedValue = replacedValue.replaceAll("&lt;", "\\u003C");
//     replacedValue = replacedValue.replaceAll("+", "\\u002B");
//     replacedValue = replacedValue.replaceAll("<", "\\u003C");
//     replacedValue = replacedValue.replaceAll("=", "\\u003D");
//     replacedValue = replacedValue.replaceAll(">", "\\u003E");
//     replacedValue = replacedValue.replaceAll("(", "\\u0028");
//     replacedValue = replacedValue.replaceAll(")", "\\u0029");
//     replacedValue = replacedValue.replaceAll('"', "\\u0022");
//     replacedValue = replacedValue.replaceAll("& ", "\\u0026 ");
//     replacedValue = replacedValue.replaceAll("/", encodeURIComponent("/"));
//   }
//   //   console.log("replacedValue string is " + replacedValue);
//   return replacedValue;
}
