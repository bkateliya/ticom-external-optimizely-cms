import {
  hasSectionSeparator,
  withSectionSeparators,
} from "../section-separator";
import { GeneralSectionComponentType } from "../GeneralSection/GeneralSection.model";
import {
  BackgroundColorSetting,
  BackgroundImageSetting,
} from "../../contracts/component-contracts/section.model";

type Nodes = Parameters<typeof withSectionSeparators>[0];

/** A `CompositionComponentNode` as `OptimizelyComposition` receives it. */
function sectionNode(background: object | null, key = `node-${count++}`) {
  return {
    __typename: "CompositionComponentNode",
    nodeType: "component",
    key,
    type: null,
    layoutType: "section",
    displayName: "Section",
    displayTemplateKey: null,
    displaySettings: null,
    component: {
      __typename: GeneralSectionComponentType.key,
      background,
    },
  };
}
let count = 0;

const notSelected = () => sectionNode(null);
const color = (theme: string) =>
  sectionNode({ __typename: BackgroundColorSetting.key, theme });
const image = () =>
  sectionNode({
    __typename: BackgroundImageSetting.key,
    backgroundTheme: "dark",
  });

/** `true` where a section gets the separator, in node order. */
function separators(nodes: object[]) {
  return withSectionSeparators(nodes as Nodes).map((node) =>
    hasSectionSeparator((node as { component: unknown }).component),
  );
}

describe("withSectionSeparators", () => {
  it("marks the second of two sections sharing a background colour", () => {
    expect(separators([color("theme-grey"), color("theme-grey")])).toEqual([
      false,
      true,
    ]);
  });

  it.each([
    "theme-white",
    "theme-grey",
    "theme-dark-grey",
    "theme-black",
    "theme-red-gradient",
  ])("applies to the %s background", (theme) => {
    expect(separators([color(theme), color(theme)])).toEqual([false, true]);
  });

  it("treats Not Selected as White", () => {
    expect(separators([notSelected(), notSelected()])).toEqual([false, true]);
    expect(separators([notSelected(), color("theme-white")])).toEqual([
      false,
      true,
    ]);
    expect(separators([color("theme-white"), notSelected()])).toEqual([
      false,
      true,
    ]);
  });

  it("leaves differing background colours alone", () => {
    expect(
      separators([
        color("theme-grey"),
        color("theme-red-gradient"),
        notSelected(),
      ]),
    ).toEqual([false, false, false]);
  });

  it("marks every seam in a run of three or more", () => {
    expect(
      separators([
        color("theme-grey"),
        color("theme-grey"),
        color("theme-grey"),
      ]),
    ).toEqual([false, true, true]);
  });

  it("handles the full example from the spec", () => {
    expect(
      separators([
        notSelected(),
        color("theme-white"),
        color("theme-white"),
        color("theme-grey"),
        color("theme-grey"),
        color("theme-red-gradient"),
      ]),
    ).toEqual([false, true, true, false, true, false]);
  });

  it("never separates image backgrounds, and they break a run", () => {
    expect(
      separators([
        color("theme-grey"),
        image(),
        image(),
        color("theme-grey"),
        color("theme-grey"),
      ]),
    ).toEqual([false, false, false, false, true]);
  });

  it("ignores nodes that aren't sections", () => {
    const notASection = {
      ...sectionNode(null),
      component: { __typename: "TI_SomeOther_Component", background: null },
    };
    expect(separators([notSelected(), notASection, notSelected()])).toEqual([
      false,
      false,
      false,
    ]);
  });

  it("returns the original node objects when nothing is flagged", () => {
    const nodes = [color("theme-grey"), color("theme-white")];
    expect(withSectionSeparators(nodes as Nodes)).toEqual(nodes);
  });
});
