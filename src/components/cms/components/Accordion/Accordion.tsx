
import { AccordionComponentType, AccordionPanelComponentType } from "./Accordion.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { AccordionItem } from "./AccordionItem";
import { PreambleSectionWrapper } from "@/components/ui/molecules/SectionWrapper/PreambleSectionWrapper";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { undefinedIfDefault } from "@/lib/utils/default-utils";
import { ExpansionPanelSize, TiAccordion } from "@/components/ui/ti/TiAccordion/TiAccordion";

export function AccordionComponent({
  content,
  parentField,
}: OptiComponentProps<typeof AccordionComponentType>) {
  if (!content) {
    return null;
  }
  const panels = normalizeGenericArrayToTyped<
    typeof AccordionPanelComponentType
  >(content.accordionPanels);

  return (
    <PreambleSectionWrapper content={content} parentField={parentField} >
      <TiAccordion
        appearance={undefinedIfDefault(content.appearance as 'minimal' | undefined)}
        autoCollapse={content.autoCollapse ?? undefined}
        autoScroll={content.autoScroll ?? undefined}
        size={undefinedIfDefault(content.size as ExpansionPanelSize | undefined)}>

        {panels?.map((item, index) => (
          <AccordionItem
            key={index}
            content={item}
          />
        ))}
      </TiAccordion>
    </PreambleSectionWrapper>
  );
}
