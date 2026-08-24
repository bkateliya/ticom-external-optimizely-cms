import { ContentBlockComponentType } from "./ContentBlock.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { Headline } from "@/components/ui/molecules/Headline/Headline";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";
import { getStandardizedImage } from "@/lib/utils/image-utils";

export function ContentBlockComponent({
  content,
  parentField,
}: OptiComponentProps<typeof ContentBlockComponentType>) {
  if (!content) {
    return null;
  }

  const { src, alt } = getStandardizedImage(content, content.bynderImage);

  const { WrappedRichTextField } = fieldFactory<
    typeof ContentBlockComponentType
  >(content, parentField);

  return (
    <div className="flex w-full flex-col gap-8">
      {src && (
        <EnhancedNextImage
          src={src}
          alt={alt ?? ""}
          className="w-full h-auto object-contain"
        />
      )}

      <div className="flex w-full flex-col gap-8 md:max-w-2/3">
        <Headline content={content} parentField={parentField} />
        <WrappedRichTextField
          field="contentBlockDescription"
          className="text-body-lg"
        />
        <ExtendedOptimizelyComponent content={content.ctasList} />
      </div>
    </div>
  );
}
