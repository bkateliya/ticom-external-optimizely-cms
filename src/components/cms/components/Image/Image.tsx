import { fieldFactory } from "@/components/ui/cms";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { StandardImageComponentType } from "./StandardImage.model";
import { HeadshotImageComponentType } from "./HeadshotImage.model";
import { getBynderImageFromContext } from "@/lib/data/bynder";
import { OptiComponentProps } from "@/lib/ts/component-props";

export async function StandardImageView({
  content,
  parentField,
}: OptiComponentProps<typeof StandardImageComponentType>) {
  if (!content) {
    return null;
  }
  // const { src, pa } = getPreviewUtils(content);
  const { WrappedRichTextField } = fieldFactory<
    typeof StandardImageComponentType
  >(content, parentField);

  const img = getBynderImageFromContext(content.bynderImage);
  const imageUrl = img?.original;
  if (!imageUrl) {
    return null;
  }

  const linkHref =
    (content.link?.url?.base ?? "") + (content.link?.url?.default ?? "");
  const href = linkHref ? (normalizeUrl(linkHref) ?? undefined) : undefined;

  return (
    <div
      className={content.enableBorder ? "border border-gray-300" : undefined}
    >
      <TiImage
        src={imageUrl}
        alt={content.altText || img.property_alt_text}
        href={href}
        zoom={content.enableEnlarge ?? undefined}
        zoomCaption={content.enableEnlarge ?? undefined}
        caption={
          content.caption?.json ? (
            <WrappedRichTextField field="caption" />
          ) : undefined
        }
      />
    </div>
  );
}

export function HeadshotImageView({
  content,
}: OptiComponentProps<typeof HeadshotImageComponentType>) {
  if (!content) {
    return null;
  }
  const img = getBynderImageFromContext(content.bynderImage);
  const imageUrl = img?.original;
  if (!imageUrl) {
    return null;
  }
  // TODO: employeeName/employeeTitle come from Bynder DAM metadata, not CMS
  // fields — render them here once the DAM metadata lookup is wired up.

  return (
    <div className="float-left mb-4 w-44">
      <TiImage
        src={imageUrl}
        alt={content.altText || img.property_alt_text}
        ratio="square"
      />
    </div>
  );
}
