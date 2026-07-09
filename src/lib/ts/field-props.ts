import type { ContentProps, ContentTypes, damAssets } from "@optimizely/cms-sdk";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";

export type PolymorphicElementProps<E extends React.ElementType> =
  React.PropsWithChildren<
    React.ComponentPropsWithoutRef<E> & {
      as?: E;
    }
  >;

export type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

export type CmsFieldProps<
  TContentType extends ContentTypes.AnyContentType,
  /* The constraint type for the field, the field value must match this type */
  TFieldConstraint = unknown,
> = {
  cmsContent: ContentProps<TContentType>;
  field: KeysOfValue<ContentProps<TContentType>, TFieldConstraint>;
  parentField?: string;
};

export type CmsFieldElementProps<
  TContentType extends ContentTypes.AnyContentType,
  TElement extends React.ElementType = "span",
> = CmsFieldProps<TContentType> & PolymorphicElementProps<TElement> & React.HTMLAttributes<TElement>;

export type InferredContentReference = Parameters<
  ReturnType<typeof damAssets>["getAlt"]
>[0];
