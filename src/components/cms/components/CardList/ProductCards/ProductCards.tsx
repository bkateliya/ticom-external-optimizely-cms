import { ProductCardsComponentType } from "./ProductCards.model";
import { getProducts } from "@/lib/api/product-api";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";
import { OptiComponentProps } from "@/lib/ts/component-props";

export async function ProductCardsComponent({
  content,
}: OptiComponentProps<typeof ProductCardsComponentType>) {
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
        gridTemplateColumns: `repeat(${3}, 1fr)`,
        gap: "1rem",
      }}
    >
      {filteredProducts.map((product) => (
        <div key={product.id}>
          {/* <HeadingField field="familyName" /> */}
          <DynamicHeading>{product.familyName}</DynamicHeading>
          <p>{product.genericPartNumber}</p>
          <p>
            {product.approximatePrice} {product.currency}
          </p>
          <EnhancedNextImage src={product.partImageUrl} alt={product.altText} />
        </div>
      ))}
    </div>
  );
}
