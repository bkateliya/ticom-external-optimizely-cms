/**
 * Animated image map (`ti-image-map`) with its pins in one helper.
 * Animates a start image in from a direction/distance, optionally fades to an
 * end image, then animates the pins placed on top. Pass pins via the `pins` prop
 * — each is rendered as a `ti-pin` for you.
 */

/** A single interactive marker placed on the image map. */
export type ImageMapPin = {
  /** Horizontal position of the pin over the image, e.g. "30%". */
  positionHorizontal: string;
  /** Vertical position of the pin over the image, e.g. "36%". */
  positionVertical: string;
  /** Label content shown by the pin (may contain rich content e.g. links). */
  label: React.ReactNode;
  /**
   * Direction the pin's connector line draws from the point, e.g. "up right".
   * Accepts a space-separated vertical + horizontal direction.
   */
  linePath?: string;
  /** Optional link URL the pin navigates to. */
  href?: string;
};

export type TiImageMapProps = {
  /** Property for ending image URL source. (required) */
  endImageSrc: string;
  /** Property for starting image URL source. */
  startImageSrc?: string;
  /** Starting direction of the start image, in degrees. Defaults to 0. */
  startImageAngle?: number;
  /** Starting distance of the start image. Defaults to 100. */
  startImageOffset?: number;
  /** Property for image alt title text. */
  alt?: string;
  /** Interactive pins to place on the image map. */
  pins?: ImageMapPin[];
};

export function TiImageMap({
  endImageSrc,
  startImageSrc,
  startImageAngle,
  startImageOffset,
  alt,
  pins,
}: TiImageMapProps): React.ReactNode {
  return (
    <ti-image-map
      end-image-src={endImageSrc}
      start-image-src={startImageSrc}
      start-image-angle={startImageAngle}
      start-image-offset={startImageOffset}
      alt={alt}
    >
      {pins?.map((pin, i) => (
        <ti-pin
          key={i}
          position-horizontal={pin.positionHorizontal}
          position-vertical={pin.positionVertical}
          line-path={pin.linePath}
          href={pin.href}
        >
          {pin.label}
        </ti-pin>
      ))}
    </ti-image-map>
  );
}
