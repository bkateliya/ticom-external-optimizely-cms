import { damAssets } from "@optimizely/cms-sdk";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";

import { ImageMapComponentType, PinComponentType } from "./ImageMap.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { normalizeUrl } from "@/lib/utils/link-utils";
import {
  ImageMapPin,
  TiImageMap,
} from "@/components/ui/ti/TiImages/TiImageMap/TiImageMap";

export function ImageMapComponent({
  content,
}: OptiComponentProps<typeof ImageMapComponentType>) {
  if (!content) {
    return null;
  }

  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  const endImageSrc = src(content.endImageSrc);
  if (!endImageSrc) {
    return null;
  }

  const pinContents = normalizeGenericArrayToTyped<typeof PinComponentType>(
    content.pins
  );

  const pins: ImageMapPin[] = pinContents.map((pin) => {
    const href =
      (pin.link?.url?.base ?? "") + (pin.link?.url?.default ?? "");

    return {
      positionHorizontal: pin.positionHorizontal ?? "",
      positionVertical: pin.positionVertical ?? "",
      linePath: pin.linePath ?? undefined,
      href: normalizeUrl(href) || undefined,
      label: pin.link?.text || undefined,
    };
  });

  return (
    <TiImageMap
      endImageSrc={endImageSrc}
      startImageSrc={src(content.startImageSrc) || undefined}
      startImageAngle={content.startImageAngle ?? undefined}
      startImageOffset={content.startImageOffset ?? undefined}
      alt={getAlt(content.endImageSrc) ?? ""}
      pins={pins}
    />
  );
}
