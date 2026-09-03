import clsx from "clsx";
import { ContentProps } from "@optimizely/cms-sdk";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { CTALinkElement } from "@/components/cms/elements/CTALink";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { TiSlidePanel } from "@/components/ui/ti/TiSlidePanel/TiSlidePanel";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { isEditMode } from "@/lib/opti/edit-helpers";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { getStandardizedImageFromContract } from "@/lib/utils/image-utils";
import {
  ScrollingStoryHorizontalComponentType,
  ScrollingStoryHorizontalContentComponentType,
} from "./HorizontalScrollingStory.model";

type StoryContentProps = ContentProps<
  typeof ScrollingStoryHorizontalContentComponentType
> & { _id: string };

const ANALYTICS_LID = "tabbedStory";

/** Inset over the 2-col spacer: one column plus one 56px gutter. */
const IMAGE_INSET = {
  right: "md:left-[calc((100%+3.5rem)/3)] md:right-0",
  left: "md:left-0 md:right-[calc((100%+3.5rem)/3)]",
} as const;

type ImagePlacement = keyof typeof IMAGE_INSET;

export function ScrollingStoryHorizontalComponent({
  content,
  parentField,
}: OptiComponentProps<typeof ScrollingStoryHorizontalComponentType>) {
  if (!content) {
    return null;
  }

  const stories = normalizeGenericArrayToTyped(
    content.stories,
    ScrollingStoryHorizontalContentComponentType,
  );
  if (!stories.length) {
    return null;
  }

  const { WrappedTextField, WrappedHeadingTextField } = fieldFactory<
    typeof ScrollingStoryHorizontalComponentType
  >(content, parentField);

  const imagePlacement: ImagePlacement =
    content.imagePlacement === "left" ? "left" : "right";
  const isEdit = isEditMode();

  const heading = (content.eyebrow || content.headline) && (
    <div>
      <WrappedTextField
        as="div"
        field="eyebrow"
        className="mb-2 text-[14px] leading-[20px] font-normal uppercase text-pl-text-color-accent"
      />
      <WrappedHeadingTextField
        field="headline"
        className="mb-0 text-[28px] leading-[36px] font-semibold text-pl-text-color-secondary md:text-[34px] md:leading-[40px]"
      />
    </div>
  );

  // Story headlines sit one level below the section headline (h2 -> h3)
  const pages = (
    <HeadingLevelContext headingLevel="increment">
      {stories.map((story) => (
        <StoryPage
          key={story._id}
          story={story}
          imagePlacement={imagePlacement}
          isEdit={isEdit}
        />
      ))}
    </HeadingLevelContext>
  );

  // The slide panel only ever shows one story, which hides the rest from the
  // author, so the canvas gets every story stacked instead.
  if (isEdit) {
    return (
      <div>
        {heading}
        <strong>
          Horizontal scrolling story displayed as flat list in edit mode
        </strong>
        <div className="mt-12 flex flex-col gap-12">{pages}</div>
      </div>
    );
  }

  return (
    <div>
      {heading}
      <div className="relative mt-12 md:grid md:grid-cols-3 md:gap-x-14">
        {/* Reserves the image's footprint; the image itself sits over it. */}
        <div
          className={clsx(
            "hidden aspect-video md:col-span-2 md:block",
            imagePlacement === "right" ? "md:order-2" : "md:order-1",
          )}
        />
        <div
          className={imagePlacement === "right" ? "md:order-1" : "md:order-2"}
        >
          {/* The panel's own hook for its flex justify-content — space-between
              drops the meter to the bottom, level with the image. */}
          <TiSlidePanel
            showMeter
            allowWrap
            mobileAllowSwipe
            className="md:h-full md:[--ti-slide-panel-container-position:space-between]"
          >
            {pages}
          </TiSlidePanel>
        </div>
      </div>
    </div>
  );
}

function StoryPage({
  story,
  imagePlacement,
  isEdit,
}: {
  story: StoryContentProps;
  imagePlacement: ImagePlacement;
  isEdit: boolean;
}) {
  const { WrappedTextField, WrappedHeadingTextField, WrappedRichTextField } =
    fieldFactory<typeof ScrollingStoryHorizontalContentComponentType>(story);

  const { src, alt } = getStandardizedImageFromContract(story);

  const ctas = normalizeGenericArrayToTyped<typeof CtaLinkElementType>(
    story.ctaLinks,
  );

  const headlineId = `story-${story._id}-label`;

  return (
    <div role="group" aria-roledescription="slide" aria-labelledby={headlineId}>
      {src && (
        <TiImage
          className={clsx(
            "mb-6 block w-full",
            !isEdit && [
              "md:absolute md:inset-y-0 md:mb-0 md:w-auto",
              IMAGE_INSET[imagePlacement],
            ],
          )}
          ratio="rectangle"
          src={src}
          alt={alt}
        />
      )}
      <WrappedTextField
        as="div"
        field="highlight"
        className="mt-1 mb-6 text-[34px] leading-[34px] font-thin "
      />
      <WrappedHeadingTextField
        field="headline"
        id={headlineId}
        className="mb-4 text-[24px] leading-[32px] font-normal text-balance"
      />
      <div className="text-[16px] leading-[24px] text-pretty [&>p]:mb-6 [&>p:last-of-type]:mb-0">
        <WrappedRichTextField field="description" />
      </div>
      {ctas.length > 0 && (
        <div className="mt-6 flex flex-col items-start gap-6">
          {ctas.map((cta) => (
            <CTALinkElement
              key={cta._id}
              content={cta}
              dataLid={`${ANALYTICS_LID}-cta-${cta.link?.text}`}
              dataNavtitle={`${ANALYTICS_LID}-cta-${cta.link?.text}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
