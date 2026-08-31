import { OptiComponentProps } from "@/lib/ts/component-props";
import {
  normalizeGenericArrayToTyped,
  normalizeGenericContentToTyped,
} from "@/lib/utils/content-type-utils";
import { normalizeUrl } from "@/lib/utils/link-utils";
import {
  HierarchyNavigationComponentType,
  HierarchyNavigationItemComponentType,
} from "./HierarchyNavigation.model";
import { HierarchyNavClient, NavEntry, NavLink } from "./HierarchyNavClient";
import { LinkElementType } from "@/components/cms/elements/Link/Link.model";
import { ContentProps } from "@optimizely/cms-sdk";
import { parseSecurableLink } from "@/lib/utils/secure-link-utils";

/**
 * Hierarchy (side) navigation. Renders the author's `navigationItems` as a
 * two-level side nav: a `Link` element is a plain level-1 link, while a
 * `HierarchyNavigationItem` (title + child links) is an expandable level-1
 * group — mirroring TI.com's rule that a level-1 with children has no URL of
 * its own. Data is resolved here (server) so `normalizeUrl` runs with CMS
 * context; the interactive expand/collapse and current-page highlight live in
 * the client child.
 */

// Use `url.default` (locale-aware relative path), not `url.base`, which would
// bake the current host into every href.
function toNavLink(
  linkElement: ContentProps<typeof LinkElementType>,
): NavLink | null {
  const link = linkElement.link;
  const href = link?.url?.default ?? "";
  if (!href) return null;
  const url = normalizeUrl(href);
  if (!url) return null;
  const secure = parseSecurableLink(url);
  if (!secure) return null;
  return {
    securableUrl: secure,
    text: link?.text || url,
    target: link?.target ?? undefined,
    title: link?.title ?? undefined,
  };
}

export function HierarchyNavigation({
  content,
}: OptiComponentProps<typeof HierarchyNavigationComponentType>) {
  if (!content) return null;

  const entries: NavEntry[] = [];

  for (const item of content.navigationItems ?? []) {
    if (!item) continue;
    const groupItem = normalizeGenericContentToTyped(
      item,
      HierarchyNavigationItemComponentType,
    );
    const linkItem = normalizeGenericContentToTyped(item, LinkElementType);
    if (groupItem) {
      const children = normalizeGenericArrayToTyped(
        groupItem.hierarchyNavigationChildItems,
        LinkElementType,
      )
        .map(toNavLink)
        .filter((c): c is NavLink => c != null);
      if (!children.length) continue; // a group with no links has nothing to show
      entries.push({ type: "group", title: groupItem.title ?? "", children });
    } else if (linkItem) {
      const link = toNavLink(linkItem);
      if (link) entries.push({ type: "link", ...link });
    }
  }

  if (!entries.length) return null;

  return <HierarchyNavClient entries={entries} />;
}
