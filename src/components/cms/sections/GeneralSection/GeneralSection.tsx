import { GeneralSectionComponentType } from "./GeneralSection.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ThemedSection } from "@/components/ui/molecules/SectionWrapper/ThemedSection";
import { PreambleSectionWrapper } from "@/components/ui/molecules/SectionWrapper/PreambleSectionWrapper";
import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import {
  hasSectionSeparator,
  SECTION_SEPARATOR_CLASS,
} from "../section-separator";

export function GeneralSectionComponent({
  content,
  parentField,
}: OptiComponentProps<typeof GeneralSectionComponentType>) {
  if (!content) {
    return null;
  }

  return (
    <div
      id={content.sectionId ?? undefined}
      className={
        hasSectionSeparator(content) ? SECTION_SEPARATOR_CLASS : undefined
      }
    >
      <ThemedSection
        content={content}
        fullHeight={content.sectionFullHeight ?? false}
        narrow={content.sectionNarrow ?? false}
      >
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
