
import { PreambleContractContentType } from "@/components/cms/contracts/component-contracts/preamble.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { Preamble } from "./Preamble";
import { SectionWrapper, SectionWrapperProps } from "./SectionWrapper";

export interface PreambleSectionWrapperProps
  extends
    SectionWrapperProps,
    OptiComponentProps<PreambleContractContentType> {}

export const PreambleSectionWrapper = ({
  children,
  content,
  parentField,
  textAlignment,
  noPaddingTop,
  noPaddingBottom,
  noPaddingSides,
  isCentered75,
}: PreambleSectionWrapperProps) => {
  return (
    <SectionWrapper
      textAlignment={textAlignment}
      noPaddingTop={noPaddingTop}
      noPaddingBottom={noPaddingBottom}
      noPaddingSides={noPaddingSides}
      isCentered75={isCentered75}
    >
      <Preamble
        content={content}
        parentField={parentField}
        textAlignment={textAlignment}
        noPaddingTop={noPaddingTop}
        noPaddingBottom={noPaddingBottom}
        noPaddingSides={noPaddingSides}
        isCentered75={isCentered75}
      >
        {children}
      </Preamble>
    </SectionWrapper>
  );
};
