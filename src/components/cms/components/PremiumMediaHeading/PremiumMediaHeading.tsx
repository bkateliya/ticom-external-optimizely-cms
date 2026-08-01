
import { fieldFactory } from "@/components/ui/cms";
import { PremiumMediaHeadingType } from "./PremiumMediaHeading.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { damAssets } from "@optimizely/cms-sdk";
import VideoSearchBar from "@/components/ui/Atoms/VideoSearchBar/VideoSearchBar";
import VideoPlayer from "@/components/ui/Atoms/VideoPlayer/VideoPlayer";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { CTAElementType } from "../../elements/CTA/CTA.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";


export function PremiumMediaHeadingComponent({
  content
}: OptiComponentProps<typeof PremiumMediaHeadingType>) {
      
  if (!content) {
    return null;
  }

  // TODO Swap for bynder
  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);
  const imageUrl = src(content.image);

  const ctas = normalizeGenericArrayToTyped<typeof CTAElementType>(content.ctaLinks);
  const hasCtas = !!ctas?.some((x) => x.link?.url.default);
  
  const { WrappedRichTextField } = fieldFactory< typeof PremiumMediaHeadingType>(content);

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
          <VideoSearchBar
            locale="en-US"
          />
        }
        
        { hasCtas && 
          ctas.map((cta, index) => (
            <ExtendedOptimizelyComponent key={cta._id || index} content={cta} />
          ))
        }


      <div className="ti_p-fullscreenVideoBGContainer u-breakout-container">
			<TiSlide
        thumbnailSrc=""
				show-video-controls={content.videoPlayerControls}
				background-video-src={content.featureOptions == 'videoOption' ? content.videoId : ''}
   			background-image-src={content.featureOptions == 'imageOption' ? imageUrl : ''}>
				<div className="ti_p-slideContent ti_p-page-responsive">
					<div className="ti_p-slideContent-column" data-sly-unwrap="${properties.contentLayout != 'vertical'}">
						<div className="ti_p-slideContent-text-container" data-sly-unwrap="${properties.contentLayout == 'vertical'}" >

							<div className="ti_p-slideContent-text">
                <WrappedRichTextField field="preHeadline"/>
								<h1 className="ti_aem-p-mediaShowcase--headline">
									{ content.headline}
								</h1>
								<WrappedRichTextField field="subheadline"/>
								Place CTA Here
							</div>
						</div>
					</div>
				</div>
			</TiSlide>

	</div>
        
      </div>

      
    );

}
