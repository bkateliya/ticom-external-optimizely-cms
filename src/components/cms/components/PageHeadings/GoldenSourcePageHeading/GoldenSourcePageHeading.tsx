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
import { WatchVideoModalCTAButton } from "@/components/ui/Atoms/WatchVideoModalButton/WatchVideoModalCTAButton";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { normalizeGenericArrayToTyped, normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { CtaButtonElementType } from "../../../elements/CTAButton/CTAButton.model";
import { CTAButtonElement } from "../../../elements/CTAButton";
import { CtaVideoElementType } from "../../../elements/CTAVideoModal/CTAVideoModal.model";
import { StandardImageComponentType } from "../../Image/StandardImage.model";
import { VideoPlayerComponentType } from "../../VideoPlayer/VideoPlayer.model";
import { getStandardizedImageFromContract } from "@/lib/utils/image-utils";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";

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

  const imageAsset = normalizeGenericContentToTyped(content.featureAsset, StandardImageComponentType);
  const videoAsset = normalizeGenericContentToTyped(content.featureAsset, VideoPlayerComponentType);

  const { src: assetImageSrc, alt } = imageAsset
    ? getStandardizedImageFromContract(imageAsset)
    : { src: undefined, alt: undefined };

  const assetVideoId = videoAsset?.videoPlayerType === "singleVideo" ? videoAsset.id ?? undefined : undefined;

  const hasAsset = !!(assetImageSrc || assetVideoId);
  const isGreyBackground = content.background === "grey";

  const body = (
    <SectionWrapper
        noPaddingTop={!isGreyBackground || hasAsset}
        noPaddingBottom
        className={
          isGreyBackground && hasAsset ? "pt-16 md:pt-22 pb-8 md:pb-12" :
          isGreyBackground ? "pb-12 md:pb-20" :
          undefined
        }
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

            {normalizeGenericArrayToTyped<typeof CtaButtonElementType>(content.ctaLinks, CtaButtonElementType)
              .map((cta) => (
                <CTAButtonElement key={cta._id} content={cta} />
              ))
            }

            {normalizeGenericArrayToTyped<typeof CtaVideoElementType>(content.ctaLinks, CtaVideoElementType)
              .map((cta) => (
                <WatchVideoModalCTAButton key={cta._id} videoId={cta.videoId ?? ""} />
              ))
            }
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

        {assetVideoId && (
          <div className="w-full md:max-w-[500px] ml-auto">
            <div className="relative aspect-video">
              <iframe
                src={`https://players.brightcove.net/${SERVER_ENV_VARS.BRIGHTCOVE_ACCOUNT_ID}/${SERVER_ENV_VARS.BRIGHTCOVE_PLAYER_ID}_default/index.html?videoId=${assetVideoId}&autoplay=true&muted=true&loop=true`}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
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
