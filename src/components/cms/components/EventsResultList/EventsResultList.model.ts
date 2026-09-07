import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { PropertyTypes } from "@/lib/property-types";

export const EventsResultListComponentType = contentType({
  key: AllComponentTypeKeyMap.EventsResultListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Events Result List`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    preFilterEventTypes: {
      type: "array",
      format: "selectMany",
      displayName: "Pre-filter event types",
      description:
        "Only events matching selected types will appear. Leave empty to show all types.",
      group: PropertyTypes.Content,
      items: {
        type: "string",
        enum: [
          { value: "webinar", displayName: "Webinar" },
          { value: "seminar", displayName: "Seminar" },
          { value: "conference", displayName: "Conference" },
          { value: "trade-show", displayName: "Trade show" },
        ],
      },
    },
    visibleFacets: {
      type: "array",
      format: "selectMany",
      displayName: "Visible filters",
      description:
        "Select which filters appear in the sidebar. Defaults to Event type, Location, and Language.",
      group: PropertyTypes.Content,
      items: {
        type: "string",
        enum: [
          { value: "eventType", displayName: "Event type" },
          { value: "attendanceType", displayName: "Event subtype" },
          { value: "region", displayName: "Location" },
          { value: "language", displayName: "Language" },
        ],
      },
    },
  },
});
