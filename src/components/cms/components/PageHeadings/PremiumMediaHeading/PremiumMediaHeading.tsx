import { fieldFactory } from "@/components/ui/cms";
import { PremiumMediaHeadingComponentType } from "./PremiumMediaHeading.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import VideoSearchBar from "@/components/ui/Atoms/VideoSearchBar/VideoSearchBar";
import { TifButtonGroup } from "@ticom/form-components/react";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import { CTAButtonElement } from "@/components/cms/elements/CTAButton";
import { CtaVideoElementType } from "@/components/cms/elements/CTAVideoModal/CTAVideoModal.model";
import { CtaVideoElement } from "@/components/cms/elements/CTAVideoModal";
import { ButtonAppearance, ComponentTheme } from "@/components/ui/ti/enums";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import { isEditMode } from "@/lib/opti/edit-helpers";
import { getBynderVideoFromContext } from "@/lib/data/bynder";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { BackgroundImageSetting, BackgroundVideoSetting } from "@/components/cms/contracts/component-contracts/section.model";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";

export function PremiumMediaHeadingComponent({
  content,
}: OptiComponentProps<typeof PremiumMediaHeadingComponentType>) {
  if (!content) {
    return null;
  }

  const backgroundImageSetting = normalizeGenericContentToTyped(content.background, BackgroundImageSetting);
  const backgroundVideoSetting = normalizeGenericContentToTyped(content.background, BackgroundVideoSetting);

  const { src: backgroundImageSrc } = backgroundImageSetting
    ? getStandardizedImage(backgroundImageSetting, backgroundImageSetting.backgroundImage)
    : { src: undefined };

  const { WrappedRichTextField } =
    fieldFactory<typeof PremiumMediaHeadingComponentType>(content);

  const backgroundVideoSrc = backgroundVideoSetting?.backgroundVideo
    ? getBynderVideoFromContext(backgroundVideoSetting.backgroundVideo)?.original
    : undefined;
  const hasBackground = !!(backgroundImageSrc || backgroundVideoSrc);
  const showVideoControls = backgroundVideoSetting?.videoPlayerControls ?? false;

  const isEditCanvas = isEditMode();
  // In CMS edit mode the page renders inside an iframe, so 100dvh refers to
  // the iframe height — not the real viewport. Cap at 900px to avoid layout
  // issues in the editor (same approach as ThemedSection).
  const fullHeight = isEditCanvas ? "900px" : "calc(100dvh - var(--ti-header-height, 0px))";
  const heightStyle = content.heightOption === "default"
    ? { minHeight: "450px" }
    : { minHeight: fullHeight };

  const body = (
    <SectionWrapper style={heightStyle}>
      <div className={[
          "flex flex-col md:max-w-2/3 mt-8 md:mt-4",
          content.heightOption === "full" ? "mt-16 md:mt-24 mb-16 md:mb-24"
            : showVideoControls ? "md:mb-8"
            : "",
          hasBackground && "text-white",
        ].filter(Boolean).join(" ")}>
        <WrappedRichTextField field="preHeadline" className="uppercase mb-4" />

        <h1 className="mb-0">{content.pageHeadline}</h1>

        <WrappedRichTextField
          field="pageSubheadline"
          className="mt-4 text-h3 font-light"
        />

        <WrappedRichTextField
          field="tagline"
          className="mt-4 text-h3 font-light"
        />

        {content.searchBar === "video" && <VideoSearchBar />}

        {(content.ctaLinks?.length ?? 0) > 0 && (
          <TifButtonGroup className="mt-12" mobileBehavior="stack">
            {content.ctaLinks?.map((cta, index) => {
              const buttonCta = normalizeGenericContentToTyped(cta, CtaButtonElementType);
              const videoCta = normalizeGenericContentToTyped(cta, CtaVideoElementType);
              if (buttonCta) {
                return <CTAButtonElement key={buttonCta._id || index} content={buttonCta} appearance={ButtonAppearance.outline} />;
              }
              if (videoCta) {
                return <CtaVideoElement key={videoCta._id || index} content={videoCta} appearance={ButtonAppearance.outline} />;
              }
              return null;
            })}
          </TifButtonGroup>
        )}
      </div>
    </SectionWrapper>
  );

  const slideStyle: React.CSSProperties & Record<`--tiSlide-${string}`, string> = {
    "--tiSlide-aspectRatio": "auto",
    ...(backgroundImageSetting?.noOverlay
      ? { "--tiSlide-overlay-background": "none" }
      : backgroundImageSetting?.backgroundTheme === "light"
        ? { "--tiSlide-overlay-background-color-rgb": "255 255 255" }
        : {}),
  };

  if (hasBackground) {
    return (
      <ThemeProvider mode={ComponentTheme.dark}>
        <div className="breadcrumb-reversed breadcrumb-overlay global-header-flush">
          <TiSlide
            style={slideStyle}
            thumbnailSrc=""
            thumbnailLabel=""
            backgroundImageSrc={backgroundImageSrc}
            backgroundVideoSrc={backgroundVideoSrc}
            showVideoControls={showVideoControls}
          >
            {body}
          </TiSlide>
        </div>
      </ThemeProvider>
    );
  }

  return body;
}
