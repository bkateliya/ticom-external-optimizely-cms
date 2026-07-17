import { ProductCardsComponentType } from "./ProductCards.model";
import { getProducts } from "@/lib/api/product-api";
import { OptiCardComponentProps } from "../CardList";
import { Heading } from "./Heading";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";

export async function ProductCardsComponent({
  content,
  columnCount,
}: OptiCardComponentProps<typeof ProductCardsComponentType>) {
  if (!content) {
    return null;
  }

  const products = await getProducts();
  if (!products) {
    return null;
  }
  const filteredProducts = products.filter(
    (product) =>
      (!content.currency ||
        content.currency === "ALL" ||
        product.currency === content.currency) &&
      (content.isNew === "ALL" ||
        (content.isNew === "TRUE" && product.newFlag) ||
        (content.isNew === "FALSE" && !product.newFlag)),
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: "1rem",
      }}
    >
      {filteredProducts.map((product) => (
        <div key={product.id}>
          {/* <HeadingField field="familyName" /> */}
          <Heading>{product.familyName}</Heading>
          <p>{product.genericPartNumber}</p>
          <p>
            {product.approximatePrice} {product.currency}
          </p>
          <EnhancedNextImage
            src={product.partImageUrl}
            alt={product.altText}
          />
        </div>
      ))}
    </div>
  );
}
