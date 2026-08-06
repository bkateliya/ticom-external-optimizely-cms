import { getContext } from "@optimizely/cms-sdk/react/server";
import { getLocale } from "next-intl/server";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { cached } from "@/lib/data/opti";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { DestinationTypeType } from "@/components/cms/data/DestinationType.model";
import { SelectionToolComponentType } from "./SelectionTool.model";

export async function SelectionToolComponent({
  content,
}: OptiComponentProps<typeof SelectionToolComponentType>) {
  if (!content) {
    return null;
  }

  const destinationType = normalizeGenericContentToTyped(
    await cached.getReferencedContent(content.destinationTypeRef),
    DestinationTypeType,
  );

  // Trim: destinationId is free text, and some DestinationType taxonomy values
  // were authored with stray leading spaces (e.g. " Technology") — either would
  // corrupt the API query param the web component builds from these.
  let destinationId = content.destinationId?.trim();
  let destinationTypeValue = destinationType?.value?.trim();

  // GPT/MSE selection tools leave the destination fields blank on the
  // component and author the GPT/MSE category on the page instead — fall
  // back to the page's golden-sourced product family / application.
  if (!destinationId) {
    const { productFamily, application } = getContext() ?? {};
    if (productFamily?.familyId) {
      destinationId = productFamily.familyId;
      destinationTypeValue = "GPT";
    } else if (application?.applicationId) {
      destinationId = application.applicationId;
      destinationTypeValue = "MSE";
    }
  }

  if (!destinationId || !destinationTypeValue) {
    return null;
  }

  const locale = await getLocale();

  // Host the web component fetches product data from (it builds
  // `https://<domain>/selectionmodel/...`). Configurable per environment via
  // env, falling back to the prod data host. CORS for non-prod environments is
  // handled by TI's infra, not this app.
  const domain = process.env.SELECTION_TOOL_DOMAIN ?? "www.ti.com";

  return (
    <div className="w-full">
      <ti-selection-tool-wrapper
        destination-id={destinationId}
        destination-type={destinationTypeValue}
        domain={domain}
        locale={locale}
      />
    </div>
  );
}
