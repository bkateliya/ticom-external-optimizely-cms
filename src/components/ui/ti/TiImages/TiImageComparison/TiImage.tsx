"use client";

import { CustomEventHandler, useEventListenerRef } from "../../Common/events";

/** Detail payload for the `tiImageZoomChange` event. */
export interface TiImageZoomChangeEventDetail {
    /** Whether the zoom modal is now open. */
    isOpen: boolean;
}

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
    /** Fired when the zoom modal opens or closes. */
    tiImageZoomChange?: CustomEventHandler<TiImageZoomChangeEventDetail>;
}

export function TiImage({ slot, ratio, alt, src, dataMetricsName, tiImageZoomChange }: TiImageProps) {
    const ref = useEventListenerRef({
        tiImageZoomChange: tiImageZoomChange,
    });
    return (
        <ti-image
            ref={ref}
            slot={slot}
            ratio={ratio}
            alt={alt}
            data-metrics-name={dataMetricsName}
            src={src}
        />
    );
}
