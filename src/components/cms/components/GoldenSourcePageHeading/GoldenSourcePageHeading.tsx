import { getContext } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import { getApplication, getProductFamily } from "../../../../lib/api/cms-api";
import { fieldFactory } from "@/components/ui/cms";
import { GoldenSourcePageHeadingComponentType } from "./GoldenSourcePageHeading.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";

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
    <div>
      <h1>Title: {title}</h1>

    Subheadline: 
    <DynamicHeading><WrappedRichTextField
      field="subheadline"
    /></DynamicHeading> 

      { type === 'application' ? 
        <a href="#aem-application-Browse" >
          <span>{ t('Browse applications') }</span>
        </a> :
        <a href="products" >
          <span>{ t('View all products') }</span>
        </a>
      }

      { type === 'application' && (
        content.secondaryCTA === 'video' ? 
          <a href="" > 
            <span>{ t('Watch the video') }</span>
          </a> : content.secondaryCTA === 'selection' ? 
          <a href="" > 
            <span>{ t('View all products') }</span>
          </a> : ''
      )}
    </div>
  );
}
