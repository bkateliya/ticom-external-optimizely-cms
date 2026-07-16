import { fieldFactory } from "@/components/ui/cms";
import {
  SingleGeneralCardComponentType,
  GeneralCardsComponentType,
} from "./GeneralCards.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { OptiCardComponentProps } from "../CardList";
import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";

export function GeneralCard({
  content,
  parentField,
}: OptiComponentProps<typeof SingleGeneralCardComponentType>) {
  if (!content) {
    return null;
  }
  const { WrappedTextField, WrappedRichTextField, WrappedHeadingTextField } =
    fieldFactory<typeof SingleGeneralCardComponentType>(content, parentField);
  return (
    <div className="bg-sky-300 rounded-xl p-4 m-4">
      <WrappedTextField field="eyebrow" />
      <WrappedHeadingTextField field="headline" />
      <WrappedTextField field="subheadline" />
      <WrappedRichTextField field="description" />

      <CtaList content={content} parentField={parentField}/>
    </div>
  );
}

export async function GeneralCardsComponent({
  content,
  columnCount,
  parentField,
}: OptiCardComponentProps<typeof GeneralCardsComponentType>) {
  if (!content) {
    return null;
  }
  const cards = normalizeGenericArrayToTyped(
    content.cards,
    SingleGeneralCardComponentType,
  );
  if (!cards) {
    return null;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: "1rem",
      }}
    >
      {cards.map((card) => (
        <GeneralCard key={card._id} content={card} parentField={parentField} />
      ))}
    </div>
  );
}
