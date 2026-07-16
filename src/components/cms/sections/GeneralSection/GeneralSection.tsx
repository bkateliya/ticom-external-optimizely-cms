
import { GeneralSectionComponentType, ColumnOptions } from "./GeneralSection.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ThemedSection } from "@/components/ui/molecules/SectionWrapper/ThemedSection";
import { PreambleSectionWrapper } from "@/components/ui/molecules/SectionWrapper/PreambleSectionWrapper";

export function GeneralSectionComponent({
  content,
  parentField
}: OptiComponentProps<typeof GeneralSectionComponentType>) {
  if (!content) {
    return null;
  }

  const columns = content.columnControl as ColumnOptions || "100";

  const col1Class = COLUMN_1_MAP[columns]
  const col2Class = COLUMN_2_MAP[columns]
  const col3Class = COLUMN_3_MAP[columns]
  const col4Class = COLUMN_4_MAP[columns]

  return (
    <ThemedSection content={content}>
      <PreambleSectionWrapper content={content} parentField={parentField}>
        <div className="grid grid-cols-12 gap-4">

          <div className={col1Class}>
            {content.content?.map((x, i) => <ExtendedOptimizelyComponent key={i} content={x} />)}
          </div>
          {
            col2Class && (<div className={col2Class}>
              {content.content2?.map((x, i) => <ExtendedOptimizelyComponent key={i} content={x} />)}
            </div>)
          }

          {
            col3Class && (<div className={col3Class}>
              {content.content3?.map((x, i) => <ExtendedOptimizelyComponent key={i} content={x} />)}
            </div>)
          }

          {
            col4Class && (<div className={col4Class}>
              {content.content4?.map((x, i) => <ExtendedOptimizelyComponent key={i} content={x} />)}
            </div>)
          }
        </div>
      </PreambleSectionWrapper>
    </ThemedSection>
  );
}


const COLUMN_1_MAP = {
  "100": "col-span-12",
  "50-50-no-offset": "col-span-6",
  "33-66": "col-span-4",
  "66-33": "col-span-8",
  "25-75": "col-span-3",
  "75-25": "col-span-9",
  "42-58": "col-span-5",
  "58-42": "col-span-7",
  "33-33-33": "col-span-4",
  "25-25-25-25": "col-span-3",
} as const;

const COLUMN_2_MAP = {
  "100": null,
  "50-50-no-offset": "col-span-6",
  "33-66": "col-span-8",
  "66-33": "col-span-4",
  "25-75": "col-span-9",
  "75-25": "col-span-3",
  "42-58": "col-span-7",
  "58-42": "col-span-5",
  "33-33-33": "col-span-4",
  "25-25-25-25": "col-span-3",
} as const;


const COLUMN_3_MAP = {
  "100": null,
  "50-50-no-offset": null,
  "33-66": null,
  "66-33": null,
  "25-75": null,
  "75-25": null,
  "42-58": null,
  "58-42": null,
  "33-33-33": "col-span-4",
  "25-25-25-25": "col-span-3",
} as const;


const COLUMN_4_MAP = {
  "100": null,
  "50-50-no-offset": null,
  "33-66": null,
  "66-33": null,
  "25-75": null,
  "75-25": null,
  "42-58": null,
  "58-42": null,
  "33-33-33": null,
  "25-25-25-25": "col-span-3",
} as const;
