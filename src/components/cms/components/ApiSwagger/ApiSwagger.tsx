import { getBynderDocumentFromContext } from "@/lib/data/bynder";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SWAGGER_UI_CSS } from "@/components/ui/ti/TIScriptConstants";
import { ApiSwaggerComponentType } from "./ApiSwagger.model";
import { ApiSwaggerWidget } from "./ApiSwaggerWidget";

export function ApiSwagger({
  content,
}: OptiComponentProps<typeof ApiSwaggerComponentType>) {
  if (!content?.yamlFile) {
    return null;
  }

  // Bynder references resolve through the page-level lookup populated by
  // findAllBynderAssetsOnPage() (see populateSiteSettings), not
  // getPreviewUtils().src() — that's only for native CMS "_image" references.
  const yamlUrl = getBynderDocumentFromContext(content.yamlFile)?.original;

  if (!yamlUrl) {
    return null;
  }

  return (
    <>
      {/* Base swagger-ui CSS is bundled via ApiSwaggerWidget's own import;
     this is only TI's branding override on top. */}
      <link rel="stylesheet" href={SWAGGER_UI_CSS} precedence="default" />
      <ApiSwaggerWidget yamlUrl={yamlUrl} />
    </>
  );
}
