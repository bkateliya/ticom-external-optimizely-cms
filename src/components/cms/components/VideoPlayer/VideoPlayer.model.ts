import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";

export const VideoPlayerComponentType = contentType({
  key: AllComponentTypeKeyMap.VideoPlayerComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Video Player`,
  baseType: "_component",
  properties: {
    videoPlayerType: {
      type: "string",
      format: "selectOne",
      displayName: "Video Player Type",
      isRequired: true,
      group: PropertyTypes.Content,
      enum: [
        {
          value: "singleVideo",
          displayName: "SingleVideo",
        },
        {
          value: "videoPlaylist",
          displayName: "Video Playlist",
        },
      ],
    },
    id: {
      type: "string",
      displayName: "Brightcove ID",
      description: "Single Video ID or Video Playlist ID",
      group: PropertyTypes.Content,
      sortOrder: 11,
    },
  },
});
