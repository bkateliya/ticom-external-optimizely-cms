import { CmsFieldProps } from "@/lib/ts/field-props";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { ContentTypes } from "@optimizely/cms-sdk";
import {
  ElementRendererProps,
  LinkElement,
  RichText,
  RichTextProps,
  TableCellElement,
  TableElement,
} from "@optimizely/cms-sdk/react/richText";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import clsx from "clsx";
import NextLink from "next/link";
import styles from "./RichTextField.module.css";
import { TiSvgIcon } from "../ti/TiSvgIcon";

export type RichTextFieldContent = { json: RichTextProps["content"] } | null;
export type SimpleRichTextNode = {
  text?: string;
  children?: SimpleRichTextNode[];
};

export type RichTextFieldProps<
  TContentType extends ContentTypes.AnyContentType,
> = CmsFieldProps<TContentType, RichTextFieldContent> &
  Omit<RichTextProps, "content">;

export function RichTextField<
  TContentType extends ContentTypes.AnyContentType,
>({
  cmsContent: content,
  field,
  parentField,
  ...props
}: RichTextFieldProps<TContentType>) {
  const { pa } = getPreviewUtils(content);
  const value = content[field] as RichTextFieldContent;
  // Content from the SiteSettings `_json` blob (header/footer) arrives as a JSON
  // string; the typed Graph query returns it already parsed.
  const json =
    typeof value?.json === "string" ? JSON.parse(value.json) : value?.json;
  if (!json) {
    return null;
  }

  return (
    <RichText
      content={json}
      {...pa([parentField, field].filter(Boolean).join("."))}
      {...props}
      elements={{
        link: LinkRenderer,
        table: TableRenderer,
        td: TableCellRenderer,
        th: TableCellRenderer,
      }}
    />
  );
}
const TableCellRenderer = ({
  children,
  attributes,
  element,
  text,
}: ElementRendererProps) => {
  const tableCell = element as TableCellElement;

  return (
    <tableCell.type {...attributes} className={clsx(attributes?.class ?? "")}>
      {/* TBD if this is needed. */}
      {text === "✓" ? (
        <>
          <span className="sr-only">yes</span>
          <TiSvgIcon icon="checkmark" />
        </>
      ) : text === "—" ? (
        <>
          <span className="sr-only">no</span>
          —
        </>
      ) : (
        children
      )}
    </tableCell.type>
  );
};

const TableRenderer = ({
  children,
  attributes,
  element,
}: ElementRendererProps) => {
  const tableElement = element as TableElement;

  return (
    <table
      {...attributes}
      // data-lid={attributes?.["data-lid"]}
      border={
        tableElement.border
          ? parseInt(tableElement.border.toString())
          : undefined
      }
      cellPadding={
        tableElement.cellpadding
          ? parseInt(tableElement.cellpadding.toString())
          : undefined
      }
      cellSpacing={
        tableElement.cellspacing
          ? parseInt(tableElement.cellspacing.toString())
          : undefined
      }
      className={clsx(tableElement.class, styles.table)}
    >
      {children}
    </table>
  );
};

const LinkRenderer = ({
  children,
  attributes,
  element,
}: ElementRendererProps) => {
  const linkElement = element as LinkElement;
  const href = normalizeUrl(linkElement.url);
  if (!href) {
    return null;
  }
  const linkProps = {
    href: href,
    target: linkElement.target,
    rel: linkElement.rel,
    title: linkElement.title,
  };

  const mergedProps = {
    ...attributes,
    ...linkProps,
  };
  return <NextLink {...mergedProps}>{children}</NextLink>;
};
