export type ImageRatio = "square" | "rectangle";
export type ImageHoverAnimation = "center" | "left" | "right";

export type TiImageProps = React.PropsWithChildren & {
  /** Property for image URL source */
  src: string;
  /** Property for alternate image src (large image) */
  srcLg?: string;
  /** Property for default image URL source, when the image given in src is not found */
  srcDefault?: string;
  /** Property for image alt title text */
  alt?: string;
  /** Optional property for link URL on image */
  href?: string;
  /** Optional property to have the image link open in a new tab/window. Does nothing if href is empty. */
  target?: string;
  /** Optional property for image ratio. Forces 16:9 rectangle or 1:1 square, based on width. */
  ratio?: ImageRatio;
  /** Optional property to make image zoomable using a dialog box */
  zoom?: boolean;
  /** Optional property to display alt text as caption title in modal zoom */
  zoomCaption?: boolean;
  /** Optional property to show download button on image modal zoom */
  zoomDownload?: boolean;
  /** Property to add hover state zoom microanimation. Value determines point of origin. */
  hoverAnimation?: ImageHoverAnimation;
  /**
   * Optional caption content. Rendered into the underlying `<ti-image>` `caption`
   * slot, wrapped in a `<p slot="caption">` for you — pass only the inner content,
   * not the `<p>` or the `slot` attribute. Accepts rich content such as links.
   *
   * @example
   * <TiImage src="/foo.jpg" alt="Foo" caption={<>Caption <a href="//www.ti.com">with link</a>.</>} />
   */
  caption?: React.ReactNode;
  /**
   * Optional label for the download button shown in the zoom modal (requires
   * `zoom` + `zoomDownload`). Rendered into the underlying `<ti-image>`
   * `download-label` slot, wrapped in a `<span slot="download-label">` for you —
   * pass only the inner text/content, not the `<span>` or the `slot` attribute.
   *
   * @example
   * <TiImage src="/foo.jpg" alt="Foo" zoom zoomDownload downloadLabel="Download" />
   */
  downloadLabel?: React.ReactNode;
};

export function TiImage({
  src,
  srcLg,
  srcDefault,
  alt,
  href,
  target,
  ratio,
  zoom,
  zoomCaption,
  zoomDownload,
  hoverAnimation,
  caption,
  downloadLabel,
  children,
}: TiImageProps): React.ReactNode {
  return (
    <ti-image
      src={src}
      src-lg={srcLg}
      src-default={srcDefault}
      alt={alt}
      href={href}
      target={target}
      ratio={ratio}
      zoom={zoom}
      zoom-caption={zoomCaption}
      zoom-download={zoomDownload}
      hover-animation={hoverAnimation}
    >
      {caption && <p slot="caption">{caption}</p>}
      {downloadLabel && <span slot="download-label">{downloadLabel}</span>}
      {children}
    </ti-image>
  );
}
