import styles from './ImageCommon.module.scss';

export type ImageAspectRatio = '1:1' | '3:2' | '16:9' | '9:16' | '2:1' | '4:3';

export const AspectRatioClassMap: Record<ImageAspectRatio, string> = {
  '1:1': styles['image--1-1'],
  '3:2': styles['image--3-2'],
  '16:9': styles['image--16-9'],
  '9:16': styles['image--9-16'],
  '2:1': styles['image--2-1'],
  '4:3': styles['image--4-3'],
};

export const AspectRatioNumericMap: Record<ImageAspectRatio, number> = {
  '1:1': 1,
  '3:2': 3.0 / 2.0,
  '16:9': 16.0 / 9.0,
  '9:16': 9.0 / 16.0,
  '2:1': 2.0 / 1.0,
  '4:3': 4.0 / 3.0,
};
