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

const IMAGE_RATIO = "rectangle";

export function ImageComparisonItemComponent({
  content,
  hoistCaption,
}: OptiComponentProps<typeof ImageComparisonItemComponentType> & {
  hoistCaption?: boolean;
}) {
  if (!content) {
    return null;
  }
  const { WrappedRichTextField } =
    fieldFactory<typeof ImageComparisonItemComponentType>(content);

  const leftImage = getStandardizedImage(content, content.leftImage);
  const rightImage = getStandardizedImage(content, content.rightImage);

  const caption = content.comparisonCaption?.json ? (
    <WrappedRichTextField field="comparisonCaption" />
  ) : undefined;

  return (
    <>
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
        leftOverlay={
          content.leftImageOverlay?.json ? (
            <WrappedRichTextField field="leftImageOverlay" />
          ) : undefined
        }
        rightOverlay={
          content.rightImageOverlay?.json ? (
            <WrappedRichTextField field="rightImageOverlay" />
          ) : undefined
        }
        caption={hoistCaption ? undefined : caption}
      />
      {/* Direct child of ti-slide: the slot name matches no ti-slide slot, so it
          stays hidden here and only ti-slideshow's caption row renders it. */}
      {hoistCaption && caption && <div slot="caption">{caption}</div>}
    </>
  );
}

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
      thumbnailSize="small"
      slideElements={items.map((item) => ({
        element: (
          <TiSlide key={item._id} thumbnailSrc={getThumbnailSrc(item)}>
            {/* Rendered directly rather than through the registry so the slide
                can opt into the slideshow's own caption row. */}
            <ImageComparisonItemComponent content={item} hoistCaption />
          </TiSlide>
        ),
        slideVisibility: "Visible",
      }))}
    />
  );
}

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

function getMetricsName(src: string | undefined): string | undefined {
  return src?.split("?")[0].split("/").pop() || undefined;
}
