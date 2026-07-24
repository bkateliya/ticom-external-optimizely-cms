
import { GeneralSectionComponentType } from "./GeneralSection.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ThemedSection } from "@/components/ui/molecules/SectionWrapper/ThemedSection";
import { PreambleSectionWrapper } from "@/components/ui/molecules/SectionWrapper/PreambleSectionWrapper";

export function GeneralSectionComponent({
  content,
  parentField
}: OptiComponentProps<typeof GeneralSectionComponentType>) {
  if (!content) {
    return null;
  }

  return (
    <ThemedSection content={content}>
      <PreambleSectionWrapper content={content} parentField={parentField}>
        {content.content?.map((x, i) => <ExtendedOptimizelyComponent key={i} content={x} />)}

      </PreambleSectionWrapper>
    </ThemedSection>
  );
}
