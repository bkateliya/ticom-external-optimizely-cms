// Global
import NextImage, { ImageProps } from 'next/image';

// Lib
import { isValidNextImageDomain } from '@/lib/utils/config-utils';
import { JSX } from 'react';
import clsx from 'clsx';

const EnhancedNextImage = (props: ImageProps): JSX.Element => {
  if (!props.src) {
    return <></>;
  }

  const newSrc = normalizeImageUrl(props.src as string);

  if (!newSrc) {
    // If there's no src, only render it if we're in editing mode.

    return <></>;
  }

  const nextImageProps: ImageProps = {
    ...props,
    fetchPriority: props.priority ? 'high' : props.fetchPriority,
    sizes: props.sizes || '100vw',
    src: newSrc,
  };

  const isValidDomain = isValidNextImageDomain(newSrc);
  const isStorybook = process.env.IS_STORYBOOK === 'true';

  if (props.fill) {
    // https://stackoverflow.com/a/76008677
    // This works better than setting `fill` on NextImage because it allows the image to be truely responsive
    return (
      <NextImage
        data-component="helpers/atoms/enhanced-next-image"
        {...nextImageProps}
        unoptimized={!isValidDomain || isStorybook}
        width={0}
        height={0}
        fill={false}
        style={{ width: 'auto', height: 'auto' }}
      />
    );
  }
  const isAutoSize = !props.width || !props.height;
  if (isAutoSize) {
    return <NextImage
      {...nextImageProps}
      unoptimized={!isValidDomain || isStorybook}
      className={clsx(props.className, "w-full h-auto object-contain")}
      width={0}
      height={0}
      sizes="100vw"
    />
  }
  return (
    <NextImage
      data-component="helpers/atoms/enhanced-next-image"
      {...nextImageProps}
      unoptimized={!isValidDomain || isStorybook}
    />
  );
};

export default EnhancedNextImage;

export function normalizeImageUrl(src: string | undefined) {
  let newSrc = src;

  if (src) {
    newSrc = src.replace(/^\/\//, 'https://');
  }

  return newSrc;
}
