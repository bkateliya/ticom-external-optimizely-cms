import {
  ScrollingStorySubTextColor,
  TiScrollingStory,
  TiScrollingStorySlide,
} from "@/components/ui/ti/TiScrollingStory/TiScrollingStory";
import { OptiComponentProps } from "@/lib/ts/component-props";
import {
  ScrollingStoryVerticalComponentType,
  ScrollingStoryVerticalContentComponentType,
} from "./ScrollingStoryVertical.model";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { fieldFactory } from "@/components/ui/cms";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";

export function ScrollingStoryVerticalContentComponent({
  content,
}: OptiComponentProps<typeof ScrollingStoryVerticalContentComponentType>) {
  if (!content) {
    return null;
  }
  const { WrappedRichTextField } =
    fieldFactory<typeof ScrollingStoryVerticalContentComponentType>(content);

  const { src, alt } = getStandardizedImage(content, content.bynderImage);
  return (
    <TiScrollingStorySlide
      {...{
        highlight: <WrappedRichTextField field="highlight" />,
        title: <WrappedRichTextField field="title" />,
        description: <WrappedRichTextField field="description" />,
        imgSrc: src,
        imgAlt: alt,
        ctaList: <ExtendedOptimizelyComponent content={content.ctasList} />,
      }}
    />
  );
}
export function ScrollingStoryVerticalComponent({
  content,
}: OptiComponentProps<typeof ScrollingStoryVerticalComponentType>) {
  if (!content) {
    return null;
  }

  const stories = normalizeGenericArrayToTyped(
    content.stories,
    ScrollingStoryVerticalContentComponentType,
  );
  const { subText, sectionHeadline, subTextColor } = content;

  return (
    <TiScrollingStory
      {...{
        subText,
        sectionHeadline,
        subTextColor:
          (subTextColor as ScrollingStorySubTextColor | null) || undefined,
      }}
    >
      {stories?.map((x) => (
        <ExtendedOptimizelyComponent key={x._id} content={x} />
      ))}
    </TiScrollingStory>
  );
}
