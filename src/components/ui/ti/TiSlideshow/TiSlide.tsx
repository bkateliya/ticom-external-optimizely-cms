export type TiSlideProps = React.PropsWithChildren & {
    /** URL for the thumbnail image shown in slideshow nav */
    thumbnailSrc: string;
    /** Optional label text for the thumbnail shown in slideshow nav */
    thumbnailLabel?: string;
    /** Optional URL for the background image of the slide */
    backgroundImageSrc?: string;
    /** Optional URL for the background video of the slide */
    backgroundVideoSrc?: string;
    /** Property to display video play/pause control */
    showVideoControls?: boolean;
    /** Property to force video to start paused */
    videoStartsPaused?: boolean;
    /**Property to set default slide duration for auto-advance */
    duration?: number;
};

export function TiSlide({
    thumbnailSrc,
    thumbnailLabel,
    backgroundImageSrc,
    backgroundVideoSrc,
    showVideoControls,
    videoStartsPaused,
    duration,
    children
}: TiSlideProps): React.ReactNode {

    return (
        <ti-slide
            thumbnail-src={thumbnailSrc}
            thumbnail-label={thumbnailLabel}
            background-image-src={backgroundImageSrc}
            background-video-src={backgroundVideoSrc}
            duration={duration}
            show-video-controls={showVideoControls}
            video-starts-paused={videoStartsPaused}
        >
            {children}
        </ti-slide>
    );
}
