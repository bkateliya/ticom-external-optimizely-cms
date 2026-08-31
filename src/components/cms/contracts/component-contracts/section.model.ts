import { contentType, contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { ALL_THEME_NAMES } from "@/lib/themes";
import { PreambleContracts } from "./preamble.model";
import { ContractContentType } from "@/lib/ts/opti";
import { HeadlineContract } from "./headline.model";
import { DeprecatedCtaListContract } from "./cta-list.model";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";
import { JumpLinkTargetComponentType } from "../../components/JumpLink/JumpLinkTarget.model";
import { BynderVideoStubModel } from "@/components/cms/media/graph/BynderStubs";
import { BynderImageStubModel } from "../../media/graph/BynderStubs";

export const BackgroundColorSetting = contentType({
  key: `${KEY_PREFIX}BackgroundColor_Setting`,
  displayName: `${DISPLAY_NAME_PREFIX}Background Color Setting`,
  baseType: "_component",
  properties: {
    theme: {
      type: "string",
      isRequired: true,
      displayName: "Background Theme",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      enum: Object.entries(ALL_THEME_NAMES).map(([key, value]) => ({
        value: key,
        displayName: value,
      })),
    },
  },
});

export const BackgroundImageSetting = contentType({
  key: `${KEY_PREFIX}BackgroundImage_Setting`,
  displayName: `${DISPLAY_NAME_PREFIX}Background Image Setting`,
  baseType: "_component",
  properties: {
    backgroundImage: {
      type: "contentReference",
      displayName: "Background Image",
      isRequired: true,
      group: PropertyTypes.Appearance,
      allowedTypes: [BynderImageStubModel],
    },
    backgroundTheme: {
      type: "string",
      displayName: "Is background image Light or Dark?",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      isRequired: true,
      enum: [
        {
          value: "light",
          displayName: "Light",
        },
        {
          value: "dark",
          displayName: "Dark",
        },
      ],
    },
    noOverlay: {
      type: "boolean",
      displayName: "Hide transparent overlay",
      description:
        "By default we put either a black or white transparent overlay on top of the image to aid text legibility.  If the image already has sufficient contract, this overlay can be hidden.",
      group: PropertyTypes.Appearance,
    },
  },
});

export const BackgroundVideoSetting = contentType({
  key: `${KEY_PREFIX}BackgroundVideo_Setting`,
  displayName: `${DISPLAY_NAME_PREFIX}Background Video Setting`,
  baseType: "_component",
  properties: {
    backgroundVideo: {
      type: "contentReference",
      displayName: "Video",
      description: "Background video from the DAM, rendered by `ti-slide`.",
      isRequired: true,
      group: PropertyTypes.Appearance,
      allowedTypes: [BynderVideoStubModel],
    },
    videoPlayerControls: {
      type: "boolean",
      displayName: "Video Play Controls",
      description:
        "If checked, the play/pause control is shown so visitors can stop the background video.",
      group: PropertyTypes.Appearance,
    },
  },
});

export const SectionBackgroundContract = contract({
  key: `${KEY_PREFIX}SectionBackground_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Section Background Contract`,
  properties: {
    background: {
      type: "content",
      displayName: "Section Background",
      group: PropertyTypes.Appearance,
      allowedTypes: [
        BackgroundColorSetting,
        BackgroundImageSetting,
        BackgroundVideoSetting,
      ],
    },

    backgroundSize: {
      type: "string",
      displayName: "Background Size",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      enum: [
        {
          value: "full",
          displayName: "Full Width (default)",
        },
        {
          value: "section",
          displayName: "Section Width",
        },
      ],
    },
  },
});

export const SectionSettingsContract = contract({
  key: `${KEY_PREFIX}SectionStyle_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Section Settings Contract`,
  properties: {
    sectionId: {
      type: "string",
      displayName: "Section ID",
      description: "ID for use as anchor target or for other purposes",
      ...SoftDeleteProperties,
    },
    jumpNavTarget: {
      type: "content",
      displayName: "Jump Nav Target",
      group: PropertyTypes.Content,
      allowedTypes: [JumpLinkTargetComponentType],
    },
    headlineAlignment: {
      type: "string",
      displayName: "Headline Alignment",
      description: "Controls the alignment of the headline for this section",
      format: "selectOne",
      enum: [
        {
          value: "Left",
          displayName: "Left Align (default)",
        },
        {
          value: "Center",
          displayName: "Center Align",
        },
      ],
      group: PropertyTypes.Appearance,
    },
    headlineRedUnderline: {
      type: "boolean",
      displayName: "Headline Red Underline",
      description: "If checked, the headline will have a red underline",
      ...SoftDeleteProperties,
    },
    sectionFullHeight: {
      type: "boolean",
      displayName: "Section Full Height",
      description:
        "If checked, the section will take up a full screen's height",
      group: PropertyTypes.Appearance,
    },
    sectionNarrow: {
      type: "boolean",
      displayName: "Section Narrow",
      description:
        "If checked, the section content will be more narrow and have more margin on the sides",
      group: PropertyTypes.Appearance,
    },
  },
});

/** For using contracts as component interfaces. */
export type SectionBackgroundContractContentType = ContractContentType<
  [typeof SectionBackgroundContract]
>;

export const SectionContracts = [
  SectionBackgroundContract,
  SectionSettingsContract,
  ...PreambleContracts,
];

/** For using contracts as component interfaces. */
export type SectionContractContentType = ContractContentType<
  [
    typeof SectionBackgroundContract,
    typeof HeadlineContract,
    typeof DeprecatedCtaListContract,
  ]
>;
