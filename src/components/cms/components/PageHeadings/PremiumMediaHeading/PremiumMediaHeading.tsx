import { fieldFactory } from "@/components/ui/cms";
import { PremiumMediaHeadingComponentType } from "./PremiumMediaHeading.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import VideoSearchBar from "@/components/ui/Atoms/VideoSearchBar/VideoSearchBar";
import { WatchVideoModalButton } from "@/components/ui/Atoms/WatchVideoModalButton/WatchVideoModalButton";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { CtaLinkElementType } from "../../../elements/CTALink/CTALink.model";
import { ButtonAppearance } from "@/components/ui/ti/enums";
import { TifButton, TifButtonGroup } from "@ticom/form-components/react";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";
import { isEditMode } from "@/lib/opti/edit-helpers";
import { getBynderVideoFromContext } from "@/lib/data/bynder";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";

export function PremiumMediaHeadingComponent({
  content,
}: OptiComponentProps<typeof PremiumMediaHeadingComponentType>) {
  if (!content) {
    return null;
  }

  const { src, alt } = getStandardizedImage(content, content.bynderImage);

  const ctas = normalizeGenericArrayToTyped<typeof CtaLinkElementType>(
    content.ctaLinks,
  );
  const hasCtas = !!ctas?.some((x) => x.link?.url.default);

  const { WrappedRichTextField } =
    fieldFactory<typeof PremiumMediaHeadingComponentType>(content);

  const backgroundImageSrc = content.featureOptions === "image" ? src : undefined;
  const bynderVideo = content.featureOptions === "video" && content.bynderVideo
    ? getBynderVideoFromContext(content.bynderVideo)
    : undefined;
  const backgroundVideoSrc = bynderVideo?.original ?? undefined;
  const hasBackground = !!(backgroundImageSrc || backgroundVideoSrc);
  const showVideoControls = content.featureOptions === "video" && (content.videoPlayerControls ?? false);

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
          field="tagline"
          className="mt-4 text-h3 font-light"
        />

        <WrappedRichTextField
          field="pageSubheadline"
          className="mt-4 text-h3 font-light"
        />

        {content.searchBar === "video" && <VideoSearchBar />}

        {(hasCtas || content.videoId) && (
          <TifButtonGroup className="mt-12" mobileBehavior="stack">
            {ctas.map((cta, index) => (
              <TifButton
                key={cta._id || index}
                href={cta.link?.url.default ?? ""}
                appearance={ButtonAppearance.outline}
                theme="dark"
              >
                {cta.link?.text}
              </TifButton>
            ))}
            {content.videoId && (
              <WatchVideoModalButton
                videoId={content.videoId}
                appearance={ButtonAppearance.outline}
                theme="dark"
                accountId={SERVER_ENV_VARS.BRIGHTCOVE_ACCOUNT_ID}
                playerId={SERVER_ENV_VARS.BRIGHTCOVE_PLAYER_ID}
              />
            )}
          </TifButtonGroup>
        )}
      </div>
    </SectionWrapper>
  );

  if (hasBackground) {
    return (
      <div className="breadcrumb-reversed breadcrumb-overlay global-header-flush">
        <TiSlide
          style={{ "--tiSlide-aspectRatio": "auto" } as React.CSSProperties}
          thumbnailSrc=""
          thumbnailLabel={alt ?? ""}
          backgroundImageSrc={backgroundImageSrc}
          backgroundVideoSrc={backgroundVideoSrc}
          showVideoControls={showVideoControls}
        >
          {body}
        </TiSlide>
      </div>
    );
  }

  return body;
}
