import { getBynderDocumentFromContext } from "@/lib/data/bynder";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SWAGGER_UI_CSS } from "@/components/ui/ti/TIScriptConstants";
import { ApiSwaggerComponentType } from "./ApiSwagger.model";
import { ApiSwaggerWidget, SWAGGER_UI_BASE_CSS } from "./ApiSwaggerWidget";

export function ApiSwagger({
  content,
}: OptiComponentProps<typeof ApiSwaggerComponentType>) {
  if (!content?.yamlFile) {
    return null;
  }

  // Bynder references resolve through the page-level lookup populated by
  // findAllBynderAssetsOnPage() (see populateSiteSettings), not
  // getPreviewUtils().src() — that's only for native CMS "_image" references.
  // Swagger UI fetches this URL client-side; Bynder's CDN already returns
  // `access-control-allow-origin: *`, so no same-origin proxy is needed.
  const yamlUrl = getBynderDocumentFromContext(content.yamlFile)?.original;

  if (!yamlUrl) {
    return null;
  }

  return (
    <>
      {/* Base layout/structure CSS first, TI's branding override second — same
          order as the live ti.com page (swagger.min.css then ticom.swaggerui.css). */}
      <link rel="stylesheet" href={SWAGGER_UI_BASE_CSS} precedence="default" />
      <link rel="stylesheet" href={SWAGGER_UI_CSS} precedence="default" />
      <ApiSwaggerWidget yamlUrl={yamlUrl} />
    </>
  );
}
