
import { ColumnGridColumnComponentType, ColumnGridComponentType, ColumnOptions } from "./ColumnGrid.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import clsx from "clsx";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";

export function ColumnGridComponent({
  content,
  parentField
}: OptiComponentProps<typeof ColumnGridComponentType>) {
  if (!content) {
    return null;
  }

  const columnControl = content.columnControl as ColumnOptions || "100";

  const wrapperClasses = clsx("grid", "gap-4", getColumnClass(columnControl, content.advancedTotalColumns));


  return (
    <div className={wrapperClasses}>
      {
        content.columns?.map((col, index) => {
          const column = normalizeGenericContentToTyped(col, ColumnGridColumnComponentType)
          const columnClass = getColumnSpanClass(columnControl, index, column?.colSpan);
          if (!column?.content || !columnClass) {
            return;
          }
          return <div key={index} className={clsx(columnClass, 'grid', 'gap-4')}>
            {column.content?.map((x, i) => <ExtendedOptimizelyComponent key={i} content={x} />)}
          </div>;
        })
      }
    </div>
  );
}

function getColumnClass(columns: ColumnOptions, customColumns?: number | null) {
  const totalColumns = (columns === "Advanced" ? customColumns : columns === "20-20-20-20-20" ? 5 : 12) || 12;
  // NOTE: We are listing these out so that Tailwind sees them and doesn't purge them.
  switch (totalColumns) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    case 9:
      return "grid-cols-9";
    case 10:
      return "grid-cols-10";
    case 11:
      return "grid-cols-11";
    case 12:
      return "grid-cols-12";
    case 13:
      return "grid-cols-13";
    case 14:
      return "grid-cols-14";
    case 15:
      return "grid-cols-15";
    case 16:
      return "grid-cols-16";
    default:
      return "grid-cols-12";
  }
}

function getColumnSpanClass(columns: ColumnOptions, columnIndex: number, customColumns?: number | null) {
  // NOTE: We are listing these out so that Tailwind sees them and doesn't purge them.
  switch (columns) {
    case "100":
      if (columnIndex === 0) {
        return "col-span-12";
      }
      return null;
    case "50-50-no-offset":
      if (columnIndex < 2) {
        return "col-span-6";
      }
      return null;
    case "33-66":
      if (columnIndex === 0) {
        return "col-span-4";
      }
      if (columnIndex === 1) {
        return "col-span-8";
      }
      return null;
    case "66-33":
      if (columnIndex === 0) {
        return "col-span-8";
      }
      if (columnIndex === 1) {
        return "col-span-4";
      }
      return null;
    case "25-75":
      if (columnIndex === 0) {
        return "col-span-3";
      }
      if (columnIndex === 1) {
        return "col-span-9";
      }
      return null;
    case "75-25":
      if (columnIndex === 0) {
        return "col-span-9";
      }
      if (columnIndex === 1) {
        return "col-span-3";
      }
      return null;
    case "42-58":
      if (columnIndex === 0) {
        return "col-span-5";
      }
      if (columnIndex === 1) {
        return "col-span-7";
      }
      return null;
    case "58-42":
      if (columnIndex === 0) {
        return "col-span-7";
      }
      if (columnIndex === 1) {
        return "col-span-5";
      }
      return null;
    case "33-33-33":
      if (columnIndex < 3) {
        return "col-span-4";
      }
      return null;
    case "25-25-25-25":
      if (columnIndex < 4) {
        return "col-span-3";
      }
      return null;
    case "20-20-20-20-20":
      if (columnIndex < 5) {
        // Special case, not out of 12 total
        return "col-span-1";
      }
      return null;
    case "Advanced":
    default:
      switch (customColumns) {
        case 16:
          return "col-span-16";
        case 15:
          return "col-span-15";
        case 14:
          return "col-span-14";
        case 13:
          return "col-span-13";
        case 12:
          return "col-span-12";
        case 11:
          return "col-span-11";
        case 10:
          return "col-span-10";
        case 9:
          return "col-span-9";
        case 8:
          return "col-span-8";
        case 7:
          return "col-span-7";
        case 6:
          return "col-span-6";
        case 5:
          return "col-span-5";
        case 4:
          return "col-span-4";
        case 3:
          return "col-span-3";
        case 2:
          return "col-span-2";
        case 1:
        default:
          return "col-span-1";
      }
  }
}