import { TeaserComponentType } from "./Teaser.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";
import { fieldFactory } from "@/components/ui/cms";
import { parseHeadlineSize } from "@/components/ui/molecules/Headline/Headline";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import { getBynderImageFromContext } from "@/lib/data/bynder";
import clsx from "clsx";

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

  // Live customCTATeaser makes the CTA button full-width on mobile; a CTA *link*
  // stays inline-left. `__typename` is the content-type key the CMS returns.
  const ctaIsButton = content.cta?.__typename === CtaButtonElementType.key;

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-6 rounded border border-solid border-pl-container-background-color-secondary-variant bg-pl-container-background-color-secondary px-4 py-6 text-pl-text-color-primary md:flex-row md:gap-4 md:p-8",
        hasText && "md:justify-between",
      )}
    >
      {imageUrl && (
        <div className="w-28 shrink-0">
          <EnhancedNextImage
            src={imageUrl}
            alt={image?.property_alt_text ?? ""}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* With no headline/description (the featuredLink case) the CTA renders
          directly beside the image, so the middle text column is dropped. */}
      {hasText && (
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
      )}

      <div
        className={clsx(
          "w-full shrink-0 md:w-auto",
          ctaIsButton &&
            "flex justify-center [&>*]:w-full! md:block md:[&>*]:w-auto!",
        )}
      >
        <ExtendedOptimizelyComponent content={content.cta} />
      </div>
    </div>
  );
}
