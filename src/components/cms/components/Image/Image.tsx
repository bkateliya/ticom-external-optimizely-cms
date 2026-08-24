import { fieldFactory } from "@/components/ui/cms";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { StandardImageComponentType } from "./StandardImage.model";
import { HeadshotImageComponentType } from "./HeadshotImage.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import {
  getStandardizedImage,
  getStandardizedImageFromContract,
} from "@/lib/utils/image-utils";

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

  const { src, alt } = getStandardizedImageFromContract(content);
  if (!src) {
    return null;
  }

  const linkHref = content.link?.url?.default ?? "";
  const href = linkHref ? (normalizeUrl(linkHref) ?? undefined) : undefined;
  const target = content.link?.target ?? undefined;

  return (
    <div
      className={content.enableBorder ? "border border-gray-300" : undefined}
    >
      <TiImage
        src={src}
        alt={alt}
        href={href}
        target={target}
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

  const { src, alt, bynderImage } = getStandardizedImage(
    content,
    content.bynderImage,
    { preset: "192x192" },
  );
  if (!src) {
    return null;
  }

  return (
    <div className="float-left mb-4 w-[174px]">
      <TiImage src={src} alt={content.altText || alt} />
      {(bynderImage?.property_people ||
        bynderImage?.property_employee_title) && (
        <div className="mt-4 text-sm leading-5">
          {bynderImage?.property_people && (
            <div className="mb-2 font-semibold">
              {bynderImage?.property_people}
            </div>
          )}
          {bynderImage?.property_employee_title && (
            <div>{bynderImage?.property_employee_title}</div>
          )}
        </div>
      )}
    </div>
  );
}
