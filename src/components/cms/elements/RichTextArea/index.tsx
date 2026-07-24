import { RichTextAreaElementType } from "./RichTextArea.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";

type Props = OptiComponentProps<typeof RichTextAreaElementType> & {};

export function RichTextAreaElement({ content, parentField }: Props) {
  if (!content) {
    return null;
  }
  const { WrappedRichTextField } = fieldFactory<typeof RichTextAreaElementType>(
    content,
    parentField,
  );
  return <WrappedRichTextField field="text" />;
}
