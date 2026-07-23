import { damAssets } from "@optimizely/cms-sdk";

import { ContentBlockComponentType } from "./ContentBlock.model";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { PreambleDirectHeadline } from "@/components/ui/molecules/SectionWrapper/Preamble";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";

export function ContentBlockComponent({
  content,
}: OptiComponentProps<typeof ContentBlockComponentType>) {
  if (!content) {
    return null;
  }

  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);
  const imageUrl = src(content.image);

  return (
    <PreambleDirectHeadline
      content={content}
      beforeElements={imageUrl && (
        <EnhancedNextImage
          // fill
          src={imageUrl}
          alt={getAlt(content.image) ?? ""}

          className="w-full h-auto object-contain"
        />
      )} />
  );
}
