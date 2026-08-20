import { fieldFactory } from "@/components/ui/cms";
import { PremiumMediaHeadingComponentType } from "./PremiumMediaHeading.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";
import VideoSearchBar from "@/components/ui/Atoms/VideoSearchBar/VideoSearchBar";
import VideoPlayer from "@/components/ui/Atoms/VideoPlayer/VideoPlayer";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { CtaButtonElementType } from "../../../elements/CTAButton/CTAButton.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { getStandardizedImage } from "@/lib/utils/image-utils";

export function PremiumMediaHeadingComponent({
  content,
}: OptiComponentProps<typeof PremiumMediaHeadingComponentType>) {
  if (!content) {
    return null;
  }

  const { src, alt } = getStandardizedImage(content, content.bynderImage);

  const ctas = normalizeGenericArrayToTyped<typeof CtaButtonElementType>(
    content.ctaLinks,
  );
  const hasCtas = !!ctas?.some((x) => x.link?.url.default);

  const { WrappedRichTextField } =
    fieldFactory<typeof PremiumMediaHeadingComponentType>(content);

  return (
    <div>
      Preheadline: <WrappedRichTextField field="preHeadline" />
      Headline: {content.pageHeadline} <br />
      Tagline: <WrappedRichTextField field="tagline" />
      Subheadline: <WrappedRichTextField field="pageSubheadline" />
      {content.featureOptions === "image" && (
        <div>{src && <EnhancedNextImage src={src} alt={alt ?? ""} />}</div>
      )}
      {content.featureOptions === "video" && (
        <div>
          Video: {content.videoId} <br />
          {content.videoId && (
            <VideoPlayer
              videoId={content.videoId}
              controls={content.videoPlayerControls ?? false}
            ></VideoPlayer>
          )}
        </div>
      )}
      {content.searchBar === "video" && <VideoSearchBar />}
      {hasCtas &&
        ctas.map((cta, index) => (
          <ExtendedOptimizelyComponent key={cta._id || index} content={cta} />
        ))}
    </div>
  );
}
