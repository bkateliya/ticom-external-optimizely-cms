import {
  // getContextData,
  getPreviewUtils,
  OptimizelyComposition,
  setContextData,
} from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import { GenericExperienceType } from "./GenericExperience.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
// import { getTranslations } from "next-intl/server";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";

type Props = {
  content: ContentProps<typeof GenericExperienceType>;
};

export async function GenericExperience({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  // const t = await getTranslations();
  // const siteSettings = getContextData("siteSettings");
  // console.log("siteSettings", siteSettings);
  // content.hero
  setContextData(
    "pageTitle",
    content.pageTitle || content.hero?.headline || "",
  );
  return (
    <main className="generic-experience">
      <SectionWrapper>
        <h1 {...pa("pageTitle")}>{content.pageTitle}</h1>
      </SectionWrapper>
      {/* <pre>
        {t("https://www.ti.com/tool/{0}", { 0: "my-custom-tool-slug" })}        
      </pre>
      <pre>{t(" and related policies.")}</pre>
      <pre>{t("View all {value}", { value: "5" })}</pre>
      {t("Showing {0} of {1} results with {2} in title.", {
        0: "5",
        1: "100",
        2: "test",
      })} */}
      {/* <pre>{t("", {0: "5", 1: "100", 2: "test"})}</pre> */}
      {/* <pre>{JSON.stringify(siteSettings, null, 2)}</pre> */}
      {content.hero && (
        <div className="about-section">
          <ExtendedOptimizelyComponent
            content={content.hero}
            parentField="hero"
          />
        </div>
      )}

      <OptimizelyComposition
        nodes={content.composition.nodes ?? []}
      />
    </main>
  );
}
