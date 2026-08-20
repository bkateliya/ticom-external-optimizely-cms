import { OptiComponentProps } from "@/lib/ts/component-props";
import {
  ImageComparisonComponentType,
  ImageComparisonItemComponentType,
} from "./ImageComparison.model";
import { fieldFactory } from "@/components/ui/cms";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import {
  ContentPropsWithId,
  normalizeGenericArrayToTyped,
} from "@/lib/utils/content-type-utils";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import { TiImageComparison } from "@/components/ui/ti/TiImages/TiImageComparison/TiImageComparison";
import { TiSlide } from "@/components/ui/ti/TiSlideshow/TiSlide";
import { TiSlideShow } from "@/components/ui/ti/TiSlideshow/TiSlideShow";
import { getContextData } from "@optimizely/cms-sdk/react/server";

/** Matches the `ratio` the AEM component used for both comparison images. */
const IMAGE_RATIO = "rectangle";

/**
 * A single before/after comparison. Mirrors the AEM `imageComparison` markup:
 * left/right `ti-image`s plus optional labels and a caption.
 */
export function ImageComparisonItemComponent({
  content,
}: OptiComponentProps<typeof ImageComparisonItemComponentType>) {
  if (!content) {
    return null;
  }
  const { WrappedRichTextField } =
    fieldFactory<typeof ImageComparisonItemComponentType>(content);

  const leftImage = getStandardizedImage(content, content.leftImage);
  const rightImage = getStandardizedImage(content, content.rightImage);

  return (
    <TiImageComparison
      leftImage={{
        src: leftImage.src ?? "",
        alt: content.leftImageAltText || leftImage.alt,
        ratio: IMAGE_RATIO,
        dataMetricsName: getMetricsName(leftImage.src),
      }}
      rightImage={{
        src: rightImage.src ?? "",
        alt: content.rightImageAltText || rightImage.alt,
        ratio: IMAGE_RATIO,
        dataMetricsName: getMetricsName(rightImage.src),
      }}
      // The left/right captions go in the label slots, over their image, the
      // way the AEM component wired them. `caption` is the one slot that
      // renders below the figure, so the comparison caption owns it.
      leftLabel={
        content.leftImageCaption?.json ? (
          <WrappedRichTextField field="leftImageCaption" />
        ) : undefined
      }
      rightLabel={
        content.rightImageCaption?.json ? (
          <WrappedRichTextField field="rightImageCaption" />
        ) : undefined
      }
      caption={
        content.comparisonCaption?.json ? (
          <WrappedRichTextField field="comparisonCaption" />
        ) : undefined
      }
    />
  );
}

/**
 * Renders the authored comparisons. A single comparison renders on its own;
 * two or three go in a slideshow so the per-item thumbnails show up below the
 * gallery.
 */
export function ImageComparisonComponent({
  content,
}: OptiComponentProps<typeof ImageComparisonComponentType>) {
  if (!content) {
    return null;
  }

  const items = normalizeGenericArrayToTyped(
    content.imageComparisonItems,
    ImageComparisonItemComponentType,
  );

  if (items.length === 0) {
    return null;
  }

  if (items.length === 1) {
    return <ExtendedOptimizelyComponent content={items[0]} />;
  }

  const isPreview = !!getContextData("previewToken");

  return (
    <TiSlideShow
      isPreview={isPreview}
      showChevrons
      mobileHideChevrons
      thumbnailSize="small"
      slideElements={items.map((item) => ({
        element: (
          <TiSlide key={item._id} thumbnailSrc={getThumbnailSrc(item)}>
            <ExtendedOptimizelyComponent content={item} />
          </TiSlide>
        ),
        slideVisibility: "Visible",
      }))}
    />
  );
}

/**
 * Thumbnail for the slideshow navigation. The authored `thumbnail` wins; the
 * left image stands in when it isn't set (it is a hidden property today).
 */
function getThumbnailSrc(
  item: ContentPropsWithId<typeof ImageComparisonItemComponentType>,
): string {
  const thumbnail = getStandardizedImage(item, item.thumbnail);
  if (thumbnail.src) {
    return thumbnail.src;
  }
  const leftImage = getStandardizedImage(item, item.leftImage);
  return leftImage.thumbnailSrc || leftImage.src || "";
}

/**
 * The AEM component reported the asset filename as the metrics name, so keep
 * doing that: take the last path segment of the image URL.
 *
 * `src` is typed as a string but Graph can hand back a null `original` for a
 * Bynder asset, so treat it as optional.
 */
function getMetricsName(src: string | undefined): string | undefined {
  return src?.split("?")[0].split("/").pop() || undefined;
}
