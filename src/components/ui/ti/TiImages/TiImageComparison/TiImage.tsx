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

export function TiImage({ slot, ratio, alt, src, dataMetricsName }: TiImageProps) {
    return (
        <ti-image
            slot={slot}
            ratio={ratio}
            alt={alt}
            data-metrics-name={dataMetricsName}
            src={src}
        />
    );
}
