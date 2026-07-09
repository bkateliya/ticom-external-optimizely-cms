import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ContentTypes } from "@optimizely/cms-sdk";
import { CardListComponentType } from "./CardList.model";
import { Preamble } from "@/components/ui/molecules/SectionWrapper/Preamble";

export interface OptiCardComponentProps<
  TContentType extends ContentTypes.AnyContentType,
> extends OptiComponentProps<TContentType> {
  columnCount: number;
}

export async function CardListComponent({
  content,
  parentField,
}: OptiCardComponentProps<typeof CardListComponentType>) {
  if (!content) {
    return null;
  }
  const cardContent = content.cardContent;
  if (!cardContent) {
    return null;
  }
  return (
    <div>
      <Preamble content={content} parentField={parentField}>
        <ExtendedOptimizelyComponent
          {...{ columnCount: content.columns }}
          content={cardContent}
          parentField={parentField}
        />
      </Preamble>
    </div>
  );
}
