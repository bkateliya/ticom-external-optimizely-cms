"use client";
import { HeadingLevelType, HeadingLevelContext, useHeadingLevel } from "@/components/utilities/HeadingLevelContext";
import { CmsFieldElementProps } from "@/lib/ts/field-props";
import { ContentTypes } from "@optimizely/cms-sdk";
import { TextField } from "./TextField";

export type HeadingFieldProps<
  TContentType extends ContentTypes.AnyContentType,
> = Omit<CmsFieldElementProps<TContentType>, "as"> & {
  headingLevel?: HeadingLevelType
};

export function HeadingField<TContentType extends ContentTypes.AnyContentType>({
  headingLevel,
  ...props
}: HeadingFieldProps<TContentType>) {

  return <HeadingLevelContext headingLevel={headingLevel ?? 'same'}><HeadingFieldInner {...props} /></HeadingLevelContext>;
}

// Need a separate component so that the hook is inside the context
function HeadingFieldInner<TContentType extends ContentTypes.AnyContentType>({
  ...props
}: HeadingFieldProps<TContentType>) {

  const as = `h${useHeadingLevel()}`;
  return <TextField {...props} as={as} />;
}
