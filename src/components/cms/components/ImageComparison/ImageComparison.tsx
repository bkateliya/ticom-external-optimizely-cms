import { damAssets } from "@optimizely/cms-sdk";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";

import { ImageComparisonComponentType } from "./ImageComparison.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { TiImageComparison } from "@/components/ui/ti/TiImages/TiImageComparison/TiImageComparison";

export function ImageComparisonComponent({
  content,
}: OptiComponentProps<typeof ImageComparisonComponentType>) {
  if (!content) {
    return null;
  }

  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  const leftImageUrl = src(content.leftImage);
  const rightImageUrl = src(content.rightImage);

  if (!leftImageUrl || !rightImageUrl) {
    return null;
  }

  return (
    <TiImageComparison
      disableMousewheel={content.disableMouseWheel ?? undefined}
      tiAriaLabel={content.tiAriaLabel ?? undefined}
      leftImage={{
        src: leftImageUrl,
        alt: getAlt(content.leftImage) ?? "",
      }}
      rightImage={{
        src: rightImageUrl,
        alt: getAlt(content.rightImage) ?? "",
      }}
      leftLabel={content.leftImageSlotLabel || undefined}
      rightLabel={content.rightImageSlotLabel || undefined}
      caption={content.slottedCaption || undefined}
    />
  );
}
