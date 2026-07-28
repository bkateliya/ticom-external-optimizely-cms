"use client";
import { useHeadingLevel } from "@/components/utilities/HeadingLevelContext";
import { CmsFieldElementProps } from "@/lib/ts/field-props";
import { ContentTypes } from "@optimizely/cms-sdk";
import { TextField } from "./TextField";
import clsx from "clsx";

export const HeadingSize = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
  4: "text-h4",
  5: "text-h5",
  6: "text-h6",
};

export type HeadingSizeType = keyof typeof HeadingSize;

export type HeadingFieldProps<
  TContentType extends ContentTypes.AnyContentType,
> = Omit<CmsFieldElementProps<TContentType>, "as"> & {
  headingSize?: HeadingSizeType;
};

export function HeadingField<TContentType extends ContentTypes.AnyContentType>({
  headingSize,
  ...props
}: HeadingFieldProps<TContentType>) {
  const as = `h${useHeadingLevel()}`;
  return (
    <TextField
      {...props}
      className={clsx(
        props.className,
        HeadingSize[headingSize as HeadingSizeType] ?? null,
      )}
      as={as}
    />
  );
}
