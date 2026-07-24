import { ContentProps } from "@optimizely/cms-sdk";
import { ContentTypes } from "@optimizely/cms-sdk";
import { TextField, TextFieldProps } from "./TextField";
import { RichTextField, RichTextFieldProps } from "./RichTextField";
import { LinkField, LinkFieldProps } from "./LinkField";
import { ImageField, ImageFieldProps } from "./ImageField";
import { HeadingField, HeadingFieldProps } from "./HeadingField";

/** Returns components that wrap the TextField and RichTextField components to make them easier to use
 * by prepulating the cmsContent and parentField props
 * @param cmsContent - The content to for the components to use
 * @param parentField - Optional parent field name if this is a nested field
 * @returns An object with the wrapped TextField and RichTextField components
 */
export function fieldFactory<TContentType extends ContentTypes.AnyContentType>(
  cmsContent: ContentProps<TContentType>,
  parentField?: string,
) {
  function WrappedTextField<E extends React.ElementType = "span">({
    as,
    ...props
  }: Omit<
    TextFieldProps<TContentType, E>,
    "cmsContent" | "parentField" | "as"
  > & {
    as?: E;
  }) {
    return (
      <TextField
        {...props}
        className={props.className}
        // TypeScript really didn't like `as` for some reason
        as={as as React.ElementType}
        cmsContent={cmsContent}
        parentField={parentField}
      />
    );
  }

  function WrappedHeadingTextField({
    ...props
  }: Omit<HeadingFieldProps<TContentType>, "cmsContent" | "parentField">) {
    return (
      <HeadingField
        {...props}
        className={props.className}
        cmsContent={cmsContent}
        parentField={parentField}
      />
    );
  }
  function WrappedRichTextField(
    props: Omit<RichTextFieldProps<TContentType>, "cmsContent" | "parentField">,
  ) {
    return (
      <RichTextField
        {...props}
        className={props.className}
        cmsContent={cmsContent}
        parentField={parentField}
      />
    );
  }

  function WrappedLinkField(
    props: Omit<LinkFieldProps<TContentType>, "cmsContent" | "parentField">,
  ) {
    return (
      <LinkField {...props} cmsContent={cmsContent} parentField={parentField} />
    );
  }
  function WrappedImageField(
    props: Omit<ImageFieldProps<TContentType>, "cmsContent" | "parentField">,
  ) {
    return (
      <ImageField
        {...props}
        cmsContent={cmsContent}
        parentField={parentField}
      />
    );
  }
  return {
    WrappedTextField: WrappedTextField,
    WrappedHeadingTextField: WrappedHeadingTextField,
    WrappedRichTextField: WrappedRichTextField,
    WrappedLinkField: WrappedLinkField,
    WrappedImageField: WrappedImageField,
  };
}
