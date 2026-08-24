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
import { WatchVideoModalButton } from "@/components/ui/Atoms/WatchVideoModalButton/WatchVideoModalButton";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";

export async function GoldenSourcePageHeadingComponent({
  content
}: OptiComponentProps<typeof GoldenSourcePageHeadingComponentType>) {
  const { application, productFamily } = getContext() ?? {};
  const t = await getTranslations();
  const { WrappedRichTextField } = fieldFactory<typeof GoldenSourcePageHeadingComponentType>(content);

  let type;
  let title;

  // TODO Update links to new video page, application anchor, and product pages
  if (!content) {
    return null;
  } else if (application?.applicationId) {
    type = "application";
    title = (await getApplication(application.applicationId))?.appAreaName;
  } else if (productFamily?.familyId) {
    type = "product";
    title = (await getProductFamily(productFamily.familyId))?.familyName;
  }

  const { src, alt } = getStandardizedImage(content, content.bynderImage);
  const assetImageSrc = content.assetType === "image" ? src : undefined;
  const assetBrightcoveId = content.assetType === "brightcove" ? content.featureVideoId : undefined;

  const hasAsset = !!(assetImageSrc || assetBrightcoveId);
  const isGreyBackground = content.background === "grey";

  const body = (
    <SectionWrapper
        noPaddingTop={!isGreyBackground || hasAsset}
        noPaddingBottom={!isGreyBackground || hasAsset}
        className={isGreyBackground && hasAsset ? "pt-8 md:pt-12 pb-8 md:pb-12" : undefined}
      >
      <div className={hasAsset ? "flex flex-col md:flex-row gap-8 md:gap-12 justify-between" : ""}>
        <div className={hasAsset ? "flex flex-col flex-1 justify-center" : ""}>
          <h1 className="mb-0">{title}</h1>

          <DynamicHeading className="mb-0 mt-6 md:mt-8">
            <WrappedRichTextField
              field="subheadline"
              className="text-h3 font-light"
            />
          </DynamicHeading>

          <TifButtonGroup className="mt-8 md:mt-10" mobileBehavior="stack">
            {type === 'application' ?
              <TiButton href="#aem-application-Browse">
                {t('Browse applications')}
              </TiButton> :
              <TiButton href="products">
                {t('View all products')}
              </TiButton>
            }

            {type === 'application' && (
              content.secondaryCTA === 'video' && content.ctaVideoId ?
                <WatchVideoModalButton
                  videoId={content.ctaVideoId}
                  accountId={SERVER_ENV_VARS.BRIGHTCOVE_ACCOUNT_ID}
                  playerId={SERVER_ENV_VARS.BRIGHTCOVE_PLAYER_ID}
                /> : content.secondaryCTA === 'selection' ?
                <TiButton href="">
                  {t('View all products')}
                </TiButton> : ''
            )}
          </TifButtonGroup>
        </div>

        {assetImageSrc && (
          <div className="w-full md:max-w-[500px] ml-auto">
            <TiSlide
              style={{
                "--tiSlide-aspectRatio": "16/9",
                "--tiSlide-overlay-background": "none",
              } as React.CSSProperties}
              thumbnailSrc=""
              thumbnailLabel={alt ?? ""}
              backgroundImageSrc={assetImageSrc}
            />
          </div>
        )}

        {assetBrightcoveId && (
          <div className="w-full md:max-w-[450px] aspect-video ml-auto">
            <iframe
              src={`https://players.brightcove.net/${SERVER_ENV_VARS.BRIGHTCOVE_ACCOUNT_ID}/${SERVER_ENV_VARS.BRIGHTCOVE_PLAYER_ID}_default/index.html?videoId=${assetBrightcoveId}&autoplay=true&muted=true&loop=true`}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        )}

      </div>
    </SectionWrapper>
  );

  if (isGreyBackground) {
    return (
      <ThemeProvider theme="theme-grey" className="breadcrumb-overlay global-header-flush">
        {body}
      </ThemeProvider>
    );
  }

  return body;
}
