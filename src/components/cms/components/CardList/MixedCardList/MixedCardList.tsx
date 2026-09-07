import { OptiComponentProps } from "@/lib/ts/component-props";
import { MixedCardListComponentType } from "./MixedCardList.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { TiCarousel } from "@/components/ui/ti/TiCarousel/TiCarousel";
import {
  CardDisplayConfig,
  CardListDisplay,
  CardListFields,
  CardStyles,
} from "../card-options";

export async function MixedCardList({
  content,
}: OptiComponentProps<typeof MixedCardListComponentType>) {
  if (!content) {
    return null;
  }

  const displayVariation =
    (content.displayVariation as CardListDisplay) || "grid";

  const cardConfig: CardDisplayConfig = {
    cardStyle: (content.cardStyle as CardStyles) || "white",
    hiddenFields: (content.hiddenFields as CardListFields[]) ?? [],
    hoverCard: displayVariation === "grid-hover",
  };

  if (
    displayVariation === "carousel" ||
    displayVariation === "carousel-below"
  ) {
    return (
      <TiCarousel
        slides={
          content.cards?.map((card) => ({
            content: (
              <ExtendedOptimizelyComponent content={card} {...cardConfig} />
            ),
          })) ?? []
        }
        navigation={displayVariation === "carousel-below" ? "below" : "inline"}
        slidesPerViewDesktop={content.columnCount ?? undefined}
      ></TiCarousel>
    );
  }

  return (
    <div
      style={
        displayVariation === "grid" || displayVariation === "grid-hover"
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${content.columnCount}, 1fr)`,
              gap: "1rem",
            }
          : undefined
      }
    >
      {content.cards?.map((card, index) => (
        <ExtendedOptimizelyComponent
          key={index}
          content={card}
          {...cardConfig}
        />
      ))}
    </div>
  );
}
