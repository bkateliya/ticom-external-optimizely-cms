import { getContext } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ProductCategoryListingComponentType } from "./ProductCategoryListing.model";
import { getProductFamily } from "@/lib/api/cms-api";
import { normalizeGenericArrayToTyped, normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { ProductCategoryListingOverrideComponentType } from "./ProductCategoryListingOverride.model";
import { isEditMode } from "@/lib/opti/edit-helpers";
import { ProductFamilyType } from "../../data/ProductFamily.model";
import { cached } from "@/lib/data/opti";


export async function ProductCategoryListingComponent({
  content
}: OptiComponentProps<typeof ProductCategoryListingComponentType>) {
  const { productFamily } = getContext() ?? {};
  const t = await getTranslations();
  const override = normalizeGenericArrayToTyped(
      content?.override,
      ProductCategoryListingOverrideComponentType,
    );



  if (!content) {
    return null;
  } else if (!productFamily?.familyId) {
    return null;
  } 
    
  const productFamilyData = (await getProductFamily(productFamily.familyId));
  const productFamilyChildren = productFamilyData?.children.filter(child => child.treelevel === (productFamilyData.treelevel + 1));
  const showId = isEditMode();

  const overrideProductFamilies = await Promise.all(
    override.map(async (item) =>
      normalizeGenericContentToTyped(
        await cached.getReferencedContent(item?.productFamily ?? null),
        ProductFamilyType,
      )
    )
  );

  return (
    <div>
      {t("Browse by category")}

      {productFamilyChildren?.map((child) => {
        const index = overrideProductFamilies.findIndex(pf => pf?.familyId === child.familyId.toString());
        const { WrappedRichTextField } = fieldFactory< typeof ProductCategoryListingOverrideComponentType>(override.at(index));
        return (
          (index === -1 ? (
            <div>
              {showId && child.familyId}
              Family: {child.familyName} <br/>
              Link: {child.productNodeUrl} <br/>
            </div>) : 
            (<div>
              {showId && child.familyId} 
              Family: {child.familyName} <br/>
              Link: {child.productNodeUrl} <br/>
              <WrappedRichTextField
                field="description"
              />
              {/* Stub {override.find(foo => foo.familyId === child.familyId)?.bynderImage} */}
            </div>))
        );
      })}
    </div>
  );
}
