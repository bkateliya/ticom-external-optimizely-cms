import { ImageElementType } from "./ImageElement.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { getStandardizedImageFromContract } from "@/lib/utils/image-utils";

type Props = OptiComponentProps<typeof ImageElementType> & {
  externalImageSrc?: string | null;
};

export function ImageElement({ content, externalImageSrc }: Props) {
  if (!content) {
    return null;
  }

  const { src, alt } = getStandardizedImageFromContract(content);
  const resolvedSrc = src || externalImageSrc;
  if (!resolvedSrc) {
    return null;
  }

  return <TiImage src={resolvedSrc} alt={alt} />;
}
