import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";

export const EventComponentType = contentType({
  key: AllComponentTypeKeyMap.EventComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Event data`,
  baseType: "_component",
  properties: {
    // ── Deprecated fields ──────────────────────────────────────────────
    title: {
      type: "string",
      displayName: "[Obsolete] Title",
      maxLength: 300,
      isLocalized: true,
      ...SoftDeleteProperties,
    },
    bynderImage: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "[Obsolete] Image",
      ...SoftDeleteProperties,
    },

    // ── Active fields ──────────────────────────────────────────────────
    eventTitle: {
      type: "string",
      displayName: "Event title",
      maxLength: 125,
      isRequired: true,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    description: {
      type: "richText",
      displayName: "Description",
      maxLength: 300,
      isRequired: true,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    attendanceType: {
      type: "string",
      format: "selectOne",
      displayName: "Attendance type",
      isRequired: true,
      group: PropertyTypes.Content,
      enum: [
        { value: "in-person", displayName: "In person" },
        { value: "online", displayName: "Online" },
      ],
    },
    eventType: {
      type: "string",
      format: "selectOne",
      displayName: "Event type",
      isRequired: true,
      group: PropertyTypes.Content,
      enum: [
        { value: "webinar", displayName: "Webinar" },
        { value: "seminar", displayName: "Seminar" },
        { value: "conference", displayName: "Conference" },
        { value: "trade-show", displayName: "Trade show" },
      ],
    },
    image: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      isRequired: true,
      group: PropertyTypes.Content,
    },
    eventStartDate: {
      type: "dateTime",
      displayName: "Event Start Date",
      group: PropertyTypes.Content,
    },
    eventEndDate: {
      type: "dateTime",
      displayName: "Event End Date",
      group: PropertyTypes.Content,
    },
    location: {
      type: "string",
      displayName: "Location",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    region: {
      type: "string",
      format: "selectOne",
      displayName: "Region",
      group: PropertyTypes.Content,
      enum: [
        { value: "north-america", displayName: "North America" },
        { value: "emea", displayName: "EMEA" },
        { value: "asia", displayName: "Asia" },
        { value: "online", displayName: "Online" },
      ],
    },
    language: {
      type: "string",
      format: "selectOne",
      displayName: "Language",
      group: PropertyTypes.Content,
      enum: [
        { value: "english", displayName: "English" },
        { value: "german", displayName: "German" },
        { value: "japanese", displayName: "Japanese" },
        { value: "korean", displayName: "Korean" },
        { value: "simplified-chinese", displayName: "Simplified Chinese" },
        { value: "spanish", displayName: "Spanish" },
        { value: "traditional-chinese", displayName: "Traditional Chinese" },
      ],
    },
    ctaTitle: {
      type: "string",
      format: "selectOne",
      displayName: "CTA Title",
      isRequired: true,
      group: PropertyTypes.Content,
      enum: [
        { value: "register", displayName: "Register" },
        { value: "visit-event-website", displayName: "Visit event website" },
        { value: "learn-more", displayName: "Learn more" },
        { value: "watch-video", displayName: "Watch video" },
      ],
    },
    ctaURL: {
      type: "link",
      displayName: "CTA URL",
      isRequired: true,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

export const EventFolderType = contentType({
  key: AllComponentTypeKeyMap.EventFolder,
  displayName: `${DISPLAY_NAME_PREFIX}Event Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", EventComponentType],
});
