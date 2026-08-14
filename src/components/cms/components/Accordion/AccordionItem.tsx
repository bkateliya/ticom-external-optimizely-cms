import { OptiComponentProps } from "@/lib/ts/component-props";
import { AccordionPanelComponentType } from "./Accordion.model";
import { fieldFactory } from "@/components/ui/cms";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";

type AccordionItemProps = OptiComponentProps<
  typeof AccordionPanelComponentType
>;

export function AccordionItem({ content, parentField }: AccordionItemProps) {
  if (!content) {
    return null;
  }

  const { WrappedHeadingTextField } = fieldFactory<
    typeof AccordionPanelComponentType
  >(content, parentField);

  return (
    <ti-expansion-panel>
      <WrappedHeadingTextField
        slot="title"
        field="title"
      />

      <div slot="content">
        {content.innerComponents?.map((x, i) => (
          <ExtendedOptimizelyComponent key={i} content={x} />
        ))}
      </div>
    </ti-expansion-panel>
  );
}
