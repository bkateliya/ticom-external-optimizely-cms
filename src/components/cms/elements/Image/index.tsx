import { ImageElementType } from "./Image.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";

type Props = OptiComponentProps<typeof ImageElementType> & {};

export function ImageElement({ content, parentField }: Props) {
  if (!content) {
    return null;
  }
  const { WrappedImageField, WrappedLinkField } = fieldFactory<
    typeof ImageElementType
  >(content, parentField);

  return (
    <WrappedLinkField field="link" ctaVariant="custom" renderChildrenIfNoLink>
      <WrappedImageField field="image" fill />
    </WrappedLinkField>
  );
}
