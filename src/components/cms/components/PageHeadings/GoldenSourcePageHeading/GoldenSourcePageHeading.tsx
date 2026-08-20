import { getContext } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import { getApplication, getProductFamily } from "../../../../../lib/api/cms-api";
import { fieldFactory } from "@/components/ui/cms";
import { GoldenSourcePageHeadingComponentType } from "./GoldenSourcePageHeading.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";
import { TifButtonGroup } from "@ticom/form-components/react";

export async function GoldenSourcePageHeadingComponent({
  content
}: OptiComponentProps<typeof GoldenSourcePageHeadingComponentType>) {
  const { application, productFamily } = getContext() ?? {};
  const t = await getTranslations();
  const { WrappedRichTextField } = fieldFactory< typeof GoldenSourcePageHeadingComponentType>(content);


  let type;
  let title;

  // TODO Update links to new video page, application anchor, and product pages
  // Translations might have to be updated from "Watch the video" to "Watch video"
  if (!content) {
    return null;
  } else if (application?.applicationId) {
    type = "application";
    title = (await getApplication(application.applicationId))?.appAreaName;
  } else if (productFamily?.familyId) {
    type = "product";
    title = (await getProductFamily(productFamily.familyId))?.familyName;
  }

  return (
    <SectionWrapper noPaddingTop noPaddingBottom>
      <h1 className="mb-0">{title}</h1>

      <DynamicHeading className="mb-0 mt-6 md:mt-8"><WrappedRichTextField
        field="subheadline"
        className="text-h3 font-light"
      /></DynamicHeading>

      <TifButtonGroup className="mt-8 md:mt-10">
        { type === 'application' ?
          <TiButton href="#aem-application-Browse">
            { t('Browse applications') }
          </TiButton> :
          <TiButton href="products">
            { t('View all products') }
          </TiButton>
        }

        { type === 'application' && (
          content.secondaryCTA === 'video' ?
            <TiButton href="">
              { t('Watch the video') }
            </TiButton> : content.secondaryCTA === 'selection' ?
            <TiButton href="">
              { t('View all products') }
            </TiButton> : ''
        )}
      </TifButtonGroup>
    </SectionWrapper>
  );
}
