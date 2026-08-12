import { ComponentProps } from "react";
import { OptimizelyComposition } from "@optimizely/cms-sdk/react/server";
import {
    BackgroundColorSetting,
    BackgroundImageSetting,
} from "../contracts/component-contracts/section.model";
import { sectionTypes } from "./types";

/*
 * Two same-coloured sections in a row read as one continuous block of colour,
 * so one of them closes the seam. Which edge closes depends on which section
 * carries the class, hence one class per direction.
 */

/** The seam is above this section: it closes its top edge. */
export const SECTION_SEPARATOR_TOP_CLASS = "seprater-top";

/** The seam is below this section: it closes its bottom edge. */
export const SECTION_SEPARATOR_BOTTOM_CLASS = "seprater-bottom";

/** Property injected onto section content by {@link withSectionSeparators}. */
const SEPARATOR_FLAG = "__sectionSeparatorClass";

/**
 * "Not Selected" leaves the section on the inherited white background, which is
 * the same fill the explicit White theme paints — so the two count as one
 * colour when deciding whether a separator is needed.
 */
const NOT_SELECTED_THEME = "theme-white";

/**
 * Themes that never take a separator, however they're stacked. A gradient isn't
 * a flat fill: two of them already read as two blocks, so there's no seam to
 * give back.
 */
const THEMES_WITHOUT_SEPARATOR: ReadonlySet<string> = new Set([
    "theme-red-gradient",
]);

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
    backgroundSize?: string | null;
};

/** How wide a section paints its background. See `ThemedSection`. */
type BackgroundWidth = "section" | "full";

type SectionStyle = {
    /**
     * Comparable background colour, or `null` when the section never takes a
     * separator (and so also breaks a run).
     */
    colour: string | null;
    width: BackgroundWidth;
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
 * anything that shouldn't take part in the comparison: non-sections, sections
 * backed by an image rather than a colour (two images never read as one
 * continuous fill, so they never need a seam), and the themes in
 * {@link THEMES_WITHOUT_SEPARATOR}.
 */
function getBackgroundColour(node: CompositionNode, data: NodeData) {
    if (!isSection(node, data)) {
        return null;
    }

    const background = data.background;

    if (background?.__typename === BackgroundImageSetting.key) {
        return null;
    }

    if (background?.__typename === BackgroundColorSetting.key) {
        const theme = background.theme || NOT_SELECTED_THEME;
        return THEMES_WITHOUT_SEPARATOR.has(theme) ? null : theme;
    }

    // No background chosen at all — the "Not Selected" case.
    return NOT_SELECTED_THEME;
}

/**
 * Mirrors `ThemedSection`: `backgroundSize` only applies once a background is
 * actually set, so a section without one paints full width whatever the field
 * says.
 */
function getBackgroundWidth(data: NodeData): BackgroundWidth {
    if (!data.background) {
        return "full";
    }
    return data.backgroundSize === "section" ? "section" : "full";
}

function getSectionStyle(node: CompositionNode): SectionStyle {
    const data = getNodeData(node);
    return {
        colour: getBackgroundColour(node, data),
        width: getBackgroundWidth(data),
    };
}

function flag(node: CompositionNode, className: string): CompositionNode {
    // Spread rather than write the key inline: the flag isn't part of the SDK's
    // node types, so an inline key trips excess property checking.
    const separator = { [SEPARATOR_FLAG]: className };

    return "component" in node
        ? { ...node, component: { ...node.component, ...separator } }
        : { ...node, ...separator };
}

/**
 * Flags one section of every same-coloured consecutive pair so it can close the
 * seam between them. The comparison lives here, at the composition level,
 * because a section can't see its siblings from inside.
 *
 * The seam normally closes on the second section's top edge
 * ({@link SECTION_SEPARATOR_TOP_CLASS}). When the first section paints at
 * section width and the second at full width, it closes on the first section's
 * bottom edge instead ({@link SECTION_SEPARATOR_BOTTOM_CLASS}) — an inset
 * background can't reach down to meet the full-width band below it.
 *
 * Runs of three or more same-coloured sections are handled pair by pair, so
 * every seam within the run is closed. A section between two seams closes both
 * of its edges.
 */
export function withSectionSeparators(
    nodes: CompositionNode[],
): CompositionNode[] {
    const styles = nodes.map(getSectionStyle);
    const classNames = new Map<number, Set<string>>();

    const mark = (index: number, className: string) => {
        const existing = classNames.get(index);
        if (existing) {
            existing.add(className);
        } else {
            classNames.set(index, new Set([className]));
        }
    };

    for (let i = 1; i < nodes.length; i++) {
        const previous = styles[i - 1];
        const current = styles[i];

        if (current.colour === null || current.colour !== previous.colour) {
            continue;
        }

        if (previous.width === "section" && current.width === "full") {
            mark(i - 1, SECTION_SEPARATOR_BOTTOM_CLASS);
        } else {
            mark(i, SECTION_SEPARATOR_TOP_CLASS);
        }
    }

    return nodes.map((node, i) => {
        const classes = classNames.get(i);
        return classes ? flag(node, [...classes].join(" ")) : node;
    });
}

/**
 * The separator class this section should render, or `undefined` when it
 * doesn't sit on a seam.
 */
export function getSectionSeparatorClass(content: unknown): string | undefined {
    if (typeof content !== "object" || content === null) {
        return undefined;
    }
    const value = (content as Record<string, unknown>)[SEPARATOR_FLAG];
    return typeof value === "string" && value ? value : undefined;
}
