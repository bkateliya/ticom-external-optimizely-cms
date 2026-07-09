import { LinkElementType } from "./Link.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { CtaSurface } from "@/components/ui/Atoms/Cta/CtaButton";

type Props = OptiComponentProps<typeof LinkElementType> & {
  ctaSurface?: CtaSurface;
};

export function LinkElement({ content, parentField, ctaSurface = "onBg" }: Props) {
  if (!content) {
    return null;
  }
  const { WrappedLinkField } = fieldFactory<typeof LinkElementType>(
    content,
    parentField,
  );
  return <WrappedLinkField field="link" ctaSurface={ctaSurface} ctaVariant="link" />;
}
