import { TeaserComponentType } from "./Teaser.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";
import { fieldFactory } from "@/components/ui/cms";
import { parseHeadlineSize } from "@/components/ui/molecules/Headline/Headline";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { getBynderImageFromContext } from "@/lib/data/bynder";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { tv } from "tailwind-variants";

const teaser = tv({
  base: "flex flex-col items-center gap-6 border-solid px-4 py-6 text-pl-text-color-primary md:flex-row md:justify-between md:gap-4 md:p-8",
  variants: {
    background: {
      grey: "rounded border border-pl-container-background-color-secondary-variant bg-pl-container-background-color-secondary",
      white:
        "border-y-0 border-r-0 border-l border-pl-border-color-primary bg-pl-container-background-color-primary",
    },
  },
});

export function TeaserComponent({
  content,
  parentField,
}: OptiComponentProps<typeof TeaserComponentType>) {
  if (!content) {
    return null;
  }

  const image = getBynderImageFromContext(content.image);
  const imageUrl = image?.transformBaseUrl;

  const { WrappedHeadingTextField, WrappedRichTextField } =
    fieldFactory<typeof TeaserComponentType>(content, parentField);

  const hasText = !!(
    content.eyebrow ||
    content.headline ||
    content.teaserDescription
  );

  const background = content.background === "white" ? "white" : "grey";
  const textOnly = !imageUrl && !content.cta;

  if (textOnly) {
    return (
      <div
        className={
          background === "white"
            ? "w-full bg-pl-container-background-color-primary"
            : "w-full bg-pl-container-background-color-secondary"
        }
      >
        <SectionWrapper narrow>
          <div className="flex w-full flex-col text-pl-text-color-primary">
            {/* Headline defaults to H3, matching TI's u-header-3 for this
                flat text block. Author override still wins. Live markup uses
                an inline <b> whose margin-bottom never actually applies
                (vertical margin on inline elements is a no-op), so the real
                gap to the paragraph is ~0 — mb-0 here matches that, not a
                missing gap. */}
            <WrappedHeadingTextField
              field="headline"
              headingSize={parseHeadlineSize({ content }) || 3}
              className="mb-0"
            />
            <WrappedRichTextField
              field="teaserDescription"
              className="text-body-lg [&_p]:mb-6 [&_ul]:mb-6 [&_ol]:mb-6 [&_ul]:ms-5 [&_ol]:ms-5 [&>*:last-child]:mb-0"
            />
          </div>
        </SectionWrapper>
      </div>
    );
  }

  if (!hasText) {
    return (
      <div className="flex flex-row items-center gap-2 border-l border-pl-border-color-primary p-4 pl-[15px] text-pl-text-color-primary md:gap-4 md:p-6 md:pl-[23px]">
        {imageUrl && (
          <EnhancedNextImage
            src={imageUrl}
            alt={image?.property_alt_text ?? ""}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 object-contain"
          />
        )}
        {content.cta && <ExtendedOptimizelyComponent content={content.cta} />}
      </div>
    );
  }

  return (
    <div className={teaser({ background })}>
      {imageUrl && (
        <div className="w-28 shrink-0">
          <EnhancedNextImage
            src={imageUrl}
            alt={image?.property_alt_text ?? ""}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-1">
        {/* Headline defaults to H5 (Medium): the live customCTATeaser renders
            18px→20px, which is exactly our H5 token. Author override still wins. */}
        <WrappedHeadingTextField
          field="headline"
          headingSize={parseHeadlineSize({ content }) || 5}
          className="mb-0 text-center md:text-left"
        />
        <WrappedRichTextField
          field="teaserDescription"
          className="text-body-md [&_p]:mb-6 [&_ul]:mb-6 [&_ol]:mb-6 [&_ul]:ms-5 [&_ol]:ms-5 [&>*:last-child]:mb-0"
        />
      </div>

      {content.cta && (
        <div className="flex w-full shrink-0 justify-center whitespace-nowrap md:w-auto md:basis-[calc(25%-56px)]">
          <ExtendedOptimizelyComponent
            content={content.cta}
            className="w-full! md:w-auto!"
          />
        </div>
      )}
    </div>
  );
}
