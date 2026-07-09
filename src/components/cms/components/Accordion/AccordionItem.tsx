"use client";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { AccordionPanelComponentType } from "./Accordion.model";
import { fieldFactory } from "@/components/ui/cms";
import styles from "./styles-item.module.css";
import { useHeadingLevel } from "@/components/utilities/HeadingLevelContext";

interface AccordionItemProps extends OptiComponentProps<
  typeof AccordionPanelComponentType
> {
}

export function AccordionItem({
  content,
  parentField,
}: AccordionItemProps) {
  if (!content) {
    return null;
  }

  const headingLevel = useHeadingLevel();
  const { WrappedTextField, WrappedRichTextField } = fieldFactory<
    typeof AccordionPanelComponentType
  >(content, parentField);

  return (
    <ti-expansion-panel>
      <WrappedTextField
        slot="title"
        field="title"
        as={"h" + headingLevel}
        className={styles.headingText}
      />
      <WrappedRichTextField
        slot="content"
        field="content"
        tabIndex={-1}
        className={styles.richTextWrapper}
      />
    </ti-expansion-panel>
  )
}
