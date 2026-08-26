import { PreambleContractContentType } from "@/components/cms/contracts/component-contracts/preamble.model";
import { OptionalOptiComponentProps } from "@/lib/ts/component-props";
import { Preamble } from "./Preamble";
import { SectionWrapper, SectionWrapperProps } from "./SectionWrapper";
import { HeadlineStyleProps } from "../Headline/Headline";

export interface PreambleSectionWrapperProps
  extends
    SectionWrapperProps,
    OptionalOptiComponentProps<PreambleContractContentType>,
    HeadlineStyleProps {}

export const PreambleSectionWrapper = ({
  children,
  content,
  parentField,
  textAlignment,
}: PreambleSectionWrapperProps) => {
  return (
    <SectionWrapper>
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
