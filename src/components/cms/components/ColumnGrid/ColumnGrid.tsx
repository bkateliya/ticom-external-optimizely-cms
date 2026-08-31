import {
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
  ColumnOptions,
  VAlignMap,
  VAlignOptions,
} from "./ColumnGrid.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { ReusableColumnGrid } from "./ReusableColumnGrid";

export function ColumnGridComponent({
  content,
}: OptiComponentProps<typeof ColumnGridComponentType>) {
  if (!content) {
    return null;
  }

  const columnControl = (content.columnControl as ColumnOptions) || "33-33-33";

  return (
    <ReusableColumnGrid
      columnOptions={columnControl}
      columns={
        content.columns
          ?.map((col) =>
            normalizeGenericContentToTyped(col, ColumnGridColumnComponentType),
          )
          .filter((col) => col != null)
          ?.map((col) => ({
            columnAlign: toVAlign(col?.verticalAlignment),
            content:
              col?.content?.map((x, i) => (
                <ExtendedOptimizelyComponent key={i} content={x} />
              )) ?? [],
          })) ?? []
      }
    />
  );
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
