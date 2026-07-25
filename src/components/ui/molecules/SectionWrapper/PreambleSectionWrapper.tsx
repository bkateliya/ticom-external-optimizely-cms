
import { PreambleContractContentType } from "@/components/cms/contracts/component-contracts/preamble.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { Preamble } from "./Preamble";
import { SectionWrapper, SectionWrapperProps } from "./SectionWrapper";


export interface PreambleSectionWrapperProps
  extends
  SectionWrapperProps,
  OptiComponentProps<PreambleContractContentType> { }

export const PreambleSectionWrapper = ({
  children,
  content,
  parentField,
  textAlignment,
}: PreambleSectionWrapperProps) => {
  return (
    <SectionWrapper
      textAlignment={textAlignment}
    >
      <Preamble
        content={content}
        parentField={parentField}
        textAlignment={textAlignment}
      >
        {children}
      </Preamble>
    </SectionWrapper>
  );
};
