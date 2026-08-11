import { ComponentProps } from "react";
import { OptimizelyComposition } from "@optimizely/cms-sdk/react/server";
import {
  BackgroundColorSetting,
  BackgroundImageSetting,
} from "../contracts/component-contracts/section.model";
import { sectionTypes } from "./types";

/**
 * Class put on a section that directly follows another section painting the
 * same background colour. Two same-coloured sections read as one continuous
 * block of colour, so the separator gives the seam back.
 */
export const SECTION_SEPARATOR_CLASS = "seprater";

/** Flag injected onto section content by {@link withSectionSeparators}. */
const SEPARATOR_FLAG = "__hasSectionSeparator";

/**
 * "Not Selected" leaves the section on the inherited white background, which is
 * the same fill the explicit White theme paints — so the two count as one
 * colour when deciding whether a separator is needed.
 */
const NOT_SELECTED_THEME = "theme-white";

type CompositionNode = ComponentProps<
  typeof OptimizelyComposition
>["nodes"][number];

/** The slice of a node that `OptimizelyComposition` spreads into `content`. */
type NodeData = {
  __typename?: string | null;
  _metadata?: { types?: string[] } | null;
  background?: {
    __typename?: string | null;
    theme?: string | null;
  } | null;
};

const SECTION_TYPE_KEYS = new Set(sectionTypes.map((x) => x.key));

/**
 * Mirrors how `OptimizelyComposition` builds the `content` prop: a component
 * node renders its `component`, any other node renders the node itself.
 */
function getNodeData(node: CompositionNode): NodeData {
  return "component" in node
    ? (node.component as NodeData)
    : (node as NodeData);
}

function isSection(node: CompositionNode, data: NodeData): boolean {
  const candidates = [
    data.__typename,
    node.type,
    ...(data._metadata?.types ?? []),
  ];
  return candidates.some((x) => !!x && SECTION_TYPE_KEYS.has(x));
}

/**
 * The background colour a section paints, as a comparable key. `null` for
 * anything that shouldn't take part in the comparison: non-sections, and
 * sections backed by an image rather than a colour (two images never read as
 * one continuous fill, so they never need a seam).
 */
function getBackgroundKey(node: CompositionNode): string | null {
  const data = getNodeData(node);

  if (!isSection(node, data)) {
    return null;
  }

  const background = data.background;

  if (background?.__typename === BackgroundImageSetting.key) {
    return null;
  }

  if (background?.__typename === BackgroundColorSetting.key) {
    return background.theme || NOT_SELECTED_THEME;
  }

  // No background chosen at all — the "Not Selected" case.
  return NOT_SELECTED_THEME;
}

/**
 * Flags every section node that follows another section with the same effective
 * background colour, so the section component can render
 * {@link SECTION_SEPARATOR_CLASS}. The comparison lives here, at the
 * composition level, because a section can't see its siblings from inside.
 *
 * Runs of three or more same-coloured sections get the flag on every section
 * after the first, so each seam within the run is marked.
 */
export function withSectionSeparators(
  nodes: CompositionNode[],
): CompositionNode[] {
  const keys = nodes.map(getBackgroundKey);

  return nodes.map((node, i) => {
    const key = keys[i];

    // `keys[i - 1]` is `undefined` for the first node, which never matches.
    if (key === null || key !== keys[i - 1]) {
      return node;
    }

    return "component" in node
      ? { ...node, component: { ...node.component, [SEPARATOR_FLAG]: true } }
      : { ...node, [SEPARATOR_FLAG]: true };
  });
}

/** Whether this section follows one painting the same background colour. */
export function hasSectionSeparator(content: unknown): boolean {
  return (
    typeof content === "object" &&
    content !== null &&
    (content as Record<string, unknown>)[SEPARATOR_FLAG] === true
  );
}
