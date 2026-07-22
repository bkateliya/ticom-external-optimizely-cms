export interface TiImageProps {
    /** Slot to render into (e.g. "left-image" or "right-image" for image comparison). */
    slot?: string;
    /** Image aspect ratio, e.g. "rectangle". */
    ratio?: string;
    /** Alt text for the image. */
    alt?: string;
    /** Image source URL. */
    src: string;
    /** Value for the data-metrics-name attribute used for metrics. */
    dataMetricsName?: string;
}

/** Extract the image file name (with extension) from a src URL, ignoring any query/hash. */
function getImageName(src: string): string | undefined {
    if (!src) return undefined;
    const path = src.split(/[?#]/)[0];
    const name = path.split("/").pop();
    return name ? decodeURIComponent(name) : undefined;
}

export function TiImage({ slot, ratio, alt, src }: TiImageProps) {
    return (
        <ti-image
            slot={slot}
            ratio={ratio}
            alt={alt}
            data-metrics-name={getImageName(src)}
            src={src}
        />
    );
}
