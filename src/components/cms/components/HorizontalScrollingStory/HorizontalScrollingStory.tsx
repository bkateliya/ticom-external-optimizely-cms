import { tv } from "tailwind-variants";
import { ContentProps } from "@optimizely/cms-sdk";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { CTALinkElement } from "@/components/cms/elements/CTALink";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { TiSlidePanel } from "@/components/ui/ti/TiSlidePanel/TiSlidePanel";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { getStandardizedImageFromContract } from "@/lib/utils/image-utils";
import {
  ScrollingStoryHorizontalComponentType,
  ScrollingStoryHorizontalContentComponentType,
} from "./HorizontalScrollingStory.model";

type StoryContentProps = ContentProps<
  typeof ScrollingStoryHorizontalContentComponentType
> & { _id: string };

type ImagePlacement = "left" | "right";

const ANALYTICS_LID = "tabbedStory";

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

  const { eyebrow, sectionHeadline, grid, imageSpacer, panelColumn, panel } =
    styles({ imagePlacement });

  const heading = (content.eyebrow || content.headline) && (
    <div>
      <WrappedTextField as="div" field="eyebrow" className={eyebrow()} />
      <WrappedHeadingTextField field="headline" className={sectionHeadline()} />
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
        />
      ))}
    </HeadingLevelContext>
  );

  return (
    <div>
      {heading}
      <div className={grid()}>
        {/* Reserves the image's footprint; the image itself sits over it. */}
        <div className={imageSpacer()} />
        <div className={panelColumn()}>
          {/* The panel's own hook for its flex justify-content — space-between
              drops the meter to the bottom, level with the image. */}
          <TiSlidePanel
            showMeter
            allowWrap
            mobileAllowSwipe
            className={panel()}
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
}: {
  story: StoryContentProps;
  imagePlacement: ImagePlacement;
}) {
  const { WrappedTextField, WrappedHeadingTextField, WrappedRichTextField } =
    fieldFactory<typeof ScrollingStoryHorizontalContentComponentType>(story);

  const { src, alt } = getStandardizedImageFromContract(story, {
    preset: "1280x720",
  });

  const ctas = normalizeGenericArrayToTyped<typeof CtaLinkElementType>(
    story.ctaLinks,
  );

  const headlineId = `story-${story._id}-label`;

  const { image, highlight, storyHeadline, description, ctaList } = styles({
    imagePlacement,
  });

  return (
    <div role="group" aria-roledescription="slide" aria-labelledby={headlineId}>
      {src && (
        <TiImage className={image()} ratio="rectangle" src={src} alt={alt} />
      )}
      <WrappedTextField as="div" field="highlight" className={highlight()} />
      <WrappedHeadingTextField
        field="headline"
        id={headlineId}
        className={storyHeadline()}
      />

      <WrappedRichTextField className={description()} field="description" />

      {ctas.length > 0 && (
        <div className={ctaList()}>
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

// This is a server component — the Bynder image lookup needs the SDK's server
// context — so it can't read `useTheme()`. The dark colors key off the theme
// class `ThemeProvider` puts on the section wrapper, which is the same set of
// dark modes `getModeFromTheme` resolves, just in plain CSS.
const styles = tv({
  slots: {
    eyebrow: [
      "mb-2 md:mb-4 text-sm leading-sm font-normal uppercase",
      "text-pl-text-color-accent",
      "[:is(.mode-dark,.theme-black,.theme-dark-grey,.theme-red-gradient)_&]:text-pl-text-color-primary-contrast",
    ],
    sectionHeadline: "mb-0 text-h2",
    grid: "relative mt-12 md:grid md:grid-cols-3 md:gap-x-14",
    imageSpacer: "hidden aspect-video md:col-span-2 md:block",
    panelColumn: "",
    panel: "md:h-full md:[--ti-slide-panel-container-position:space-between]",
    /** Lifted out of flow to sit over the footprint `imageSpacer` reserves. */
    image: "mb-6 block w-full md:absolute md:inset-y-0 md:mb-0 md:w-auto",
    highlight: [
      "mt-1 mb-6 text-[34px] leading-[34px] font-thin",
      "text-pl-element-color-secondary-lighter",
      "[:is(.mode-dark,.theme-black,.theme-dark-grey,.theme-red-gradient)_&]:text-pl-text-color-primary-contrast",
    ],
    storyHeadline: "mb-4 text-2xl leading-2xl font-normal",
    description: "text-body-lg text-pretty mb-6",
    ctaList: "mt-6 flex flex-col items-start gap-6",
  },
  variants: {
    imagePlacement: {
      right: {
        imageSpacer: "md:order-2",
        panelColumn: "md:order-1",
        image: "md:left-[calc((100%+3.5rem)/3)] md:right-0",
      },
      left: {
        imageSpacer: "md:order-1",
        panelColumn: "md:order-2",
        image: "md:left-0 md:right-[calc((100%+3.5rem)/3)]",
      },
    },
  },
});
