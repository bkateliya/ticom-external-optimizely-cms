import {
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
  ColumnOptions,
  VAlignMap,
  VAlignOptions,
} from "./ColumnGrid.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import clsx from "clsx";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";

export function ColumnGridComponent({
  content,
}: OptiComponentProps<typeof ColumnGridComponentType>) {
  if (!content) {
    return null;
  }

  const columnControl = (content.columnControl as ColumnOptions) || "33-33-33";

  // Grid-level default; each column may override it with its own value.

  const wrapperClasses = clsx("grid", "gap-7", getColumnClass(columnControl));

  const renderedColumns = (content.columns ?? [])
    .map((col, index) => {
      const column = normalizeGenericContentToTyped(
        col,
        ColumnGridColumnComponentType,
      );
      const columnClass = getColumnSpanClass(columnControl, index);
      if (!column?.content?.length || !columnClass) {
        return null;
      }
      const alignClass = getVerticalAlignClass(
        toVAlign(column.verticalAlignment),
      );
      return (
        <div
          key={index}
          className={clsx(
            columnClass,
            alignClass,
            "grid",
            "gap-4",
            "[&_[data-preamble-width-cap]]:max-w-none",
          )}
        >
          {column.content.map((x, i) => (
            <ExtendedOptimizelyComponent key={i} content={x} />
          ))}
        </div>
      );
    })
    .filter(Boolean);

  // Nothing renderable (empty Column List, or all columns empty) → render nothing.
  if (renderedColumns.length === 0) {
    return null;
  }

  return <div className={wrapperClasses}>{renderedColumns}</div>;
}

/**
 * CMS stores the enum value ("top"), but older content may hold the display
 * name ("Top"). Accept either and reject anything else.
 */
function toVAlign(value: unknown): VAlignOptions | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const normalized = value.toLowerCase();
  return normalized in VAlignMap ? (normalized as VAlignOptions) : undefined;
}

function getVerticalAlignClass(verticalAlignment?: VAlignOptions) {
  // NOTE: We are listing these out so that Tailwind sees them and doesn't purge them.
  switch (verticalAlignment) {
    case "top":
      return "items-start";
    case "center":
      return "items-center";
    case "bottom":
      return "items-end";
    default:
      // Preserve prior behavior for existing layouts with no per-column value.
      return null;
  }
}

function getColumnClass(columns: ColumnOptions) {
  if (columns === "20-20-20-20-20") {
    return "grid-cols-5";
  }
  return "grid-cols-12";
}

function getColumnSpanClass(columns: ColumnOptions, columnIndex: number) {
  // NOTE: We are listing these out so that Tailwind sees them and doesn't purge them.
  switch (columns) {
    case "50-50-no-offset":
      if (columnIndex < 2) {
        return "col-span-12 md:col-span-6";
      }
      return null;
    case "33-66":
      if (columnIndex === 0) {
        return "col-span-12 md:col-span-4";
      }
      if (columnIndex === 1) {
        return "col-span-12 md:col-span-8";
      }
      return null;
    case "66-33":
      if (columnIndex === 0) {
        return "col-span-12 md:col-span-8";
      }
      if (columnIndex === 1) {
        return "col-span-12 md:col-span-4";
      }
      return null;
    case "25-75":
      if (columnIndex === 0) {
        return "col-span-12 md:col-span-3";
      }
      if (columnIndex === 1) {
        return "col-span-12 md:col-span-9";
      }
      return null;
    case "75-25":
      if (columnIndex === 0) {
        return "col-span-12 md:col-span-9";
      }
      if (columnIndex === 1) {
        return "col-span-12 md:col-span-3";
      }
      return null;
    case "42-58":
      if (columnIndex === 0) {
        return "col-span-12 md:col-span-5";
      }
      if (columnIndex === 1) {
        return "col-span-12 md:col-span-7";
      }
      return null;
    case "58-42":
      if (columnIndex === 0) {
        return "col-span-12 md:col-span-7";
      }
      if (columnIndex === 1) {
        return "col-span-12 md:col-span-5";
      }
      return null;
    case "33-33-33":
    default:
      if (columnIndex < 3) {
        return "col-span-12 md:col-span-4";
      }
      return null;
    case "25-25-25-25":
      if (columnIndex < 4) {
        return "col-span-12 md:col-span-3";
      }
      return null;
    case "20-20-20-20-20":
      if (columnIndex < 5) {
        // Special case, not out of 12 total
        return "col-span-5 md:col-span-1";
      }
      return null;
  }
}
