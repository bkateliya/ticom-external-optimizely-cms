import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";

export const PinComponentType = contentType({
  key: AllComponentTypeKeyMap.PinComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Pin`,
  baseType: "_component",
  properties: {
    lineHeight: {
      type: "string",
      displayName: "Line Height",
      group: PropertyTypes.Content,
      sortOrder: 100,
    },
    lineWidth: {
      type: "string",
      displayName: "Line Width",
      group: PropertyTypes.Content,
      sortOrder: 200,
    },
    linePath: {
      type: "string",
      format: "selectOne",
      displayName: "Line Path",
      group: PropertyTypes.Content,
      sortOrder: 300,
      enum: [
        { value: "down left", displayName: "Down Left" },
        { value: "down right", displayName: "Down Right" },
        { value: "down", displayName: "Down" },
        { value: "left down", displayName: "Left Down" },
        { value: "left up", displayName: "Left Up" },
        { value: "left", displayName: "Left" },
        { value: "right down", displayName: "Right Down" },
        { value: "right up", displayName: "Right Up" },
        { value: "right", displayName: "Right" },
        { value: "up left", displayName: "Up Left" },
        { value: "up right", displayName: "Up Right" },
        { value: "up", displayName: "Up" },
      ],
    },
    positionHorizontal: {
      type: "string",
      displayName: "Position Horizontal",
      group: PropertyTypes.Content,
      sortOrder: 400,
    },
    positionVertical: {
      type: "string",
      displayName: "Position Vertical",
      group: PropertyTypes.Content,
      sortOrder: 500,
    },
    link: {
      type: "link",
      displayName: "Link",
      group: PropertyTypes.Content,
      sortOrder: 600,
    },
    selected: {
      type: "boolean",
      displayName: "Selected",
      group: PropertyTypes.Content,
      sortOrder: 700,
    },
  },
});

export const ImageMapComponentType = contentType({
  key: AllComponentTypeKeyMap.ImageMapComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Image Map`,
  baseType: "_component",
  properties: {
    endImageSrc: {
      type: "contentReference",
      displayName: "End Image Src",
      group: PropertyTypes.Content,
      sortOrder: 100,
      allowedTypes: ["_image"],
    },
    startImageAngle: {
      type: "integer",
      displayName: "Start Image Angle",
      group: PropertyTypes.Content,
      sortOrder: 200,
    },
    startImageOffset: {
      type: "integer",
      displayName: "Start Image Offset",
      group: PropertyTypes.Content,
      sortOrder: 300,
    },
    startImageSrc: {
      type: "contentReference",
      displayName: "Start Image Src",
      group: PropertyTypes.Content,
      sortOrder: 400,
      allowedTypes: ["_image"],
    },
    pins: {
      type: "array",
      displayName: "Pins",
      group: PropertyTypes.Content,
      sortOrder: 500,
      items: {
        type: "content",
        allowedTypes: [PinComponentType],
      },
    },
  },
});
