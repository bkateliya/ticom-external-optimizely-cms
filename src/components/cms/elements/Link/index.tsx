import { LinkElementType } from "./Link.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";

type Props = OptiComponentProps<typeof LinkElementType>;

export function LinkElement({ content, parentField }: Props) {
  if (!content) {
    return null;
  }
  const { WrappedLinkField } = fieldFactory<typeof LinkElementType>(
    content,
    parentField,
  );
  return <WrappedLinkField field="link" />;
}
