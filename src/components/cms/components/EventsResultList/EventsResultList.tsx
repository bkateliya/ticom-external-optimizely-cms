import { getLocale } from "next-intl/server";
import { EventsResultListComponentType } from "./EventsResultList.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { EventsResultListClient } from "./EventsResultListClient";

const DEFAULT_VISIBLE_FACETS = ["eventType", "region", "language"];

// Hardcoded for now. Frontend should load these from the dictionary.
const TABS = [
  { tabId: "upcoming", title: "Upcoming" },
  { tabId: "past", title: "Past" },
];

const VIEW_MORE = {
  expandLabel: "View more",
  collapseLabel: "View less",
};

function normalizeToArray(
  value: string | string[] | null | undefined,
): string[] | null {
  if (!value) return null;
  return Array.isArray(value) ? value : [value];
}

export async function EventsResultList({
  content,
}: OptiComponentProps<typeof EventsResultListComponentType>) {
  if (!content) {
    return null;
  }

  const locale = await getLocale();

  return (
    <SectionWrapper>
      <EventsResultListClient
        locale={locale}
        preFilterEventTypes={normalizeToArray(content.preFilterEventTypes)}
        visibleFacets={
          normalizeToArray(content.visibleFacets) ?? DEFAULT_VISIBLE_FACETS
        }
        tabs={TABS}
        viewMore={VIEW_MORE}
      />
    </SectionWrapper>
  );
}
