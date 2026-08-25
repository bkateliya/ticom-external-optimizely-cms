import { CmsFieldElementProps } from "@/lib/ts/field-props";
import { ContentTypes } from "@optimizely/cms-sdk";

export type TextFieldProps<
  TContentType extends ContentTypes.AnyContentType,
  TElement extends React.ElementType = "span",
> = CmsFieldElementProps<TContentType, string | null, TElement>;

export function TextField<
  TContentType extends ContentTypes.AnyContentType,
  TElement extends React.ElementType = "span",
>({
  as,
  cmsContent: content,
  field,
  parentField: _,
  ...props
}: TextFieldProps<TContentType, TElement>) {
  const Component = as || "span";

  const value = content[field];

  if (!value) {
    return null;
  }

  return (
    <Component
      // {...pa([parentField, field].filter(Boolean).join("."))}
      {...props}
    >
      {value}
    </Component>
  );
}
