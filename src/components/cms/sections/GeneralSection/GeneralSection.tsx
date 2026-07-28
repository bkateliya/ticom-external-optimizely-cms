import { GeneralSectionComponentType } from "./GeneralSection.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ThemedSection } from "@/components/ui/molecules/SectionWrapper/ThemedSection";
import { PreambleSectionWrapper } from "@/components/ui/molecules/SectionWrapper/PreambleSectionWrapper";
import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";

export function GeneralSectionComponent({
  content,
  parentField,
}: OptiComponentProps<typeof GeneralSectionComponentType>) {
  if (!content) {
    return null;
  }

  return (
    <div id={content.sectionId ?? undefined}>
      <ThemedSection content={content}>
        <PreambleSectionWrapper
          content={content}
          parentField={parentField}
          redUnderline={content.headlineRedUnderline ?? false}
          textAlignment={content.headlineAlignment as TextAlignment}
        >
          {content.content?.map((x, i) => (
            <ExtendedOptimizelyComponent key={i} content={x} />
          ))}
        </PreambleSectionWrapper>
      </ThemedSection>
    </div>
  );
}
