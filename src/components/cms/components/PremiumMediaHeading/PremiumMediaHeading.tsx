
import { fieldFactory } from "@/components/ui/cms";
import { PremiumMediaHeadingComponentType } from "./PremiumMediaHeading.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { damAssets } from "@optimizely/cms-sdk";
import VideoSearchBar from "@/components/ui/Atoms/VideoSearchBar/VideoSearchBar";
import VideoPlayer from "@/components/ui/Atoms/VideoPlayer/VideoPlayer";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { CtaButtonElementType } from "../../elements/CTAButton/CTAButton.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";


export function PremiumMediaHeadingComponent({
  content
}: OptiComponentProps<typeof PremiumMediaHeadingComponentType>) {
      
  if (!content) {
    return null;
  }

  // TODO Swap for bynder
  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);
  const imageUrl = src(content.image);

  const ctas = normalizeGenericArrayToTyped<typeof CtaButtonElementType>(content.ctaLinks);
  const hasCtas = !!ctas?.some((x) => x.link?.url.default);
  
  const { WrappedRichTextField } = fieldFactory< typeof PremiumMediaHeadingComponentType>(content);

  return (
      <div>
        Preheadline: <WrappedRichTextField
          field="preHeadline"
        />
        Headline: {content.headline} <br/>
        Tagline: <WrappedRichTextField
          field="tagline"
        />
        Subheadline: <WrappedRichTextField
          field="subheadline"
        />

        { content.featureOptions === 'image' &&
          <div>
              {imageUrl && 
                <EnhancedNextImage
                  src={imageUrl}
                  alt={getAlt(content.image) ?? ""}
                />
              }
            </div>
        }

        { content.featureOptions === 'video' &&
          <div>
            Video: {content.videoId} <br/>
            {content.videoId && 
              <VideoPlayer
                videoId={content.videoId}
                controls={content.videoPlayerControls ?? false}>
              </VideoPlayer>
            }
          </div>
        }

        { content.searchBar === 'video' &&
          <VideoSearchBar/>
        }
        
        { hasCtas && 
          ctas.map((cta, index) => (
            <ExtendedOptimizelyComponent key={cta._id || index} content={cta} />
          ))
        }
        
      </div>

      
    );

}
