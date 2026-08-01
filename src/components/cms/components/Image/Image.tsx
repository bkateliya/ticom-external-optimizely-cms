import { ContentProps } from "@optimizely/cms-sdk";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { fieldFactory } from "@/components/ui/cms";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { StandardImageComponentType } from "./StandardImage.model";
import { HeadshotImageComponentType } from "./HeadshotImage.model";

type StandardImageProps = ContentProps<typeof StandardImageComponentType>;
type HeadshotImageProps = ContentProps<typeof HeadshotImageComponentType>;
type ImageItemContent = StandardImageProps | HeadshotImageProps;

type Props = {
  content?: ImageItemContent;
  parentField?: string;
};

// TODO: fall back to the DAM asset's own Alt Text (via damAssets(content).getAlt(content.image))
// once DAM lookup is wired up. For now this is authored-only.
function resolveAltText(content: StandardImageProps | HeadshotImageProps) {
  return content.altText ?? "";
}

function StandardImageView({
  content,
  parentField,
}: {
  content: StandardImageProps;
  parentField?: string;
}) {
  const { src, pa } = getPreviewUtils(content);
  const { WrappedRichTextField } = fieldFactory<
    typeof StandardImageComponentType
  >(content, parentField);

  const imageUrl = src(content.image);
  if (!imageUrl) {
    return null;
  }

  const linkHref =
    (content.link?.url?.base ?? "") + (content.link?.url?.default ?? "");
  const href = linkHref ? (normalizeUrl(linkHref) ?? undefined) : undefined;

  return (
    <div
      className={content.enableBorder ? "border border-gray-300" : undefined}
      {...pa([parentField, "image"].filter(Boolean).join("."))}
    >
      <TiImage
        src={imageUrl}
        alt={resolveAltText(content)}
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

function HeadshotImageView({
  content,
  parentField,
}: {
  content: HeadshotImageProps;
  parentField?: string;
}) {
  const { src, pa } = getPreviewUtils(content);

  const imageUrl = src(content.image);
  if (!imageUrl) {
    return null;
  } // TODO: employeeName/employeeTitle come from Bynder DAM metadata, not CMS
  // fields — render them here once the DAM metadata lookup is wired up.

  return (
    <div
      className="float-left mb-4 w-44"
      {...pa([parentField, "image"].filter(Boolean).join("."))}
    >
      <TiImage src={imageUrl} alt={resolveAltText(content)} ratio="square" />
    </div>
  );
}

// Registered against both StandardImage and HeadshotImage keys — __typename picks the view.
export function ImageItem({ content, parentField }: Props) {
  if (!content) {
    return null;
  }

  if (content.__typename === HeadshotImageComponentType.key) {
    return (
      <HeadshotImageView
        content={content as HeadshotImageProps}
        parentField={parentField}
      />
    );
  }

  return (
    <StandardImageView
      content={content as StandardImageProps}
      parentField={parentField}
    />
  );
}
